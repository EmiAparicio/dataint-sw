import styles from "../styles/ShowCards.module.css";

export default function ShowCards({ loading, data, infoType }) {
  return (
    <div className={styles.grid}>
      {loading ? (
        <h2>Loading...</h2>
      ) : data.length !== 0 ? (
        data.map((char, i) => {
          return (
            <div key={i} className={styles.card}>
              {char.name}
            </div>
          );
        })
      ) : (
        <h2>{infoType} not found!</h2>
      )}
    </div>
  );
}
