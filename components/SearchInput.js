import { useRef } from "react";

// Basic search form:
// Send a callback (props: cb) to execute on input's value
// Send a placeholder (props: toSearch) to customization
export default function SearchInput({ cb, toSearch }) {
  const inputRef = useRef();

  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="search"
          className="form-control"
          ref={inputRef}
          placeholder={`Search ${toSearch}`}
        />
        <button
          className="btn btn-outline-secondary btn-light"
          type="button"
          id="button-addon2"
          onClick={(e) => {
            e.preventDefault();
            cb(inputRef.current.value);
          }}
        >
          Go!
        </button>
      </div>
    </div>
  );
}
