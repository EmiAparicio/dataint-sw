import Axios from "axios";
import styles from "../../styles/Detail.module.css";
import { promisify } from "../../controllers/promisify";
import Link from "next/link";

// SSR Fetching with AXIOS
export async function getServerSideProps({ params }) {
  // Character fetched by id from params
  const resp = await Axios.get(`https://swapi.dev/api/people/${params.char}`);
  const data = resp.data;

  // Convert urls into promises with imported function "promisify"
  // Get arrays of promises for relevant character features
  const filmsProm = Promise.all(promisify(data.films, "films"));
  const speciesProm = Promise.all(promisify(data.species, "species"));
  const vehiclesProm = Promise.all(promisify(data.vehicles, "vehicles"));
  const starshipsProm = Promise.all(promisify(data.starships, "starships"));
  const homeworldProm = Promise.all(promisify([data.homeworld], "planets"));

  // Await all promises to fulfill parallelly
  const [films, species, vehicles, starships, homeworld] = await Promise.all([
    filmsProm,
    speciesProm,
    vehiclesProm,
    starshipsProm,
    homeworldProm,
  ]);

  return {
    props: {
      name: data.name,
      height: data.height,
      mass: data.mass,
      hair: data.hair_color,
      skin: data.skin_color,
      eyes: data.eye_color,
      birth: data.birth_year,
      gender: data.gender,
      homeworld: homeworld.map((h) => h.data.name),
      films: films.map((f) => f.data.title),
      species: species.map((s) => s.data.name),
      vehicles: vehicles.map((v) => v.data.name),
      starships: starships.map((s) => s.data.name),
    },
  };
}

export default function Detail({
  name,
  height,
  mass,
  hair,
  skin,
  eyes,
  birth,
  gender,
  homeworld,
  films,
  species,
  vehicles,
  starships,
}) {
  return (
    <div className={styles.container}>
      <div className={`${styles.cardContainer} card text-center`}>
        <div className="card-header">StarWars Character</div>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className={`${styles.cardText} card-text`}>
            <span>
              Physique: {height}cm tall, {mass}kg
            </span>
            <span>Skin: {skin}</span>
            <span>
              Hair: {hair === "n/a" || hair === "none" ? "none" : hair}
            </span>
            <span>Eyes: {eyes}</span>
            <span>Birth year: {birth}</span>
            <span>Gender: {gender === "n/a" ? "none" : gender}</span>
            <span>Homeworld: {homeworld}</span>
            <span>Species: {species.join(", ")}</span>
            <span>
              Films ({films.length}): {films.join(", ")}
            </span>
            <span>
              Vehicles{vehicles.length ? ` (${vehicles.length})` : null}:{" "}
              {vehicles.length > 0 ? vehicles.join(", ") : "none"}
            </span>
            <span>
              Starships{starships.length ? ` (${starships.length})` : null}:{" "}
              {starships.length > 0 ? starships.join(", ") : "none"}
            </span>
          </p>
          <Link href="/" className="btn btn-primary btn-dark">
            Go home!
          </Link>
        </div>
      </div>
    </div>
  );
}
