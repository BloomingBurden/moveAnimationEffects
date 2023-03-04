import { debounce } from "./utils.js";

const dataEffects = document.querySelectorAll('[data-move-effects]');
const effects = {
    top: {
        next: 'translateY(70px)',
        back: 'translateY(0)',
    },
    left: {
        next: 'translateX(-100px)',
        back: 'translateX(0)',
    },
    right: {
        next: 'translateX(100px)',
        back: 'translateX(0)',
    },
    bottom: {
        next: 'translateY(-70px)',
        back: 'translateY(0)',
    },
    scale: {
        next: 'scale(0.5)',
        back: 'scale(1)',
    }
};


const setStyleOnChildren = (elem, effect) => {
    if (elem.tagName === 'BR') return;

    if (elem.children.length === 0) {
        const elemPosY = window.pageYOffset + elem.getBoundingClientRect().top;
        const currentY = window.pageYOffset + window.innerHeight;
        
        startMoving(elem, elemPosY, currentY, effect);
    }

    for (let item of elem.children) {
        setStyleOnChildren(item, effect);
    }
};

const startMoving = (item, elemPosY, currentY, effect) => {
    if (currentY >= elemPosY) {
        item.style.transform = `${effects[effect].back}`;
        item.style.opacity = 1;
        item.style.visibility = 'visible';
    }

    if (currentY <= elemPosY - 200) {
        item.style.cssText = `
            transition: 1s ease;
            transform: ${effects[effect].next};
            opacity: 0;
            visibility: hidden;
        `;
    }
}

const setMoveEffects = (evt) => {
    dataEffects.forEach(item => {
        const elemPosY = window.pageYOffset + item.getBoundingClientRect().top;
        const currentY = window.pageYOffset + window.innerHeight;
        const currentEffects = item.dataset.moveEffects.split(',');
        const child = currentEffects[1] ? currentEffects[1].trim() : false;
        const effect = currentEffects[0];
        
        if (child === 'true') {
            setStyleOnChildren(item, effect);
        } else {
            startMoving(item, elemPosY, currentY, effect);
        }

    });
};

const debounceMoveEffects = debounce(setMoveEffects, 300);

window.addEventListener('scroll', debounceMoveEffects);

