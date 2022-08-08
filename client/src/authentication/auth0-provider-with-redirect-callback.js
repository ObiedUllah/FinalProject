import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
	const navigate = useNavigate();

	const domain = process.env.REACT_APP_AUTH0_DOMAIN;
	const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

	const onRedirectCallback = (appState) => {
		navigate((appState && appState.returnTo) || window.location.pathname);
	};
	return (
		<Auth0Provider onRedirectCallback={onRedirectCallback} domain={domain} clientId={clientId} redirectUri={window.location.origin}>
			{children}
		</Auth0Provider>
	);
};

export default Auth0ProviderWithRedirectCallback;
