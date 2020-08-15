import React, { useState, useEffect } from "react";
import "./App.css";
import { TopBar, SideBar, GameList, RootDirectoryDialog } from "./components";
import { GameGroup } from "./interfaces";

const { myAPI } = window;

const loadGameGroups = async (): Promise<GameGroup[]> => {
  const games = await myAPI.loadGames();
  // TODO: Use fav only now
  const favGames = games.filter((g) => g.isFavorite);
  const nonFavGames = games.filter((g) => !g.isFavorite);
  return [
    {
      id: "fav",
      name: "fav",
      games: favGames,
    },
    {
      id: "non-fav",
      name: "non-fav",
      games: nonFavGames,
    },
  ];
};

function App() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openEditRoot, setOpenEditRoot] = useState(false);
  const [gameGroups, setGameGroups] = useState<GameGroup[]>([]);

  useEffect(() => {
    const f = async () => {
      const groups = await loadGameGroups();
      setGameGroups(groups);
    };
    f();
  }, []);

  return (
    <div className="App">
      <TopBar onClickMenu={() => setOpenSideBar(true)} />
      <SideBar
        open={openSideBar}
        requestClose={() => setOpenSideBar(false)}
        requestOpenRootDirectoryDialog={() => setOpenEditRoot(true)}
      />
      <div>
        <GameList groups={gameGroups} />
      </div>
      <RootDirectoryDialog
        open={openEditRoot}
        requestCloseSelf={() => setOpenEditRoot(false)}
        onRootsChanged={async () => {
          const groups = await loadGameGroups();
          setGameGroups(groups);
        }}
      />
    </div>
  );
}

export default App;
