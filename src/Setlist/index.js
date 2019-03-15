import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading from "../Loading";
import ErrorMessage from "../Error";
import Song from "../Song";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

import "./setlist.css";

const styles = theme => ({
  root: {},
  table: {
    minWidth: "100%"
  }
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
    q: ""
  };

  componentDidMount() {
    const { setlist, artist } = this.props;

    const q = setlist.song.map(track => {
      return track.cover
        ? track.name + " " + track.cover.name
        : track.name + " " + artist;
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
            q: q
          }}
          skip={q === ""}
        >
          {({ data, loading, error }) => {
            if (loading) {
              return <Loading />;
            }

            if (error) {
              console.log("error", error);
              return <ErrorMessage error={error} />;
            }

            if (!data || !data.searchMultipleTracks[0]) {
              return (
                <p>
                  Couldn't load{" "}
                  {setlist.encore ? "Encore" : `Setlist ${id + 1}`}
                </p>
              );
            }

            return (
              <Paper className={classes.root}>
                <h2 className="trackList">
                  {setlist.encore ? "Encore" : `Setlist ${id + 1}`}
                </h2>
                <List className="setlistList">
                  <ListSubheader>
                    Duration:{" "}
                    {Math.floor(
                      data.searchMultipleTracks.reduce((total, song) => {
                        return (total += song.tracks.items[0].duration_ms);
                      }, 0) / 60000
                    )}{" "}
                    minutes
                  </ListSubheader>
                  {data.searchMultipleTracks[0]
                    ? renderRating(
                        data.searchMultipleTracks.length,
                        data.searchMultipleTracks[0].meta.rating,
                        "h2"
                      )
                    : ""}
                  {data.searchMultipleTracks.map((song, index) => (
                    <Song song={song} key={index} artist={artist} />
                  ))}
                </List>
              </Paper>
            );
          }}
        </Query>
      </div>
    );
  }
}

Setlist.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Setlist);
