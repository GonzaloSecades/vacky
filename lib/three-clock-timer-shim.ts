import { Timer } from 'three/src/core/Timer.js';

export * from 'three/src/Three.js';

// react-globe.gl pulls in three-render-objects, which still instantiates
// THREE.Clock(). Keep that API surface but drive the timing with THREE.Timer.
export class Clock {
  autoStart: boolean;
  startTime: number;
  oldTime: number;
  elapsedTime: number;
  running: boolean;

  private timer: Timer;

  constructor(autoStart = true) {
    this.autoStart = autoStart;
    this.startTime = 0;
    this.oldTime = 0;
    this.elapsedTime = 0;
    this.running = false;
    this.timer = new Timer();
  }

  start() {
    const now = performance.now();

    this.startTime = now;
    this.oldTime = now;
    this.elapsedTime = 0;
    this.running = true;
    this.timer = new Timer();
    this.timer.update(now);
  }

  stop() {
    this.getElapsedTime();
    this.running = false;
    this.autoStart = false;
  }

  getElapsedTime() {
    this.getDelta();

    return this.elapsedTime;
  }

  getDelta() {
    if (this.autoStart && !this.running) {
      this.start();

      return 0;
    }

    if (!this.running) {
      return 0;
    }

    const now = performance.now();

    this.timer.update(now);

    const diff = this.timer.getDelta();

    this.oldTime = now;
    this.elapsedTime += diff;

    return diff;
  }
}
