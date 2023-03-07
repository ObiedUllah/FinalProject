import { SongListContext, SongListProvider } from "context/SongListContext";

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
				<SongListProvider>
					<RandomQuoteProvider>
						<GenresListProvider>
							<PromosProvider>
								<App />
							</PromosProvider>
						</GenresListProvider>
					</RandomQuoteProvider>
				</SongListProvider>
			</AnimeListProvider>
		</Auth0ProviderWithRedirectCallback>
	</Router>
);
