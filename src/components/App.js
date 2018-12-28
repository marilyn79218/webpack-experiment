import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    const { count } = this.state;

    return (
      <>
        Hello from React
        <div>
          <span>Count: { count }</span>
        </div>
      </>
    )
  }
}

export default App;
