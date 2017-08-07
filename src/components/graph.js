/** @jsx Preact.h */
import Preact from 'preact';

export default class Graph extends Preact.Component {
    constructor(props) {
        super(props);

        this.draw = this.draw.bind(this);
    }

    componentDidMount() {
        this.draw(this.props.marker, this.props.previousMarker);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.marker !== nextProps.marker) {
            this.draw(nextProps.marker, nextProps.previousMarker);
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div class="scrollyteller-stage" ref={el => (this.wrapper = el)} />
        );
    }

    draw(marker, previousMarker) {
        // create and dispatch the event
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
