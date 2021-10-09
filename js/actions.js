import {activeNotesBox, archivedNotesBox, categories, months, noteShape} from "./constants";
import {getStatFieldId} from "./renderStatItem";
import {getFieldId, getNoteItem} from "./renderNoteItem";
import {notes} from "./store";
import {
    createItemCategoryIcon,
    createItemSelect,
    createItemTextField,
    getIdNumFromElementIdSelector
} from "./shared";


export const toggleEditNote = (noteItem, makeEditable = false, noteCat = categories) => {
    const idNum = getIdNumFromElementIdSelector(noteItem.id);
    const categoryField = document.getElementById(getFieldId(idNum, 'category'));
    const inputsArr = noteItem.getElementsByTagName('input');
    inputsArr[0].focus();
    for (let i = 0; i < inputsArr.length; i++) {
        inputsArr[i].readOnly = !makeEditable;
        inputsArr[i].title = inputsArr[i].value;
    }
    if (makeEditable) {
        noteItem.classList.add('editable');
        const options = Object.keys(noteCat).map(cat => noteCat[cat]);
        categoryField.parentNode.replaceWith(createItemSelect(options, categoryField.value, getFieldId(idNum, 'category')));
    }
    if (!makeEditable) {
        noteItem.classList.remove('editable');
        const selectedOptionText = categoryField.selectedOptions[0].textContent;
        const toReplaceWith = createItemTextField(selectedOptionText, getFieldId(idNum, 'category'), 'input', true);
        categoryField.parentNode.replaceWith(toReplaceWith);
    }
}
export const makePrevEditingItemReadOnly = () => {
    const prevEditing = document.querySelectorAll('.editable');
    if (prevEditing.length) {
        toggleEditBtnIcon(prevEditing[0].querySelector('.submit-btn'));
        toggleEditNote(prevEditing[0], false);
    }
}
export const toggleArchiving = (noteItem) => {
    const noteItemCopy = noteItem.cloneNode(true);
    if (noteItem.parentNode === activeNotesBox) {
        noteItem.remove();
        archivedNotesBox.prepend(noteItemCopy)
    } else {
        noteItem.remove();
        activeNotesBox.prepend(noteItemCopy)
    }
}
export const deleteAllNotes = () => {
    const currentSlide = document.querySelector('.current-slide');
    currentSlide.querySelectorAll('.note-item').forEach(item => item.remove());
}
export const createNewNote = () => {
    const noteInfo = { ...noteShape };
    const date = new Date();
    noteInfo.id = notes.length + 1;
    noteInfo.isActive = true;
    noteInfo.created = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    noteInfo.category = categories.task;
    notes.push(noteInfo);
    const noteItem = getNoteItem(noteInfo, true);
    activeNotesBox.prepend(noteItem);
    noteItem.querySelector('input').focus();
}
export const changeNoteCategoryWithSelect = (value, noteItem, noteCat = categories) => {
    noteItem.setAttribute('data-category', value);
    const icon = noteItem.querySelector('.note-item__category-icon-box').getElementsByTagName('i')[0];
    const newIcon = createItemCategoryIcon(noteCat[value]);
    icon.replaceWith(newIcon);
}
export const toggleEditBtnIcon = (editBtnElement) => {
    if (editBtnElement.classList.contains('edit-btn')) {
        editBtnElement.classList.remove('fas', 'fa-edit', 'edit-btn');
        editBtnElement.classList.add('fas', 'fa-check-square', 'submit-btn');
    } else {
        editBtnElement.classList.remove('fas', 'fa-check-square', 'submit-btn');
        editBtnElement.classList.add('fas', 'fa-edit', 'edit-btn');
    }

}
export const countNotesByCategory = (category) => {
    const active = activeNotesBox.querySelectorAll(`div[data-category=${category}]`).length + '';
    const archived = archivedNotesBox.querySelectorAll(`div[data-category=${category}]`).length + '';
    return {
        category,
        active,
        archived
    }
}
export const setStatItemDataByCategory = (category = [], actAndArch = { active: '', archived: '' }) => {
    category.forEach(cat => {
        if (actAndArch.active) {
            document.getElementById(getStatFieldId(cat, 'active')).textContent = actAndArch.active + '';
        }
        if (actAndArch.archived) {
            document.getElementById(getStatFieldId(cat, 'archived')).textContent = actAndArch.archived + '';
        }
    })
}

