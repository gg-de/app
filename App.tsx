import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AsyncStorage } from "react-native";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [isCheckTokenComplete, setIsCheckTokenComplete] = useState(false);
  const [token, setToken] = useState<string>('');
  const colorScheme = 'light';

  useEffect(() => {
    const checkToken = async () => {
      const tokenString = await AsyncStorage.getItem('token');
      if (tokenString) {
        setToken(tokenString);
      }
      setIsCheckTokenComplete(true);
    };
    checkToken();
  }, []);

  return ((!isLoadingComplete || !isCheckTokenComplete) ? null : (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} token={token} />
      <StatusBar />
    </SafeAreaProvider>
  ));

}
