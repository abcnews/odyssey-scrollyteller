# scrolly-story

A project generated from [aunty](https://github.com/abcnews/aunty)'s `basic-story` template.


## Hot Reload

Hot reload is enabled by default on the development server. Your 'app' should be separated into the `src/index.js` loader
and the actual app in `src/components/app.js`.

If you want to see how hot reload is set up, have a look in `src/index.js` and you'll see something like this:

```javascript
if (process.env.NODE_ENV !== 'production' && module.hot) {
    let renderFunction = render;
    render = () => {
        try {
            renderFunction();
        } catch (e) {
            const { Error } = require('./error');
            root = Preact.render(<Error error={e} />, element, root);
        }
    };

    module.hot.accept('./components/app', () => {
        setTimeout(render);
    });
}
```

This just means that when `NODE_ENV` is 'development' the app will always be listening for changes and when it detects
a new build (a change to `./components/app` or its dependencies) it will automatically require in the new code.

If there was an error when compiling you will see an error box instead of your app. Once you fix the error it will vanish
and your app will be back.


## Using React components with Preact

This template comes with [`preact-compat`](https://www.npmjs.com/package/preact-compat) so any React components should
Just Work™.


## Authors

- Nathan Hoad ([nathan@nathanhoad.net](mailto:nathan@nathanhoad.net))
