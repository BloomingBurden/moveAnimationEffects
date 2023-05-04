import { throttling } from "./utils.js";

const dataEffects = document.querySelectorAll('[data-move-effects]');

const setStyleOnChildren = (elem, effect) => {
    const tags = ['DIV', 'P', 'H1', 'H2', 'H3', 'H4', 'LI', 'BUTTON', 'A'];

    if (elem.children.length === 0) {
        if (tags.includes(elem.tagName)) {
            const elemPosY = window.pageYOffset + elem.getBoundingClientRect().top;
            const currentY = window.pageYOffset + window.innerHeight;
            
            startMoving(elem, elemPosY, currentY, effect);
        } else if (tags.includes(elem.parentElement.tagName)) {
            const elemPosY = window.pageYOffset + elem.parentElement.getBoundingClientRect().top;
            const currentY = window.pageYOffset + window.innerHeight;
            
            startMoving(elem.parentElement, elemPosY, currentY, effect);
        }
    }

    for (let item of elem.children) {
        setStyleOnChildren(item, effect);
    }
};

const startMoving = (item, elemPosY, currentY, myClass) => {
    if (currentY >= elemPosY) {
        item.classList.add(myClass);
    }

    if (currentY <= elemPosY - 100) {
        item.classList.remove(myClass);
    }
}

const setMoveEffects = (evt) => {
    dataEffects.forEach(item => {
        const elemPosY = window.pageYOffset + item.getBoundingClientRect().top;
        const currentY = window.pageYOffset + window.innerHeight;
        const currentEffects = item.dataset.moveEffects.split(',');
        const child = currentEffects[1] ? currentEffects[1].trim() : false;
        const myClass = currentEffects[0];
                
        if (child === 'true') {
            setStyleOnChildren(item, myClass);
        } else {
            startMoving(item, elemPosY, currentY, myClass);
        }

    });
};

const debounceMoveEffects = throttling(setMoveEffects, 20);

window.addEventListener('scroll', debounceMoveEffects);