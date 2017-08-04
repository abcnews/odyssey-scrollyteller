/** @jsx Preact.h */
const Preact = require('preact');

const Graph = require('./graph');
const styles = require('./background.scss');

class Background extends Preact.Component {
    render() {
        const { isFixed, marker } = this.props;

        return (
            <div
                ref={el => (this.wrapper = el)}
                className={`${styles.wrapper} ${styles[this.props.attachment]}`}
                style={{ backgroundColor: marker ? marker.colour : '' }}>
                <Graph marker={marker} />
            </div>
        );
    }
}

module.exports = Background;
