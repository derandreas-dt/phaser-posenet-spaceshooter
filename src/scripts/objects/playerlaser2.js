
// const BaseEntity = require('./base')
import { BaseEntity } from './base'

class PlayerLaser2Container extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key) {
    super(scene)

    this._x = x
    this._y = y
    this._key = key

    this.add(new PlayerLaser2(this.scene, this._x, this._y, this._key, -30))
    this.add(new PlayerLaser2(this.scene, this._x, this._y, this._key, 0))
    this.add(new PlayerLaser2(this.scene, this._x, this._y, this._key, 30))
    this.setVisible(true)
    this.setActive(true)

    this.scene.add.existing(this)
  }
}

class PlayerLaser2 extends BaseEntity {
  constructor(scene, x, y, key, angle) {
    super(scene, x, y, key || 'plaser')
    this.body.velocity.y = -500
    this.angle = angle
    this.scene.physics.velocityFromAngle(this.angle - 90, 100, this.body.velocity)

    this.scene.playerLasers.add(this)
  }

  preUpdate() {
    if(this.y < 0 || this.y > this.scene.cameras.main.height) {
        this.setActive(false)
      }
  }
}

export {
  PlayerLaser2Container,
  PlayerLaser2
}
