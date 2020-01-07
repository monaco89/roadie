import React from "react";

import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const Song = ({ song, artist }) => (
  <ListItem>
    <Avatar>
      {song.tracks.items[0].album.images[0].url ? (
        <img
          src={song.tracks.items[0].album.images[0].url}
          alt={song.tracks.items[0].album.name}
          height="40"
          width="40"
        />
      ) : (
        <ImageIcon />
      )}
    </Avatar>
    <ListItemText
      primary={
        song.tracks.items[0].name.length > 55
          ? song.tracks.items[0].name.substr(0, 52) + "..."
          : song.tracks.items[0].name
      }
      secondary={
        song.tracks.items[0].artists[0].name !== artist
          ? ` (cover by ${song.tracks.items[0].artists[0].name})`
          : song.tracks.items[0].album.name
      }
    />
    <Button
      variant="outlined"
      href={song.tracks.items[0].spotify_url}
      className="button"
    >
      View on Spotify
    </Button>
  </ListItem>
);

export default withStyles(styles)(Song);
