import { useRef } from "react";

// Basic search form:
// Send a callback (props: cb) to execute on input's value
// Send a placeholder (props: toSearch) to customization
export default function SearchInput({ cb, toSearch }) {
  const inputRef = useRef();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        cb(inputRef.current.value);
      }}
    >
      <input ref={inputRef} type="search" placeholder={`Search ${toSearch}`} />
      <button>Go!</button>
    </form>
  );
}
