const dataEffects = document.querySelectorAll('[data-move-effects]');

const startMoving = (entries) => {
    entries.forEach(entry => {
        const item = entry.target;
        const data = item.closest('[data-move-effects]');
        const currentEffects = data.dataset.moveEffects.split(',');
        const classVisible = currentEffects[0].trim();
        const classUnvisible = currentEffects[1].trim();

        if (!entry.isIntersecting || entry.intersectionRation >= 0.2) {
            item.classList.remove(classVisible);
            item.classList.add(classUnvisible);
        } else {
            item.classList.remove(classUnvisible);
            item.classList.add(classVisible);
        }
    });
}

const options = {
    //root:
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.5,
};
const observer = new IntersectionObserver(startMoving, options);


const setStyleOnChildren = (elem) => {
    const tags = ['DIV', 'P', 'H1', 'H2', 'H3', 'H4', 'LI', 'BUTTON', 'A'];

    if (elem.children.length === 0) {
        if (tags.includes(elem.tagName)) {
            observer.observe(elem);
        } else if (tags.includes(elem.parentElement.tagName)) {
            observer.observe(elem);
        }
    }

    for (let item of elem.children) {
        setStyleOnChildren(item);
    }
};

const setMoveEffects = (item) => {
    const currentEffects = item.dataset.moveEffects.split(',');
    const child = currentEffects[2] ? currentEffects[2].trim() : false;

    if (child === 'true') {
        setStyleOnChildren(item);
    } else {
        observer.observe(item);
    }
};

dataEffects.forEach(item => setMoveEffects(item));