/** @jsx Preact.h */
import Preact from 'preact';
import initMarkers from '../loader';
import Marker from './marker';
import Background from './background';

export default class App extends Preact.Component {
    constructor(props) {
        super(props);

        this.onScroll = this.onScroll.bind(this);

        this.state = {
            markers: initMarkers(props.section),
            currentMarker: null,
            isBackgroundFixed: false
        };
    }

    componentDidMount() {
        __ODYSSEY__.scheduler.subscribe(this.onScroll);
    }

    componentWillUnmount() {
        __ODYSSEY__.scheduler.unsubscribe(this.onScroll);
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
            // console.log('onScroll', lastSeenMarker, this.state.currentMarker);
            this.setState({
                previousMarker: this.state.currentMarker,
                currentMarker: lastSeenMarker
            });
        }

        // Work out if the background should be fixed or not
        if (this.wrapper) {
            const bounds = this.wrapper.getBoundingClientRect();

            let backgroundAttachment;
            if (bounds.top > 0) {
                backgroundAttachment = '';
            } else if (bounds.bottom < view.height) {
                backgroundAttachment = 'is-beyond';
            } else {
                backgroundAttachment = 'is-fixed';
            }

            this.setState({ backgroundAttachment });
        }
    }

    render() {
        return (
            <div
                ref={el => (this.wrapper = el)}
                className={'u-full Block is-richtext is-piecemeal'}
            >
                <Background
                    marker={this.state.currentMarker}
                    previousMarker={this.state.previousMarker}
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
