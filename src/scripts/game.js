import 'phaser'
import BootScene from './scenes/boot'
import PreloadScene from './scenes/preload'
import MenuScene from './scenes/menu'
import OptionsScene from './scenes/options'
import GameScene from './scenes/game'
import HowtoScene from './scenes/howto'

window.addEventListener('load', () => {

  const gameWidth = 800
  const gameHeight = 600

  const gameConfig = {
    title: 'T-Figher',
    type: Phaser.WEBGL,
    parent: 'game',
    backgroundColor: '#000',
    scale: {
      parent: 'phaser-game',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: gameWidth,
      height: gameHeight
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
  }

  const game = new Phaser.Game(gameConfig)

  document.querySelector('#load')?.classList.add('hide')

})
