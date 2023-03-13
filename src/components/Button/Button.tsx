import React, { ReactElement } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
} from "react-native";
import { AppGeneralColor } from "@src/styles/ColorStyle";

interface BaseButtonProps {
  containerStyle?: ViewStyle | ViewStyle[];
  style?: ViewStyle | ViewStyle[];

  buttonColorType?: ButtonColorType;
  onPress: () => void;
  text?: string;
  textStyle?: TextStyle;
  disabled?: boolean;
  isLoading?: boolean;
}

export const ButtonColors = {
  Primary: "Primary",
  Secondary: "Secondary",
  Confirm: "Confirm",
  Alert: "Alert",
  Warning: "Warning",
  Disabled: "Disabled",
} as const;
export type ButtonColorType = keyof typeof ButtonColors;

const createButtonColor = (type: ButtonColorType | undefined) => {
  switch (type) {
    case ButtonColors.Primary:
      return styles.buttonPrimary;
    case ButtonColors.Secondary:
      return styles.buttonSecondary;
    case ButtonColors.Confirm:
      return styles.buttonConfirm;
    case ButtonColors.Alert:
      return styles.buttonAlert;
    case ButtonColors.Warning:
      return styles.buttonWarning;
    case ButtonColors.Disabled:
      return styles.buttonDisabled;
    default:
      return styles.buttonPrimary;
  }
};

export function BaseButton(props: BaseButtonProps): JSX.Element {
  const buttonColor = createButtonColor(props.buttonColorType);
  const disabledState = props.isLoading || props.disabled;
  const color = disabledState
    ? styles.buttonDisabled
    : buttonColor || styles.defaultColor;
  return (
    <View style={props.containerStyle}>
      <TouchableOpacity
        onPress={props.onPress}
        disabled={disabledState}
        style={[styles.buttonWrapper, color, props.style]}
      >
        {props.text && (
          <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

interface RoundButtonProps {
  containerStyle?: ViewStyle | ViewStyle[];
  style?: ViewStyle | ViewStyle[];

  buttonColorType?: ButtonColorType;
  onPress: () => void;
  text?: string;
  textStyle?: TextStyle;
  iconLeft?: ReactElement;
  disabled?: boolean;
  isLoading?: boolean;
}

export function RoundButton(props: RoundButtonProps): JSX.Element {
  const buttonColor = createButtonColor(props.buttonColorType);
  const disabledState = props.isLoading || props.disabled;
  const color = disabledState
    ? styles.buttonDisabled
    : buttonColor || styles.defaultColor;

  return (
    <View style={props.containerStyle}>
      <TouchableOpacity
        onPress={props.onPress}
        disabled={disabledState}
        style={[styles.roundButtonWrapper, color, props.style]}
      >
        {props.iconLeft && <>{props.iconLeft}</>}
        {props.text && (
          <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    marginVertical: 10,
    borderRadius: 10,
  },
  defaultColor: {
    backgroundColor: AppGeneralColor.Button.Primary,
  },
  deleteColor: {
    backgroundColor: "#de1421",
  },
  text: {
    paddingVertical: 10,
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  roundButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#96CEB4",
    flexDirection: "row",
    borderRadius: 18,
  },
  buttonPrimary: {
    backgroundColor: AppGeneralColor.Button.Primary,
  },
  buttonSecondary: {
    backgroundColor: AppGeneralColor.Button.Secondary,
  },
  buttonConfirm: {
    backgroundColor: AppGeneralColor.Button.Confirm,
  },
  buttonAlert: {
    backgroundColor: AppGeneralColor.Button.Alert,
  },
  buttonWarning: {
    backgroundColor: AppGeneralColor.Button.Warning,
  },
  buttonDisabled: {
    backgroundColor: AppGeneralColor.Button.Disabled,
  },
});
