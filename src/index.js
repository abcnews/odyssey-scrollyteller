import Preact from 'preact';
import { getScrollytellers } from './loader';

let init = () => {
    getScrollytellers().forEach(section => render(section.mountNode, section));
};

let render = (element, section) => {
    const App = require('./components/app').default;
    Preact.render(<App section={section} />, element, element.lastChild);
};

// Do some hot reload magic with errors
if (module.hot) {
    // Wrap the actual renderer in an error trap
    let renderFunction = render;
    render = (element, section) => {
        try {
            renderFunction(element, section);
        } catch (e) {
            // Render the error to the screen in place of the actual app
            const ErrorBox = require('./error').default;
            Preact.render(<ErrorBox error={e} />, element);
        }
    };

    // If a new app build is detected try rendering it
    module.hot.accept('./components/app', () => {
        setTimeout(init);
    });
}

if (window.__ODYSSEY__) {
    init();
} else {
    window.addEventListener('odyssey:api', init);
}
