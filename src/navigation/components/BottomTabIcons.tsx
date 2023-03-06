import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Foundation,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

// Atom
import { Text } from "@src/components/Text/Text";

// style
import { AppGeneralColor } from "@src/styles/ColorStyle";
import { generalTextStyles } from "@src/styles/TextStyle";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export const CustomBottomIcons = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const tintColor = isFocused
          ? AppGeneralColor.Palette.SecondaryPink
          : AppGeneralColor.Palette.SecondaryBlack;

        const tabIcon = tabIconCreate(route, tintColor);

        return (
          <SafeAreaView
            style={{
              flex: 1,
              borderTopColor: AppGeneralColor.Palette.BorderGray,
              borderTopWidth: 1,
            }}
            edges={["bottom", "right", "left"]}
            key={`${route.name}`}
          >
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
            >
              <View style={{ alignItems: "center" }}>{tabIcon}</View>
              <Text style={[styles.bottomTabText, { color: tintColor }]}>
                {label as string}
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        );
      })}
    </View>
  );
};

const tabIconCreate = (route: any, tintColor: any) => {
  switch (route.name) {
    case "CustomerList":
      return (
        <Foundation
          style={{ marginTop: 4, color: tintColor }}
          name="torsos-all"
          size={28}
        />
      );
    case "Calender":
      return (
        <MaterialCommunityIcons
          name="calendar-clock"
          style={{ marginTop: 8, color: tintColor }}
          size={24}
        />
      );
    case "Setting":
      return (
        <Ionicons
          name="ios-settings-outline"
          style={{ marginTop: 6, color: tintColor }}
          size={24}
        />
      );
  }
};

const styles = StyleSheet.create({
  bottomTabText: {
    ...generalTextStyles.mediumThinText,
    textAlign: "center",
    paddingBottom: 3,
  },
});
