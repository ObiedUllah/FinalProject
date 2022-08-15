import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

/**
 * Will make a route only accessible if the user is logged in
 * @param {*} param0
 * @returns
 */
const ProtectedRoute = ({ component, ...args }) => {
	const Component = withAuthenticationRequired(component, args);
	return <Component />;
};

export default ProtectedRoute;
