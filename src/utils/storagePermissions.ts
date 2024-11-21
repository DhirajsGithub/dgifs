import {Platform} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      if (Platform.Version >= 33) {
        const readImagesPermission = await request(
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        );
        const readVideosPermission = await request(
          PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
        );

        return (
          readImagesPermission === RESULTS.GRANTED &&
          readVideosPermission === RESULTS.GRANTED
        );
      } else {
        const writePermission = await request(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );
        return writePermission === RESULTS.GRANTED;
      }
    } catch (err) {
      return false;
    }
  }
  return true;
};
