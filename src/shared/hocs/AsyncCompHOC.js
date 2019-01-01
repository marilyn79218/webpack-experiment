import React from 'react';

const AsyncCompHOC = getComponent => 
  class AsyncComp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Component: null,
      };
    }

    componentDidMount() {
      getComponent().then(({ default: _default }) => this.setState({
        Component: _default,
      }));
    }

    render() {
      const { Component } = this.state;

      return (
        Component ? <Component {...this.props} /> : null
      )
    }
  }

export default AsyncCompHOC;
