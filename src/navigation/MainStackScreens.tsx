import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';

import { BottomTabScreens, BottomTabNavParamList } from '@src/navigation/BottomTabScreens';

// Screens 
import CustomerEdit from '@src/screens/CustomerList/CustomerEdit';
import ReportList from '@src/screens/CustomerList/ReportList';
import NewReportAndEdit from '@src/screens/CustomerList/NewReportAndEdit';
import ReportDetail from '@src/screens/CustomerList/ReportDetail';
import EditAppointment from '@src/screens/Calender/EditAppointment';
import AddEditMenuItemScreen from '@src/screens/MenuList/AddEditMenuItem';
import SelectMenuListScreen from '@src/screens/MenuList/SelectMenuList';

// style
import { AppGeneralColor } from '@src/styles/ColorStyle';

// Type
import { MenuItemType, MenuListItemType } from '@src/modules/Menu/type';
import { CustomerReportType } from '@src/modules/Customer/type';

export type MainStackNavParamList = {
  BottomNav: NavigatorScreenParams<BottomTabNavParamList>;
  CustomerEdit: undefined;
  ReportList: { reload: boolean } | undefined;
  ReportDetail: { appointItem: CustomerReportType };
  NewReportAndEdit:
    | { selectedMenuItems?: MenuListItemType[]; appointItem?: CustomerReportType }
    | { selectedMenuItems?: any[]; appointItem?: any }
    | undefined;

  EditAppointment: { item: CustomerReportType } | undefined;
  SelectMenuListScreen: { updateItems: boolean } | undefined;
  AddEditMenuItemScreen: { menuItem: MenuItemType } | undefined;
};

const MainStackNav = createStackNavigator<MainStackNavParamList>();
export const MainStackScreens = () => {
  return (
    <MainStackNav.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: AppGeneralColor.Navigation.HeaderBackground,
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerBackTitleVisible: false,
        headerTintColor: '#fff',
      }}>
      <MainStackNav.Screen
        name="BottomNav"
        component={BottomTabScreens}
        options={{ headerShown: false }}
      />

      {/* --------- CustomerList ---------- */}
      <MainStackNav.Screen
        name="CustomerEdit"
        component={CustomerEdit}
        options={{
          title: 'Add Customer',
        }}
      />
      <MainStackNav.Screen
        name="ReportList"
        component={ReportList}
        options={{
          title: 'Report List',
        }}
      />
      <MainStackNav.Screen
        name="ReportDetail"
        component={ReportDetail}
        options={{
          title: 'Report Detail',
        }}
      />
      <MainStackNav.Screen name="NewReportAndEdit" component={NewReportAndEdit} />
      {/* --------- CustomerList ---------- */}

      {/* --------- Calender ---------- */}
      <MainStackNav.Screen
        name="EditAppointment"
        component={EditAppointment}
        options={{
          title: 'Edit Appointment',
        }}
      />

      {/* --------- Calender ---------- */}

      {/* --------- SelectMenuList ---------- */}
      <MainStackNav.Screen
        name="SelectMenuListScreen"
        component={SelectMenuListScreen}
        options={{
          title: 'Select Menu',
        }}
      />
      <MainStackNav.Screen
        name="AddEditMenuItemScreen"
        component={AddEditMenuItemScreen}
        options={{
          title: 'Add Menu Item',
        }}
      />
      {/* --------- SelectMenuList ---------- */}
    </MainStackNav.Navigator>
  );
};

