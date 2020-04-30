import { ShooterImage } from './shooterImage';

export class Meteor extends ShooterImage {
  constructor(scene: Phaser.Scene) {
    if (Math.random() >= 0.5) {
      super(scene, 'asteroid', 200);
    } else {
      super(scene, 'ufo', 200);
    }
  }

  private speedMultiplier;

  fall(speedMultiplier: number): void {
    this.speedMultiplier = speedMultiplier;
    this.setScale(Math.random() + 0.5);
    this.setPosition(
      Phaser.Math.Between(
        this.scene.textures.get('ship').getSourceImage().width / 2,
        this.sceneWidth -
          this.scene.textures.get('ship').getSourceImage().width / 2
      ),
      (this.sceneHeight / 2) * -1
    );
    this.activate();
  }

  update(_, delta: number): void {
    if (this.y > this.sceneHeight) {
      this.destroy();
    }

    this.y += this.speed * this.speedMultiplier * delta;
  }
}
