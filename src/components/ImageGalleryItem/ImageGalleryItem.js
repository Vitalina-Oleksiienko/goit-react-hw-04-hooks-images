import PropTypes from 'prop-types';

export default function ImageGalleryItem({ images }) {
  return images.map(({ webformatURL, id, tags }) => {
    return (
      <li key={id} className="ImageGalleryItem">
        <img
          id={id}
          src={webformatURL}
          alt={tags}
          className="ImageGalleryItem-image"
        />
      </li>
    );
  });
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};