import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/home/HomeScreen";
import MonitorScreen from "./screens/monitor/MonitorScreen";
import AlertScreen from "./screens/alert/AlertScreen";
import LoginScreen from "./screens/welcome/LoginScreen";
import SplashScreen from "./screens/welcome/SplashScreen";
import { useAuth } from './context/AuthProvider'
import SignupScreen from "./screens/welcome/SignupScreen";
import ProfileScreen from "./screens/account/ProfileScreen";
import DriverScreen from './screens/monitor/Driver'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerTitleAlign: "center",
				tabBarInactiveTintColor: '#8B0000',
				tabBarActiveTintColor: 'gray',
				tabBarStyle: {
					display: 'flex',
				},
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerShown: false,
					tabBarIcon: (props) => <Icon name="home" {...props} />,
				}}
			/>
			<Tab.Screen
				name="Alert"
				component={AlertScreen}
				options={{
					tabBarIcon: (props) => <Icon name="email-alert" {...props} />,
				}}
			/>
			<Tab.Screen
				name="Monitor"
				component={MonitorScreen}
				options={{
					tabBarIcon: (props) => <Icon name="monitor-multiple" {...props} />,
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: (props) => <Icon name="account-settings" {...props} />,
				}}
			/>
		</Tab.Navigator>
	);
}

export function Navigation() {
	const { authData } = useAuth();
	return (
		<NavigationContainer>
			<Stack.Navigator>

				{authData.token ? (
					<>
						<Stack.Screen
							name="Main"
							component={Tabs}
							options={{
								headerShown: false,
							}}
						/>

						<Tab.Screen name="Driver" component={DriverScreen} options={{ headerShown: false }} />
					</>

				) : (
					<>
						<Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
						<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
						<Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
					</>

				)}

			</Stack.Navigator>
		</NavigationContainer>
	);
}
