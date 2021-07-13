import { BaseEntity } from './base'

class EnemyLaser extends BaseEntity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key || 'elaser')
    this.body.velocity.y = 150
  }
}

export {
  EnemyLaser
}
