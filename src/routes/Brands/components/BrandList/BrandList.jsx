import { connect } from 'react-redux';
import BasicList from '../../../../components/BasicList';
import { brandsAsArray } from '../../../../modules/brand/selectors';

const properties = {
  title: 'name',
  subtitle: 'code',
  avatarSrc: 'logo',
  avatarAlt: 'name',
};

const mapStateToProps = state => ({
  items: brandsAsArray(state),
  properties,
  routeTitle: 'Brands',
  mainRoute: 'brands',
});

const mapDispatchToProps = dispatch => ({
  onRemove(item) {
    dispatch.brand.removeBrand({ brandId: item._id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicList);
