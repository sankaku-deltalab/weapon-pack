import React, { useState, useRef } from "react";
import {
  ListItem,
  ListItemIcon,
  makeStyles,
  IconButton,
  TextField,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  PlayArrow as PlayIcon,
  MoreVert as MoreVertIcon,
} from "@material-ui/icons";
import { GameInfo } from "../../../@types/save";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const { myAPI } = window;

interface GameElementProps {
  game: GameInfo;
  showAllGames: boolean;
  requestUpdateGame: (game: GameInfo) => Promise<void>;
}

export default function GameElement(
  props: GameElementProps
): React.ReactElement<GameElementProps> {
  const [openMenu, setOpenMenu] = useState(false);
  const [gameView, setGameView] = useState(props.game);
  const menuAnchorRef = useRef(null);

  const updateRealGame = (newGame: GameInfo) => {
    props.requestUpdateGame(newGame);
  };

  const classes = useStyles();

  const favIcon = (
    <IconButton
      color={gameView.isFavorite ? "primary" : "default"}
      onClick={() => {
        const newGame = { ...gameView, isFavorite: !gameView.isFavorite };
        setGameView(newGame);
        updateRealGame(newGame);
      }}
    >
      {gameView.isFavorite ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  );

  return (
    <ListItem className={classes.nested} dense divider>
      <ListItemIcon>
        <IconButton color="primary" onClick={() => myAPI.playGame(gameView.id)}>
          <PlayIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemIcon>{favIcon}</ListItemIcon>
      <TextField
        fullWidth
        value={gameView.name}
        variant={gameView.hide ? "filled" : undefined}
        onChange={(e) => {
          const newGame = { ...gameView, name: e.target.value };
          setGameView(newGame);
        }}
        onKeyDown={(e) => {
          if (e.keyCode !== 13) return;
          updateRealGame(gameView);
        }}
        onBlur={(e) => {
          updateRealGame(gameView);
        }}
      />
      <ListItemIcon>
        <IconButton onClick={() => setOpenMenu(true)}>
          <MoreVertIcon ref={menuAnchorRef} />
        </IconButton>
        <Menu
          id="lock-menu"
          anchorEl={menuAnchorRef.current}
          keepMounted
          open={openMenu}
          onClose={() => {
            setOpenMenu(false);
          }}
        >
          <MenuItem
            key={"toggle-hide-game"}
            onClick={() => {
              const newGame = { ...gameView, hide: !gameView.hide };
              setGameView(newGame);
              updateRealGame(newGame);
            }}
          >
            {gameView.hide ? "un-hide" : "hide"}
          </MenuItem>
        </Menu>
      </ListItemIcon>
    </ListItem>
  );
}
