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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Testing purposes
import testEventData from '../test_event_data.json';

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

const GET_TRACK = gql`
    query track($path: String!) {
        tracks @rest(type: "Tracks", path: $path) {
            tracks @type(name: "Tracks") {
                items @type(name: "track") {
                    popularity
                    href
                    uri
                    id
                    album @type(name: "album") {
                        name
                        images @type(name: "album_images") {
                            url
                        }
                    }
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
                        if (error) {
                            console.log("error", error)
                            return <ErrorMessage error={error} />;
                        }

                        // Testing purposes
                        data = {};
                        data.event = testEventData;

                        console.log("event data", data);

                        if (loading) {
                            return <Loading />;
                        }

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
                                                        <Table className={classes.table}>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>{setlist.encore ? "Encore" : `Setlist ${index + 1}`}</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {setlist.song.map((song, index) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell component="th" scope="row">
                                                                            {/* <img src={data.tracks.tracks.items[0].album.images[0].url} alt={data.tracks.tracks.items[0].album.name} height="40" width="40" /> */}
                                                                            {song.name}
                                                                            {song.cover ? "cover" : ""}
                                                                        </TableCell>
                                                                        {/*<Query
                                                                            query={GET_TRACK}
                                                                            variables={{
                                                                                path: `search?q=${song.name}+${song.cover ? song.cover.name : data.event.artist.name}&type=track&limit=1`,
                                                                            }}
                                                                            client={spotifyClient}
                                                                        >
                                                                            {({ data, loading, error }) => {
                                                                                if (error) {
                                                                                    console.log("error", error)
                                                                                    return <ErrorMessage error={error} />;
                                                                                }

                                                                                console.log("track data", data);

                                                                                if (loading) {
                                                                                    return <Loading />;
                                                                                }

                                                                                if (!data) {
                                                                                    return (
                                                                                        <TableCell component="th" scope="row">
                                                                                            {song.name}
                                                                                        </TableCell>
                                                                                    );
                                                                                }

                                                                                return (
                                                                                    <TableCell component="th" scope="row">
                                                                                        <img src={data.tracks.tracks.items[0].album.images[0].url} alt={data.tracks.tracks.items[0].album.name} height="40" width="40" />
                                                                                        {song.name}
                                                                                        {song.cover ? "cover" : ""}
                                                                                    </TableCell>
                                                                                );
                                                                            }}
                                                                        </Query>*/}
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
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