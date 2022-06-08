# Odyssey Scrollyteller

This module integrates with [Odyssey](https://github.com/abcnews/odyssey) to implement 'scrollytelling' sections in Odyssey based stories.

To use this, include it in the story along with the implementation of the visual element.

```
Some text before the scrollytelling portion of the story starts.
#scrollyteller
[link to your interactive here]
A first paragraph of the scrollytelling experience.
#markIDone
A second section. These sections can be broken into multiple paragraphs and are divided by the '#mark' anchors.
The '#mark' anchors also act as waypoints for which Odyssey Scrollyteller will create events.
#markIDtwo
When the start of each section scrolls past the bottom of the viewport, a new event is fired on the background element (which can then bubble up the DOM, so you can listen for it anywhere).
#endscrollyteller
You can then carry on your story after the scrollytelling section.
```

## Usage

To hook into the events, use some variation on this code:

```js
// Initialise
const stage = document.querySelector('[selector-for-your-interactive] .scrollyteller-stage');

if (stage) {
    init({
        target: stage,
        detail: stage.__SCROLLYTELLER__
    });
} else {
    // console.log('waiting for the stage');
    document.addEventListener('mark', init);
}

function init(ev) {
    console.log(ev.target); // the stage element
    console.log(ev.detail); // the `activated` and `deactivated` marks (if any)
}
```

## Configuration options

The opening `#scrollyteller` tag takes some options which are specified using an alternating case syntax. For example, the opening tag `#scrollytellerHELLOworldMEANING42` will result in a config object which looks like:

```js
{
    hello: "world",
    meaning: 42
}
```

The config options available are:

-   `ALIGN` (`left`|`right`): Align the content to the left or right when the screen is wide enough. Defaults to `centre` alignment.
-   `WAYPOINT` (integer between `0` and `100`): Defines where on the viewport (% distance from top) `#mark` events are triggered. Defaults to `80`.

There is also an option available on individual `#mark` tags.

-   `PIECEMEAL` (`true`): Sets all elements between this mark and the next to get their own visual container instead of being grouped together (the default behaviour).

## Authors

-   Nathan Hoad ([nathan@nathanhoad.net](mailto:nathan@nathanhoad.net))
-   Simon Elvery ([simon@elvery.net](mailto:simon@elvery.net))
-   Colin Gourlay ([gourlay.colin@abc.net.au](mailto:gourlay.colin@abc.net.au))
