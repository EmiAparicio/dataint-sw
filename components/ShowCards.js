import styles from "../styles/ShowCards.module.css";
import Loading from "./Loading";

export default function ShowCards({ loading, data, infoType }) {
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
      <Loading
        loading={loading}
        errorStyle={styles.error}
        infoType={infoType}
        display={display}
      />
    </div>
  );
}
