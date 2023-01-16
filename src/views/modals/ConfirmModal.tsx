import { FC } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IConfirmModalProps {
  visible: boolean;
  onSelected: (value: ConfirmModalOption) => void;
}

export enum ConfirmModalOption {
  Confirm,
  Cancel,
}

export const ConfirmModal: FC<IConfirmModalProps> = (props) => {
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View style={styles.modalContainer}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option} onPress={() => props.onSelected(ConfirmModalOption.Confirm)}>
            <Text style={styles.optionText}>confirm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={() => props.onSelected(ConfirmModalOption.Cancel)}>
            <Text style={styles.cancelText}>cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  option: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    alignSelf: 'stretch',
  },
  optionText: {
    fontSize: 20,
    textAlign: 'center',
  },
  cancelContainer: {
    marginTop: 20,
  },
  cancelText: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
  },
});
