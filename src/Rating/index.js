import React from 'react';

import * as ratings from '../constants/ratings';

const Rating = ({ emoji, count, el = "h1" }) => {
    let rating = '';
    for (let i = 0; i < count; i++) {
        rating = rating.concat(`${ratings[emoji]}`);
    }

    return React.createElement(el, {}, <span role="img" aria-label={String(emoji)}>{rating}</span>);
};

export default Rating;