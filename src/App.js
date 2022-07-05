import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
  const [animeList, SetAnimeList] = useState([]);
  const [TopAnime, SetTopAnime] = useState([]);
  const [search, SetSearch] = useState("");

  const GetTopAnime = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=1`
    )
      .then((res) => res.json())
      .catch((e) => {
        return e;
      });
    SetTopAnime(temp.data.slice(0, 5));
  };

  const HandleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    FetchAnime(search); 
  };

  const FetchAnime = async (query) => {
    const temp = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=100`
    ).then((res) => res.json());

    SetAnimeList(temp.results);
  };

  useEffect(() => {
    GetTopAnime();
  }, []);

  return (
    <div className="App">
      <Header />

      <div className="content-wrap">
        <Sidebar topAnime={TopAnime} />
        <MainContent
          HandleSearch={HandleSearch}
          search={search}
          SetSearch={SetSearch}
          animeList={animeList}
        />
      </div>
    </div>
  );
}

export default App;
