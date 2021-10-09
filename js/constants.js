export const categories = {
    task: 'Task',
    randomThought: 'Random Thought',
    idea: 'Idea'
}
export const noteShape = {
    id: null,
    isActive: null,
    name: '',
    created: '',
    category: '',
    content: '',
    dates: ''
}
export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
export const columnNames = ['Name', 'Created', 'Category', 'Content', 'Dates'];
export const columnNamesStatistic = ['Note Category', 'Active', 'Archived'];
export const mainTableBox = document.querySelector('.main-table-box');
export const activeNotesBox = document.querySelector('.active-notes');
export const archivedNotesBox = document.querySelector('.archived-notes');
export const statTableBox = document.querySelector('.stat-table');
export const createNoteBtn = document.querySelector('.create-note-btn');
export const shiftTableBtn = document.querySelector('.shift-table-btn');