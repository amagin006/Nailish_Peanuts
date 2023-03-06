import React from 'react';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import CustomerListHome from '@src/screens/CustomerList/CustomerListHome';
import CalenderHome from '@src/screens/Calender/CalenderHome';
import SettingHome from '@src/screens/Setting/SettingHome';
import { CustomBottomIcons } from './components//BottomTabIcons';

import { AppGeneralColor } from '@src/styles/ColorStyle';

export type BottomTabNavParamList = {
  CustomerList: NavigatorScreenParams<CustomerListStackNavParamsList>;
  Calender: NavigatorScreenParams<CalenderStackNavParamsList>;
  Setting: NavigatorScreenParams<SettingStackNavParamsList>;
};

export type CustomerListStackNavParamsList = {
  CustomerListHome: undefined;
};

export type CalenderStackNavParamsList = {
  CalenderHome: { onSavePress: () => void };
};

export type SettingStackNavParamsList = {
  SettingHome: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabNavParamList>();

export const BottomTabScreens: React.FC = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="CustomerList"
      tabBar={props => <CustomBottomIcons {...props} />}>
      <BottomTab.Screen
        name="CustomerList"
        component={CustomerListStack}
        options={{ tabBarLabel: 'Customer' }}
      />
      <BottomTab.Screen
        name="Calender"
        component={CalenderStack}
        options={{ tabBarLabel: 'Calender' }}
      />
      <BottomTab.Screen
        name="Setting"
        component={SettingStack}
        options={{ tabBarLabel: 'Setting' }}
      />
    </BottomTab.Navigator>
  );
};

// CustomerList Tab stack
const CustomerListStackNav = createStackNavigator<CustomerListStackNavParamsList>();
export const CustomerListStack = () => {
  return (
    <CustomerListStackNav.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: AppGeneralColor.Navigation.HeaderBackground,
        },
        headerTitleStyle: {
          color: '#fff',
          textAlign: 'center',
        },
        headerTintColor: '#fff',
      }}>
      <CustomerListStackNav.Screen
        name="CustomerListHome"
        component={CustomerListHome}
        options={{ title: 'Customer' }}
      />
    </CustomerListStackNav.Navigator>
  );
};

// CalenderStackNav Tab stack
const CalenderStackNav = createStackNavigator<CalenderStackNavParamsList>();
export const CalenderStack = () => {
  return (
    <CalenderStackNav.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: AppGeneralColor.Navigation.HeaderBackground,
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
      }}>
      <CalenderStackNav.Screen
        name="CalenderHome"
        component={CalenderHome}
        options={{ title: 'Calender' }}
      />
    </CalenderStackNav.Navigator>
  );
};

// CustomerList Tab stack
const SettingStackNav = createStackNavigator<SettingStackNavParamsList>();
export const SettingStack = () => {
  return (
    <SettingStackNav.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: AppGeneralColor.Navigation.HeaderBackground,
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
      }}>
      <SettingStackNav.Screen
        name="SettingHome"
        component={SettingHome}
        options={{ title: 'Setting' }}
      />
    </SettingStackNav.Navigator>
  );
};

