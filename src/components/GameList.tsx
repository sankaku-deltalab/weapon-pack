import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore,
  Star,
  MoveToInbox as InboxIcon,
} from "@material-ui/icons";
import { GameGroup } from "../interfaces";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

interface GameGroupElementProps {
  group: GameGroup;
}

const GameGroupElement = (
  props: GameGroupElementProps
): React.ReactElement<GameGroupElementProps> => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const group = props.group;
  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={group.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {group.games.map((game) => {
        return (
          <Collapse key={game.absPath} in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => window.myAPI.executeGame(game.absPath)}
              >
                <ListItemIcon>{game.fav ? <Star /> : <></>}</ListItemIcon>
                <ListItemText primary={game.name} />
              </ListItem>
            </List>
          </Collapse>
        );
      })}
    </>
  );
};

interface GameListProps {
  groups: GameGroup[];
}

export default function GameList(
  props: GameListProps
): React.ReactElement<GameListProps> {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {props.groups.map((group) => {
        return <GameGroupElement key={group.id} group={group} />;
      })}
    </List>
  );
}