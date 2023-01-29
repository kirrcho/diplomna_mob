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

export const LoginComponent = (props) => {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [number, setNumber] = useState("");
    const [isNumberValid, setIsNumberValid] = useState(false);
    const [isNumberFocused, setIsNumberFocused] = useState(false);
    const [isNumberTouched, setIsNumberTouched] = useState(false);
    const signIn = async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const {accessToken, idToken} = await GoogleSignin.signIn();
            console.log(accessToken);
            console.log(idToken);
            setLoggedIn(true);
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              alert('Cancel');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              alert('PLAY_SERVICES_NOT_AVAILABLE');
            } else {
              alert('Login failed.');
            }
          }
        };

    const emailRegex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
    const facultyNumberRegex = new RegExp('^[0-9]{3,}$');

    return (<View>
    <View style={styles.view}>
                        <Text style={styles.formDescription}>Email</Text>
                        <FormItem
                            value={email}
                            onChangeText={(email) => {
                                setEmail(email);
                                setIsEmailTouched(true);
                                setIsEmailValid(emailRegex.test(email));
                            }}
                            onFocus={() => {setIsEmailFocused(false)}}
                            onBlur={() => {setIsEmailFocused(true)}}
                            style={styles.formItem}
                        />
                        {isEmailFocused && isEmailTouched && !isEmailValid && <Text style={styles.errorMessage}>Invalid email</Text>}
                    </View>
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
                    <Text>
                    <GoogleSigninButton
                                          style={{ width: 192, height: 48 }}
                                          size={GoogleSigninButton.Size.Wide}
                                          color={GoogleSigninButton.Color.Dark}
                                          onPress={signIn}
                                          disabled={false}
                                        />;
                    </Text>
    </View>
            )
}

export const RegisterComponent = (props) => {
    const [number, setNumber] = useState("");
    const [isNumberValid, setIsNumberValid] = useState(false);
    const [isNumberFocused, setIsNumberFocused] = useState(false);
    const [isNumberTouched, setIsNumberTouched] = useState(false);

    const emailRegex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
    const facultyNumberRegex = new RegExp('^[0-9]{3,}$');

    return (<Form
                onButtonPress={() => console.warn('do something')}
                buttonStyle={styles.formButton}
                buttonText={"Login"}
            >
                <View style={styles.view}>
                    <Text style={styles.formDescription}>Email</Text>
                    <FormItem
                        value={email}
                        onChangeText={(email) => {
                            setEmail(email);
                            setIsEmailTouched(true);
                            setIsEmailValid(emailRegex.test(email));
                        }}
                        onFocus={() => {setIsEmailFocused(false)}}
                        onBlur={() => {setIsEmailFocused(true)}}
                        style={styles.formItem}
                    />
                    {isEmailFocused && isEmailTouched && !isEmailValid && <Text style={styles.errorMessage}>Invalid email</Text>}
                </View>
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
            </Form>
            )
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
  highlight: {
    fontWeight: '700',
  },
});