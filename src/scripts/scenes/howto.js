
export default class HowtoScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'howto'
    })
  }

  create() {
    const centerX = this.cameras.main.centerX

    this.soundBtnOver = this.sound.add('btnover')
    this.soundBtnClick = this.sound.add('btnclick')

    this.bg = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'background')
    this.bg.setOrigin(0, 0)

    const howto = this.add.image(centerX, 50, 'howto')
    howto.setOrigin(0.5, 0)
    howto.setScale(1.5, 1.5)

    const goback = this.add.sprite(centerX, 700, 'menu_goback')
    goback.setInteractive()
    goback.setOrigin(0.5)
    goback.on('pointerup', this.onGoBack, this)
    goback.on('pointerover', this.onButtonOver, this)

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
