import { connect } from 'react-redux';
import * as brandSelectors from '../../../modules/brand/selectors';
import BasicEdit from '../../../components/BasicEdit';

const newBrand = {
  code: '',
  name: '',
  description: '',
  origin: '',
  logo: '',
};

const mapStateToProps = (state, { match: { params: { id } }, isNew }) => ({
  item: !isNew ? brandSelectors.brandById(state, { id }) : newBrand,
});

export default connect(mapStateToProps)(BasicEdit);
