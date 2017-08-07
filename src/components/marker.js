/** @jsx Preact.h */
import Preact from 'preact';

export default class Marker extends Preact.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { marker } = this.props;
        const rawHTML = { __html: marker.html };
        return (
            <div
                dangerouslySetInnerHTML={rawHTML}
                ref={this.props.reference}
                id={this.props.id}
                className={'Block-content u-layout u-richtext-invert'}
            />
        );
    }
}
