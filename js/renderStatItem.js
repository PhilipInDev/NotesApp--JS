import {notes} from "./store";
import {categories, statTableBox} from "./constants";
import {createElement, createItemCategoryIcon, createItemTextField} from "./shared";

export const getStatItemId = (id) => `${id}__stat-item`;
export const getStatFieldId = (id, state) => `${id}__stat-item__${state}`;

export const renderStatItems = (notesArray = notes, noteCat = categories) => {
    let active = 0;
    let archived = 0;
    const noteCatKeys = Object.keys(noteCat);
    noteCatKeys.forEach(key => {
        for (let i = 0; i < notesArray.length; i++) {
            if (noteCat[key] === notesArray[i].category) {
                if(notesArray[i].isActive){
                    active++;
                } else {
                    archived++
                }
            }
        }
        statTableBox.append(getStatisticItem(noteCat[key], key, active, archived));
        active = 0;
        archived = 0;
    })
}
const getStatisticItem = (category, key,  active = 0, archived = 0) => {
    const statItemBox = createElement('div', 'stat-item', getStatItemId(key));
    statItemBox.append(
        createItemCategoryIcon(category),
        createItemTextField(category, getStatFieldId(key, 'category'), 'p'),
        createItemTextField(active, getStatFieldId(key, 'active'), 'p'),
        createItemTextField(archived, getStatFieldId(key, 'archived'), 'p')
    );

    return statItemBox;
}