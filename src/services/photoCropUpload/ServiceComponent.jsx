import PhotoCropUpload from '../../components/PhotoCropUpload';
import asService from '../../hoc/asService';

const options = {
  activeProp: 'open', resolveProp: 'onSaveDone', rejectProp: 'onClose', forceResolveOnReject: true,
};
export default asService(options)(PhotoCropUpload);
