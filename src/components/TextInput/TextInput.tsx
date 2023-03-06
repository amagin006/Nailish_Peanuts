import React, { useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  TouchableOpacity,
  TextInputProps as RNTextInputPrps,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { AppGeneralColor } from '@src/styles/ColorStyle';
import { Text } from '@src/components/Text/Text';

interface TextInputProps extends RNTextInputPrps {
  containerStyle?: ViewStyle | ViewStyle[];
  inputTextBoxStyle?: ViewStyle;
  style?: ViewStyle;
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: boolean;
  errorText?: string;
}

export function TextInput(props: TextInputProps): JSX.Element {
  const borderColor = props.error
    ? AppGeneralColor.TextInput.Error
    : AppGeneralColor.TextInput.Primary;
  return (
    <View style={props.containerStyle}>
      <View style={[props.inputTextBoxStyle, styles.inputTextBox, { borderColor: borderColor }]}>
        <RNTextInput
          style={[props.style, styles.textInput]}
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          onFocus={props.onFocus}
          autoCapitalize={props.autoCapitalize || 'none'}
        />
      </View>
      {!!props.errorText ? (
        <Text style={[styles.errorText, { color: borderColor }]}>{props.errorText}</Text>
      ) : (
        <View style={styles.errorSpace} />
      )}
    </View>
  );
};

interface PasswordTextInputProps extends TextInputProps {
  isPassword?: boolean;
}

export const PasswordTextInput: React.FC<PasswordTextInputProps> = props => {
  const [isHide, setIsHide] = useState<boolean>(false);

  const borderColor = props.error
    ? AppGeneralColor.TextInput.Error
    : AppGeneralColor.TextInput.Primary;
  return (
    <View style={props.containerStyle}>
      <View style={[styles.inputTextBox, styles.passwordInputText, { borderColor: borderColor }]}>
        <RNTextInput
          style={[props.style, styles.textInput]}
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          onFocus={props.onFocus}
          autoCapitalize={props.autoCapitalize || 'none'}
          secureTextEntry={isHide}
        />
        {props.isPassword && (
          <TouchableOpacity onPress={() => setIsHide(!isHide)}>
            <Ionicons style={styles.eyeIcon} name={isHide ? 'md-eye-off' : 'md-eye'} size={26} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputTextBox: {
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  passwordInputText: {
    paddingRight: 6,
  },
  eyeIcon: {
    paddingTop: 3,
  },
  errorText: {
    marginTop: 4,
  },
  errorSpace: {
    marginTop: 20,
  },
});

