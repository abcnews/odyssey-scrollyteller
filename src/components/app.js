/** @jsx Preact.h */
const Preact = require('preact');
const { start, subscribe, unsubscribe } = require('narricle/scheduler');

const { initMarkers } = require('../loader');
const Marker = require('./marker');
const Background = require('./background');

const styles = require('./app.scss');

class App extends Preact.Component {
    constructor(props) {
        super(props);

        this.onScroll = this.onScroll.bind(this);

        this.state = {
            markers: initMarkers('mark'),
            currentMarker: null,
            isBackgroundFixed: false
        };
    }

    componentDidMount() {
        start();
        subscribe(this.onScroll);
    }

    componentWillUnmount() {
        unsubscribe(this.onScroll);
    }

    onScroll(view) {
        // Work out which marker is the current one
        const fold = view.height * 0.4;
        const pastMarkers = this.state.markers.filter(marker => {
            return (
                marker.element &&
                marker.element.getBoundingClientRect().top < fold
            );
        });

        let lastSeenMarker = pastMarkers[pastMarkers.length - 1];
        if (!lastSeenMarker) lastSeenMarker = this.state.markers[0];
        if (this.state.currentMarker !== lastSeenMarker) {
            this.setState({
                currentMarker: lastSeenMarker
            });
        }

        // Work out if the background should be fixed or not
        if (this.wrapper) {
            const bounds = this.wrapper.getBoundingClientRect();

            let backgroundAttachment;
            if (bounds.top > 0) {
                backgroundAttachment = 'before';
            } else if (bounds.bottom < view.height) {
                backgroundAttachment = 'after';
            } else {
                backgroundAttachment = 'during';
            }

            this.setState({ backgroundAttachment });
        }
    }

    render() {
        return (
            <div
                ref={el => (this.wrapper = el)}
                className={'u-full ' + styles.wrapper}>
                <Background
                    marker={this.state.currentMarker}
                    attachment={this.state.backgroundAttachment}
                />
                {this.state.markers.map(marker =>
                    <Marker
                        marker={marker}
                        reference={el => (marker.element = el)}
                        isCurrentMarker={this.state.currentMarker === marker}
                    />
                )}
            </div>
        );
    }
}

module.exports = App;
