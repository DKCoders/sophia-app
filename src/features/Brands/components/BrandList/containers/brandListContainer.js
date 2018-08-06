import { connect } from 'react-redux';
import { select } from '@rematch/select';
import BrandList from '../BrandList';

const mapStateToProps = state => ({
  brands: select.brand.brandsArraySelector(state),
});

const mapDispatchToProps = ({ brand: { fetchBrands } }) => ({ fetchBrands });

export default connect(mapStateToProps, mapDispatchToProps)(BrandList);
