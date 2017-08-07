# Odyssey Scrollyteller

This module integrates with [Odyssey](https://stash.abc-dev.net.au/projects/NEWS/repos/odyssey/browse) to implement 'scrollytelling' sections in Odyssey based stories.

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
const stage = container.querySelector('[selector-for-your-interactive] .scrollyteller-stage');
if (stage && stage.__SCROLLYTELLER__) {
  init({
    detail: {
      activated: stage.__SCROLLYTELLER__.activated,
      deactivated: stage.__SCROLLYTELLER__.deactivated
    }
  });
} else {
  // console.log('waiting for the stage');
  container.addEventListener('mark', init);
}

function init(markEvent) {
    // Do your thing
}

```

## Authors

- Nathan Hoad ([nathan@nathanhoad.net](mailto:nathan@nathanhoad.net))
- Simon Elvery([simon@elvery.net](mailto:simon@elvery.net))
