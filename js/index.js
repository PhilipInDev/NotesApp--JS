import 'regenerator-runtime/runtime';
import {renderTableHeader} from "./renderTableHeader";
import {renderNoteItems} from "./renderNoteItem";
import {createNoteBtn, mainTableBox, shiftTableBtn} from "./constants";
import {renderStatItems} from "./renderStatItem";
import {
    createNewNoteOnClick, deleteAllNotesOnClick, deleteNoteOnClick, selectOnChange,
    shiftBetweenActiveAndArchivedNotes, toggleArchivingAllOnClick,
    toggleArchivingOnClick,
    toggleEditNoteOnClick
} from "./listenerFunctions";


renderTableHeader();
renderNoteItems();
renderStatItems();

createNoteBtn.addEventListener('click', createNewNoteOnClick);
shiftTableBtn.addEventListener('click', shiftBetweenActiveAndArchivedNotes);

mainTableBox.addEventListener('click', (e) => {
   toggleEditNoteOnClick(e);
   toggleArchivingOnClick(e);
   toggleArchivingAllOnClick(e);
   deleteNoteOnClick(e);
   deleteAllNotesOnClick(e);
});
mainTableBox.addEventListener('change',  selectOnChange);
