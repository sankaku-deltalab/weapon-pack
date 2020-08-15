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

  useEffect(() => {
    const f = async () => {
      const newGames = await loadGames();
      setGames(newGames);
    };
    f();
  }, [games]);

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
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
      </ThemeProvider>
    </div>
  );
}

export default App;
