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
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

const styles = theme => ({
    root: {
    },
    table: {
        minWidth: '100%',
    },
});

const GET_TRACK = gql`
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
                }
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
        })

        this.setState({ q: q });
    }

    render() {
        const { setlist, artist, id, classes } = this.props;
        const { q } = this.state;

        return (
            <div key={`setlist${id}`}>
                <Paper className={classes.root}>
                    <h4 className="trackList">{setlist.encore ? "Encore" : `Setlist ${id + 1}`}</h4>
                    <List>
                        <Query
                            query={GET_TRACKS}
                            variables={{
                                q: q,
                            }}
                            skip={q === ''}
                        >
                            {({ data, loading, error }) => {
                                // TODO Handle no data
                                if (loading || !data) {
                                    return <Loading />;
                                }

                                if (error) {
                                    console.log("error", error)
                                    return <ErrorMessage error={error} />;
                                }

                                console.log("track data", data);

                                return data.searchMultipleTracks.map((song, index) => (
                                    <ListItem key={index}>
                                        <Avatar>
                                            <img src={song.tracks.items[0].album.images[0].url} alt={song.tracks.items[0].album.name} height="40" width="40" />
                                        </Avatar>
                                        <ListItemText primary={song.tracks.items[0].name} secondary={song.tracks.items[0].artists[0].name !== artist ? ` (by ${song.tracks.items[0].artists[0].name})` : song.tracks.items[0].album.name} />
                                    </ListItem>
                                ));
                            }}
                        </Query>
                    </List>
                </Paper>
            </div>
        );
    }
}

Setlist.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Setlist);