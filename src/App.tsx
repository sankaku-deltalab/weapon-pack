import React, { useState } from "react";
import "./App.css";
import { TopBar, SideBar, GameList } from "./components";
import { GameGroup } from "./interfaces";

const gameGroups: GameGroup[] = [
  {
    id: "g1",
    name: "group1",
    games: [
      {
        name: "game1-1",
        absPath: "/c/d1.exe",
        fav: false,
        tags: [],
      },
      {
        name: "game1-2",
        absPath: "/c/d2.exe",
        fav: true,
        tags: ["tag1", "tag2"],
      },
    ],
  },
  {
    id: "g2",
    name: "group2",
    games: [
      {
        name: "game2-1",
        absPath: "/e/d1.exe",
        fav: false,
        tags: [],
      },
      {
        name: "game2-2",
        absPath: "/e/d2.exe",
        fav: true,
        tags: ["tag1", "tag2"],
      },
    ],
  },
];

function App() {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div className="App">
      <TopBar onClickMenu={() => setOpenSideBar(true)} />
      <SideBar open={openSideBar} requestClose={() => setOpenSideBar(false)} />
      <div>
        <GameList groups={gameGroups} />
      </div>
    </div>
  );
}

export default App;
