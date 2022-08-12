import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Will show the right button depending on if the user is logged in or not
 * @returns
 */
const AuthenticationButton = () => {
	const { isAuthenticated } = useAuth0();
	return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;
