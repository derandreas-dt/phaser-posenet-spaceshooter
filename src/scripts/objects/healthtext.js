export default class HealthText extends Phaser.GameObjects.Text {
  constructor(scene, player) {
    super(scene, scene.cameras.main.width - 100, 10, '', { color: 'white', fontSize: '28px' })
    scene.add.existing(this)
    this.setOrigin(1, 0)

    this.player = player
  }

  update() {
    this.setText(`Health: ${this.player.getData('health')}`)
  }
}
