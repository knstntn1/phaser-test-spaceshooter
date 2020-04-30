import { Scene, Types, Physics, Input } from 'phaser';
import { Spaceship, Direction, Movement } from './spaceship';
import { Bullet } from './bullet';
import { Meteor } from './meteor';

export class ShooterScene extends Scene {
  private spaceShip: Spaceship;
  private BULLET_MAX = 15;
  private bulletState: number;
  private bullets: Physics.Arcade.Group;
  private meteors: Physics.Arcade.Group;
  private bulletTime = 0;
  private meteorTime = 0;
  private cursors: Types.Input.Keyboard.CursorKeys;
  private spaceKey: Input.Keyboard.Key;
  private aKey: Input.Keyboard.Key;
  private sKey: Input.Keyboard.Key;
  private dKey: Input.Keyboard.Key;
  private wKey: Input.Keyboard.Key;
  private ammoText: Phaser.GameObjects.Text;
  private scoreText: Phaser.GameObjects.Text;
  private score: number;
  private speedMultiplier: number;

  constructor() {
    super({ key: 'ShooterScene' });
  }

  preload(): void {
    this.load.image('asteroid', 'src/assets/asteroid.png');
    this.load.image('bullet', 'src/assets/bullet.png');
    this.load.image('ufo', 'src/assets/ufo.png');
  }

  create(): void {
    this.score = 0;
    this.bulletState = this.BULLET_MAX;
    this.speedMultiplier = 1;

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

    this.ammoText = this.add.text(16, 16, 'ammo: |||||||||||||||');
    this.scoreText = this.add.text(16, 40, 'score: ' + this.score);

    // group of bullets
    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 10,
      runChildUpdate: true
    });

    // group of meteors
    this.meteors = this.physics.add.group({
      classType: Meteor,
      maxSize: 20,
      runChildUpdate: true
    });

    this.spaceShip = new Spaceship(this);
    this.physics.add.existing(this.children.add(this.spaceShip));

    //Input Handling
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.addCapture([' ']);
    this.spaceKey = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
    this.aKey = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.A);
    this.sKey = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.S);
    this.dKey = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.D);
    this.wKey = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.W);

    //Collider
    this.physics.add.collider(
      this.bullets,
      this.meteors,
      (bullet: Bullet, meteor: Meteor) => {
        meteor.destroy();
        // bullet.destroy();
        this.score++;
        this.scoreText.setText('score: ' + this.score);
      },
      null,
      this
    );

    this.time.addEvent({
      delay: 300,
      callback: this.incrementBullets,
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 10000,
      callback: this.increaseSpeed,
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(
      this.spaceShip,
      this.meteors,
      this.gameOver,
      null,
      this
    );
  }

  incrementBullets(): void {
    if (this.bulletState < this.BULLET_MAX) this.bulletState++;
  }

  increaseSpeed(): void {
    this.speedMultiplier = this.speedMultiplier + 0.1;
  }

  update(_, delta: number): void {
    const str = new Array(this.bulletState + 1).join('|');
    this.ammoText.setText('ammo: ' + str);
    if (this.cursors.left.isDown || this.aKey.isDown) {
      this.spaceShip.move(delta, Movement.Horizontal, Direction.Left);
    } else if (this.cursors.right.isDown || this.dKey.isDown) {
      this.spaceShip.move(delta, Movement.Horizontal, Direction.Right);
    } else if (this.cursors.up.isDown || this.wKey.isDown) {
      this.spaceShip.move(delta, Movement.Vertical, Direction.Up);
    } else if (this.cursors.down.isDown || this.sKey.isDown) {
      this.spaceShip.move(delta, Movement.Vertical, Direction.Down);
    }

    if (this.spaceKey.isDown) {
      this.fireBullet();
    }
    this.handleMeteors();
  }

  fireBullet(): void {
    if (this.time.now > this.bulletTime && this.bulletState > 0) {
      // Find the first unused (=unfired) bullet
      const bullet = this.bullets.get() as Bullet;
      if (bullet) {
        bullet.fire(this.spaceShip.x, this.spaceShip.y);
        this.bulletTime = this.time.now + 100;
        this.bulletState--;
      }
    }
  }

  handleMeteors(): void {
    if (this.time.now > this.meteorTime) {
      const meteor = this.meteors.get() as Meteor;
      if (meteor) {
        meteor.fall(this.speedMultiplier);
        this.meteorTime =
          this.time.now + 500 + (250 / this.speedMultiplier) * Math.random();
      }
    }
  }

  gameOver(): void {
    this.scene.start('GameOverScene', { score: this.score });
  }
}
