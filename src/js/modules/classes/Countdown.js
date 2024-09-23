export default class Countdown {
  constructor(velocity) {
    this.idInterval = null;
    this.timerStarter = 10;
    this.timer = this.timerStarter;
    this.velocity = velocity || 1000;
  }

  increaseTimer() {
    this.timerStarter += 5;
    this.timer = this.timerStarter;
  }

  increaseVelocity() {
    if (this.velocity >= 600) {
      this.velocity = this.velocity - 200;
      return;
    }

    this.velocity = this.velocity <= 200 ? 200 : this.velocity - 50;
  }

  start(activeWhenTimeEnds, activeWhileHaveTime) {
    if (!this.idInterval) {
      this.idInterval = setInterval(() => {
        if (this.timer < 0) {
          this.stop();
          activeWhenTimeEnds();
          return;
        }

        activeWhileHaveTime();
        this.timer--;
      }, this.velocity);
    }
  }

  stop() {
    clearInterval(this.idInterval);
  }
}
