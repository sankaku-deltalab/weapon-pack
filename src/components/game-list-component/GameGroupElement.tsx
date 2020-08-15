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
}

export default function GameGroupElement(
  props: GameGroupElementProps
): React.ReactElement<GameGroupElementProps> {
  const [open, setOpen] = React.useState(true);

  const group = props.group;
  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemText primary={group.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse key={group.id} in={open} timeout="auto">
        <List component="div" disablePadding>
          {group.games.map((game) => (
            <GameElement game={game} />
          ))}
        </List>
      </Collapse>
    </>
  );
}
