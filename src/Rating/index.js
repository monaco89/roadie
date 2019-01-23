import React from 'react';

import * as ratings from '../constants/ratings';

const Rating = ({ emoji, count }) => {
    let rating = '';
    for (let i = 0; i < count; i++) {
        rating = rating.concat(ratings[emoji]);
    }

    return (
        <div>
            Rated:
            <h1>{rating}</h1>
        </div>
    );
};

export default Rating;