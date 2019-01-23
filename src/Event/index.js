import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../Loading';
import ErrorMessage from '../Error';
import Navigation from '../Navigation';
import Rating from '../Rating';
import Setlist from '../Setlist';
import { setlistClient } from '../index';

import Grid from '@material-ui/core/Grid';

// Testing purposes
import testEventData from '../test_event_data.json';

import './Event.css';

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

class Event extends Component {
    state = {
        rating: {
            emoji: 'no',
            number: '2',
        }
    };

    _renderRating = (totalSongs = 10, score = 803, emoji = 'no') => {
        const rating = score / totalSongs;

        // TODO Improve
        if (rating >= 90) {
            emoji = 'fire';
        } else if (rating <= 89 && rating >= 75) {
            emoji = 'slaps';
        } else if (74 >= rating >= 62) {
            emoji = 'idk';
        }

        const count = rating.toString().split('').pop() === '0' ? 1 : Math.ceil(Number(rating.toString().split('').pop()) / 2);

        return (
            <Rating emoji={emoji} count={count} />
        );
    }

    render() {
        const { id } = this.props.match.params;

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
                                        <Grid className="info" key={1} item>
                                            <h1>{data.event.tour.name}</h1>
                                            <h2>{data.event.artist.name}</h2>
                                            <h3>{data.event.venue.name}, {data.event.venue.city.name}, {data.event.venue.city.state}</h3>
                                            {this._renderRating()}
                                        </Grid>
                                        <Grid key={2} item>
                                            {data.event.sets.set.map((setlist, index) => (
                                                <Setlist setlist={setlist} key={index} id={index} />
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

export default Event;