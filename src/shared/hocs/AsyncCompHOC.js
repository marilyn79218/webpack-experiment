import React from 'react';

const AsyncCompHOC = (getComponent, getReducer) => 
  class AsyncComp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Component: null,
      };
    }

    componentDidMount() {
      Promise.all([getComponent(), getReducer()])
        .then((
          [{ default: Component }, { default: reducer }]
        ) =>
          this.setState({
            Component,
          })
        );
    }

    render() {
      const { Component } = this.state;

      return (
        Component ? <Component {...this.props} /> : null
      )
    }
  }

export default AsyncCompHOC;
