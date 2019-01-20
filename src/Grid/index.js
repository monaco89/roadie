import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

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

// TODO Performer Logo
const Grid = ({ events, classes }) => (
    <GridList className={classes.gridList} cols={2.5}>
        {events.setlist.map((event, index) => (
            <GridListTile key={index}>
                <Link to={`${routes.EVENT}/${event.id}`}>

                    <img src={rallycap} alt={event.tour.name} />
                    <GridListTileBar
                        title={event.tour.name}
                        subtitle={<span>{event.venue.name}, {event.venue.city.name}, {event.venue.city.state}</span>}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                    // actionIcon={
                    //     <IconButton>
                    //         <StarBorderIcon className={classes.title} />
                    //     </IconButton>
                    // }
                    />
                </Link>
            </GridListTile>
        ))}
    </GridList>
);

Grid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Grid);