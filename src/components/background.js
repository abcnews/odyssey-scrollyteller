import { h, Component } from 'preact';
import style from './style.scss';
import Stage from './stage';

export default class Background extends Component {
    render({ marker, previousMarker, attachment, isScrolling }) {
        return (
            <div
                ref={el => (this.wrapper = el)}
                className={`Block-media ${attachment} ${style.background}  ${isScrolling ? style.isScrolling : ''}`}
            >
                <Stage marker={marker} previousMarker={previousMarker} />
            </div>
        );
    }
}
