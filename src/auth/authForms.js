import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Form, FormItem } from 'react-native-form-component';

import { storeData, getData } from '../storage/localStorageFuncs.js'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { auth, postAuthAsync } from '../messaging/messageClient';

import { useNavigation } from '@react-navigation/native';

export const LoginComponent = (props) => {
    const { isLoginComponent } = props;
    const [number, setNumber] = useState("");
    const [isNumberValid, setIsNumberValid] = useState(false);
    const [isNumberFocused, setIsNumberFocused] = useState(false);
    const [isNumberTouched, setIsNumberTouched] = useState(false);

    const navigation = useNavigation();

    const signIn = async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const logInfo = await GoogleSignin.signIn();
            await auth();

            const request = {
                token: logInfo.idToken,
                facultyNumber: number
            }

            const requestUri = isLoginComponent ? 'login' : 'register';
            const result = await postAuthAsync(requestUri, request);
            if (!result.data.IsSuccessful) {
                alert(result.data.Error);
            } else if (isLoginComponent) {
                storeData('token', result.data.Value);
                props.onLogin();
                navigation.navigate('QrPage');
            } else {
                alert("Successful registration. Expect an email once your identity is confirmed.")
            }

          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              alert('Your login was cancelled.');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              alert('PLAY_SERVICES_NOT_AVAILABLE');
            } else {
              alert('Login failed. Contact the administrator for assistance.');
            }
          }
        };

    const facultyNumberRegex = new RegExp('^[0-9]{3,}$');

    return (<View>
                <Text style={styles.componentTitle}>{isLoginComponent ? "Login" : "Register"}</Text>
                <View style={styles.view}>
                    <Text style={styles.formDescription}>Faculty number</Text>
                    <FormItem
                        value={number}
                        onChangeText={(number) => {
                            setNumber(number);
                            setIsNumberTouched(true);
                            setIsNumberValid(facultyNumberRegex.test(number));
                        }}
                        onFocus={() => {setIsNumberFocused(false)}}
                        onBlur={() => {setIsNumberFocused(true)}}
                        style={styles.formItem}
                    />
                    {isNumberFocused && isNumberTouched && !isNumberValid && <Text style={styles.errorMessage}>Invalid faculty number</Text>}
                </View>
                <Text style={styles.view}>
                    <GoogleSigninButton
                      style={{ width: 192, height: 48 }}
                      size={GoogleSigninButton.Size.Wide}
                      color={GoogleSigninButton.Color.Dark}
                      onPress={signIn}
                      disabled={false}
                    />;
                </Text>
            </View>)
}

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 20,
    marginLeft: 15,
    color: 'red',
  },
  formButton: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  view: {
    minHeight: 130
  },
  formItem: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  formDescription: {
    marginLeft: 15,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20
  },
  componentTitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 34
  },
  highlight: {
    fontWeight: '700',
  },
});