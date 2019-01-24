import React from 'react';

import * as ratings from '../constants/ratings';

const Rating = ({ emoji, count }) => {
    let rating = '';
    for (let i = 0; i < count; i++) {
        rating = rating.concat(`${ratings[emoji]}`);
    }

    return (
        <div>
            Rated:
            <h1><span role="img" aria-label={String(emoji)}>{rating}</span></h1>
        </div>
    );
};

export default Rating;