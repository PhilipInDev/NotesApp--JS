export const categories = {
    task: 'Task',
    randomThought: 'Random Thought',
    idea: 'Idea'
}
export const noteShape = {
    id: null,
    isActive: null,
    name: '',
    timeOfCreating: '',
    category: '',
    content: '',
    dates: ''
}
export const columnNames = ['Name', 'Created', 'Category', 'Content', 'Dates'];
export const columnNamesStatistic = ['Note Category', 'Active', 'Archived'];
export const mainTableBox = document.querySelector('.main-table-box');
export const activeNotesBox = document.querySelector('.active-notes');
export const archivedNotesBox = document.querySelector('.archived-notes');
export const statisticTableBox = document.querySelector('.statistic-table')