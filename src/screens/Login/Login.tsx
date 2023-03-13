import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

// redux
import { useAppDispatch, useAppSelector } from "@src/store";
import { confirmedError, userSelector } from "@src/store/user/userSlice";
import { createUser, userLoginWithPass } from "@src/store/user/api";

// component
import { ButtonColors, RoundButton } from "@src/components/Button/Button";
import {
  TextInput,
  PasswordTextInput,
} from "@src/components/TextInput/TextInput";
import { Text } from "@src/components/Text/Text";
import { BaseActivityIndicator } from "@src/components/Indicator/BaseActivityIndicator";
import { ForgetPasswordModal } from "@src/screens/Login/components/ForgetPasswordModal";

// style
import { AppGeneralColor } from "@src/styles/ColorStyle";
import { FailedConfirmModal } from "@src/screens/Login/components/FailedConfirmModal";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailPassError, setEmailPassError] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isForgetModalVisible, setIsForgetModalVisible] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  const _onLoginWithEmail = () => {
    if (email && password) {
      dispatch(userLoginWithPass({ email, password }));
    } else {
      setEmailPassError(true);
    }
  };

  const _googleLogin = () => {
    // dispatch(googleLogin());
  };

  const _onCreateUser = () => {
    console.log("View _onCreateUser, email, password", { email, password });
    dispatch(createUser({ email, password }));
  };

  const _onSignUp = () => {
    setIsSignUp(true);
  };

  const _onCloseForgetPasswordModal = () => {
    setIsForgetModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      {user.status === "loading" ? (
        <BaseActivityIndicator />
      ) : (
        <>
          <ForgetPasswordModal
            visible={isForgetModalVisible}
            onRequestClose={() => setIsForgetModalVisible(false)}
            onClose={_onCloseForgetPasswordModal}
          />
          <FailedConfirmModal
            visible={!!user.error || user.status === "failed"}
            onRequestClose={() => dispatch(confirmedError())}
            modalInnerStyle={{ justifyContent: "space-around" }}
            onPressOk={() => dispatch(confirmedError())}
          />
          <Image
            style={styles.logoImage}
            resizeMode={"contain"}
            source={require("../../../assets/images/logo2.png")}
          />
          <View style={styles.inner}>
            {emailPassError ? (
              <Text style={styles.errorText}>Email or Password is wrong.</Text>
            ) : (
              <View style={styles.space} />
            )}
            <TextInput
              containerStyle={[styles.inputTextBox]}
              value={email}
              onChangeText={setEmail}
              placeholder={"Enter your email"}
              onFocus={() => setEmailPassError(false)}
              autoCapitalize={"none"}
              error={emailPassError}
            />
            <PasswordTextInput
              containerStyle={styles.inputTextBox}
              value={password}
              onChangeText={setPassword}
              placeholder={"Enter your password"}
              onFocus={() => setEmailPassError(false)}
              autoCapitalize={"none"}
              error={emailPassError}
              isPassword={true}
            />
            {isSignUp ? (
              <>
                <View style={{ marginTop: 24 }} />
                <View style={styles.loginButtonWrapper}>
                  <RoundButton
                    onPress={_onCreateUser}
                    text={"Create Account"}
                  />
                </View>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.forgetButton}
                  onPress={() => setIsForgetModalVisible(true)}
                >
                  <Text style={styles.forgetText}>Forget password?</Text>
                </TouchableOpacity>
                <View style={styles.loginButtonWrapper}>
                  <RoundButton
                    buttonColorType={ButtonColors.Confirm}
                    onPress={_onLoginWithEmail}
                    text={"Login"}
                  />
                </View>
              </>
            )}
            <View style={styles.border} />
            <TouchableOpacity
              style={styles.googleSingButton}
              onPress={_googleLogin}
            >
              <Image
                style={styles.googleImage}
                resizeMode={"contain"}
                source={require("../../../assets/images/google_signin_btn.png")}
              />
            </TouchableOpacity>
            <View style={styles.signUpBox}>
              <Text style={styles.signUpLeftText}>
                {isSignUp ? "Already have account?" : "Don't have an account?"}
              </Text>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={isSignUp ? () => setIsSignUp(false) : _onSignUp}
              >
                <Text style={styles.signUpButtonText}>
                  {isSignUp ? "Sign in" : "Sign up"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
  },
  inner: {
    width: "80%",
    marginTop: 30,
  },
  logoImage: {
    alignSelf: "center",
    height: 80,
    marginTop: "18%",
  },
  inputTextBox: {
    marginBottom: 20,
  },
  emailInput: {},
  errorText: {
    color: "#d61d00",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  space: {
    marginBottom: Platform.OS === "ios" ? 25 : 27,
  },
  forgetButton: {
    alignSelf: "center",
    marginBottom: 6,
    borderBottomColor: AppGeneralColor.TextColor.Primary,
    borderBottomWidth: 1,
  },
  forgetText: {
    color: AppGeneralColor.TextColor.Primary,
    paddingBottom: 3,
  },
  border: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cfcfcf",
  },
  googleSingButton: {
    width: "48%",
    marginTop: -20,
    alignSelf: "center",
  },
  googleImage: {
    width: "100%",
  },
  signUpButton: {
    alignSelf: "center",
    borderBottomColor: "#344dd9",
    borderBottomWidth: 1,
  },
  signUpBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginButtonWrapper: {
    marginTop: 12,
  },
  signUpLeftText: {
    color: "#7d7d7d",
    marginRight: 6,
  },
  signUpButtonText: {
    color: "#344dd9",
  },
});

export default Login;
