import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "./firebase";
import styled from "styled-components/native";

const AuthContext = React.createContext({});

const Tab = createBottomTabNavigator(); // For HOME screen
const Stack = createStackNavigator(); // For Auth Screen

function AuthScreen({ navigation, setAuth }: any) {
  const { login } = useContext(AuthContext);
  return (
    <View style={styles.myview}>
      <Card>
        <Text>Auth Screen</Text>
        <Button title="Log In" onPress={() => login()}></Button>
      </Card>
    </View>
  );
}

function HomeScreen({ navigation, setAuth }: any) {
  const { currentUser } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  return (
    <View style={styles.myview}>
      <Text>Is ka witz</Text>
      <Text>UID: {currentUser.uid}</Text>
      <Button title="Log Out" onPress={() => logout()}></Button>
    </View>
  );
}

function SettingsScreen({ navigation, setAuth }: any) {
  return (
    <View style={styles.myview}>
      <Text>Settings here!</Text>
    </View>
  );
}

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen component={HomeScreen} name="Start" />
      <Tab.Screen component={SettingsScreen} name="Settings" />
    </Tab.Navigator>
  );
};

const AppLoader = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {currentUser ? <HomeTabs /> : <AuthScreen />}
    </NavigationContainer>
  );
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = () => {
    return auth.signInAnonymously();
  };

  const logout = (email: string, password: string) => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const AuthValue = {
    login,
    logout,
    currentUser,
  };

  return (
    <AuthContext.Provider value={AuthValue}>
      <AppLoader />
    </AuthContext.Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  myview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const Card = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  height: 50%;
  width: 80%;
  background-color: #292929;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
`;
