import React, { useState, useEffect } from "react";
import "./App.css";
import { TopBar, SideBar, GameList, RootDirectoryDialog } from "./components";
import { GameInfo } from "../@types/save";

const { myAPI } = window;

const loadGames = async (): Promise<GameInfo[]> => {
  return await myAPI.loadGames();
};

function App() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openEditRoot, setOpenEditRoot] = useState(false);
  const [games, setGames] = useState<GameInfo[]>([]);
  const [showAllGames, setShowAllGames] = useState(false);

  useEffect(() => {
    const f = async () => {
      const newGames = await loadGames();
      setGames(newGames);
    };
    f();
  }, [games]);

  return (
    <div className="App">
      <TopBar onClickMenu={() => setOpenSideBar(true)} />
      <SideBar
        open={openSideBar}
        requestClose={() => setOpenSideBar(false)}
        requestOpenRootDirectoryDialog={() => setOpenEditRoot(true)}
        showAllGames={showAllGames}
        requestChangeShowAllGames={setShowAllGames}
      />
      <GameList games={games} showAllGames={showAllGames} />
      <RootDirectoryDialog
        open={openEditRoot}
        requestCloseSelf={() => setOpenEditRoot(false)}
        onRootsChanged={async () => {
          const newGames = await loadGames();
          setGames(newGames);
        }}
      />
    </div>
  );
}

export default App;
