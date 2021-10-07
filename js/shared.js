import {getFieldId, getNoteItemId} from "./renderNoteItem";
import {categories} from "./constants";


export const createElement = (type = '', classes = [], id = '') => {
    const el = document.createElement(type);
    if (Array.isArray(classes) && classes.length) {
        el.classList.add(...classes);
    }else if(!Array.isArray(classes) && classes) el.classList.add(classes);
    if (id) el.setAttribute('id', id);

    return el;
}

export const createItemTextField = (innerText, id, tag = 'input', readOnly = false) => {
    const textBox = createElement('div', ['note-item__text-box', 'field-box']);
    const textField = createElement(tag, 'note-item__text', id);
    if (tag === 'input') {
        textField.type = 'text';
        textField.value = innerText;
    } else {
        textField.textContent = innerText;
    }
    if (readOnly) textField.setAttribute('readonly', 'true');
    textField.setAttribute('title', innerText);

    textBox.append(textField);
    return textBox
}

export const createItemSelect = (options = [], selected, id) => {
    const box = createElement('div', ['note-item__text-box', 'field-box']);
    const select = createElement('select', 'note-item__select', id);
    let optionEl;
    options.forEach(option => {
        optionEl = createElement('option');
        optionEl.value = selectCorrespondingCategoryKey(option);
        optionEl.textContent = option;
        if(selected === option) optionEl.setAttribute('selected', 'true');
        select.append(optionEl);
    });

    box.append(select);
    return box;
}

export const createItemCategoryIcon = (category) => {
    const box = createElement('div', ['note-item__field-box', 'note-item__category-icon-box']);
    const icon = document.createElement('i');
    switch (category) {
        case categories.task:
            icon.classList.add('fas', 'fa-tasks');
            break;
        case categories.idea:
            icon.classList.add('fas', 'fa-lightbulb');
            break;
        case categories.randomThought:
            icon.classList.add('fas', 'fa-code-branch');
            break
        default:
            icon.classList.add('fas', 'fa-question');
    }

    box.append(icon);
    return box;
}

//Selectors
export const getIdNumFromElementIdSelector = (idSelector) => {
    const regExp = /^\d+/;
    return idSelector.match(regExp)[0];
}
export const selectNoteItemById = (eventIdSelector) => {
    const idNum = getIdNumFromElementIdSelector(eventIdSelector);
    return document.getElementById(getNoteItemId(idNum));
}
export const selectField = (eventIdSelector, columnName) => {
    const idNum = getIdNumFromElementIdSelector(eventIdSelector);
    const idOfField = getFieldId(idNum, columnName.toLowerCase());
    return document.getElementById(idOfField);
}
export const selectCorrespondingCategoryKey = (category, noteCat = categories) => {
    for (let cat in noteCat) if(noteCat[cat] === category) return cat;

}