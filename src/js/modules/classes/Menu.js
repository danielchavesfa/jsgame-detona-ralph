import ElementBuilder from './ElementBuilder.js';
import Models from './Models.js';
import Rank from './Rank.js';

export default class Menu {
  static #createModal(newModalContent) {
    return new ElementBuilder(newModalContent).createModal();
  }

  static initial() {
    return this.#createModal(Models.initial());
  }

  static rank() {
    const rankModal = Models.rank();
    const scores = Rank.getScores();
    const elementsWithScore = scores.map(Models.scoreList);

    if (elementsWithScore.length > 0) {
      rankModal.children[1].children = elementsWithScore;
    }

    return this.#createModal(rankModal);
  }

  static insertNick() {
    return this.#createModal(Models.playerInput());
  }

  static continue() {
    return this.#createModal(Models.continue());
  }

  static lose() {
    return this.#createModal(Models.lose());
  }

  static end() {
    return this.#createModal(Models.end());
  }
}
