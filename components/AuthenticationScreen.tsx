import * as React from "react";
import { Platform, StyleSheet } from 'react-native';
import { View } from './Themed';
import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from '../utils/supabase';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';


/** 
 * https://github.com/react-native-google-signin/google-signin?tab=readme-ov-file#expo-installation
 */
GoogleSignin.configure();
// GoogleSignin.configure({
//     scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//     webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
//     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//     hostedDomain: '', // specifies a hosted domain restriction
//     forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//     accountName: '', // [Android] specifies an account name on the device that should be used
//     iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//     googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
//     openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//     profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
// });

async function signinWithGoogle() {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const userInfo = await GoogleSignin.signIn();
        console.log('userInfo: ', userInfo);
        if (userInfo.idToken) {
            passAuthTokenToSupabase('google', userInfo.idToken);
        }
        // setState({ userInfo });
    } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
        } else {
            // some other error happened
        }
    }
};

async function signinWithApple() {
    try {
        const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
        })
        console.log('Credential: ', credential);
        // Sign in via Supabase Auth.
        if (credential.identityToken) {
            passAuthTokenToSupabase('apple', credential.identityToken);
        } else {
            throw new Error('No identityToken.')
        }
    } catch (e: any) {
        console.error('Login error: ', e);
        if (e.code === 'ERR_REQUEST_CANCELED') {
            // handle that the user canceled the sign-in flow
        } else {
            // handle other errors
        }
    }
}

async function passAuthTokenToSupabase(provider: string, token: string) {
    const {
        error,
        data: { user },
    } = await supabase.auth.signInWithIdToken({
        provider, token
    })
    console.log(JSON.stringify({ error, user }, null, 2))
    if (!error) {
        // User is signed in.
        console.log('User is signed in.');
    }

}

function LoginOptions() {
    console.log('LoginOptions Platform.OS: ', Platform.OS)
    if (['ios', 'macos'].includes(Platform.OS)) {
        /**
         * Auth choices:
         * 1. Native Apple Sign-in
         * 2. OAuth Google Sign-in
         */
        return <>
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={5}
                style={{ width: 200, height: 64 }}
                onPress={signinWithApple}
            />
            <br />
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signinWithGoogle}
            />
        </>
    }
    else if (Platform.OS === 'android') {
        /**
         * Auth choices:
         * 1. Native Google Sign-in
         * 2. OAuth Apple Sign-in
         */
        return <>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signinWithGoogle}
            />
        </>
    }
    else { // Likely Platform.OS === 'web'
        /**
         * Auth choices:
         * 1. OAuth Apple Sign-in
         * 2. OAuth Google Sign-in
         */
        return <>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signinWithGoogle}
            />
        </>
    }
    return <>{/* Implement Android Auth options. */}</>
}

export default function AuthenticationScreen() {
    return <View style={styles.container}>
        <LoginOptions />
    </View>
}

const styles = StyleSheet.create({
    container: {
    },
}); 