import { h, Component } from 'preact';
import Marker from './marker';
import Background from './background';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.onScroll = this.onScroll.bind(this);

        this.config = props.section.config;

        this.state = {
            markers: props.section.markers,
            align: this.config.align || 'centre',
            currentMarker: null,
            backgroundAttachment: 'before'
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
        const fold = view.height * (this.config.waypoint ? this.config.waypoint / 100 : 0.8);
        const pastMarkers = this.state.markers.filter(marker => {
            return marker.element && marker.element.getBoundingClientRect().top < fold;
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
        const { align, markers, previousMarker, currentMarker } = this.state;

        return (
            <div ref={el => (this.wrapper = el)} className={`Block is-richtext is-${align} is-piecemeal`}>
                <Background
                    marker={currentMarker}
                    previousMarker={previousMarker}
                    attachment={this.state.backgroundAttachment}
                />
                {markers.map(marker => (
                    <Marker
                        marker={marker}
                        reference={el => (marker.element = el)}
                        isCurrentMarker={currentMarker === marker}
                    />
                ))}
            </div>
        );
    }
}
