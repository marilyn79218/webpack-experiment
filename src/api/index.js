import { SONGS } from '../shared/fixtures';

export const fetchSongsAPI = (songCount) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(SONGS.slice(0, songCount));
  }, 1000);
});
