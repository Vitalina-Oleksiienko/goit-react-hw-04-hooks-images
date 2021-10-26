import { Component } from "react";
import PropTypes from 'prop-types';

export default class Modal extends Component {
    componentDidMount() {
        document.addEventListener('keyup', e => {
            if (e.keyCode === 27) {
                this.props.onModalCloseByEsc();
            }
        });
    }

    render() {
        return (
            <div
                onClick={this.props.onModalClose}
                onKeyDown={this.props.onKeyDown}
                className="Overlay"
            >
                <div className="Modal">
                    <img className="LargeGalleryImage" src={this.props.largeImg} alt="" />
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onModalClose: PropTypes.func,
    onModalCloseByEsc: PropTypes.func,
    onModalOpen: PropTypes.func,
    largeImg: PropTypes.string,
};