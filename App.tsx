import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./navigation/AppNavigator";
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from "./context/AuthProvider";
import "react-native-reanimated";
import { SocketProvider } from "./context/SocketProvider";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        </SocketProvider>
      </QueryClientProvider>
    </AuthProvider>

    
  );
};

export default App;