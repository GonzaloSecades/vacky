declare module 'three/src/core/Timer.js' {
  export class Timer {
    connect(document: Document): void;
    disconnect(): void;
    getDelta(): number;
    getElapsed(): number;
    getTimescale(): number;
    setTimescale(timescale: number): this;
    reset(): this;
    dispose(): this;
    update(timestamp?: number): this;
  }
}
