import Head from "next/head";
import styles from "../styles/Home.module.css";
import Axios from "axios";
import { useState } from "react";
import SearchInput from "../components/SearchInput";
import ShowCards from "../components/ShowCards";
import Pagination from "../components/Pagination";

// SSR Fetching with AXIOS
export async function getServerSideProps() {
  // First page of characters is fetched
  const resp = await Axios.get("https://swapi.dev/api/people/");
  const data = resp.data;

  return {
    props: {
      chars: data.results,
      curPage: 1,
      pages: Math.ceil(data.count / 10),
      prev: data.previous || null,
      next: data.next || null,
    },
  };
}

// APP Landing page
export default function Home({ chars, curPage, pages, prev, next }) {
  // Set displaying information in page local state
  const [page, setPage] = useState({
    chars,
    curPage,
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
        curPage,
        pages,
        prev,
        next,
        loading: false,
      });
      return;
    }

    // Fetch character by name with inputValue coming from parameters
    const resp = await Axios.get(
      `https://swapi.dev/api/people/?search=${inputValue}`
    );
    const data = resp.data;

    // Refresh displayed page
    setPage({
      chars: data.results,
      curPage: 1,
      pages: Math.ceil(data.count / 10),
      prev: data.previous || null,
      next: data.next || null,
      loading: false,
    });
  }

  async function handlePageChange(to) {
    // Parameter "to" includes the URL when Previous or Next buttons were pressed.
    // If a page was picked, URL needs to be built
    let fetchUrl = to;
    if (typeof to === "number") {
      fetchUrl = `https://swapi.dev/api/people/?page=${to}`;
    }

    // Fetch characters by page depending on "to" coming from parameters
    const resp = await Axios.get(fetchUrl);
    const data = resp.data;

    // Refresh displayed page
    setPage({
      chars: data.results,
      curPage: 1,
      pages: Math.ceil(data.count / 10),
      prev: data.previous || null,
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

        {page.loading ? (
          <></>
        ) : (
          <Pagination
            pages={page.pages}
            prev={page.prev}
            next={page.next}
            pageChange={(to) => {
              setPage((prev) => ({ ...prev, loading: true }));
              handlePageChange(to);
            }}
          />
        )}

        <ShowCards
          loading={page.loading}
          data={page.chars}
          infoType="Character"
        />
      </main>
    </div>
  );
}
