import { Scene } from 'phaser';

export class WelcomeScene extends Scene {
  private score: number;

  constructor() {
    super({ key: 'WelcomeScene' });
  }

  preload(): void {
    this.load.image('space', 'assets/space.jpg');
    this.load.image('ship', 'assets/ship.png');

    this.load.bitmapFont(
      'atari',
      'assets/fonts/atari-smooth.png',
      'assets/fonts/atari-smooth.xml'
    );
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

    this.add.image(
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.25,
      'ship'
    );

    const textPreTitle = this.add.bitmapText(
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.35,
      'atari',
      'just another random',
      14
    );
    textPreTitle.setOrigin(0.5, 0.35);

    const textTitle = this.add.bitmapText(
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.4,
      'atari',
      'Space Shooter',
      28
    );
    textTitle.setOrigin(0.5, 0.4);

    const textControlTitle = this.add.bitmapText(
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.55,
      'atari',
      'controls',
      15,
      1
    );

    textControlTitle.setOrigin(0.5, 0.55);

    const textControl = this.add.bitmapText(
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.65,
      'atari',
      'move ship:\narrow keys or WASD\n\nfire:\nspace bar',
      12,
      1
    );

    textControl.setOrigin(0.5, 0.65);

    const textStart = this.add.bitmapText(
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.9,
      'atari',
      '- press any key for new game -',
      12
    );

    textStart.setOrigin(0.5, 0.9);

    this.input.keyboard.once('keydown', () => {
      this.scene.start('ShooterScene');
    });
  }
}
