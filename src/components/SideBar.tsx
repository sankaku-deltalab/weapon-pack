import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { MoveToInbox as InboxIcon } from "@material-ui/icons";

interface SideBarProps {
  open: boolean;
  requestClose: () => void;
  requestOpenRootDirectoryDialog: () => void;
}

export default function SideBar(
  props: SideBarProps
): React.ReactElement<SideBarProps> {
  return (
    <Drawer open={props.open} onClose={props.requestClose}>
      <List>
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
      </List>
    </Drawer>
  );
}
