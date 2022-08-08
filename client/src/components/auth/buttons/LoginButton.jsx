import Button from "./StyledButton";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();
	return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;
