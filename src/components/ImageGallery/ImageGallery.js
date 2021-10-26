import { Component } from "react";
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
    render() {
        return (
            <>
                <ul onClick={this.props.onModalOpen} className="ImageGallery">
                    <ImageGalleryItem images={this.props.images} />
                </ul>
            </>
        );
    }
}

ImageGallery.propTyppes = {
    onModalOpen: PropTypes.func,
};