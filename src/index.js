/** @jsx Preact.h */
const Preact = require('preact');
const domready = require('domready');

const element = document.querySelector('[data-scrolly-story-root]');

let root;
let render = () => {
    let App = require('./components/app');
    root = Preact.render(<App />, element, root);
};

// Do some hot reload magic with errors
if (process.env.NODE_ENV !== 'production' && module.hot) {
    // Wrap the actual renderer in an error trap
    let renderFunction = render;
    render = () => {
        try {
            renderFunction();
        } catch (e) {
            // Render the error to the screen in place of the actual app
            const { Error } = require('./error');
            root = Preact.render(<Error error={e} />, element, root);
        }
    };

    // If a new app build is detected try rendering it
    module.hot.accept('./components/app', () => {
        setTimeout(render);
    });
}

domready(render);
