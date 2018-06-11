import { connect } from 'react-redux';
import { select } from '@rematch/select';
import Brands from '../Brands';

const mapStateToProps = state => ({
  brands: select.brand.brandsAsArray(state),
});

const mapDispatchToProps = ({ brand: { fetchBrands } }) => ({ fetchBrands });

export default connect(mapStateToProps, mapDispatchToProps)(Brands);
