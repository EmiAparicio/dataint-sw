import Axios from "axios";

// Returns the promise to fetch data
export function promisify(array, preURL) {
  // The array should include urls as strings
  // The "preURL" depends on the desired endpoint to consume from the external API
  return array.map((e) =>
    e.length
      ? Axios.get(`https://swapi.py4e.com/api/${preURL}/${e.split("/").at(-2)}`)
      : null
  );
}
