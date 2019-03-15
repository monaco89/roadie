import React from "react";
import moment from "moment";

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

const EventTeaser = ({ event }) => (
  <ListItem>
    {/* // TODO Show date in avatar */}
    {/*<Avatar>{event.eventDate}</Avatar>*/}
    <ListItemText
      primary={
        event.name.length > 40
          ? event.name.substr(0, 37) + "..." + event.artist.name
          : event.name + " -- " + event.artist.name
      }
      secondary={`${moment(event.date, "DD-MM-YYYY").format("MMM DD YYYY")}, ${
        event.venue.city.name
      } ${event.venue.city.stateCode}`}
    />
    <Button variant="outlined" href={`./${event.id}`} className="button">
      View Event
    </Button>
  </ListItem>
);

export default withStyles(styles)(EventTeaser);
