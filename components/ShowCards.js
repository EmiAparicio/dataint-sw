import styles from "../styles/ShowCards.module.css";
import Loading from "./Loading";

export default function ShowCards({ loading, data, infoType }) {
  // Data to be displayed depending on pagination
  const display =
    data.length !== 0
      ? data.map((char, i) => {
          return (
            <div key={i} className={styles.card}>
              {char.name}
            </div>
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
