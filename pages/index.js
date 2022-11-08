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

  // Use this state to know if a certain URL was used to search characters and allow pagination to follow the obtained data
  const [searchURL, setSearchURL] = useState("");

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
      setSearchURL("");
      return;
    }

    setSearchURL(`https://swapi.dev/api/people/?search=${inputValue}`);

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
    let curPage = to;
    if (typeof to === "number") {
      fetchUrl = `https://swapi.dev/api/people/?page=${to}`;

      // Search + Pagination URL config
      if (searchURL.length) fetchUrl = searchURL + `&page=${to}`;
    } else {
      curPage = Number(to.split("page=").at(-1));
    }

    // Fetch characters by page depending on "to" coming from parameters
    const resp = await Axios.get(fetchUrl);
    const data = resp.data;

    // Refresh displayed page
    setPage({
      chars: data.results,
      curPage,
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
          // Send Pagination Component the current page, the total number of pages, the previous and next pages URLs, and a callback function to control loading texts and handle page changing
          <Pagination
            curPage={page.curPage}
            pages={page.pages}
            prev={page.prev}
            next={page.next}
            pageChange={(to) => {
              setPage((prev) => ({ ...prev, loading: true }));
              handlePageChange(to);
            }}
          />
        )}

        {/* Send ShowCards Component the loading boolean, data to be displayed and its type as a string to control error texts */}
        <ShowCards
          loading={page.loading}
          data={page.chars}
          infoType="Character"
        />
      </main>
    </div>
  );
}
