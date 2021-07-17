import FpsText from '../objects/fpsText'
import HealtText from '../objects/healthtext'

import { Venemy, Oenemy } from '../objects/enemyship'
import { Player } from '../objects/player'

import { detectFrame } from '../posenet/init'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'game' })

  }

  preload() {
    this.game.scene.current = 'game'

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.sound.setVolume(this.registry.get('master-sound-volume'))
    this.sndLaser = this.sound.add('laser')
    this.sndElaser = [
      this.sound.add('elaser0', { volume: 0.5 }),
      this.sound.add('elaser1', { volume: 0.5 })
    ]

    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 1, 2, 3 ] }),
      frameRate: 8,
      repeat: -1
    })
    this.anims.create({
      key: 'fly-left',
      frames: this.anims.generateFrameNumbers('player', { frames: [ 4, 5, 6, 7 ] }),
      frameRate: 8,
      repeat: -1
    })
    this.anims.create({
      key: 'fly-right',
      frames: this.anims.generateFrameNumbers('player', { frames: [ 8, 9, 10, 11 ] }),
      frameRate: 8,
      repeat: -1
    })
    this.anims.create({
      key: 'venemy',
      frames: this.anims.generateFrameNumbers('venemy', { frames: [ 0, 1, 2, 3 ] }),
      frameRate: 8,
      repeat: -1
    })

    this.anims.create({
      key: 'oenemy',
      frames: this.anims.generateFrameNumbers('oenemy', { frames: [ 0, 1, 2, 3 ] }),
      frameRate: 8,
      repeat: -1
    })
    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 8,
      repeat: 0
    })

    this.player = new Player(this, this.cameras.main.width / 2, this.cameras.main.height - 120, 'player')
    this.player.play('fly')

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.fpsText = new FpsText(this)
    this.healthText = new HealtText(this, this.player)


    this.time.addEvent({
      delay: 1000,
      callback: () => {
        let enemy
        let rnd = Phaser.Math.Between(0, 10)

        if(rnd >= 5) {
          enemy = new Oenemy(this, Phaser.Math.Between(0, this.game.config.width), 0)
        } else if (rnd >= 3) {
          enemy = new Venemy(this, Phaser.Math.Between(0, this.game.config.width), 0)
        }

        if(enemy) {
          this.enemies.add(enemy)
        }
      },
      loop: true
    })

    this.physics.add.collider(this.playerLasers, this.enemies, (laser, enemy) => {
      if(enemy) {
        if(enemy.onDestroy) {
          enemy.onDestroy()
        }
        enemy.explode(true)
        laser.setActive(false)
      }
    })

    this.physics.add.collider(this.enemyLasers, this.player, (laser, player) => {
      if(!laser.active) {
        return
      }
      laser.setActive(false)
      laser.setVisible(false)
      player.incData('health', -10)
    })

    this.physics.add.collider(this.enemies, this.player, (enemy, player) => {
      if(enemy.getData('isDead')) {
        return
      }
      enemy.explode()
      enemy.setData('isDead', true)
      player.incData('health', -20)
    })

    detectFrame(this.game.videoSrc, this.game)

  }

  update() {
    if(this.keyA.isDown) {
      this.player.moveLeft(Phaser.Input.Keyboard.JustDown(this.keyA))
    } else if(this.keyD.isDown) {
      this.player.moveRight(Phaser.Input.Keyboard.JustDown(this.keyD))
    } else {
      // this.player.moveStraight()
    }

    if(this.keySpace.isDown) {
      this.player.setData('isShooting', true)
    } else {
      this.player.setData('isShooting', false)
      this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1)
    }

    this.player.update()


    this.fpsText.update()
    this.healthText.update()
  }
}
