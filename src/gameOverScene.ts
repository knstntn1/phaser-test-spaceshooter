import { Scene } from 'phaser';

export class GameOverScene extends Scene {
  private score: number;

  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data): void {
    this.score = data.score;
  }

  create(): void {
    this.add
      .tileSprite(
        0,
        0,
        this.textures.get('space').getSourceImage().width,
        this.textures.get('space').getSourceImage().height,
        'space'
      )
      .setOrigin(0, 0)
      .setScale(
        this.game.canvas.height /
          this.textures.get('space').getSourceImage().height
      );

    const textGameOver = this.add.bitmapText(
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.4,
      'atari',
      'Game Over',
      30
    );
    textGameOver.setOrigin(0.5, 0.4);

    const textRestart = this.add.bitmapText(
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.9,
      'atari',
      '- press any key for new game -',
      12
    );

    textRestart.setOrigin(0.5, 0.9);

    const textFinalScore = this.add.bitmapText(
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.5,
      'atari',
      'score: ' + this.score,
      20
    );
    textFinalScore.setOrigin(0.5, 0.5);

    this.input.keyboard.once('keydown', () => {
      this.scene.start('ShooterScene');
    });
  }
}
