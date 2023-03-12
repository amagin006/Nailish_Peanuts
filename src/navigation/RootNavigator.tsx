import React, { useState, useEffect } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import {
  MainStackNavParamList,
  MainStackScreens,
} from "@src/navigation/MainStackScreens";

// redux
import { auth } from "@src/config/Firebase";
import { useAppDispatch, useAppSelector } from "@src/store";
import { logout, setUser, userUid } from "@src/store/user/userSlice";

// Screens
import Splash, { SplashStackParamList } from "@src/screens/Splash";
import Login from "@src/screens/Login/Login";

export type RootStackParamList = {
  MainNav: NavigatorScreenParams<MainStackNavParamList>;
  LoginNav: undefined;
};

const RootStackNav = createStackNavigator<RootStackParamList>();
const SplashNav = createStackNavigator<SplashStackParamList>();

const RootNavigator = () => {
  // redux
  const dispatch = useAppDispatch();
  const reduxUserUid = useAppSelector(userUid);

  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const unsubscribe = _onAuthStateChanged();
    return unsubscribe;
  }, []);

  const _tokenLoadFinished = () => {
    setSplash(false);
  };

  function _onAuthStateChanged() {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        if (!reduxUserUid) {
          dispatch(setUser({ uid: user.uid }));
        }
      } else {
        dispatch(logout());
      }
    });
  }

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
      })}
    >
      {reduxUserUid ? (
        <RootStackNav.Screen name="MainNav" component={MainStackScreens} />
      ) : (
        <RootStackNav.Screen
          name="LoginNav"
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </RootStackNav.Navigator>
  );
};

export default RootNavigator;
