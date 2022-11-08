// import "../styles/Pagination.css";

export default function Pagination({ curPage, pages, prev, next, pageChange }) {
  // Generate array depending on pages needed
  const pagesNum = pages > 0 ? [...Array(pages).keys()].map((i) => i + 1) : [];

  return (
    <>
      {/* Enable or disable prev and next buttons depending on URL availability.
    Use pageChange as callback from parent. */}
      {pagesNum.length > 0 ? (
        <div aria-label="Search result pages">
          <ul className="pagination">
            {/* Previous Page Button */}
            <li className={!prev ? "page-item disabled" : "page-item"}>
              <a
                className="page-link"
                disabled={!prev}
                onClick={() => (prev ? pageChange(prev) : null)}
              >
                &laquo;
              </a>
            </li>

            {/* Number of Page Button */}
            {pagesNum.map((n) => {
              return (
                <li
                  className={curPage === n ? "page-item active" : "page-item"}
                  key={n}
                >
                  <a className="page-link" onClick={() => pageChange(n)}>
                    {n}
                  </a>
                </li>
              );
            })}

            {/* Next Page Button */}
            <li className={!next ? "page-item disabled" : "page-item"}>
              <a
                className="page-link"
                disabled={!next}
                onClick={() => (next ? pageChange(next) : null)}
              >
                &raquo;
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
