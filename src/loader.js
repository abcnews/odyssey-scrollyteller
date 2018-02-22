const alternatingCaseToObject = require('@abcnews/alternating-case-to-object');

// Load any scrollyteller content from Odyssey
let scrollytellers;
function getScrollytellers() {
    if (!scrollytellers) {
        scrollytellers = window.__ODYSSEY__.utils.anchors.getSections('scrollyteller').map(section => {
            // See if there is an interactive node as the first thing
            if (section.betweenNodes[0].tagName === 'DIV') {
                section.mountNode = section.betweenNodes[0].querySelector('.init-interactive');
                section.mountNode.parentNode.className += ' u-full';
                // Don't include this node in the marker check
                section.betweenNodes[0].mountable = true;
            } else {
                // Create a node that we can mount onto
                section.mountNode = document.createElement('div');
                section.mountNode.className = 'u-full';
                section.startNode.parentNode.insertBefore(section.mountNode, section.startNode);
            }

            // Load the config and find any waypoints
            section.config = alternatingCaseToObject(section.configSC);
            section.markers = initMarkers(section, 'mark');

            return section;
        });
    }
    return scrollytellers;
}

function initMarkers(section, name) {
    let markers = [];
    let nextConfig = section.config;
    let nextNodes = [];

    let idx = 0;

    // Commit the current nodes to a marker
    function pushMarker() {
        if (nextNodes.length === 0) return;

        markers.push({
            idx: idx++,
            config: nextConfig,
            nodes: nextNodes,
            section
        });
        nextNodes = [];
    }

    // Check the section nodes for markers and marker content
    section.betweenNodes.forEach((node, index) => {
        if (node.tagName === 'A' && node.getAttribute('name') && node.getAttribute('name').indexOf(name) === 0) {
            // Found a new marker so we should commit the last one
            pushMarker();

            // If marker has no config then just use the previous config
            let configString = node.getAttribute('name').replace(new RegExp(`^${name}`), '');
            if (configString) {
                nextConfig = alternatingCaseToObject(configString);
                nextConfig.hash = configString;
            } else {
                // Empty marks should stop the piecemeal flow
                nextConfig.piecemeal = false;
            }
        } else if (!node.mountable) {
            // Any other nodes just get grouped for the next marker
            nextNodes.push(node);
            node.parentNode.removeChild(node);
        }

        // Any trailing nodes just get added as a last marker
        if (index === section.betweenNodes.length - 1) {
            pushMarker();
        }

        // If piecemeal is on/true then each node has its own box
        if (nextConfig.piecemeal) {
            pushMarker();
        }
    });

    return markers;
}

export { getScrollytellers };
