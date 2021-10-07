import {activeNotesBox, archivedNotesBox, categories, columnNames, noteShape} from "./constants";
import {createElement, createItemCategoryIcon, createItemSelect, createItemTextField, selectField} from "./shared";
import {notes} from "./store";

export const getNoteItemId = (id) => `${id}__note-item`;
export const getFieldId = (id, filedName) => `${id}__${filedName}`;


export const renderNoteItems = (notesArray = notes) => {
    let nodeToAppend;
    notesArray.forEach(note => {
        nodeToAppend = note.isActive ? activeNotesBox : archivedNotesBox;
        nodeToAppend.append(getNoteItem(note));
    });
}

export const getNoteItem = (noteItem = noteShape, isEditable = false, noteCat = categories, fieldNames = columnNames) => {
    const { id, category, isActive } = noteItem;
    const itemBox = createElement('div', 'note-item', getNoteItemId(noteItem.id));
    const fieldsBox = createElement('div', 'note-item__fields-box')
    let fieldName = '';
    const optionsArr = [];
    let catForDataAttr;
    for (let cat in noteCat) {
        optionsArr.push(noteCat[cat]);
        if(noteCat[cat] === category) catForDataAttr = cat;
    }
    const fields = fieldNames.map((val) => {
        fieldName = val.toLowerCase();
        if (fieldName === 'created' || fieldName === 'dates') {
            return createItemTextField(noteItem[fieldName], getFieldId(id, fieldName), 'p')
        } else if (fieldName === 'category' && isEditable) {
            return createItemSelect(optionsArr, category, getFieldId(id, fieldName))
        } else if (isEditable) {
            return createItemTextField(noteItem[fieldName], getFieldId(id, fieldName))
        } else if (!isEditable) {
            return createItemTextField(noteItem[fieldName], getFieldId(id, fieldName), 'input', true)
        }
    })
    fieldsBox.append(...fields);

    if(isEditable) itemBox.classList.add('editable');
    itemBox.setAttribute('data-category', catForDataAttr);
    itemBox.append(
        createItemCategoryIcon(category),
        fieldsBox,
        createNoteItemControllers(id, isActive)
    );
    return itemBox;
}
export const getDateFromItemContent = (content) => {
    const regExp = /\d{1,2}\/\d{1,2}\/\d{4}/g;
    const dates = content.match(regExp);
    if (dates.length) {
        return dates.join(', ');
    }else {
        return null;
    }
}
export const setDatesField = (dates, idSelector) => {
    const dateField = selectField(idSelector, 'Dates');
    dateField.textContent = dates;
}
const createNoteItemControllers = (id, isActive = true) => {
    const controllersBox = createElement('div', 'note-item__controllers-box');
    const archiveBtnTitle = isActive ? 'Archive Note' : 'Unzip';

    const archiveBtn = createElement('i', ['fas', 'fa-file-archive', 'archive-btn'], getFieldId(id, 'archive-btn'));
    archiveBtn.setAttribute('title', archiveBtnTitle);
    const deleteBtn = createElement('i',['fas', 'fa-trash-alt', 'delete-btn'], getFieldId(id, 'delete-btn'));
    deleteBtn.setAttribute('title', 'Delete Note');
    const editBtn = createElement('i',['fas', 'fa-edit', 'edit-btn'], getFieldId(id, 'edit-btn'));
    editBtn.setAttribute('title', 'Edit Note');

    controllersBox.append(editBtn, archiveBtn, deleteBtn);
    return controllersBox;
}

