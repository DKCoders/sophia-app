import ConfirmDialog from '../../components/ConfirmDialog';
import asService from '../../hoc/asService';

const options = {
  activeProp: 'open', resolveProp: 'onConfirm', rejectProp: 'onCancel', forceResolveOnReject: true, rejectValue: false, resolveValue: true,
};
export default asService(options)(ConfirmDialog);
