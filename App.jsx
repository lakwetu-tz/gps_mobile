import "react-native-reanimated"

import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./navigation/AppNavigator";
import { AuthProvider } from "./context/AuthProvider";
import { SocketProvider } from "./context/SocketProvider";

const App = () => {
  return(
    <NavigationContainer>
        <AuthProvider>
          {/* <SocketProvider> */}
          <AppNavigator/>
          {/* </SocketProvider> */}
        </AuthProvider>
      
    </NavigationContainer>
  )
};

export default App;

