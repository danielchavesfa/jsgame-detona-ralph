export default class Player {
  constructor(nick) {
    this.nick = nick;
    this.score = 0;
  }

  #life = 3;

  get getLife() {
    return this.#life;
  }

  decreaseLife(life) {
    this.#life = this.#life < 0 ? 0 : this.#life - 1;
  }
}
