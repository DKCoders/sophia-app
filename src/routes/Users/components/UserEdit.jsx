import { connect } from 'react-redux';
import * as userSelectors from '../../../modules/user/selectors';
import BasicEdit from '../../../components/BasicEdit';

const newUser = {
  username: '',
  email: '',
  name: '',
};

const mapStateToProps = (state, { match: { params: { id } }, isNew }) => ({
  item: !isNew ? userSelectors.userById(state, { id }) : newUser,
});

export default connect(mapStateToProps)(BasicEdit);
