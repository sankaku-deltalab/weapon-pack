import React, { useState, useEffect } from "react";
import { List, Card, makeStyles } from "@material-ui/core";
import { GameGroupElement } from "./game-list-component";
import { GameInfo } from "../../@types/save";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

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

interface GameListProps {
  games: GameInfo[];
  showAllGames: boolean;
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
    <Card>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        {gameGroups.map((group) => {
          return (
            <GameGroupElement
              key={group.id}
              group={group}
              showAllGames={props.showAllGames}
            />
          );
        })}
      </List>
    </Card>
  );
}
