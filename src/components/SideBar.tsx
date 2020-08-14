import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { MoveToInbox as InboxIcon, Mail as MailIcon } from "@material-ui/icons";

interface SideBar {
  open: boolean;
  requestClose: () => void;
}

export default function SideBar(props: SideBar): React.ReactElement<SideBar> {
  return (
    <Drawer open={props.open} onClose={props.requestClose}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
