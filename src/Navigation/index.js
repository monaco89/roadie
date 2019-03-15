import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";

import * as routes from "../constants/routes";

import "./Navigation.css";

// TODO 'Search' button
// TODO Float right second link
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
    <Link to={routes.LANDING}>
      <span role="img" aria-label="music">
        🎵
      </span>
    </Link>
    <div>
      <Link to={routes.ACCOUNT}>
        {session.me.email.substring(0, session.me.email.indexOf("@"))}
      </Link>
      <SignOutButton />
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <div className="navbar">
    <Link to={routes.LANDING}>
      <span role="img" aria-label="music">
        🎵{" "}
      </span>
    </Link>
    <div>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </div>
  </div>
);

export default Navigation;
