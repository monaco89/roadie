import React, { Component } from 'react';
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
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';

import "./setlist.css";

const styles = theme => ({
    root: {
    },
    table: {
        minWidth: '100%',
    },
    button: {
        margin: theme.spacing.unit,
    },
});

// const GET_TRACK = gql`
//     query($q: String!, $limit: String!) {
//         searchTracks(q: $q, limit: $limit) {
//             tracks {
//                 items {
//                     artists {
//                         name
//                     }
//                     name
//                     album {
//                         images {
//                             url
//                         }
//                     }
//                     popularity
//                 }
//             }
//         }
//     }
// `;

const GET_TRACKS = gql`
    query($q: [String!]) {
        searchMultipleTracks(q: $q) {
            tracks {
                items {
                    artists {
                        name
                    }
                    name
                    album {
                        name
                        images {
                            url
                        }
                    }
                    popularity
                    duration_ms
                    spotify_url
                }
            }
            meta {
                rating
            }
        }
    }
`;

class Setlist extends Component {
    state = {
        q: '',
    };

    componentDidMount() {
        const { setlist, artist } = this.props;

        const q = setlist.song.map((track) => {
            return track.cover ? track.name + ' ' + track.cover.name : track.name + ' ' + artist;
        });

        this.setState({ q: q });
    }

    render() {
        const { setlist, artist, id, classes, renderRating } = this.props;
        const { q } = this.state;

        return (
            <div key={`setlist${id}`}>
                <Query
                    query={GET_TRACKS}
                    variables={{
                        q: q,
                    }}
                    skip={q === ''}
                >
                    {({ data, loading, error }) => {
                        if (loading) {
                            return <Loading />;
                        }

                        if (error) {
                            console.log("error", error)
                            return <ErrorMessage error={error} />;
                        }

                        if (!data || !data.searchMultipleTracks[0]) {
                            return <p>Couldn't load {setlist.encore ? "Encore" : `Setlist ${id + 1}`}</p>
                        }

                        return <Paper className={classes.root}>
                            <h2 className="trackList">{setlist.encore ? "Encore" : `Setlist ${id + 1}`}</h2>
                            <List className="setlistList">
                                <ListSubheader>Duration: {Math.floor(data.searchMultipleTracks.reduce((total, song) => {
                                    return total += song.tracks.items[0].duration_ms
                                }, 0) / 60000)} minutes
                                </ListSubheader>
                                {data.searchMultipleTracks[0] ? renderRating(data.searchMultipleTracks.length, data.searchMultipleTracks[0].meta.rating, "h2") : ''}
                                {data.searchMultipleTracks.map((song, index) => (
                                    <ListItem key={index}>
                                        <Avatar>
                                            {
                                                song.tracks.items[0].album.images[0].url ?
                                                    (<img src={song.tracks.items[0].album.images[0].url}
                                                        alt={song.tracks.items[0].album.name}
                                                        height="40"
                                                        width="40"
                                                    />) : <ImageIcon />
                                            }
                                        </Avatar>
                                        <ListItemText
                                            primary={song.tracks.items[0].name}
                                            secondary={song.tracks.items[0].artists[0].name !== artist ?
                                                ` (by ${song.tracks.items[0].artists[0].name})` : song.tracks.items[0].album.name}
                                        />
                                        <Button variant="outlined" href={song.tracks.items[0].spotify_url} className="button">
                                            View on Spotify
                                        </Button>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>;
                    }}
                </Query>
            </div>
        );
    }
}

Setlist.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Setlist);