import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../Loading';
import ErrorMessage from '../Error';
import Navigation from '../Navigation';
import Rating from '../Rating';
import { setlistClient } from '../index';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

// Testing purposes
import testEventData from '../test_event_data.json';

import './Event.css';

const styles = theme => ({
    root: {
    },
    table: {
        minWidth: '100%',
    },
});

// Query setlist id
const GET_EVENT = gql`
    query event($path: String!) {
        event @rest(type: "Event", path: $path) {
            tour @type(name: "tour"){
                name
            }
        }
    }
`;

const GET_TRACKS = gql`
    query($q: String!, $limit: String!) {
        searchTracks(q: $q, limit: $limit) {
            tracks {
                items {
                    artists {
                        name
                    }
                    name
                    album {
                        images {
                            url
                        }
                    }
                    popularity
                }
            }
        }
    }
`;

// TODO Query seatgeek for artist popularity score
// TODO Do something about 'No Tour Assigned' tour name
// ? TODO Link artist to MusicBrainz Website (mbid)
// TODO Rating Dictionary UI
// TODO Remove material ui styles, use css files
class Event extends Component {

    render() {
        const { id } = this.props.match.params;
        const { classes } = this.props;

        return (
            <div>
                <Navigation />
                <Query
                    query={GET_EVENT}
                    variables={{
                        path: `setlist/${id}`,
                    }}
                    skip={true}
                    client={setlistClient}
                >
                    {({ data, loading, error }) => {
                        if (loading) {
                            return <Loading />;
                        }

                        if (error) {
                            console.log("error", error)
                            return <ErrorMessage error={error} />;
                        }

                        // Testing purposes
                        data = {};
                        data.event = testEventData;

                        console.log("event data", data);

                        return (
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container justify="space-around">
                                        <Grid key={1} item>
                                            <h1>{data.event.tour.name}</h1>
                                            <h2>{data.event.artist.name}</h2>
                                            <h3>{data.event.venue.name}, {data.event.venue.city.name}, {data.event.venue.city.state}</h3>
                                            <Rating emoji="no" number="2" />
                                        </Grid>
                                        <Grid key={2} item>
                                            {data.event.sets.set.map((setlist, index) => (
                                                <div key={`setlist${index}`}>
                                                    <br />
                                                    <Paper className={classes.root}>
                                                        <h4 className="trackList">{setlist.encore ? "Encore" : `Setlist ${index + 1}`}</h4>
                                                        <List>
                                                            {setlist.song.map((song, index) => (
                                                                <Query
                                                                    query={GET_TRACKS}
                                                                    variables={{
                                                                        q: `${song.name}`,
                                                                        limit: "1",
                                                                    }}
                                                                >
                                                                    {({ data, loading, error }) => {
                                                                        if (loading) {
                                                                            return <Loading />;
                                                                        }

                                                                        if (error) {
                                                                            console.log("error", error)
                                                                            return <ErrorMessage error={error} />;
                                                                        }

                                                                        console.log("track data", data);

                                                                        if (!data) {
                                                                            return (
                                                                                song.name
                                                                            );
                                                                        }

                                                                        // TODO Display album name
                                                                        // TODO Default album image <ImageIcon />
                                                                        return (
                                                                            <ListItem key={index}>
                                                                                <Avatar>
                                                                                    <img src={data.searchTracks.tracks.items[0].album.images[0].url} alt={data.searchTracks.tracks.items[0].album.name} height="40" width="40" />
                                                                                </Avatar>
                                                                                <ListItemText primary={song.name} secondary={song.cover ? ` (by ${song.cover.name})` : ""} />
                                                                            </ListItem>
                                                                        );
                                                                    }}
                                                                </Query>
                                                            ))}
                                                        </List>
                                                    </Paper>
                                                </div>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    }}
                </Query>
            </div>
        );
    }
};

Event.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Event);