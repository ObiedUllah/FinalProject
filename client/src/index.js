import { AnimeListProvider } from "context/AnimeListContext";
import App from "./App";
import Auth0ProviderWithRedirectCallback from "authentication/auth0-provider-with-redirect-callback";
import { GenresListProvider } from "context/GenresListContext";
import { PromosProvider } from "context/PromosContext";
import { RandomQuoteProvider } from "context/RandomQuoteContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<Auth0ProviderWithRedirectCallback>
			<AnimeListProvider>
				<RandomQuoteProvider>
					<GenresListProvider>
						<PromosProvider>
							<App />
						</PromosProvider>
					</GenresListProvider>
				</RandomQuoteProvider>
			</AnimeListProvider>
		</Auth0ProviderWithRedirectCallback>
	</Router>
);
