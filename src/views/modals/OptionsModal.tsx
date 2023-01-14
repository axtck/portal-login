import { FC, useContext } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IModalContext, IModalOption, initialModalContext, ModalContext } from '../../context/ModalContext';

interface IOptionsModalProps {}

export const OptionsModal: FC<IOptionsModalProps> = () => {
  const { modalContext, setModalContext } = useContext<IModalContext>(ModalContext);

  const handleSelected = (option: IModalOption) => {
    setModalContext({ ...initialModalContext, key: modalContext.key, selectedOption: option });
  };

  const handleCancel = () => {
    setModalContext(initialModalContext);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={!!modalContext.options.length}>
      <View style={styles.modalContainer}>
        <View style={styles.optionsContainer}>
          {modalContext.options.map((o) => {
            return (
              <TouchableOpacity key={o.id} style={styles.option} onPress={() => handleSelected(o)}>
                <Text style={styles.optionText}>{o.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
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
