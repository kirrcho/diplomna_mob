import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import type {Node} from 'react';

import { NavigationContainer } from '@react-navigation/native';

import {
  SafeAreaView,
  ScrollView,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';
import { Form, FormItem } from 'react-native-form-component';

import * as googleConfig from './android/app/google-services.json'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {LoginComponent} from './src/auth/authForms.js';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { ScanScreen } from './src/scan/qrPage.js';
import { SuccessScreen } from './src/scan/scanSuccessScreen.js';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginComponent, setIsLoginComponent] = useState(true);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
     GoogleSignin.configure({
       scopes: ['https://www.googleapis.com/auth/userinfo.email'],
       webClientId: googleConfig.client[0].oauth_client[1].client_id,
       offlineAccess: false,
     });
   }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const changeAuthComponent = () => {
    setIsLoginComponent(state => !state);
  }

  const screenDimensions = Dimensions.get('screen');

  const AuthComponent = () => (
                            <View>
                                <LoginComponent
                                    isLoginComponent={isLoginComponent}
                                    onLogin={() => {
                                        setIsLoggedIn(true);
                                    }}
                                />
                                <Text style={styles.formDescription}>{isLoginComponent ? "Don't have an account ?" : "Already have an account ?"}</Text>
                                <Button
                                    onPress={() => changeAuthComponent()}
                                    title={isLoginComponent ? "Go to Register" : "Go to login"}
                                />
                            </View>
                        );

    const QrPage = () => (<ScanScreen />)

  return (
    <SafeAreaView style={backgroundStyle}>
        <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
            <View>
               <Section
                   title={`Технически университет
Филиал Пловдив`}
               />
            </View>
            <View style={{height:(screenDimensions.height - 220)}}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}>
                        <Stack.Screen name="Login" component={AuthComponent} />
                        <Stack.Screen name="QrPage" component={QrPage} />
                        <Stack.Screen name="ScanSuccessScreen" component={() => (<SuccessScreen />)} />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  formDescription: {
    marginLeft: 15,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20
  },
  appSection: {
    color: 'black',
  }
});

export default App;
