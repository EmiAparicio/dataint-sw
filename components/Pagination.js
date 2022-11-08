export default function Pagination({ pages, prev, next, pageChange }) {
  // Generate array depending on pages needed
  const pagesNum = pages > 0 ? [...Array(pages).keys()].map((i) => i + 1) : [];

  return (
    <>
      {/* Enable or disable prev and next buttons depending on URL availability.
    Use pageChange as callback from parent. */}
      {pagesNum.length > 0 ? (
        <div>
          <ul>
            <li>
              <a
                href="#"
                disabled={!prev}
                onClick={() => (prev ? pageChange(prev) : null)}
              >
                &laquo;
              </a>
            </li>
          </ul>
          {pagesNum.map((n) => {
            return (
              <li key={n}>
                <a href="#" onClick={() => pageChange(n)}>
                  {n}
                </a>
              </li>
            );
          })}
          <ul>
            <li>
              <a
                href="#"
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
