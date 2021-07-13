import {
  ImageButton
} from '../objects/button'

import {
  ScrollingBackground
} from '../objects/starfield'

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'menu'
    })
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'background')
    this.bg.setOrigin(0, 0)

    this.soundBtnOver = this.sound.add('btnover')
    this.soundBtnClick = this.sound.add('btnclick')

    const title = this.add.sprite(this.cameras.main.centerX, 100, 'logo')
    title.setOrigin(0.5)

    const start = new ImageButton(this.cameras.main.centerX, 300, 'menu_startgame', this, {
      up: 'menu_startgame_up',
      down: 'menu_startgame_down',
      over: 'menu_startgame_over',
      out: 'menu_startgame_up'
    })
    start.on('click', this.onStartGameClick, this)
    start.on('over', this.onButtonOver, this)

    const options = new ImageButton(this.cameras.main.centerX, 400, 'menu_options', this, {
      up: 'menu_options_up',
      down: 'menu_options_down',
      over: 'menu_options_over',
      out: 'menu_options_up'
    })
    options.on('click', this.onOptionsClick, this)
    options.on('over', this.onButtonOver, this)

    const howto = new ImageButton(this.cameras.main.centerX, 500, 'menu_howto', this, {
      up: 'menu_howto_up',
      down: 'menu_howto_down',
      over: 'menu_howto_over',
      out: 'menu_howto_up'
    })
    howto.on('click', this.onHowtoClick, this)
    howto.on('over', this.onButtonOver, this)


  }

  onStartGameClick() {
    this.sfxPlay(this.soundBtnClick)
    this.scene.start('game')
  }

  onOptionsClick() {
    this.sfxPlay(this.soundBtnClick)
    this.scene.start('options')
  }
  onHowtoClick() {
    this.sfxPlay(this.soundBtnClick)
    this.scene.start('howto')
  }
  onButtonOver() {
    this.sfxPlay(this.soundBtnOver)
  }

  sfxPlay(sfx) {
    if(this.registry.get('options-sound')) {
      sfx.play()
    }
  }
  update() {

    this.bg.tilePositionY -= .5
  }
}
