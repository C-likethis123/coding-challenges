import './carousel_styles.css'
import Accept from './accept.png';
import LevelUp from './levelup.png';

/*
Rationale: 
- a carousel changes when its internal data change
- similar to react, a declarative, reactive style of programming

Structure
- Data, has 'state'
    - state can be updated via the updateState()
    - data updates trigger UI updates in the render()
- Initialisation
    - initialise all DOM elements and event handlers accordingly in init()
- Modularity
    - Every Carousel has a unique ID and a separate state
    - DOM elements are differentiated by the unique ID so CSS selectors can perform accordingly
*/

const Carousel = function (imageList) {
    let images = imageList;
    let id = window.crypto.randomUUID();
    // re-renders over changes in curr.
    const state = {
        curr: 0,
    }
    const updateState = (key, value) => {
        state[key] = value;
        render();
    }
    const render = () => {
        const {curr} = state;
        const image = document.querySelector(`#slider-${id} > img`);
        image.src = images[curr];

        // render circles
        const circles = document.querySelectorAll(`#slider-${id} > div > .circle`);
        circles.forEach((circle) => {
            if (circle.id === `${curr}`) {
                circle.classList.add("active");
            } else {
                circle.classList.remove("active");
            }
        })
    };

    const goToNext = () => {
        updateState('curr', (state.curr + 1) % images.length);
    };

    const goToPrevious =  () => {
        updateState('curr', state.curr === 0 ? images.length - 1 : state.curr - 1);
    };
    return {
        init: () => {
            // create HTML elements
            const carousel = document.createElement('div');
            carousel.id = `slider-${id}`;
            const img = new Image();
            carousel.appendChild(img);

            const slider = document.createElement('div');
            slider.classList.add("slider");
            const prev = document.createElement('button');
            prev.textContent = "Previous";
            slider.appendChild(prev);

            // initialise circles for the carousel
            for (let i = 0; i < images.length; i++) {
                const circle = document.createElement('div');
                circle.classList.add("circle");
                circle.id = i;
                circle.onclick = () => {
                    updateState('curr', i);
                }
                slider.appendChild(circle);
            }
            const next = document.createElement('button');
            next.textContent = "Next";
            slider.appendChild(next);
            carousel.appendChild(slider);

            // initialise slider buttons
            prev.onclick = goToPrevious; 
            next.onclick = goToNext;

            document.querySelector('body').appendChild(carousel); 

            // set a timer to advance the carousell
            setInterval(goToNext, 5000);
            
            // initial render
            render();
        },
    };
};


(() => {
    const carousel = Carousel([Accept, LevelUp]);
    carousel.init();

    // create a second carousel
    const second = Carousel([Accept, LevelUp, Accept, LevelUp]);
    second.init();
})();