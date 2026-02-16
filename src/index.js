import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import store from "./store";
import App from "./App";
import "./styles/components.css";
import "./styles/global.css";
import "./styles/armory-set.css";
import "./styles/npc-avatars.css";
import "./styles/components/npc-dialog.css";
import "./styles/components/trade-message-dialog.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>,
	// </React.StrictMode>
);
