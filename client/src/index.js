import App from "./App";
import Auth0ProviderWithRedirectCallback from "authentication/auth0-provider-with-redirect-callback";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<Auth0ProviderWithRedirectCallback>
			<App />
		</Auth0ProviderWithRedirectCallback>
	</Router>
);
