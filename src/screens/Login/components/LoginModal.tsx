import React from 'react';
import { StyleSheet, View, Platform, ViewStyle } from 'react-native';

// Atom
import { Text} from '@src/components/Text/Text';
import {BaseModal} from '@src/components/Modal/BaseModal'
import { TextInput } from '@src/components/TextInput/TextInput';
import{BaseActivityIndicator} from '@src/components/Indicator/BaseActivityIndicator'

// components
import { ButtonColors, RoundButton } from '@src/components/button/button';

// style
import { AppGeneralColor } from '@src/styles/ColorStyle';
import { generalTextStyles } from '@src/styles/TextStyle';

interface ForgetModalProps {
  visible: boolean;
  onRequestClose: () => void;

  // confirm modal
  onPressOk: () => void;

  // onPressButton Reset Modal
  onPressSend: () => void;
  onPressCancel: () => void;

  // TextInput
  onChangeText: (text: string) => void;
  onFocusInput: () => void;
  inputValue?: string;

  isLoading: boolean;
  isSendSuccess: boolean;
  forgetEmailError: boolean;
  error?: boolean;
}

export const ForgetModal: React.FC<ForgetModalProps> = props => {
  return (
    <BaseModal visible={props.visible} onRequestClose={props.onRequestClose}>
      {props.isLoading ? (
        <BaseActivityIndicator />
      ) : props.isSendSuccess ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text containerStyle={{ marginBottom: 60 }} style={styles.modalEmailSendText}>
            An email has been sent to the address you have provided.{'\n'}Please check your email
          </Text>
          <RoundButton onPress={props.onPressOk} text={'OK'} />
        </View>
      ) : (
        <>
          <Text style={styles.modalTitleText}>Reset your password</Text>
          <Text>
            Enter the email you use for Nailish, and we&apos;ll help you create a new password.
          </Text>
          <View style={styles.modalInnerbox}>
            <View>
              {props.forgetEmailError ? (
                <Text style={styles.errorText}>Email is invalid.</Text>
              ) : (
                <View style={styles.space} />
              )}
              <TextInput
                containerStyle={{ marginBottom: 20, paddingHorizontal: 10 }}
                value={props.inputValue}
                onChangeText={props.onChangeText}
                placeholder={'Enter your email'}
                onFocus={props.onFocusInput}
                error={props.error}
              />
            </View>
          </View>
          <View style={styles.modalButtonBox}>
            <RoundButton
              buttonColorType={ButtonColors.Confirm}
              onPress={props.onPressSend}
              text={'Send'}
            />
            <RoundButton
              buttonColorType={ButtonColors.Alert}
              onPress={props.onPressCancel}
              text={'Cancel'}
            />
          </View>
        </>
      )}
    </BaseModal>
  );
};

interface FaliedConfirmModalProps {
  visible: boolean;
  onRequestClose: () => void;
  modalInnerStyle?: ViewStyle | ViewStyle[];

  createFailedMessage?: string;
  loginFailedMessage?: string;
  onPressOk: () => void;
}

export const FaliedConfirmModal: React.FC<FaliedConfirmModalProps> = props => {
  return (
    <BaseModal
      visible={props.visible}
      onRequestClose={props.onRequestClose}
      modalInnerStyle={props.modalInnerStyle}>
      <View>
        <Text style={styles.createFaliedText}>
          {props.createFailedMessage || props.loginFailedMessage || ''}
        </Text>
        <Text style={styles.createFaliedText}>Please try again</Text>
      </View>
      <RoundButton
        buttonColorType={ButtonColors.Primary}
        onPress={props.onPressOk}
        text={'OK'}
      />
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  modalEmailSendText: {
    ...generalTextStyles.regularNormalText,
    color: AppGeneralColor.TextColor.Primary,
    marginBottom: 60,
  },
  modalTitleText: {
    fontSize: 26,
    marginVertical: 30,
  },
  modalInnerbox: {
    flex: 1,
    justifyContent: 'space-around',
  },
  errorText: {
    color: AppGeneralColor.TextInput.Error,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  space: {
    marginBottom: Platform.OS === 'ios' ? 25 : 27,
  },
  modalButtonBox: {
    marginBottom: 40,
  },
  createFaliedText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});

