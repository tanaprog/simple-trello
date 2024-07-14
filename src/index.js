const inputLiskTitle = document.querySelector('.list-title');
const buttonCreateList = document.querySelector('.create-list');
const wrapperNewList = document.querySelector('.wrapper-new-list')

LIST = [];

function createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
}

function addNewList(newList) {
    LIST.push(newList);
}

// function findListById(id) {
//     const findList = LIST.findIndex((list) => list.id === id);
//     LIST[findList] = '56565655556'
// }

function deleteBtnForId(id) {
    const index = LIST.children.findIndex((tsk) => tsk.id === id);
    LIST.children.splice(index, 1);
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
//////////////

function getInputListText(e) {
    e.preventDefault();

    LIST.forEach(() => {
    const textList = document.querySelector('.text-title');
    const listNewText = textList.value;
    console.log(listNewText)
    return listNewText;
})
}
//////////////////

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
            const item = createElement('input', 'child-text');
            item.classList.add('child-text-none');
            item.value = child.text;
            item.setAttribute('id', child.id);
            const deleteBtn = createElement('button', 'delete-btn');
            deleteBtn.dataset.action = 'deleteBtn';
            deleteBtn.textContent = 'X';
            deleteBtn.setAttribute('id', child.id)

            children.appendChild(item);
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
        children: [{
            id: Math.floor(Math.random() * 200) + 1,
            text: '',
        }]
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

function showChild() {
    const addChild = document.querySelector('.child-text');
    addChild.classList.toggle('child-text-none');
}

function actionListController(e) {
    const id = getListId(e);
    const action = e.target.dataset.action;

    if (action === 'create') {
        console.log('create');
        getInputListText(e)
        // findListById(id)
        renderList()
    }

    if (action === 'deleteList') {
        deleteNewList(id);
        renderList()
    }

    if (action === 'deleteBtn') {
        console.log('YOOOOO')
        deleteBtnForId(id);
        renderList()
    }
}


function init() {
    buttonCreateList.addEventListener('click', controllerNewList);
    // wrapperNewList.addEventListener('input', inputController);
    // wrapperNewList.addEventListener('input', getTextList);
    wrapperNewList.addEventListener('click', actionListController)
}

init();