import Head from "next/head";
import styles from "../styles/Home.module.css";
import Axios from "axios";

// SSR Fetching with AXIOS
export async function getServerSideProps() {
  // First page is fetched
  const resp = await Axios.get("https://swapi.dev/api/people/");

  return {
    props: {
      chars: resp.data.results,
    },
  };
}

// APP Landing page
export default function Home({ chars }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>SW Challenge - DataInt</title>
        <meta
          name="description"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>StarWars Characters</h1>

        <div className={styles.grid}>
          {chars?.map((char, i) => {
            return (
              <div key={i} className={styles.card}>
                {char.name}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
