export const createElement = (type = '', classes = [], id = '') => {
    const el = document.createElement(type);
    if (classes.length) el.classList.add(...classes);
    if (id) el.setAttribute('id', id);

    return el;
}