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
  }, [games]);

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
        />
        <RootDirectoryDialog
          open={openEditRoot}
          requestCloseSelf={() => setOpenEditRoot(false)}
          onRootsChanged={async () => {
            const newGames = await loadGames();
            setGames(newGames);
          }}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
