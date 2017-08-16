import Preact from 'preact';

export default class Stage extends Preact.Component {
    constructor(props) {
        super(props);

        this.onMarker = this.onMarker.bind(this);
    }

    componentDidMount() {
        this.onMarker(this.props.marker, this.props.previousMarker);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.marker !== nextProps.marker) {
            this.onMarker(nextProps.marker, nextProps.previousMarker);
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div
                className="scrollyteller-stage"
                ref={el => (this.wrapper = el)}
            />
        );
    }

    onMarker(marker, previousMarker) {
        // Don't fire the event if the transitioning markers are the same
        if (
            marker &&
            previousMarker &&
            marker.config.hash === previousMarker.config.hash
        )
            return;

        // Let them know we just changed markers
        let event = new CustomEvent('mark', {
            detail: { activated: marker, deactivated: previousMarker },
            bubbles: true
        });

        this.wrapper.__SCROLLYTELLER__ = {
            activated: marker,
            deactivated: previousMarker
        };
        this.wrapper.dispatchEvent(event);
    }
}
