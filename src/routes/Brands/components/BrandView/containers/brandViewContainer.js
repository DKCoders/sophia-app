import { connect } from 'react-redux';
import { select } from '@rematch/select';
import BrandView from '../BrandView';

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  brand: select.brand.brandById(state, { id }),
});

const mapDispatchToProps = ({ brand: { patchBrand } }) => ({ patchBrand });

export default connect(mapStateToProps, mapDispatchToProps)(BrandView);
