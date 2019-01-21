import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

// TODO 'Search' button
const Navigation = () => (
    <div>
        <Link to={routes.LANDING}><span role="img">🔥 </span></Link>
    </div>
);

export default Navigation;
