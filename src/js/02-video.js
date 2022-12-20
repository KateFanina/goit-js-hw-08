import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const PLAYER_CURRENT_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const setTimeUpdateData = data => {
  console.log('oncePerSecond', data.seconds);
  localStorage.setItem(PLAYER_CURRENT_TIME, JSON.stringify(data));
};

player.on(
  'timeupdate',
  throttle(data => setTimeUpdateData(data), 1000)
);

player
  .unload()
  .then(() => {
    const updateTime = localStorage.getItem(PLAYER_CURRENT_TIME);
    if (!updateTime) {
      return;
    }
    const seconds = JSON.parse(updateTime).seconds;
    player.setCurrentTime(+seconds);
  })
  .catch(error => console.log(error));
