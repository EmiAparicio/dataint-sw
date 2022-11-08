export default function Loading({ loading, errorStyle, infoType, display }) {
  // loading: condition to show "loading", data or "not found"
  // errorStyle: styles for text
  // infoType: text describing data being loaded
  // display: data to be displayed
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
