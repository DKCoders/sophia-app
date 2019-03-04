import { connect } from 'react-redux';
import * as categorySelectors from '../../../modules/category/selectors';
import BasicEdit from '../../../components/BasicEdit';

const newCategory = {
  code: '',
  name: '',
  description: '',
  img: '',
};

const mapStateToProps = (state, { match: { params: { id } }, isNew }) => ({
  item: !isNew ? categorySelectors.categoryById(state, { id }) : newCategory,
});

export default connect(mapStateToProps)(BasicEdit);
