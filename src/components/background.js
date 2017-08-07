/** @jsx Preact.h */
import Preact from 'preact';
import style from './style.scss';
import Graph from './graph';

export default class Background extends Preact.Component {
    render() {
        const { isFixed, marker, previousMarker } = this.props;
        return (
            <div
                ref={el => (this.wrapper = el)}
                className={`Block-media ${this.props
                    .attachment} ${style.background}`}
            >
                <Graph marker={marker} previousMarker={previousMarker} />
            </div>
        );
    }
}
