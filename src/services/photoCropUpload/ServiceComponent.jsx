import PhotoCropUpload from '../../components/PhotoCropUpload';
import asService from './asService';

const options = {
  activeProp: 'open', resolveProp: 'onSaveDone', rejectProp: 'onClose', forceResolve: true,
};
export default asService(options)(PhotoCropUpload);
