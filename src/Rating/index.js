import React from 'react';

import * as ratings from '../constants/ratings';

const Rating = ({ emoji, number }) => {
    let rating = '';
    for (let i = 0; i < number; i++) {
        rating = rating.concat(ratings[emoji]);
    }

    return (
        <h1>{rating}</h1>
    );
};

export default Rating;