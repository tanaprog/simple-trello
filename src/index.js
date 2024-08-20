const inputLiskTitle = document.querySelector('.list-title');
const buttonCreateList = document.querySelector('.create-list');
const wrapperNewList = document.querySelector('.wrapper-new-list')

let LIST = [];

function createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
}

function addNewList(newList) {
    LIST.push(newList);
}

function editChildrenText(listId, childId) {
    const findListId = LIST.findIndex((elem) => elem.id === listId);
    const elementList = LIST[findListId];
    const elementChildren = elementList.children;
    const editChildbyId = elementChildren.findIndex((item) => item.id === Number(childId));
    elementChildren[editChildbyId].isEdit = !elementChildren[editChildbyId].isEdit;
}

function editListText(id) {
    const findElementList = LIST.find((elem) => elem.id === id);
    findElementList.isCompleted = !findElementList.isCompleted;
}

function editListNewText(elemId, newText) {
    const findListId = LIST.findIndex((elem) => elem.id === Number(elemId));
    findListId.text = newText;
}

function editChildrenNewText(elemId, childId, newText) {
    const findListId = LIST.findIndex((elem) => elem.id === elemId);
    const elementList = LIST[findListId];
    const elementChildren = elementList.children;
    const editChildbyId = elementChildren.findIndex((item) => item.id === Number(childId));
    elementChildren[editChildbyId].text = newText;
}

function getNewText(elementId) {
    const spanElement = document.querySelector(`span[id="${elementId}"]`);
    console.log(spanElement)
    return spanElement.textContent;
}

function getNewTextData() {
    const spanElement = document.querySelector('span[data-list]');
    console.log(spanElement)
    return spanElement.textContent;
}

function deleteChildForId(listId, itemId) {
    const indexByList = LIST.findIndex((elem) => elem.id === listId);
    const listElement = LIST[indexByList];
    const listChildren = listElement.children;
    const indexByChildren = listChildren.findIndex((item) => item.id === itemId);

    listChildren.splice(indexByChildren, 1);
}

function deleteNewList(id) {
    const index = LIST.findIndex((list) => list.id === id);
    LIST.splice(index, 1);
}

function getInputText(e) {
    e.preventDefault();

    const listText = inputLiskTitle.value;
    return listText;
}

function getInputListText(id) {
    const textsList = document.querySelectorAll('.text-title');
    const allInputs = (Array.from(textsList));
    const textInput = allInputs.find((elem) => Number(elem.id) === id);
    return textInput.value;
}

function clearInputText() {
    inputLiskTitle.value = '';
    inputLiskTitle.focus();
}

function getListId(event) {
    const parentNode = event.target.closest('.new-list');
    if (!parentNode?.id) return;
    const id = Number(parentNode.id);
    return id;
}

function renderList() {
    wrapperNewList.innerHTML = '';

    LIST.forEach((list) => {

        const newList = createElement('div', 'new-list')
        newList.setAttribute('id', list.id);
        /////////////////////////////////////////////

        const spanListText = createElement('span', 'description-text');
        spanListText.textContent = list.text;
        spanListText.setAttribute('style', list.isCompleted ? "border: 2px solid white" : "");
        spanListText.contentEditable = Boolean(list.isCompleted);
        // spanListText.setAttribute('id', list.id);
        spanListText.dataset.list = 'data-list';

        const editList = createElement('button', 'delete-list');
        editList.innerHTML = list.isCompleted ? 'save' : 'edit';
        editList.dataset.action = list.isCompleted ? 'saveBtnList' : 'editBtnList';

        const deleteList = createElement('button', 'delete-list');
        deleteList.dataset.action = 'deleteList';
        deleteList.textContent = 'delete';

        const inputText = createElement('input', 'text-title')
        inputText.dataset.action = 'inputText';
        inputText.value = '';
        inputText.setAttribute('id', list.id);

        const buttonAdd = createElement('button', 'create-description');
        buttonAdd.dataset.action = 'create';
        buttonAdd.textContent = 'create';
        const children = createElement('div', 'wrapper-span')

        list.children.forEach((child) => {

            const item = createElement('span', 'child-text');
            item.textContent = child.text;
            item.setAttribute('style', child.isEdit ? "border: 2px solid white" : "");
            item.contentEditable = Boolean(child.isEdit);
            item.setAttribute('id', child.id);

            const editBtn = createElement('button', 'edit-btn');
            editBtn.innerHTML = child.isEdit ? 'save' : 'edit';
            editBtn.setAttribute('id', child.id);
            editBtn.dataset.action = child.isEdit ? 'saveBtn' : 'editBtn';

            const deleteBtn = createElement('button', 'delete-btn');
            deleteBtn.dataset.action = 'deleteBtn';
            deleteBtn.textContent = 'X';
            deleteBtn.setAttribute('id', child.id)

            children.appendChild(item);
            children.appendChild(editBtn)
            children.appendChild(deleteBtn);
        })

        newList.appendChild(spanListText);
        newList.appendChild(editList);
        newList.appendChild(deleteList);
        newList.appendChild(inputText);
        newList.appendChild(buttonAdd);
        newList.appendChild(children);

        wrapperNewList.appendChild(newList);
    })
}

function controllerNewList(e) {
    const text = getInputText(e);

    const newList = {
        id: Math.floor(Math.random() * 200) + 1,
        text: text,
        children: []
    }
    console.log(newList)
    console.log(LIST)

    clearInputText();
    addNewList(newList);
    renderList()
}

function inputController(e) {
    const id = getListId(e);
    const text = e.target.value;
    const editElem = LIST.findIndex((elem) => elem.id === id);
    LIST[editElem].text = text;
}

function actionListController(e) {
    const id = getListId(e);
    const action = e.target.dataset.action;

    if (action === 'create') {
        const text = getInputListText(id);
        const child = {
            id: Math.floor(Math.random() * 200) + 1,
            text: text,
            isCompleted: false,
            isEdit: false,
        };

        LIST.forEach((item) => {
            if (Number(item.id === id)) {
                item.children.push(child)
            }
        });
        renderList()
    }

    if (action === 'deleteList') {
        deleteNewList(id);
        renderList()
    }

    if (action === 'editBtn') {
        const childId = e.target.id;
        editChildrenText(id, childId);
        renderList()
    }

    if (action === 'editBtnList') {
        editListText(id);
        renderList()
    }

    if (action === 'saveBtn') {
        const childId = e.target.id;
        const newText = getNewText(childId);
        editChildrenText(id, childId);
        editChildrenNewText(id, childId, newText);
        renderList();
    }

    if (action === 'saveBtnList') {
        const newText = getNewTextData(id)
        console.log(newText)
        editListText(id);
        editListNewText(id, newText);
        renderList();
    }

    if (action === 'deleteBtn') {
        const childrenId = e.target.id;
        deleteChildForId(id, childrenId);
        renderList();
    }
}


function init() {
    buttonCreateList.addEventListener('click', controllerNewList);
    wrapperNewList.addEventListener('click', actionListController);
}

init();