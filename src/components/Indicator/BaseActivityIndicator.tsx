import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle, ActivityIndicatorProps } from 'react-native';
import { AppGeneralColor } from '@src/styles/ColorStyle';

interface BaseActivityIndicatorProps extends ActivityIndicatorProps {
  containerStyle?: ViewStyle | ViewStyle[];
  color?: string;
  size?: 'small' | 'large';
  style?: ViewStyle | ViewStyle[];
}

export function BaseActivityIndicator({
  containerStyle,
  color,
  size,
  ...rest
}: BaseActivityIndicatorProps) {
  return (
    <View style={[styles.defaultContainer, containerStyle]}>
      <ActivityIndicator
        color={color ?? AppGeneralColor.Indicator.Primary}
        size={size || 'large'}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

