import React, { useState } from 'react';
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// style
import { AppGeneralColor } from '@src/styles/ColorStyle';

// component
import { Text } from '@src/components/Text/Text';
import { StyleSheet } from 'react-native';

export interface PickerItemType {
  id: number;
  label: string;
  value: string;
}

interface PickerModalAtopProps {
  container?: ViewStyle;

  options: PickerItemType[];
  onConfirm?: (id: number) => void;
}

export const PickerModalAtom: React.FC<PickerModalAtopProps> = props => {
  const [isShowPicker, setIsShowPicker] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const _closeModal = () => {
    setIsShowPicker(false);
    props.onConfirm && props.onConfirm(props.options[selectedIndex].id);
  };

  const _onValueChange = (_: any, itemIndex: number) => {
    setSelectedIndex(itemIndex);
  };

  const _onPressSelector = () => {
    setIsShowPicker(true);
  };

  return (
    <View>
      <View style={props.container}>
        <TouchableOpacity onPress={_onPressSelector}>
          <Text>{props.options[selectedIndex].label}</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isShowPicker} transparent onRequestClose={_closeModal}>
        <TouchableWithoutFeedback onPress={_closeModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={{ backgroundColor: '#fff', alignItems: 'flex-end' }}>
          <TouchableOpacity
            onPress={_closeModal}
            style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
            <Text style={{ color: AppGeneralColor.TextColor.Link }}>Done</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            paddingBottom: 30,
          }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Picker
              style={{ width: '90%' }}
              selectedValue={props.options[selectedIndex].value}
              itemStyle={{}}
              onValueChange={_onValueChange}>
              {props.options.map(item => {
                return (
                  <Picker.Item key={`${item.id}`} label={`${item.label}`} value={`${item.value}`} />
                );
              })}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: AppGeneralColor.Modal.BaseBackground,
  },
});

