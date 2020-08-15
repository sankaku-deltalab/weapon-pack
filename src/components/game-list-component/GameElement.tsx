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
}

export default function GameElement(
  props: GameElementProps
): React.ReactElement<GameElementProps> {
  const [gameName, setGameName] = useState(props.game.name);
  const [openMenu, setOpenMenu] = useState(false);
  const [hideGame, setHideGame] = useState(props.game.hide);
  const menuAnchorRef = useRef(null);

  const classes = useStyles();
  const game = props.game;

  const favIcon = (
    <IconButton
      color={game.isFavorite ? "primary" : "default"}
      onClick={() => {
        myAPI.updateGames([{ ...game, isFavorite: !game.isFavorite }]);
        game.isFavorite = !game.isFavorite;
      }}
    >
      {game.isFavorite ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  );

  return (
    <ListItem className={classes.nested} dense divider>
      <ListItemIcon>
        <IconButton color="primary" onClick={() => myAPI.playGame(game.id)}>
          <PlayIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemIcon>{favIcon}</ListItemIcon>
      <TextField
        fullWidth
        value={gameName}
        variant={hideGame ? "filled" : undefined}
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
            console.log("close menu", openMenu);
            setOpenMenu(false);
          }}
        >
          <MenuItem
            key={"toggle-hide-game"}
            onClick={() => {
              myAPI.updateGames([{ ...game, hide: !hideGame }]);
              setHideGame(!hideGame);
              game.hide = !game.hide;
            }}
          >
            {hideGame ? "un-hide" : "hide"}
          </MenuItem>
        </Menu>
      </ListItemIcon>
    </ListItem>
  );
}
