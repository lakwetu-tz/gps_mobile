import "@expo/metro-runtime";
import 'react-native-gesture-handler';
import registerRootComponent from "expo/build/launch/registerRootComponent";
import { Navigation } from "./navigation";
import { AuthProvider } from "./context/AuthProvider";
import { SocketProvider } from "./context/SocketProvider";

function App() {
	return (
		<SocketProvider>
			<AuthProvider>
				<Navigation />
			</AuthProvider>
		</SocketProvider>

	);
}

registerRootComponent(App);
