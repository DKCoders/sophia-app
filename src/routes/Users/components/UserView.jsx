/* eslint-disable no-underscore-dangle */
import { connect } from 'react-redux';
import BasicView from '../../../components/BasicView';
import * as userSelectors from '../../../modules/user/selectors';

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  item: userSelectors.userById(state, { id }),
});

export default connect(mapStateToProps)(BasicView);
