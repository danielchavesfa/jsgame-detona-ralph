export default class ElementBuilder {
  constructor(modalModelObject) {
    this.modalModelObject = modalModelObject;
  }

  setClassNamesOnTheElement(element, classNames) {
    if (Array.isArray(classNames)) {
      classNames.forEach((name) => element.classList.add(name));
    } else if (classNames) {
      element.classList.add(classNames);
    }
  }

  setTextOnTheElement(element, textContent) {
    textContent ? (element.innerHTML = textContent) : null;
  }

  setAttributesOnTheElement(element, attributes) {
    attributes?.length > 0
      ? attributes.forEach((attribute) => {
          Object.entries(attribute).forEach(([key, value]) =>
            element.setAttribute(key, value)
          );
        })
      : null;
  }

  insertChildrenOnTheElement(element, children) {
    children?.length > 0
      ? element.append(...children.map((child) => this.createModal(child, element)))
      : null;
  }

  createModal(modalModelObject = this.modalModelObject) {
    if (!modalModelObject.element) return;

    const element = document.createElement(modalModelObject.element);

    this.setClassNamesOnTheElement(element, modalModelObject.class);
    this.setTextOnTheElement(element, modalModelObject.textContent);
    this.setAttributesOnTheElement(element, modalModelObject.attributes);
    this.insertChildrenOnTheElement(element, modalModelObject.children);

    return element;
  }
}
