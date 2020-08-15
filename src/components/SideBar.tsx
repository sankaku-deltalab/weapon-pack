import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  MoveToInbox as InboxIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from "@material-ui/icons";

interface SideBarProps {
  open: boolean;
  requestClose: () => void;
  requestOpenRootDirectoryDialog: () => void;
  showAllGames: boolean;
  requestChangeShowAllGames: (showAllGames: boolean) => void;
}

export default function SideBar(
  props: SideBarProps
): React.ReactElement<SideBarProps> {
  const setRootsItem = (
    <ListItem
      button
      key="root-directory-dialog"
      onClick={props.requestOpenRootDirectoryDialog}
    >
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary={"Edit root directories"} />
    </ListItem>
  );

  const showAllGamesItem = (
    <ListItem
      button
      key="show-all-games"
      onClick={() => {
        props.requestChangeShowAllGames(!props.showAllGames);
      }}
    >
      <ListItemIcon>
        {props.showAllGames ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      </ListItemIcon>
      <ListItemText primary={"Force show all games"} />
    </ListItem>
  );

  return (
    <Drawer open={props.open} onClose={props.requestClose}>
      <List>
        {setRootsItem}
        {showAllGamesItem}
      </List>
    </Drawer>
  );
}
