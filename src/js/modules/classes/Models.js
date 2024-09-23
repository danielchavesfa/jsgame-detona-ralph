export default class Models {
  static initial() {
    return {
      element: 'div',
      class: 'modal-content',
      children: [
        {
          element: 'h1',
          class: 'modal-title',
          textContent: 'Detona Ralph Script',
        },
        {
          element: 'ul',
          class: 'modal-buttons-list',
          children: [
            {
              element: 'li',
              children: [
                {
                  element: 'button',
                  attributes: [{ 'data-button': 'play' }],
                  textContent: 'Jogar',
                },
              ],
            },
            {
              element: 'li',
              children: [
                {
                  element: 'button',
                  attributes: [{ 'data-button': 'rank' }],
                  textContent: 'Ranque',
                },
              ],
            },
          ],
        },
      ],
    };
  }

  static rank() {
    return {
      element: 'div',
      class: 'modal-content',
      children: [
        {
          element: 'h1',
          class: 'modal-title',
          textContent: 'Rank Top 10',
        },
        {
          element: 'ul',
          class: 'rank-list',
          children: [
            {
              element: 'li',
              textContent: 'Ranque vazio',
            },
          ],
        },
        {
          element: 'button',
          attributes: [{ 'data-button': 'back' }],
          textContent: 'Voltar',
        },
      ],
    };
  }

  static scoreList({ name, score }) {
    return {
      element: 'li',
      children: [
        { element: 'span', textContent: name },
        { element: 'span', textContent: score },
      ],
    };
  }

  static scoreEmpty() {
    return {
      element: 'li',
      textContent: '--',
    };
  }

  static playerInput() {
    return {
      element: 'div',
      class: 'modal-content',
      children: [
        {
          element: 'h1',
          class: 'modal-title',
          textContent: 'Detona Ralph Script',
        },
        {
          element: 'div',
          class: 'input-control',
          children: [
            {
              element: 'label',
              attributes: [{ for: 'name' }],
              textContent: 'Insira seu nick',
            },
            {
              element: 'input',
              attributes: [
                {
                  type: 'text',
                  name: 'name',
                  id: 'name',
                  maxlength: '3',
                  autocomplete: 'off',
                },
              ],
            },
          ],
        },
        {
          element: 'ul',
          class: 'modal-buttons-list',
          children: [
            {
              element: 'li',
              children: [
                {
                  element: 'button',
                  attributes: [{ 'data-button': 'start' }],
                  textContent: 'Começar',
                },
              ],
            },
            {
              element: 'li',
              children: [
                {
                  element: 'button',
                  attributes: [{ 'data-button': 'back' }],
                  textContent: 'Voltar',
                },
              ],
            },
          ],
        },
      ],
    };
  }

  static continue() {
    return {
      element: 'div',
      class: 'modal-content',
      children: [
        {
          element: 'h1',
          class: 'modal-title',
          textContent: 'Ainda não acabei com você!',
        },
        {
          element: 'p',
          class: 'life-left',
          textContent: 'Você tem mais 2 vidas. <br>Quer tentar a sorte?',
        },
        {
          element: 'ul',
          class: 'modal-buttons-list',
          children: [
            {
              element: 'li',
              children: [
                {
                  element: 'button',
                  attributes: [{ 'data-button': 'continue' }],
                  textContent: 'Continuar',
                },
              ],
            },
            {
              element: 'li',
              children: [
                {
                  element: 'button',
                  attributes: [{ 'data-button': 'giveup' }],
                  textContent: 'Desistir',
                },
              ],
            },
          ],
        },
      ],
    };
  }

  static lose() {
    return {
      element: 'div',
      class: 'modal-content',
      children: [
        {
          element: 'h1',
          class: 'modal-title',
          textContent: 'Te peguei!',
        },
        {
          element: 'p',
          class: 'life-left',
          textContent: 'Você tem mais 2 vidas.',
        },
        {
          element: 'ul',
          class: 'modal-buttons-list',
          children: [
            {
              element: 'li',
              children: [
                {
                  element: 'button',
                  attributes: [{ 'data-button': 'continue' }],
                  textContent: 'De novo',
                },
              ],
            },
            {
              element: 'li',
              children: [
                {
                  element: 'button',
                  attributes: [{ 'data-button': 'giveup' }],
                  textContent: 'Desistir',
                },
              ],
            },
          ],
        },
      ],
    };
  }

  static end() {
    return {
      element: 'div',
      class: 'modal-content',
      children: [
        {
          element: 'h1',
          class: 'modal-title',
          textContent: 'Você perdeu!',
        },
        {
          element: 'p',
          class: 'life-left',
          textContent: 'Você não tem mais vidas.',
        },
        {
          element: 'ul',
          class: 'modal-buttons-list',
          children: [
            {
              element: 'li',
              children: [
                {
                  element: 'button',
                  attributes: [{ 'data-button': 'giveup' }],
                  textContent: 'Desistir',
                },
              ],
            },
          ],
        },
      ],
    };
  }
}
