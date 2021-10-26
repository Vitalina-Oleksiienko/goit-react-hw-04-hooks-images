import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({onModalOpen, images}) {
        return (
            <>
                <ul onClick={onModalOpen} className="ImageGallery">
                    <ImageGalleryItem images={images} />
                </ul>
            </>
        );
    }

ImageGallery.propTyppes = {
    onModalOpen: PropTypes.func,
};