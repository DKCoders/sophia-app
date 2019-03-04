/* eslint-disable no-underscore-dangle */
import { connect } from 'react-redux';
import BasicView from '../../../components/BasicView';
import * as categorySelectors from '../../../modules/category/selectors';

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  item: categorySelectors.categoryById(state, { id }),
});

export default connect(mapStateToProps)(BasicView);
