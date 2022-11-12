import { useEffect } from 'react';
import Proptypes from 'prop-types';
import css from './css/Modal.module.css';

export default function Modal({ largeImageURL, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  function onKeyDown(e) {
    if (e.code === 'Escape') {
      onClose();
    }
  }

  function onBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={css.overlay} onClick={onBackdropClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: Proptypes.func.isRequired,
  largeImageURL: Proptypes.string.isRequired,
};
