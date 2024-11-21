import React from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
const {height} = Dimensions.get('window');


interface DownloadOption {
  label: string;
  value: string;
}

interface DownloadModalProps {
  isVisible: boolean;
  onClose: () => void;
  downloadGifOptions: any[];
  handleDownload: (option: DownloadOption) => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({
  isVisible,
  onClose,
  downloadGifOptions,
  handleDownload,
}) => {
    const {theme} = useTheme();

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.downloadModal, {backgroundColor: theme.modalBg}]}>
              <Text style={[styles.modalTitle, {color: theme.textColor}]}>Download Options</Text>
              <ScrollView
                showsVerticalScrollIndicator={true}
                contentContainerStyle={styles.modalContent}>
                {downloadGifOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.downloadOption}
                    onPress={() => handleDownload(option)}>
                    <Text style={{color: theme.textColor}}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
      },
      downloadModal: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        height: height * 0.5,
        width: '100%',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      modalContent: {
        flexGrow: 1,
        alignItems: 'center',
      },
      downloadOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        width: '100%',
        alignItems: 'center',
      },
      cancelButton: {
        marginTop: 15,
        padding: 15,
        alignSelf: 'center',
      },
      cancelButtonText: {
        color: 'red',
        fontWeight: 'bold',
      },
});

export default DownloadModal;
