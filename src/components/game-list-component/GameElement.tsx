import React, { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  makeStyles,
  IconButton,
  TextField,
} from "@material-ui/core";
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  PlayArrow as PlayIcon,
} from "@material-ui/icons";
import { GameInfo } from "../../../@types/save";

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

interface GameElementProps {
  game: GameInfo;
}

export default function GameElement(
  props: GameElementProps
): React.ReactElement<GameElementProps> {
  const [gameName, setGameName] = useState(props.game.name);

  const classes = useStyles();

  const game = props.game;
  return (
    <ListItem className={classes.nested}>
      <ListItemIcon>
        <IconButton color="primary" onClick={() => myAPI.playGame(game.id)}>
          <PlayIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemIcon>
        <IconButton
          color={game.isFavorite ? "primary" : "default"}
          onClick={() => {
            myAPI.updateGames([{ ...game, isFavorite: !game.isFavorite }]);
            game.isFavorite = !game.isFavorite;
          }}
        >
          {game.isFavorite ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      </ListItemIcon>
      <TextField
        fullWidth
        value={gameName}
        onChange={(e) => {
          const name = e.target.value;
          setGameName(name);
        }}
        onKeyDown={(e) => {
          if (e.keyCode !== 13) return;
          myAPI.updateGames([{ ...game, name: gameName }]);
          game.name = gameName;
        }}
        onBlur={(e) => {
          if (gameName === game.name) return;
          myAPI.updateGames([{ ...game, name: gameName }]);
          game.name = gameName;
        }}
      />
    </ListItem>
  );
}
