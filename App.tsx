import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./navigation/AppNavigator";
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from "./context/AuthProvider";
import "react-native-reanimated";
import HomeScreen from "./screens/home/HomeScreen";
import { SocketProvider } from "./context/SocketProvider";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    // <AuthProvider>
    //   <QueryClientProvider client={queryClient}>
    //     <NavigationContainer>
    //       <AppNavigator />
    //     </NavigationContainer>
    //   </QueryClientProvider>
    // </AuthProvider>
    <SocketProvider>
      <HomeScreen/>
    </SocketProvider>
    
  );
};

export default App;