import { h, Component } from 'preact';

export default class Marker extends Component {
    constructor(props) {
        super(props);

        this.ref = this.ref.bind(this);
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillUnmount() {
        if (!this.props.marker.nodes) return;

        this.props.marker.nodes.forEach(node => {
            this.element.removeChild(node);
        });
    }

    render() {
        return <div ref={this.ref} id={this.props.id} className={'Block-content u-layout u-richtext-invert'} />;
    }

    ref(element) {
        if (!element) return;
        if (!this.props.marker.nodes) return;

        this.element = element;
        this.props.marker.nodes.forEach(node => {
            this.element.appendChild(node);
        });

        this.props.reference(this.element);
    }
}
