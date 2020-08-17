import React, { useState, useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import "./App.css";
import { TopBar, SideBar, GameList, RootDirectoryDialog } from "./components";
import { GameInfo } from "../@types/save";

const { myAPI } = window;

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const loadGames = async (): Promise<GameInfo[]> => {
  return await myAPI.loadGames();
};

function App() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openEditRoot, setOpenEditRoot] = useState(false);
  const [games, setGames] = useState<GameInfo[]>([]);
  const [showAllGames, setShowAllGames] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const f = async () => {
      const newGames = await loadGames();
      setGames(newGames);
    };
    f();
  }, []);

  useEffect(() => {
    const f = async () => {
      const roots = await myAPI.loadRootDirectories();
      if (roots.length === 0) {
        setOpenEditRoot(true);
      }
    };
    f();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <TopBar
          onClickMenu={() => setOpenSideBar(true)}
          onChangeSearchText={setSearchText}
          requestScanGames={async () => {
            const newGames = await myAPI.scanGames();
            setGames(newGames);
          }}
        />
        <SideBar
          open={openSideBar}
          requestClose={() => setOpenSideBar(false)}
          requestOpenRootDirectoryDialog={() => setOpenEditRoot(true)}
          showAllGames={showAllGames}
          requestChangeShowAllGames={setShowAllGames}
        />
        <GameList
          games={games}
          showAllGames={showAllGames}
          searchText={searchText}
          requestUpdateGames={async (gs) => {
            const newGames = await myAPI.updateGames(gs);
            setGames(newGames);
          }}
        />
        <RootDirectoryDialog
          open={openEditRoot}
          requestCloseSelf={() => setOpenEditRoot(false)}
          requestScanGames={async () => {
            const newGames = await myAPI.scanGames();
            setGames(newGames);
          }}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
