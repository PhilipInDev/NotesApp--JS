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
    const optionsArr = [];
    let fieldName = '';
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
        createNoteItemControllers(id, isActive, isEditable)
    );
    return itemBox;
}
export const getDateFromItemContent = (content) => {
    //Matching d/m/yy and dd/mm/yyyy date formats
    const regExp = /(3[01]|[12][0-9]|0?[1-9])\/(1[0-2]|0?[1-9])\/\d{4}/g;
    const dates = content.match(regExp);
    if (dates && dates.length) {
        return dates.join(', ');
    } else {
        return null;
    }
}
export const setDatesField = (dates, idSelector) => {
    const dateField = selectField(idSelector, 'Dates');
    dateField.textContent = dates;
}
const createNoteItemControllers = (id, isActive = true, isEditing = false) => {
    const controllersBox = createElement('div', 'note-item__controllers-box');
    const archiveBtnTitle = isActive ? 'Archive Note' : 'Unzip';
    const editBtnIconClasses = isEditing
        ? ['fas', 'fa-check-square', 'submit-btn']
        : ['fas', 'fa-edit', 'edit-btn'];
    const archiveBtn = createElement('i', ['fas', 'fa-file-archive', 'archive-btn'], getFieldId(id, 'archive-btn'));
    archiveBtn.setAttribute('title', archiveBtnTitle);
    const deleteBtn = createElement('i',['fas', 'fa-trash-alt', 'delete-btn'], getFieldId(id, 'delete-btn'));
    deleteBtn.setAttribute('title', 'Delete Note');
    const editBtn = createElement('i', editBtnIconClasses, getFieldId(id, 'edit-btn'));
    editBtn.setAttribute('title', 'Edit Note');

    controllersBox.append(editBtn, archiveBtn, deleteBtn);
    return controllersBox;
}

