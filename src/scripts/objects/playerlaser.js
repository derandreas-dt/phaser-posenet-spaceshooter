
// const BaseEntity = require('./base')
import { BaseEntity } from './base'

class PlayerLaser extends BaseEntity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key || 'plaser')
    this.body.velocity.y = -500
  }

  preUpdate() {
    if(this.y < 0 || this.y > this.scene.cameras.main.height) {
        this.setActive(false)
      }
  }
}

export {
  PlayerLaser
}
