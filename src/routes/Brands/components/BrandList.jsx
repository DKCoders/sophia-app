import { connect } from 'react-redux';
import BasicList from '../../../components/BasicList';
import { brandsAsArray } from '../../../modules/brand/selectors';

const mapStateToProps = state => ({
  items: brandsAsArray(state),
});

const mapDispatchToProps = dispatch => ({
  onRemove(item) {
    dispatch.brand.removeBrand({ brandId: item._id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicList);
