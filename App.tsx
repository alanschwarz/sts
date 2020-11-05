import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "./firebase";

const AuthContext = React.createContext({});

const Tab = createBottomTabNavigator(); // For HOME screen
const Stack = createStackNavigator(); // For Auth Screen

function AuthScreen({ navigation, setAuth }: any) {
  const { login } = useContext(AuthContext);
  return (
    <View style={styles.myview}>
      <Text>Auth Screen</Text>
      <Button title="Log In" onPress={() => login()}></Button>
    </View>
  );
}

function HomeScreen({ navigation, setAuth }: any) {
  const { currentUser } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  return (
    <View style={styles.myview}>
      <Text>Home Screen, You are logged in!</Text>
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
      <Tab.Screen component={HomeScreen} name="Home" />
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
