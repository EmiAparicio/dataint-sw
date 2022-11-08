export default function Loading({ loading, errorStyle, infoType, display }) {
  return (
    <>
      {loading ? (
        <>
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">LoadingSpinner</span>
          </div>
          <h2 className={`${errorStyle}`}>Loading...</h2>
        </>
      ) : (
        display || <h2 className={`${errorStyle}`}>{infoType} not found!</h2>
      )}
    </>
  );
}
