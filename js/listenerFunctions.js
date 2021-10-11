import {selectField, selectNoteItemById} from "./shared";
import {
    changeNoteCategoryWithSelect,
    countNotesByCategory, createNewNote, deleteAllNotes,
    makePrevEditingItemReadOnly, setStatItemDataByCategory, toggleArchiving, toggleEditBtnIcon,
    toggleEditNote
} from "./actions";
import {activeNotesBox, archivedNotesBox, categories, createNoteBtn, shiftTableBtn} from "./constants";
import {getDateFromItemContent, setDatesField} from "./renderNoteItem";


export const toggleEditNoteOnClick = (e) => {
    if (e.target.classList.contains('edit-btn')) {
        toggleEditBtnIcon(e.target);
        toggleEditNoteOnEvent(selectNoteItemById(e.target.id));
        return;
    }
    if (e.target.classList.contains('submit-btn')) {
        const contentText = selectField(e.target.id, 'content').value;
        if (contentText) {
            const dates = getDateFromItemContent(contentText);
            setDatesField(dates, e.target.id);
        }
        toggleEditBtnIcon(e.target);
        toggleEditNote(selectNoteItemById(e.target.id), false);
        updateStats();
    }
}
export const toggleEditNoteOnEvent = (noteItem) => {
    const makeEditable = !noteItem.classList.contains('editable');
    makePrevEditingItemReadOnly();
    toggleEditNote(noteItem, makeEditable);
}
export const updateStats = () => {
    const stats = Object.keys(categories).map(cat => countNotesByCategory(cat));
    stats.forEach(stat => {
        setStatItemDataByCategory([stat.category], { active: stat.active, archived: stat.archived });
    })
}
export const toggleArchivingOnClick = (e) => {
    if (e && e.target.classList.contains('archive-btn')) {
        const noteItem = selectNoteItemById(e.target.id);
        toggleArchiving(noteItem);
        updateStats(selectNoteItemById(e.target.id));
    }
}
export const toggleArchivingAllOnClick = (e) => {
    if (e.target.id === 'archiveAllBtn') {
        const currentSlide = document.querySelector('.current-slide');
        const noteItemsArr = currentSlide.querySelectorAll('.note-item');
        noteItemsArr.forEach(item => toggleArchiving(item));
        updateStats();
    }
}
export const deleteNoteOnClick = (e) => {
    if(e.target.classList.contains('delete-btn')){
        const noteItem = selectNoteItemById(e.target.id);
        noteItem.classList.add('note-item--removing');
        setTimeout(() => {
            noteItem.remove();
            updateStats();
        }, 100);

    }
}
export const deleteAllNotesOnClick = (e) => {
    if(e.target.id === 'deleteAllBtn'){
        deleteAllNotes();
        updateStats();
    }
}
export const selectOnChange = (e) => {
    if(e.target.classList.contains('note-item__select')){
        const noteItem = selectNoteItemById(e.target.id);
        changeNoteCategoryWithSelect(e.target.value, noteItem);
    }
}
export const createNewNoteOnClick = async (e) => {
    try {
        await makePrevEditingItemReadOnly();
        createNewNote(e);
        updateStats();
    } catch (error) {
        console.log(error)
    }
}
export const shiftBetweenActiveAndArchivedNotes = () => {
    shiftTableBtn.classList.toggle('active');
    createNoteBtn.classList.toggle('disabled');
    if (activeNotesBox.classList.contains('current-slide')) {
        activeNotesBox.classList.remove('current-slide');
        archivedNotesBox.classList.add('current-slide');
    } else {
        archivedNotesBox.classList.remove('current-slide');
        activeNotesBox.classList.add('current-slide');
    }
}
