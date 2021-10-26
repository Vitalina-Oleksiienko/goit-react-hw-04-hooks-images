import { useEffect } from "react";
import PropTypes from 'prop-types';

export default function Modal({
  onModalCloseByEsc,
  onModalClose,
  onKeyDown,
  largeImg,
}) {
  useEffect(() => {
    console.log('addEventListener');
    document.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        onModalCloseByEsc();
      }
    });
  });

  return (
    <div onClick={onModalClose} onKeyDown={onKeyDown} className="Overlay">
      <div className="Modal">
        <img className="LargeGalleryImage" src={largeImg} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onModalClose: PropTypes.func,
  onModalCloseByEsc: PropTypes.func,
  largeImg: PropTypes.string,
};