import { CANVAS, Game } from 'phaser';
import { GameOverScene } from './gameOverScene';
import { ShooterScene } from './shooterScene';
import { WelcomeScene } from './welcomeScene';

const config = {
  type: CANVAS,
  width: 400,
  height: 640,
  scene: [WelcomeScene, ShooterScene, GameOverScene],
  physics: { default: 'arcade' },
  audio: { noAudio: true }
};

new Game(config);
