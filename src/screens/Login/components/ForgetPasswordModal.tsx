import React, { useState } from "react";
import { StyleSheet, View, Platform } from "react-native";

// Atom
import { Text } from "@src/components/Text/Text";
import { BaseModal } from "@src/components/Modal/BaseModal";
import { TextInput } from "@src/components/TextInput/TextInput";

// components
import { ButtonColors, RoundButton } from "@src/components/Button/Button";

// style
import { AppGeneralColor } from "@src/styles/ColorStyle";
import { generalTextStyles } from "@src/styles/TextStyle";
import { auth, sendPasswordResetEmail } from "@src/config/Firebase";

interface ForgetModalProps {
  visible: boolean;
  onRequestClose: () => void;
  onClose: () => void;
}

export const ForgetPasswordModal: React.FC<ForgetModalProps> = (props) => {
  const [inputEmail, setInputEmail] = useState<string>("");
  const [resetState, setResetState] = useState<
    "LOADING" | "SUCCESS" | "ERROR" | "DEFAULT"
  >("DEFAULT");

  const onChangeText = (text: string) => {
    if (resetState === "ERROR") {
      setResetState("DEFAULT");
    }
    setInputEmail(text);
  };

  const _onResetPassword = async () => {
    setResetState("LOADING");
    try {
      // submit firebase to send email to user for reset password
      await sendPasswordResetEmail(auth, inputEmail);

      setInputEmail("");
      setResetState("SUCCESS");
    } catch (error) {
      console.log("Error forgetPassword send email: ", error);
      setResetState("ERROR");
    }
  };

  const closeModal = () => {
    setInputEmail("");
    setResetState("DEFAULT");
    props.onClose();
  };

  return (
    <BaseModal visible={props.visible} onRequestClose={props.onRequestClose}>
      {resetState === "SUCCESS" ? (
        <SucceededContent onClose={closeModal} />
      ) : (
        <>
          <Text style={styles.modalTitleText}>Reset your password</Text>
          <Text>
            Enter the email you use for Nailish, and we&apos;ll help you create
            a new password.
          </Text>
          <View style={styles.modalInnerBox}>
            <View>
              {resetState === "ERROR" ? (
                <Text style={styles.errorText}>Email is invalid.</Text>
              ) : (
                <View style={styles.space} />
              )}
              <TextInput
                value={inputEmail}
                onChangeText={onChangeText}
                placeholder={"Enter your email"}
                onFocus={() => setResetState("DEFAULT")}
                error={resetState === "ERROR"}
              />
            </View>
          </View>
          <View style={styles.modalButtonBox}>
            <RoundButton
              buttonColorType={ButtonColors.Confirm}
              onPress={_onResetPassword}
              text={"Send"}
              isLoading={resetState === "LOADING"}
            />
            <View style={{ marginTop: 20 }} />
            <RoundButton
              buttonColorType={ButtonColors.Alert}
              onPress={closeModal}
              text={"Cancel"}
              isLoading={resetState === "LOADING"}
            />
          </View>
        </>
      )}
    </BaseModal>
  );
};

/**
 *  Modal content when submit forget password
 **/
function SucceededContent({ onClose }: { onClose: () => void }) {
  return (
    <View style={{ justifyContent: "center" }}>
      <Text containerStyle={{}} style={styles.modalEmailSendText}>
        An email has been sent to the address you have provided.{"\n"}Please
        check your email
      </Text>
      <RoundButton onPress={onClose} text={"OK"} />
    </View>
  );
}

const styles = StyleSheet.create({
  modalEmailSendText: {
    ...generalTextStyles.regularNormalText,
    color: AppGeneralColor.TextColor.Primary,
    marginBottom: 60,
  },
  modalTitleText: {
    fontSize: 26,
  },
  modalInnerBox: {
    justifyContent: "space-around",
  },
  errorText: {
    color: AppGeneralColor.TextInput.Error,
    alignSelf: "flex-start",
    marginTop: 20,
    marginBottom: 8,
  },
  space: {
    marginBottom: Platform.OS === "ios" ? 25 : 27,
  },
  modalButtonBox: {
    marginTop: 20,
  },
});
