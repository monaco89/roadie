import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import moment from 'moment';
import Loading from '../Loading';
import ErrorMessage from '../Error';
import Rating from '../Rating';
import Setlist from '../Setlist';
import { setlistClient } from '../index';

import Grid from '@material-ui/core/Grid';

import './Event.css';

// Query setlist id
const GET_EVENT = gql`
    query event($path: String!) {
        event @rest(type: "Event", path: $path) {
            tour @type(name: "tour") {
                name
            }
            artist @type(name: "artist") {
                name
            }
            sets @type(name: "sets") {
                set @type(name: "set") {
                    song @type(name: "song") {
                        name
                        cover @type(name: "song_cover") {
                            name
                        }
                    }
                    encore
                }
            }
            venue @type(name: "venue") {
                name
                city @type(name: "venue_city") {
                    name
                    state
                }
            }
            eventDate
        }
    }
`;

class Event extends Component {
    state = {
        'score': 0,
    };

    renderRating = (totalSongs = 1, score = 0, el = "h1", emoji = 'no') => {
        const rating = score / totalSongs;

        // TODO Improve Scoring
        if (score >= 90) {
            emoji = 'fire';
        }
        else if (score <= 89 && score >= 75) {
            emoji = 'slaps';
        }
        else if (score <= 74) {
            emoji = 'idk';
        }
        else if (score === 0) {
            console.log("error showing rating or event was a dumpster fire");
        }

        const count = rating.toString().split('').pop() === '0' ? 1 : Math.ceil(Number(rating.toString().split('').pop()) / 2);

        return (
            <Rating emoji={emoji} count={count} el={el} />
        );
    }

    render() {
        const { id } = this.props.match.params;

        return (
            <Query
                query={GET_EVENT}
                variables={{
                    path: `setlist/${id}`,
                }}
                // skip={true}
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

                    return (
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-around"
                                >
                                    <Grid className="info" key={1} item>
                                        <h1>{data.event.tour.name}</h1>
                                        <h2>{data.event.artist.name}</h2>
                                        {/* // TODO show date */}
                                        <h3>{data.event.venue.name}, {data.event.venue.city.name}, {data.event.venue.city.state}</h3>
                                        <h2>{moment(data.event.eventDate, "DD-MM-YYYY").format("MMM DD YYYY")}</h2>
                                        {/* this.renderRating(data.event.sets.set.reduce((total, set) => {
                                                return total += set.song.length
                                            }, 0)) */}
                                    </Grid>
                                    <Grid key={2} item>
                                        {data.event.sets.set.map((setlist, index) => (
                                            <Setlist
                                                setlist={setlist}
                                                artist={data.event.artist.name}
                                                key={index}
                                                id={index}
                                                renderRating={this.renderRating}
                                            />
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                }}
            </Query>
        );
    }
};

export default Event;