import 'react-native-url-polyfill/auto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import React from 'react';
import { ResponsiveNavigator } from "@/components/navigator";
import Head from "expo-router/head";
import { View, Text } from '@/components/Themed';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase';
import AuthenticationScreen from "@/components/AuthenticationScreen";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}


function RootLayoutNav() {
  const [session, setSession] = useState<Session | null>(null)
  const colorScheme = useColorScheme();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Head>
        <title>My App</title>
        <meta
          name="description"
          content="Expo Router Instagram responsive layout demo using SCSS"
        />
      </Head>
      {session && session.user ? <ResponsiveNavigator /> : <AuthenticationScreen />}
    </ThemeProvider>
  );
}
