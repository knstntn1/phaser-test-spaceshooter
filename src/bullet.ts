import { ShooterImage } from './shooterImage';

export class Bullet extends ShooterImage {
  constructor(scene: Phaser.Scene) {
    super(scene, 'bullet', 800);
  }

  fire(x: number, y: number): void {
    this.setPosition(x, y - 50);
    this.activate();
  }

  update(_, delta: number): void {
    if (this.y < -50) {
      this.destroy();
    }

    this.y -= this.speed * delta;
  }
}
