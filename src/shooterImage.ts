import { GameObjects } from 'phaser';

export class ShooterImage extends GameObjects.Image {
  protected speed: number;
  protected sceneHeight: number;
  protected sceneWidth: number;

  constructor(scene: Phaser.Scene, texture: string, speedDistance: number) {
    //init the phaser image
    super(scene, 0, 0, texture);

    //size of scene
    this.sceneHeight = scene.game.canvas.height;
    this.sceneWidth = scene.game.canvas.width;

    //calc speed
    this.speed = Phaser.Math.GetSpeed(speedDistance, 1);
  }

  protected activate(): void {
    this.setActive(true);
    this.setVisible(true);
  }

  kill(): void {
    this.setVisible(false);
    this.setActive(false);
  }
}
