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

const createGroup = (
  id: string,
  name: string,
  games: GameInfo[],
  filter: (g: GameInfo) => boolean
): GameGroup => {
  return {
    id,
    name,
    games: games.filter(filter),
  };
};

const createGroups = (games: GameInfo[]): GameGroup[] => {
  const favGroup = createGroup("fav", "fav", games, (g) => g.isFavorite);
  const tags = Array.from(new Set<string>(games.map((g) => g.tags).flat()));
  const tagGroups = tags.map((tag) =>
    createGroup(`tag-${tag}`, `${tag}`, games, (g) => g.tags.includes(tag))
  );
  const nonTagGroup = createGroup(
    "non-tag",
    "non-tag",
    games,
    (g) => g.tags.length === 0
  );
  return [favGroup, ...tagGroups, nonTagGroup];
};

interface GameListProps {
  games: GameInfo[];
  showAllGames: boolean;
  searchText: string;
  requestUpdateGames: (games: GameInfo[]) => Promise<void>;
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
              searchText={props.searchText}
              requestUpdateGames={props.requestUpdateGames}
            />
          );
        })}
      </List>
    </Card>
  );
}
