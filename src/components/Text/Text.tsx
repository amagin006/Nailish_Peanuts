import React from "react";
import {
  View,
  Text as RNText,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

import { AppGeneralColor } from "@src/styles/ColorStyle";
import { generalTextStyles } from "@src/styles/TextStyle";
import { GeneralViewStyle } from "@src/styles/ViewStyle";

export interface TextProps extends Text {
  children: string | string[] | null | undefined;
  containerStyle?: ViewStyle | ViewStyle[];
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
  onPress?: () => void;
  onLongPress?: () => void;
}

export function Text(props: TextProps): JSX.Element {
  if (!props.children) {
    return <></>;
  }

  return (
    <View style={props.containerStyle}>
      <RNText
        style={[styles.defaultTextStyles, props.style]}
        numberOfLines={props.numberOfLines}
        ellipsizeMode={props.ellipsizeMode}
      >
        {props.children}
      </RNText>
    </View>
  );
}

export const TextLeftAtom: React.FC<TextProps> = (props) => {
  if (!props.children) {
    return <></>;
  }

  return (
    <View style={[GeneralViewStyle.leftColumn, props.containerStyle]}>
      <RNText
        numberOfLines={props.numberOfLines}
        ellipsizeMode={props.ellipsizeMode}
        style={[GeneralViewStyle.leftColumnText, props.style]}
      >
        {props.children}
      </RNText>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultTextStyles: {
    ...generalTextStyles.mediumLittleNormalText,
    color: AppGeneralColor.TextColor.Primary,
  },
});
