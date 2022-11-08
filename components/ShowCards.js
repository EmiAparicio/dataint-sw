import Link from "next/link";
import styles from "../styles/ShowCards.module.css";
import Loading from "./Loading";

export default function ShowCards({ loading, data, infoType }) {
  // Data to be displayed depending on pagination
  const display =
    data.length !== 0
      ? data.map((char, i) => {
          return (
            // Get character id from URL property
            <Link
              href={`/detail/${char.url.split("/").at(-2)}`}
              className={styles.link}
            >
              <div key={i} className={styles.card}>
                {char.name}
              </div>
            </Link>
          );
        })
      : false;

  return (
    <div className={styles.grid}>
      {/* Send loading condition, styles for loading or error text, what info is being loaded, and the data to be displayed */}
      <Loading
        loading={loading}
        errorStyle={styles.error}
        infoType={infoType}
        display={display}
      />
    </div>
  );
}
