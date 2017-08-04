/** @jsx Preact.h */
const Preact = require('preact');
const HTML = require('./html');

const styles = require('./marker.scss');

class Marker extends Preact.Component {
    render() {
        const { marker } = this.props;

        return (
            <div ref={this.props.reference} className={styles.wrapper}>
                <HTML html={marker.html} className={styles.detail} />
            </div>
        );
    }
}

module.exports = Marker;
