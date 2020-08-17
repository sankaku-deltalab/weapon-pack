import React from "react";
import { List, ListItem, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import GameElement from "./GameElement";
import { GameInfo } from "../../../@types/save";

export interface GameGroup {
  id: string;
  name: string;
  games: GameInfo[];
}

interface GameGroupElementProps {
  group: GameGroup;
  showAllGames: boolean;
  searchText: string;
  requestUpdateGames: (games: GameInfo[]) => Promise<void>;
}

export default function GameGroupElement(
  props: GameGroupElementProps
): React.ReactElement<GameGroupElementProps> {
  const [open, setOpen] = React.useState(true);
  const showGame = (g: GameInfo) =>
    (props.showAllGames || !g.hide) &&
    g.name.toLowerCase().includes(props.searchText.toLowerCase());

  const group = props.group;
  return (
    <>
      <ListItem button key={`${group.id}/root`} onClick={() => setOpen(!open)}>
        <ListItemText primary={group.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse key={`${group.id}/child`} in={open} timeout="auto">
        <List component="div" disablePadding>
          {group.games
            .filter((g) => showGame(g))
            .map((game) => (
              <GameElement
                key={game.id}
                game={game}
                showAllGames={props.showAllGames}
                requestUpdateGame={(g) => props.requestUpdateGames([g])}
              />
            ))}
        </List>
      </Collapse>
    </>
  );
}
