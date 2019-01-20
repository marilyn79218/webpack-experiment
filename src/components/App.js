import React from 'react';
import moment from 'moment';

// Try to import what you need only. See:
// 1. https://medium.com/p/ce3b4b634c46#eb41
// 2. https://github.com/react-bootstrap/react-bootstrap/issues/2683
import Button from 'react-bootstrap/lib/Button'; // Lead to minimized bundle
// import { Button } from 'react-bootstrap/lib';
// import { Button } from 'react-bootstrap';

import ChickenFakeEyes from '../shared/assets/GG.jpg';
import { fetchSongsAPI } from '../api';

console.log('Today', moment().format());

class App extends React.Component {
  constructor(props) {
    super(props);
    this.fetchSongs = this.fetchSongs.bind(this);

    this.state = {
      count: 0,
      songs: [],
    };
  }

  fetchSongs(nextSongCount) {
    this.setState({ count: nextSongCount });
    let now = (this.now = Date.now());
    console.log('Now click', now);

    fetchSongsAPI(nextSongCount).then(songs => {
      if (now === this.now) {
        console.log('Now equal', nextSongCount, now);
        this.setState({ songs });
      }
    });
  }

  render() {
    const { count, songs } = this.state;

    return (
      <>
        Hello from React
        <Button
          variant="primary"
          onClick={() => this.fetchSongs(count + 1)}
        >HI</Button>
        <div>
          <span>Count: { count }</span>
          <span>Songs:</span>
          <ul>
            {
              songs.map(song => (
                <li
                  key={song.year}
                >
                  { song.author }
                </li>
              ))
            }
          </ul>
        </div>
        <img
          src={ChickenFakeEyes}
        />
      </>
    )
  }
}

export default App;
