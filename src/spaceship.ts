import { ShooterImage } from './shooterImage';

export enum Direction {
  Left = -1,
  Right = 1,
  Down = 1,
  Up = -1
}

export enum Movement {
  Vertical,
  Horizontal
}

export class Spaceship extends ShooterImage {
  constructor(scene: Phaser.Scene) {
    super(scene, 'ship', 250);

    this.setPosition(
      scene.game.canvas.width / 2,
      scene.game.canvas.height * 0.95
    );
  }

  move(delta: number, movement: Movement, direction: Direction): void {
    //new position
    if (movement == Movement.Horizontal) {
      this.x += this.speed * delta * direction;
      //boundary handling
      this.x = Phaser.Math.Clamp(
        this.x,
        (this.width * this.scale) / 2,
        this.sceneWidth - (this.width * this.scale) / 2
      );
    } else {
      this.y += this.speed * delta * direction;
      this.y = Phaser.Math.Clamp(
        this.y,
        this.sceneHeight * 0.5,
        this.sceneHeight * 0.95
      );
    }
  }
}
