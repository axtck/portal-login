import React, { FC, useContext } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ActionButton } from '../../../components/buttons/ActionButton';
import { ParagraphText } from '../../../components/text/ParagraphText';
import { IModalContext, IModalOption, initialModalContext, ModalContext } from '../../../context/ModalContext';

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
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={!!modalContext.options.length}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ParagraphText>{modalContext.title}</ParagraphText>
            {modalContext.options.map((o) => {
              return (
                <Pressable key={o.id} style={[styles.button, styles.buttonClose]} onPress={() => handleSelected(o)}>
                  <Text style={styles.textStyle}>{o.name}</Text>
                </Pressable>
              );
            })}
            <ActionButton title="cancel" onPress={handleCancel} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
