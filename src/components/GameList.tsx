import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  ListItemText,
  Collapse,
  IconButton,
} from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  PlayArrow as PlayIcon,
} from "@material-ui/icons";
import { GameInfo } from "../../@types/save";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const { myAPI } = window;

export interface GameGroup {
  id: string;
  name: string;
  games: GameInfo[];
}

const createGroups = (games: GameInfo[]): GameGroup[] => {
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
        <ListItemText primary={group.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {group.games.map((game) => {
        return (
          <Collapse key={game.id} in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemIcon>
                  <IconButton
                    color="primary"
                    onClick={() => myAPI.playGame(game.id)}
                  >
                    <PlayIcon />
                  </IconButton>
                </ListItemIcon>
                <ListItemIcon>
                  <IconButton
                    color={game.isFavorite ? "primary" : "default"}
                    onClick={() => {
                      myAPI.updateGames([
                        { ...game, isFavorite: !game.isFavorite },
                      ]);
                      game.isFavorite = !game.isFavorite;
                    }}
                  >
                    {game.isFavorite ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </ListItemIcon>
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
  games: GameInfo[];
}

export default function GameList(
  props: GameListProps
): React.ReactElement<GameListProps> {
  const classes = useStyles();

  const [gameGroups, setGameGroups] = useState<GameGroup[]>([]);

  useEffect(() => {
    setGameGroups(createGroups(props.games));
  }, [props.games]);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {gameGroups.map((group) => {
        return <GameGroupElement key={group.id} group={group} />;
      })}
    </List>
  );
}
