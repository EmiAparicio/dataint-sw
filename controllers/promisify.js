import Axios from "axios";

// Returns the promise to fetch data
export function promisify(array, preURL) {
  return array.map((e) =>
    e.length
      ? Axios.get(`https://swapi.dev/api/${preURL}/${e.split("/").at(-2)}`)
      : null
  );
}
