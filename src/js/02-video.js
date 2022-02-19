import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(saveTimeToLocalStorage, 1000));

player
  .setCurrentTime(getTimeFromLocalStorage())
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

function saveTimeToLocalStorage(data) {
  try {
    const time = JSON.stringify(data.seconds);
    localStorage.setItem('videoplayer-current-time', time);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

function getTimeFromLocalStorage() {
  try {
    const data = localStorage.getItem('videoplayer-current-time');
    const time = JSON.parse(data);
    return time;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

// player.on('play', function () {
//   console.log('start playing');
// });

// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });
