export const RenderTableHeader = (columnNames, shouldAddControllers = false) => {
    const tableHeader = document.createElement('div');
    tableHeader.classList.add('table-header');
    columnNames.forEach((name) => tableHeader.append(createColumnTitle(name)));
    if(shouldAddControllers){
        tableHeader.append(createColumnControllerPanel());
    }

    return tableHeader
}
const createColumnTitle = (innerText) => {
    const colTitleBox = document.createElement('div');
    const title = document.createElement('h3');
    colTitleBox.classList.add('table-header__title-box');
    title.classList.add('table-header__title');
    title.textContent = innerText;
    colTitleBox.append(title);

    return colTitleBox;
}
const createColumnControllerPanel = () => {
    const controllersBox = document.createElement('div');
    controllersBox.classList.add('table-header__controllers-box');
    const archiveAllBtn = document.createElement('i');
    archiveAllBtn.classList.add('fas', 'fa-file-archive');
    archiveAllBtn.setAttribute('id', 'archiveAllBtn');
    const deleteAllBtn = document.createElement('i');
    deleteAllBtn.classList.add('fas', 'fa-trash-alt');
    archiveAllBtn.setAttribute('id', 'deleteAllBtn');
    controllersBox.append(archiveAllBtn, deleteAllBtn);

    return controllersBox;
}