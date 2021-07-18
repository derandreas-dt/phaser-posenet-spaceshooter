
class LaserPickup extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key)

    this.scene.add.existing(this)
    this.scene.physics.world.enableBody(this, 0)
    this.body.setVelocityY(150)
    this.body.setImmovable(true)
  }
}


export {
  LaserPickup
}
