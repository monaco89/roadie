import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';

import * as routes from '../constants/routes';

import "./Navigation.css";

// TODO 'Search' button
const Navigation = ({ session }) => (
    <div>
        {session && session.me ? (
            <NavigationAuth session={session} />
        ) : (
                <NavigationNonAuth />
            )}
    </div>
);

const NavigationAuth = ({ session }) => (
    <div className="navbar">
        <Link to={routes.LANDING}><span role="img" aria-label="fire">🔥 </span></Link>
        <Link to={routes.ACCOUNT}>{session.me.username}</Link>
        <SignOutButton />
    </div>
)

const NavigationNonAuth = () => (
    <div className="navbar">
        <Link to={routes.LANDING}><span role="img" aria-label="fire">🔥 </span></Link>
        <Link to={routes.SIGN_IN}>Sign In</Link>
    </div>
);

export default Navigation;
