class HealthBar extends Phaser.GameObjects.Graphics {
  constructor(scene, x, y) {
    super(scene, {
      x: x,
      y: y
    })
    this.value = 100
    this.percentFactor = 76 / 100
    this.bar = this.scene.add.graphics()
    this.scene.add.existing(this.bar)
  }

  increase(val) {
    this.value += val

    if(this.value > 100) {
      this.value = 100
    }
  }

  decrease(val) {
    this.value -= val

    if(this.value < 0) {
      this.value = 0
    }
  }

  update() {
    this.bar.clear()

    this.bar.fillStyle(0xffffff)
    this.bar.fillRect(this.x, this.y, 80, 20)

    this.bar.fillStyle(0xffffff)
    this.bar.fillRect(this.x + 2, this.y + 2, 76, 18)

    if(this.value < 33) {
      this.bar.fillStyle(0xff0000)
    } else if(this.value < 66) {
      this.bar.fillStyle(0xdd517c)
    } else {
      this.bar.fillStyle(0x00ff00)
    }

    this.bar.fillRect(
      this.x + 2,
      this.y + 2,
      Math.floor(this.percentFactor * this.value),
      16
    )
  }
}

export {
  HealthBar
}
