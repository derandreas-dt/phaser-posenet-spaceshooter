import {
  ToggleButton
} from '../objects/button'

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'options'
    })
  }

  create() {
    const centerX = this.cameras.main.centerX

    this.bg = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'background')
    this.bg.setOrigin(0, 0)

    this.soundBtnOver = this.sound.add('btnover')
    this.soundBtnClick = this.sound.add('btnclick')

    const title = this.add.sprite(centerX, 100, 'logo')
    title.setOrigin(0.5)

    const music = new ToggleButton(centerX, 300, 'menu_music', this, {
      on: 'menu_music_on',
      off: 'menu_music_off'
    }, this.registry.get('options-music'))
    music.on('changed', this.onMusicChanged, this)
    music.on('over', this.onButtonOver, this)

    const sound = new ToggleButton(centerX, 400, 'menu_sfx', this, {
      on: 'menu_sfx_on',
      off: 'menu_sfx_off'
    }, this.registry.get('options-sound'))
    sound.on('changed', this.onSoundChanged, this)
    sound.on('over', this.onButtonOver, this)

    const goback = this.add.sprite(centerX, 500, 'menu_goback')
    goback.setInteractive()
    goback.setOrigin(0.5)
    goback.on('pointerup', this.onGoBack, this)
    goback.on('pointerover', this.onButtonOver, this)


    this.add.existing(music);
    this.add.existing(sound);

  }
  sfxPlay(sfx) {
    if(this.registry.get('options-sound')) {
      sfx.play()
    }
  }

  onMusicChanged(btn, value) {
    this.registry.set('options-music', value)
    this.sfxPlay(this.soundBtnClick)
  }
  onSoundChanged(btn, value) {
    this.registry.set('options-sound', value)
    this.sfxPlay(this.soundBtnClick)
  }

  onButtonOver() {
    this.sfxPlay(this.soundBtnOver)
  }

  onGoBack() {
    this.sfxPlay(this.soundBtnClick)
    this.scene.start('menu')
  }

  update() {
    this.bg.tilePositionY -= .5
  }
}
