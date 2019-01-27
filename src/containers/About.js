import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { classesSelector } from '../selectors/about/classesSelector';
import { itemsSelector } from '../selectors/about/itemsSelector';
import {
  addClassAction,
  addItemAction,
} from '../actions';
import About from '../components/About';

const mapStateToProps = createStructuredSelector({
  classes: classesSelector,
  items: itemsSelector,
});

const mapDispatchToProps = dispatch => ({
  addClass: newClass => dispatch(addClassAction(newClass)),
  addItem: newItem => dispatch(addItemAction(newItem)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(About);
