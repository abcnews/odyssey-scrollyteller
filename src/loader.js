function alternatingCaseToObject(string) {
    let o = {};
    let match = string.match(/[A-Z]+[0-9a-z]+/g);
    if (match) {
        match.forEach(match => {
            const [, key, value] = match.match(/([A-Z]+)([0-9a-z]+)/);
            o[key.toLowerCase()] = value;
        });
    }
    return o;
}

function getGroups(group, idx, all) {
    // While has next sibling and next sibling is valid (not a group and not null)
    let allNodes = all.map(g => g.node);
    let nextNode = group.node.nextSibling;
    if (idx === 0 && !!nextNode) nextNode = nextNode.nextSibling;
    let html = '';
    while (nextNode && allNodes.indexOf(nextNode) < 0) {
        if (nextNode.outerHTML) {
            html += nextNode.outerHTML;
        }
        nextNode = nextNode.nextSibling;

        // TODO: Work out how to keep a cache of the old DOM so hot reload works nicely
        // Remove current article from the DOM
        // if (nextNode) {
        //     nextNode.previousSibling.remove();
        // }
    }

    group.html = html;

    return group;
}

export default function initMarkers(section) {
    let name = 'mark';

    let markers = section.betweenNodes
        .filter(
            node =>
                node.getAttribute('name') &&
                node.getAttribute('name').indexOf(name) === 0
        )
        .map(node => {
            const configSC = node.getAttribute('name').slice(name.length);
            return {
                name,
                configSC,
                config: alternatingCaseToObject(configSC),
                node
            };
        });

    let groups = [
        {
            name: section.name,
            configSC: section.configSC,
            config: alternatingCaseToObject(section.configSC),
            node: section.startNode
        }
    ]
        .concat(markers)
        .map(getGroups);

    return groups;
}
