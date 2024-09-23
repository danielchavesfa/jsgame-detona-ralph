import Player from './Player.js';
import Menu from './Menu.js';
import Rank from './Rank.js';
import Countdown from './Countdown.js';

export default class Start {
  constructor() {}

  init() {
    console.log('🚀');

    let player = null;
    let countdown = null;

    const topRank = Rank.getScores()[0];
    const hitSound = new Audio('./src/audios/hit.m4a');

    const modals = () => {
      return {
        container: document.querySelector('#js [data-modal]'),
        content: document.querySelector('#js [data-modal] > .modal-content'),
        input: document.querySelector('#js #name'),
        table: document.querySelector('#js [data-squares]'),
        squares: document.querySelectorAll('#js [data-squares] .window'),
        clearSquaresWithEnemy: () => {
          modals().squares.forEach((square) => square.classList.remove('enemy'));
        },
        fixAllWindows: () => {
          modals().squares.forEach(
            (square) => (square.children[0].src = './src/imgs/window-normal.png')
          );
        },
        toggleContainer: (method) => {
          modals().container.classList[method]('start');
        },
      };
    };

    const display = () => ({
      timer: document.querySelector('[data-display="counter"]'),
      score: document.querySelector('[data-display="score"]'),
      best: document.querySelector('[data-display="best"]'),
      life: document.querySelector('[data-display="life"]'),
      updateDisplayScore: ({ nick, score }) => {
        display().score.textContent = `${nick} ${score}`;
      },
      updateDisplayTimer: (time) => {
        display().timer.textContent = time;
      },
    });

    const buttonFunctions = {
      start: () => {
        const { input } = modals();
        const nickname = input.value.trim();

        if (!nickname) {
          input.style.border = '4px solid #eb2222';
          return;
        }

        player = new Player(nickname);
        countdown = new Countdown(1000);

        start();
      },

      continue: () => {
        modals().clearSquaresWithEnemy();

        countdown.idInterval = null;

        if (player.getLife > 0) {
          console.log('da pra continuar');
          start();
          return;
        }

        console.error('acabou a vida');
        changeMenu(Menu.end());

        //atualizar placar
        Rank.updateScore({ playerNick: player.nick, playerScore: player.score });
      },

      giveup: () => {
        //atualizar placar
        Rank.updateScore({ playerNick: player.nick, playerScore: player.score });
        player = null;
        countdown.idInterval = null;

        display().score.textContent = '--';
        display().timer.textContent = '--';
        display().life.textContent = '0';

        changeMenu(Menu.initial());
      },

      play: () => {
        changeMenu(Menu.insertNick());
      },

      rank: () => {
        changeMenu(Menu.rank());
      },

      back: () => {
        changeMenu(Menu.initial());
        setEventClickOnButtons();
      },
    };

    /* INICIAR QUALQUER COISA ANTES DE QUALQUER COISA */
    setEventClickOnButtons();

    if (topRank) {
      const setDisplayScore = `${topRank?.name ? topRank?.name : '-'} ${
        topRank.score ? topRank.score : '-'
      }`;

      display().best.textContent = setDisplayScore;
    }

    function start() {
      const getRandomPostion = () => Math.floor(Math.random() * 9);

      const getSquare = (position) => modals().squares[position];

      const getWindow = ({ position, square }) => {
        const isPositionZero = position === 0 ? true : Number(position);

        if (isPositionZero) {
          return getSquare(position).children[0];
        }

        if (square) {
          return square.children[0];
        }
      };

      const setWindow = (options, windowState) => {
        getWindow(options).src = `./src/imgs/window-${windowState}.png`;
      };

      const searchWindow = (options, windowState) => {
        return getWindow(options)?.src.search(new RegExp(String(windowState)));
      };

      const checkIfAllWindowsAreBroken = () =>
        [...modals().squares].every(
          (_, index) => searchWindow({ position: index }, 'broken') !== -1
        );

      const setEnemyOnSquare = () => {
        const randomPosition = getRandomPostion();
        const windowHasEnemy = getSquare(randomPosition).classList.contains('enemy');
        const windowIsBroken =
          searchWindow({ position: randomPosition }, 'broken') !== -1;

        if (checkIfAllWindowsAreBroken()) {
          console.log('#### TODAS AS JANELAS ESTAO QUEBRADAS ####');
          countdown.stop();
          modals().toggleContainer('add'); //reativa o modal
          handleClickSquares.toggleHandleClickWindow('removeEventListener'); //remove event nos quadrados
          player.decreaseLife(player.getLife - 1);

          countdown.timer = 10;
          countdown.velocity = 1000;

          if (player.getLife <= 0) {
            changeMenu(Menu.end());
            return;
          }

          changeMenu(Menu.lose());
          display().life.textContent = player.getLife;

          return;
        }

        if (windowHasEnemy || windowIsBroken) {
          //roda a funcao de novo caso o inimigo ou janela estava no quadrado
          setEnemyOnSquare();
          return;
        }

        modals().clearSquaresWithEnemy();
        setWindow({ position: randomPosition }, 'broken');
        getSquare(randomPosition).classList.add('enemy');
      };

      const handleClickSquares = {
        handleEvents(event) {
          const square = event.currentTarget;
          const isBroken = searchWindow({ square }, 'broken') !== -1;

          if (!isBroken) return;

          setWindow({ square }, 'normal');
          hitSound.currentTime = 0;
          hitSound.volume = 0.05;
          hitSound.play();
          player.score += 100;
          display().updateDisplayScore(player);
        },
        toggleHandleClickWindow(listenerMethod) {
          modals().squares.forEach((square) =>
            square[listenerMethod]('click', handleClickSquares.handleEvents)
          );
        },
      };

      handleClickSquares.toggleHandleClickWindow('addEventListener'); //add event nos quadrados
      modals().fixAllWindows();
      modals().toggleContainer('remove'); //desativa o modal ao iniciar a partida
      display().score.textContent = `${player.nick} ${player.score}`;
      display().life.textContent = player.getLife;
      modals().clearSquaresWithEnemy();
      setEnemyOnSquare();

      //inicia atualizando o timer
      display().updateDisplayTimer(countdown.timer);
      countdown.timer--;

      function setMenuContinueOrEnd() {
        handleClickSquares.toggleHandleClickWindow('removeEventListener');
        modals().toggleContainer('add');
        display().updateDisplayTimer(0);

        if (player.getLife > 0) {
          countdown.increaseTimer();
          countdown.increaseVelocity();
          changeMenu(Menu.continue());
          return;
        }

        changeMenu(Menu.end());
      }

      function putEnemyOnSquareAndSetDisplayTimer() {
        setEnemyOnSquare();
        display().updateDisplayTimer(countdown.timer);
      }

      countdown.start(setMenuContinueOrEnd, putEnemyOnSquareAndSetDisplayTimer);
    }

    function changeMenu(menu) {
      modals().content?.replaceWith(menu);
      setEventClickOnButtons();
    }

    function setEventClickOnButtons() {
      const buttons = document.querySelectorAll('#js [data-button]');

      buttons?.forEach((button) =>
        button.addEventListener('click', ({ target }) => {
          buttonFunctions[target.dataset.button]();
        })
      );
    }
  }
}
