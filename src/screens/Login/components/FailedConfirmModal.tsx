import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import { ButtonColors, RoundButton } from "@src/components/Button/Button";
import { BaseModal } from "@src/components/Modal/BaseModal";

interface FailedConfirmModalProps {
  visible: boolean;
  onRequestClose: () => void;
  modalInnerStyle?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];

  createFailedMessage?: string;
  loginFailedMessage?: string;
  onPressOk: () => void;
}

export const FailedConfirmModal: React.FC<FailedConfirmModalProps> = (
  props
) => {
  return (
    <BaseModal
      visible={props.visible}
      onRequestClose={props.onRequestClose}
      modalInnerStyle={styles.modalInnerStyle}
    >
      <View style={styles.topTextInner}>
        <Text style={styles.createFailedText}>
          {props.createFailedMessage || props.loginFailedMessage || ""}
        </Text>
        <Text style={styles.createFailedText}>
          {`Oops! Something went wrong.\nPlease try again`}
        </Text>
      </View>
      <RoundButton
        buttonColorType={ButtonColors.Primary}
        onPress={props.onPressOk}
        text={"OK"}
      />
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  modalInnerStyle: {
    paddingBottom: 24,
  },
  topTextInner: {
    marginVertical: 60,
  },
  createFailedText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
});
