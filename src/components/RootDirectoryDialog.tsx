import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import * as path from "path";

const { myAPI } = window;

const submitDirs = (text: string) => {
  const dirs = text.split(/\r\n|\n/);
  const roots = dirs
    .filter((d) => path.isAbsolute(d))
    .map((d) => ({
      absPath: d,
    }));
  myAPI.saveRootDirectories(roots);
};

interface RootDirectoryDialogProps {
  open: boolean;
  requestCloseSelf: () => void;
  onRootsChanged: () => void;
}

export default function RootDirectoryDialog(
  props: RootDirectoryDialogProps
): React.ReactElement<RootDirectoryDialogProps> {
  const [text, setText] = useState("");

  useEffect(() => {
    const f = async () => {
      const roots = await myAPI.loadRootDirectories();
      setText(roots.map((r) => r.absPath).join("\n"));
    };
    f();
  }, []);

  const submit = async (text: string) => {
    submitDirs(text);
    await myAPI.scanGames();
    props.onRootsChanged();
    props.requestCloseSelf();
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.requestCloseSelf}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Add directories you containing games
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          multiline
          margin="dense"
          id="name"
          label="Directories"
          fullWidth
          placeholder={
            "C:\\Users\\You\\Documents\\itch.io\nC:\\Users\\You\\Documents\\Playism"
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.requestCloseSelf} color="primary">
          Cancel
        </Button>
        <Button onClick={() => submit(text)} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
