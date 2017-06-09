/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadModels } from './actions';
import { makeSelectModels, makeSelectLoading } from './selectors';

class App extends React.Component {
  componentWillMount() {
    this.props.loadModels();
  }

  render() {
    let content = <div />;

    if (this.props.models) {
      // Assign plugin component to children
      content = React.Children.map(this.props.children, child =>
        React.cloneElement(child, {
          exposedComponents: this.props.exposedComponents,
        })
      );
    }

    return (
      <div className="content-manager">
        {React.Children.toArray(content)}
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

App.propTypes = {
  children: React.PropTypes.node.isRequired,
  exposedComponents: React.PropTypes.object.isRequired,
  loadModels: React.PropTypes.func.isRequired,
  models: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
};

export function mapDispatchToProps(dispatch) {
  return {
    loadModels: () => dispatch(loadModels()),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  models: makeSelectModels(),
  loading: makeSelectLoading(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(App);