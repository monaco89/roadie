import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import * as routes from '../constants/routes';

export default class EventInfo extends PureComponent {

    render() {
        const { info } = this.props;
        const displayName = `${info.venue.name}, ${info.venue.city.name}, ${info.venue.city.state}`;
        const displayDate = moment(info.eventDate, "DD-MM-YYYY").format("MMM DD YYYY");

        return (
            <Link to={`${routes.EVENT}/${info.id}`}>
                <h2>{displayDate}</h2>
                <h3>{info.tour.name}</h3>
                <span>{displayName}</span>
            </Link>
        );
    }
}