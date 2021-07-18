
// const BaseEntity = require('./base')
// const PlayerLaser = require('./playerlaser')

import { BaseEntity } from './base'
import { PlayerLaser } from './playerlaser'
import { PlayerLaser2Container } from './playerlaser2'

class Player extends BaseEntity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player')

    this.setData({
      speed: 200,
      isShooting: false,
      timerShootDelay: 10,
      timerShootTick: 9,
      health: 100,
      currentLaser: 'laser1'
    })

    this.animState = 'fly'

    this.body.setImmovable(true)

    this.availLasers = {
      'laser1': PlayerLaser,
      'laser2': PlayerLaser2Container
    }
  }

  moveLeft(justDown) {
    this.body.velocity.x = -this.getData('speed')
    if(justDown) {
      // this.play('fly-left')
      this.animState = 'fly-left'
    }
  }

  moveRight(justDown) {
    this.body.velocity.x = this.getData('speed')
    if(justDown) {
      // this.play('fly-right')
      this.animState = 'fly-right'
    }
  }

  moveStraight() {
    this.body.setVelocity(0, 0)
    this.animState = 'fly'
  }

  onDestroy() {
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.scene.start('gameover')
      }
    })
  }

  update() {
    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width)
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height)

    if(this.anims.currentAnim && this.anims.currentAnim.key !== this.animState) {
      this.play(this.animState)
    }

    if(this.getData('isShooting')) {
      if(this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1)
      } else {
        const laser = new this.availLasers[this.getData('currentLaser')](this.scene, this.x, this.y, 'plaser')
        this.scene.playerLasers.add(laser)

        this.scene.sndLaser.play()

        this.setData('timerShootTick', 0)
        this.setData('timerShootDelay', Phaser.Math.Between(5, 20))
      }
    }
  }
}

export {
  Player
}
