/** @jsx Preact.h */
import Preact from 'preact';
import ErrorBox from './error';
import App from './components/app';

let sections = () => {
    __ODYSSEY__.utils.anchors.getSections('scrollyteller').forEach(section => {
        let element = section.betweenNodes.shift().firstChild;
        render(element, section);
        section.substituteWith(element);
    });
};

let render = (element, section) => {
    Preact.render(<App section={section} />, element);
};

// Do some hot reload magic with errors
if (process.env.NODE_ENV !== 'production' && module.hot) {
    // Wrap the actual renderer in an error trap
    let renderFunction = render;
    render = (element, section) => {
        try {
            renderFunction(element, section);
        } catch (e) {
            // Render the error to the screen in place of the actual app
            Preact.render(<ErrorBox error={e} />, element);
        }
    };

    // If a new app build is detected try rendering it
    module.hot.accept('./components/app', () => {
        setTimeout(render);
    });
}

if (window.__ODYSSEY__) {
    sections();
} else {
    window.addEventListener('odyssey:api', sections);
}
