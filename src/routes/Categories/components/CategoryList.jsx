import { connect } from 'react-redux';
import BasicList from '../../../components/BasicList';
import { categoriesAsArray } from '../../../modules/category/selectors';

const mapStateToProps = state => ({
  items: categoriesAsArray(state),
});

const mapDispatchToProps = dispatch => ({
  onRemove(item) {
    dispatch.category.removeCategory({ categoryId: item._id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicList);
