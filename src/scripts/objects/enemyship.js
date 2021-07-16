
import { BaseEntity } from './base'
import { EnemyLaser } from './enemylaser'


class EnemyShip extends BaseEntity {
  constructor(scene, x, y, key, typ) {
    super(scene, x, y, key, typ || 'Enemy')

    this.play(key)

    this.body.velocity.y = Phaser.Math.Between(50, 100)
    this.shootTimer = this.scene.time.addEvent({
      delay: 1500,
      callback: () => {
        const laser = new EnemyLaser(this.scene, this.x, this.y)
        laser.setScale(this.scaleX)
        this.scene.enemyLasers.add(laser)
        this.scene.sndElaser[
          Phaser.Math.Between(0, this.scene.sndElaser.length - 1)
        ].play()
      },
      loop: true
    })
  }
}

class Venemy extends EnemyShip {
  constructor(scene, x, y) {
    super(scene, x, y, 'venemy')
  }
}

class Oenemy extends EnemyShip {
  constructor(scene, x, y) {
    super(scene, x, y, 'oenemy')
  }
}

export {
  EnemyShip,
  Venemy,
  Oenemy
}
