import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

throttle(
  player.on('timeupdate', function (data) {
    console.log(data.seconds);
  }),
  5000,
);

player.on('play', function () {
  console.log('start playing');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player
  .setCurrentTime(30.456)
  .then(function (seconds) {
    console.log(seconds);
  })
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

// jQuery(window).on('scroll', _.throttle(updatePosition, 100));
