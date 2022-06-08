import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { h, render } from 'preact';
import App from './components/app';
import { getScrollytellers } from './loader';

const renderScrollyteller = (element, section) => {
    render(<App section={section} />, element, element.lastChild);
};

whenOdysseyLoaded.then(() => getScrollytellers().forEach(section => renderScrollyteller(section.mountNode, section)));
