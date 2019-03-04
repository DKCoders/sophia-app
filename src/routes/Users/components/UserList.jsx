import { connect } from 'react-redux';
import BasicList from '../../../components/BasicList';
import { usersAsArray } from '../../../modules/user/selectors';

const mapStateToProps = state => ({
  items: usersAsArray(state),
});

const mapDispatchToProps = dispatch => ({
  onRemove(item) {
    dispatch.user.removeUser({ userId: item._id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicList);
