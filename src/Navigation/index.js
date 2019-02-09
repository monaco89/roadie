import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

import "./Navigation.css";

// TODO 'Search' button
const Navigation = () => (
    <div className="navbar">
        <Link to={routes.LANDING}><span role="img" aria-label="fire">🔥 </span></Link>
    </div>
);

export default Navigation;
