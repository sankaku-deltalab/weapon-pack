import React from "react";
import {
  AppBar,
  Toolbar,
  InputAdornment,
  IconButton,
  TextField,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

interface TopBarProps {
  onClickMenu: () => void;
  onChangeSearchText: (text: string) => void;
}

export default function TopBar(
  props: TopBarProps
): React.ReactElement<TopBarProps> {
  return (
    <div>
      <AppBar position="static">
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => props.onChangeSearchText(e.target.value)}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
