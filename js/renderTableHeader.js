import {createElement} from "./shared";
import {columnNames, columnNamesStatistic, mainTableBox, statTableBox} from "./constants";

export const renderTableHeader = () => {
    mainTableBox.prepend(getTableHeader(columnNames, true));
    statTableBox.prepend(getTableHeader(columnNamesStatistic));
}

export const getTableHeader = (columnNames, shouldAddControllers = false) => {
    const tableHeader = createElement('div', 'table-header');
    columnNames.forEach((name) => tableHeader.append(createColumnTitle(name)));
    if(shouldAddControllers){
        tableHeader.append(createColumnControllerPanel());
    }

    return tableHeader
}
const createColumnTitle = (innerText) => {
    const colTitleBox = createElement('div', 'table-header__title-box');

    const title = createElement('h3', 'table-header__title');
    title.textContent = innerText;

    colTitleBox.append(title);
    return colTitleBox;
}
const createColumnControllerPanel = () => {
    const controllersBox = createElement('div', 'table-header__controllers-box');

    const archiveAllBtn = createElement('i', ['fas', 'fa-file-archive'], 'archiveAllBtn');
    archiveAllBtn.setAttribute('title', 'Archive/Unzip All');

    const deleteAllBtn = createElement('i', ['fas', 'fa-trash-alt'], 'deleteAllBtn');
    deleteAllBtn.setAttribute('title', 'Delete All');

    controllersBox.append(archiveAllBtn, deleteAllBtn);
    return controllersBox;
}