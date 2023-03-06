import React, { useState, useEffect } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
// import { firebaseAuth } from '~/config/Firebase';

// // Redux
// import { useAppSelector, useAppDispatch } from '~/redux/hooks';
// import { userSet, userUnSet } from '~/redux/user/actions';

// Screens
import Splash, { SplashStackParamList } from '@src/screens/Splash';
import Login from '@src/screens/Login/Login';
import { MainStackNavParamList, MainStackScreens } from '@src/navigation/MainStackScreens';

export type RootStackParamList = {
  MainNav: NavigatorScreenParams<MainStackNavParamList>;
  LoginNav: undefined;
};

const RootStackNav = createStackNavigator<RootStackParamList>();
const SplashNav = createStackNavigator<SplashStackParamList>();

const RootNavigator = () => {
  // redux
  // const dispatch = useAppDispatch();
  // const userToken = useAppSelector(state => state.user.uid);

  const userToken = false

  const [splash, setSplash] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = _onAuthStateChanged();
  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    }, 5000)
  }, [])


  const _tokenLoadFinished = () => {
    setSplash(false);
  };

  // function _onAuthStateChanged() {
  //   return firebaseAuth.onAuthStateChanged(user => {
  //     if (user) {
  //       // navigation.navigate('CustomerListHome');
  //       dispatch(userSet(user));
  //     } else {
  //       console.log('user logout-------onAuthStateChanged-------', user);
  //       dispatch(userUnSet());
  //     }
  //   });
  // }


  if (splash) {
    return (
      <SplashNav.Navigator>
        <SplashNav.Screen name="Splash" options={{ headerShown: false }}>
          {() => <Splash tokenLoadFinished={_tokenLoadFinished} />}
        </SplashNav.Screen>
      </SplashNav.Navigator>
    );
  }

  return (
    <RootStackNav.Navigator
      screenOptions={() => ({
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: false,
        headerShown: false,
      })}>
      {userToken ? (
        <RootStackNav.Screen name="MainNav" component={MainStackScreens} />
      ) : (
        <RootStackNav.Screen name="LoginNav" component={Login} options={{ headerShown: false }} />
      )}
    </RootStackNav.Navigator>
  );
};

export default RootNavigator;

