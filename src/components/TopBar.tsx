import React from "react";
import {
  AppBar,
  Toolbar,
  InputAdornment,
  IconButton,
  TextField,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Sync as SyncIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

interface TopBarProps {
  onClickMenu: () => void;
  onChangeSearchText: (text: string) => void;
  requestScanGames(): void;
}

export default function TopBar(
  props: TopBarProps
): React.ReactElement<TopBarProps> {
  const classes = useStyles();

  // <AppBar position="sticky" /> is not available at electron
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props.onClickMenu}
          >
            <MenuIcon />
          </IconButton>
          <TextField
            id="search"
            className={classes.title}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => props.onChangeSearchText(e.target.value)}
          />
          <IconButton onClick={props.requestScanGames}>
            <SyncIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
