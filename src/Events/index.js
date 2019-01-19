import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../Loading';
import ErrorMessage from '../Error';
import { setlistClient } from '../index';

// Testing purposes
import testData from '../test_data.json';
import rallycap from '../Images/rallycapmini.png';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});

const GET_EVENTS = gql`
    query events($path: String!) {
        events @rest(type: "Events", path: $path) {
            setlist @type(name: "setlist"){
                tour @type(name: "tour"){
                    name
                }
            }
        }
    }
`;

const Events = ({ artist, classes }) => (
    <Query
        query={GET_EVENTS}
        variables={{
            path: `search/setlists?artistName=${artist}&p=1`,
        }}
        // skip={artist === ''}
        skip={true}
        client={setlistClient}
    >
        {({ data, loading, error, fetchMore }) => {
            if (error) {
                console.log("error", error)
                return <ErrorMessage error={error} />;
            }

            // Testing purposes
            data = testData;

            console.log("data", data);



            if (loading) {
                return <Loading />;
            }

            if (!data || data.total === 0) {
                return <p>No Results...</p>;
            }

            return (
                <GridList className={classes.gridList} cols={2.5}>
                    {data.setlist.map((event, index) => (
                        <GridListTile key={index}>
                            <img src={rallycap} alt={event.tour.name} />
                            <GridListTileBar
                                title={event.tour.name}
                                subtitle={<span>{event.venue.name}, {event.venue.city.name} {event.venue.city.state}</span>}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                                actionIcon={
                                    <IconButton>
                                        <StarBorderIcon className={classes.title} />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            );

            // return data.setlist.map((event, index) => {
            //     return <ConcertCard concert={event} key={index} />;
            // });
        }}
    </Query>
);

Events.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Events);