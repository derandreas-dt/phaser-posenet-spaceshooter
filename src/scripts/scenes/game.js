import FpsText from '../objects/fpsText'
import HealtText from '../objects/healthtext'

import { Venemy, Oenemy } from '../objects/enemyship'
import { Player } from '../objects/player'
import { HealthPack } from '../objects/health'

import { detectFrame } from '../posenet/init'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'game' })

  }

  preload() {
    this.game.scene.current = 'game'

    this.bg = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'starfield')
    this.bg.setOrigin(0, 0)
    this.bg.setAlpha(0.7)

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();
    this.healthpacks = this.add.group();

    this.sound.setVolume(this.registry.get('master-sound-volume'))
    this.sndLaser = this.sound.add('laser')
    this.sndExplM = this.sound.add('explosion-m')
    this.sndExplL = this.sound.add('explosion-l')
    this.sndElaser = [
      this.sound.add('elaser0', { volume: 0.5 }),
      this.sound.add('elaser1', { volume: 0.5 })
    ]
    this.sndPowUp1 = this.sound.add('powup1')
    this.sndPowUp2 = this.sound.add('powup2')
    this.sndPowUp3 = this.sound.add('powup3')

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
    this.anims.create({
      key: 'hpack',
      frames: this.anims.generateFrameNames('healthpack', {
        start: 0, end: 15, zeroPad: 0,
        prefix: 'health-', suffix: '.png'
      }),
      frameRate: 16,
      repeat: -1
    })

    this.player = new Player(this, this.cameras.main.width / 2, this.cameras.main.height - 120, 'player')
    this.player.play('fly')
    this.player.setData('isShooting', true)
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


    this.time.addEvent({
      delay: 10000,
      callback: () => {
        let pack = new HealthPack(this, Phaser.Math.Between(0, this.game.config.width), 0, 'healthpack')
        pack.play('hpack')
        this.healthpacks.add(pack)
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
        this.sndExplL.play()
      }
    })

    this.physics.add.collider(this.enemyLasers, this.player, (laser, player) => {
      if(!laser.active) {
        return
      }
      laser.setActive(false)
      laser.setVisible(false)
      player.incData('health', -10)
      this.sndExplM.play()
    })

    this.physics.add.collider(this.enemies, this.player, (enemy, player) => {
      if(enemy.getData('isDead')) {
        return
      }
      enemy.explode()
      enemy.setData('isDead', true)
      player.incData('health', -20)
      this.sndExplL.play()
    })

    this.physics.add.collider(this.healthpacks, this.player, (pack, player) => {
      pack.destroy()
      let plHealth = player.getData('health')
      player.incData('health', plHealth > 50 ? 100 - plHealth : 50)
      this.sndPowUp1.play()
    })

    detectFrame(this.game.videoSrc, this.game)
  }

  update() {
    this.bg.tilePositionY -= .9

    if(this.keyA.isDown) {
      this.player.moveLeft(Phaser.Input.Keyboard.JustDown(this.keyA))
    } else if(this.keyD.isDown) {
      this.player.moveRight(Phaser.Input.Keyboard.JustDown(this.keyD))
    } else {
      // this.player.moveStraight()
    }

    this.player.update()
    this.fpsText.update()
    this.healthText.update()
  }
}
