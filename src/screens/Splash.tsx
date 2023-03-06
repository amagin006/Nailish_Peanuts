import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

export type SplashStackParamList = {
  Splash: undefined;
};

interface SplashProp {
  tokenLoadFinished: () => void;
}

export default function Splash({ tokenLoadFinished }: SplashProp) {
  useEffect(() => {
    const timer = setTimeout(() => {
      tokenLoadFinished();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.splash}>
      <Image
        style={styles.splashImage}
        resizeMode="contain"
        source={require('../../assets/images/splash/splash.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  splashImage: {
    width: '100%',
    height: '100%',
  },
});

