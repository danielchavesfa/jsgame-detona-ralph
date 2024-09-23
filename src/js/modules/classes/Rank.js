export default class Rank {
  static setRandomScores() {
    const randomScores = [];

    for (let i = 0; i < 10; i++) {
      randomScores.push({ name: 'RND', score: Math.floor(Math.random() * 9999) });
    }

    this.setScores(randomScores);
  }

  static getScores() {
    const scores = JSON.parse(localStorage.getItem('scores'));

    if (!scores) {
      this.setScores([]);
    }

    return this.sortScores(scores);
  }

  static updateScore({ playerNick, playerScore }) {
    const scores = this.getScores();

    if (scores.length === 0) {
      scores.push({ name: playerNick, score: playerScore });
      return;
    }

    if (scores.length <= 10) {
      scores.push({ name: playerNick, score: playerScore });
      this.setScores(scores);
      return;
    }

    const scoreToRemove = scores.find(({ score }) => score < playerScore);
    const lastScore = scores[scores.length - 1];

    if (lastScore.score > playerScore) return;

    const newScore = scores.map((score) => {
      const newScorePlayer = { name: playerNick, score: playerScore };
      const scoreIsTheSameOrLast = score === (scoreToRemove || lastScore);

      score = scoreIsTheSameOrLast ? newScorePlayer : score;
      return score;
    });

    this.setScores(newScore);
  }

  static sortScores(scores = []) {
    return [...scores].sort((a, b) => b.score - a.score);
  }

  static setScores(newScore) {
    localStorage.setItem('scores', JSON.stringify(this.sortScores(newScore)));
  }

  static clearScores() {
    localStorage.removeItem('scores');
  }
}
