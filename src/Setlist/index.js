import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';
import ErrorMessage from '../Error';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

const styles = theme => ({
    root: {
    },
    table: {
        minWidth: '100%',
    },
});

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

const Setlist = ({ setlist, id, setRating, classes }) => (
    <div key={`setlist${id}`}>
        <br />
        <Paper className={classes.root}>
            <h4 className="trackList">{setlist.encore ? "Encore" : `Setlist ${id + 1}`}</h4>
            <List>
                {setlist.song.map((song, index) => (
                    <Query
                        query={GET_TRACKS}
                        variables={{
                            q: `${song.name}`,
                            limit: "1",
                        }}
                        skip={true}
                        key={`query${index}`}
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
                                    <ListItem key={index}>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                        <ListItemText primary={song.name} secondary={song.cover ? ` (by ${song.cover.name})` : ""} />
                                    </ListItem>
                                );
                            }

                            return (
                                <ListItem key={index}>
                                    <Avatar>
                                        <img src={data.searchTracks.tracks.items[0].album.images[0].url} alt={data.searchTracks.tracks.items[0].album.name} height="40" width="40" />
                                    </Avatar>
                                    <ListItemText primary={song.name} secondary={song.cover ? ` (by ${song.cover.name})` : data.searchTracks.tracks.items[0].album.name} />
                                </ListItem>
                            );
                        }}
                    </Query>
                ))}
            </List>
        </Paper>
    </div>
);

Setlist.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Setlist);