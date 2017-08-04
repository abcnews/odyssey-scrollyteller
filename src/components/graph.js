/** @jsx Preact.h */
const Preact = require('preact');
const d3 = require('d3-selection');

const styles = require('./graph.scss');

const DATA = {
    none: [100, 10, 20],
    population: [50, 200, 600]
};

class Graph extends Preact.Component {
    constructor(props) {
        super(props);

        this.draw = this.draw.bind(this);
    }

    componentDidMount() {
        this.selection = d3.select(this.wrapper).append('svg');
        this.draw(this.props.marker);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.marker !== nextProps.marker) {
            this.draw(nextProps.marker);
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div ref={el => (this.wrapper = el)} className={styles.wrapper} />
        );
    }

    draw(marker) {
        console.log('drawing', marker);

        if (!this.selection) return;
        if (!marker) return;

        const data = DATA[marker.config.comparison];

        if (!data) return;

        let circles = this.selection.selectAll('circle').data(data);

        let enterCircles = circles
            .enter()
            .append('circle')
            .attr('fill', 'white');

        circles
            .merge(enterCircles)
            .attr('r', d => d)
            .attr('x', d => d)
            .attr('y', d => d);
    }
}

module.exports = Graph;
