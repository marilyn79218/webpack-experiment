import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { countSelector } from '../selectors';
import { setCountAction } from '../actions';
import App from '../components/App';

const mapStateToProps = createStructuredSelector({
  count: countSelector,
});

const mapDispatchToProps = dispatch => ({
  setCount: nextCount => dispatch(setCountAction(nextCount)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
