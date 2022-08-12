import Button from "../../../styles/StyledAuthButton";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Button for Sign up
 * @returns
 */
const SignupButton = () => {
	const { loginWithRedirect } = useAuth0();
	return (
		<Button
			onClick={() =>
				loginWithRedirect({
					screen_hint: "signup",
				})
			}
		>
			Sign Up
		</Button>
	);
};

export default SignupButton;
