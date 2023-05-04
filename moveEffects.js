import { throttling } from "./utils.js";

const dataEffects = document.querySelectorAll('[data-move-effects]');

const setStyleOnChildren = (elem, visible, unvisible) => {
    const tags = ['DIV', 'P', 'H1', 'H2', 'H3', 'H4', 'LI', 'BUTTON', 'A'];

    if (elem.children.length === 0) {
        if (tags.includes(elem.tagName)) {
            const elemPosY = window.pageYOffset + elem.getBoundingClientRect().top;
            const currentY = window.pageYOffset + window.innerHeight;
            
            startMoving(elem, elemPosY, currentY, visible, unvisible);
        } else if (tags.includes(elem.parentElement.tagName)) {
            const elemPosY = window.pageYOffset + elem.parentElement.getBoundingClientRect().top;
            const currentY = window.pageYOffset + window.innerHeight;
            
            startMoving(elem.parentElement, elemPosY, currentY, visible, unvisible);
        }
    }

    for (let item of elem.children) {
        setStyleOnChildren(item, visible, unvisible);
    }
};

const startMoving = (item, elemPosY, currentY, visible, unvisible) => {
    if (currentY >= elemPosY) {
        item.classList.remove(unvisible);
        item.classList.add(visible);
    }

    if (currentY <= elemPosY - 100) {
        item.classList.remove(visible);
        item.classList.add(unvisible);
    }
}

const setMoveEffects = (evt) => {
    dataEffects.forEach(item => {
        const elemPosY = window.pageYOffset + item.getBoundingClientRect().top;
        const currentY = window.pageYOffset + window.innerHeight;
        const currentEffects = item.dataset.moveEffects.split(',');
        const child = currentEffects[2] ? currentEffects[2].trim() : false;
        const classVisible = currentEffects[0].trim();
        const classUnvisible = currentEffects[1].trim();
                
        if (child === 'true') {
            setStyleOnChildren(item, classVisible, classUnvisible);
        } else {
            startMoving(item, elemPosY, currentY, classVisible, classUnvisible);
        }

    });
};

const debounceMoveEffects = throttling(setMoveEffects, 20);

window.addEventListener('scroll', debounceMoveEffects);