import 'phaser'
import BootScene from './scenes/boot'
import PreloadScene from './scenes/preload'
import MenuScene from './scenes/menu'
import OptionsScene from './scenes/options'
import GameScene from './scenes/game'
import HowtoScene from './scenes/howto'

window.addEventListener('load', () => {

  const gameConfig = {
    title: 'T-Figher',
    type: Phaser.WEBGL,
    parent: 'game',
    backgroundColor: '#000',
    scale: {
      parent: 'phaser-game',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: window.innerWidth,
      height: window.innerHeight,
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      },
    },
    render: {
      antialiasGL: false,
      pixelArt: true,
    },
    callbacks: {
      postBoot: () => {
        sizeChanged()
      },
    },
    canvasStyle: `display: block; width: 100%; height: 100%;`,
    autoFocus: true,
    audio: {
      disableWebAudio: false,
    },
    scene: [
      BootScene,
      PreloadScene,
      MenuScene,
      OptionsScene,
      HowtoScene,
      GameScene
    ],
  };

  const sizeChanged = () => {
    if (game.isBooted) {
      setTimeout(() => {
        game.scale.resize(window.innerWidth, window.innerHeight);
        game.canvas.setAttribute(
          'style',
          `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
        );
      }, 100)
    }
  }
  window.onresize = () => sizeChanged()
  const game = new Phaser.Game(gameConfig)

  document.querySelector('#load')?.classList.add('hide')

})
