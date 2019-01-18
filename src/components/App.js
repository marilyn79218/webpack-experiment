import React from 'react';

// Try to import what you need only. See:
// 1. https://medium.com/p/ce3b4b634c46#eb41
// 2. https://github.com/react-bootstrap/react-bootstrap/issues/2683
import Button from 'react-bootstrap/lib/Button'; // Lead to minimized bundle
// import { Button } from 'react-bootstrap/lib';
// import { Button } from 'react-bootstrap';

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
        <Button variant="primary">HI</Button>
        <div>
          <span>Count: { count }</span>
        </div>
      </>
    )
  }
}

export default App;
