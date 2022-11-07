import Head from "next/head";
import styles from "../styles/Home.module.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import ShowCards from "../components/ShowCards";

// SSR Fetching with AXIOS
export async function getServerSideProps() {
  // First page is fetched
  const resp = await Axios.get("https://swapi.dev/api/people/");
  const data = resp.data;

  return {
    props: {
      chars: data.results,
      pages: Math.ceil(data.count / data.results.length),
      prev: data.prev || null,
      next: data.next || null,
    },
  };
}

// APP Landing page
export default function Home({ chars, pages, prev, next }) {
  // Set displaying information in page local state
  const [page, setPage] = useState({
    chars,
    pages,
    prev,
    next,
    loading: false,
  });

  // Searching handler
  async function handleSearch(inputValue) {
    // When cleaning search bar: go back faster to the first page data, which is already stored in props
    if (inputValue.length === 0) {
      setPage({
        chars,
        pages,
        prev,
        next,
        loading: false,
      });
      return;
    }

    // Fetch character by name with inputValue coming from parameters
    const data = await (async () => {
      const resp = await Axios.get(
        `https://swapi.dev/api/people/?search=${inputValue}`
      );
      return resp.data;
    })();

    // Refresh displayed page
    setPage({
      chars: data.results,
      pages: Math.ceil(data.count / data.results.length),
      prev: data.prev || null,
      next: data.next || null,
      loading: false,
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SW Challenge - DataInt</title>
        <meta
          name="description"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>StarWars Characters</h1>

        {/* Send the search input component a function that triggers "loading" screen while founding new data. Add a placeholder to "toSearch" props for customization. */}
        <SearchInput
          cb={(value) => {
            setPage((prev) => ({ ...prev, loading: true }));
            handleSearch(value);
          }}
          toSearch="character"
        />

        <ShowCards
          loading={page.loading}
          data={page.chars}
          infoType="Character"
        />
      </main>
    </div>
  );
}
