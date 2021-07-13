// base entity

class BaseEntity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key)

    this.scene.add.existing(this)
    this.scene.physics.world.enableBody(this, 0)
    this.body.setVelocity(0, 0)
    this.body.setImmovable(true)
    this.setData('type', type)
    this.setData('isDead', false)
  }

  explode(isDestoyable) {
    if(!this.getData('isDead')) {

      // this.setTexture('explosion')
      this.play('explosion')
      // this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)].play()

      if(this.shootTimer) {
        this.shootTimer.remove(false)
      }

      this.on('animationcomplete', () => {
        if(isDestoyable) {
          this.destroy()
        } else {
          this.setVisible(false)
          this.setActive(false)
        }
      })

      this.setDead()
    }
  }

  setDead() {
    this.setAngle(0)
    this.body.setVelocity(0, 0)
    this.setData('isDead', true)
  }
}

export {
  BaseEntity
}
