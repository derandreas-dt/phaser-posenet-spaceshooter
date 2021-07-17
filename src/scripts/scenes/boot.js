import { Scene } from 'phaser'

export default class BootScene extends Scene {

  constructor() {
    super({
      key: 'BootScene'
    })
  }

  preload() {
    this.load.json('assets', 'assets/assets.json');
  }

  create() {
    this.registry.set('options-music', true)
    this.registry.set('options-sound', true)
    this.registry.set('showVideo', false)
    this.registry.set('draw-keypoints', false)
    this.registry.set('draw-skeleton', false)
    this.registry.set('master-sound-volume', 0.7)

    this.scene.start('preload')
  }
}
