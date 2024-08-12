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
    const editChildbyId = elementChildren.findIndex((item) => item.id === childId);
    editChildbyId.isEdit = !editChildbyId.isEdit;
}

function editChildrenNewText(elemId, childId, newText) {
    const findListId = LIST.findIndex((elem) => elem.id === elemId);
    const elementList = LIST[findListId];
    const elementChildren = elementList.children;
    const editChildbyId = elementChildren.findIndex((item) => item.id === childId);
    editChildbyId.text = newText;
}

function getNewText(id) {
    const textElemId = document.getElementById(id).children;
    let textTask;

    for (let elem of textElemId) {
        if (elem.isContentEditable) {
            textTask = elem.textContent;
        }
    }
    return textTask;
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
        const inputListText = createElement('input', 'description-text')
        inputListText.value = list.text;
        inputListText.setAttribute('id', list.id);
        const deleteList = createElement('button', 'delete-list');
        deleteList.dataset.action = 'deleteList';
        deleteList.textContent = 'delete list';

        const inputText = createElement('input', 'text-title')
        inputText.dataset.action = 'inputText';
        inputText.value = '';
        inputText.setAttribute('id', list.id);
        const buttonAdd = createElement('button', 'create-description');
        buttonAdd.dataset.action = 'create';
        buttonAdd.textContent = 'create';
        buttonAdd.setAttribute('id', list.id);
        const children = createElement('div', 'wrapper-span')
        children.setAttribute('id', list.id);

        list.children.forEach((child) => {

            const item = createElement('span', 'child-text');
            item.textContent = child.text;
            item.setAttribute('style', child.isEdit ? "border: 2px solid white" : "");
            item.contenteditable = child.isEdit;
            item.setAttribute('id', child.id);

            const editBtnImg = createElement('img', 'edit-btn');
            editBtnImg.src = child.isEdit ? 'img/edit.png' : 'img/save.png';

            editBtnImg.setAttribute('id', child.id);
            editBtnImg.dataset.action = 'editBtn';
            editBtnImg.dataset.action = 'saveBtn';


            // const saveBtnImg = createElement('img', 'save-btn');
            // saveBtnImg.src = 'img/save.png';
            // saveBtnImg.dataset.action = 'saveBtn';
            // saveBtnImg.setAttribute('id', child.id);

            const deleteBtn = createElement('button', 'delete-btn');
            deleteBtn.dataset.action = 'deleteBtn';
            deleteBtn.textContent = 'X';
            deleteBtn.setAttribute('id', child.id)

            children.appendChild(item);
            children.appendChild(editBtnImg)
            children.appendChild(deleteBtn);
        })

        newList.appendChild(inputListText);
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
        const child = { id: Math.floor(Math.random() * 200) + 1, text };

        LIST.forEach((item) => {
            if (Number(item.id === id)) {
                item.children.push(child)
            }
        });
        console.log('create')

        renderList()
    }

    if (action === 'deleteList') {
        deleteNewList(id);
        renderList()
    }

    if (action === 'editBtn') {
        console.log('EDIT')
        const childId = e.target.id;
        console.log(childId);
        editChildrenText(id, childId);
        renderList()
    }

    if (action === 'saveBtn'){
        console.log('555555')
        const newText = getNewText(id);
        const childId = e.target.id;
        editChildrenText(id, childId);
        editChildrenNewText(id, childId, newText);
        renderList();
    }

    if (action === 'deleteBtn') {
        const childrenId = e.target.id;
        deleteChildForId(id, childrenId);
        renderList()
    }
}


function init() {
    buttonCreateList.addEventListener('click', controllerNewList);
    wrapperNewList.addEventListener('click', actionListController);
}

init();