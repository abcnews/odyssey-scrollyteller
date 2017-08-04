/** @jsx Preact.h */
const Preact = require('preact');

class HTML extends Preact.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const rawHTML = { __html: this.props.html };
        
        return (
            <div
                dangerouslySetInnerHTML={rawHTML}
                id={this.props.id}
                className={this.props.className || ''}
            />
        );
    }
}

module.exports = HTML;
