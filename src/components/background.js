import { h, Component } from 'preact';
import style from './style.scss';
import Stage from './stage';

export default class Background extends Component {
    render() {
        const { marker, previousMarker, attachment } = this.props;

        return (
            <div ref={el => (this.wrapper = el)} className={`Block-media ${attachment} ${style.background}`}>
                <Stage marker={marker} previousMarker={previousMarker} />
            </div>
        );
    }
}
