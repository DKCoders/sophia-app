/* eslint-disable no-underscore-dangle */
import { connect } from 'react-redux';
import BasicView from '../../../components/BasicView';
import * as brandSelectors from '../../../modules/brand/selectors';

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  item: brandSelectors.brandById(state, { id }),
});

export default connect(mapStateToProps)(BasicView);
