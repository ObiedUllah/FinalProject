import Button from "../../../styles/StyledAuthButton";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Button for Login
 * @returns
 */
const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();
	return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;
