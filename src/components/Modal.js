/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Proptypes from 'prop-types';
import css from './css/Modal.module.css';

export default function Modal({ largeImageURL, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', onBackdropClick);

    return () => {
      window.removeEventListener('keydown', onBackdropClick);
    };
  }, [onBackdropClick]);

  // function onKeyDown(e) {
  //   if (e.code === 'Escape') {
  //     onClose();
  //   }
  // }

  function onBackdropClick(e) {
    if (e.target === e.currentTarget || e.code === 'Escape') {
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

// componentDidMount() {
//   window.addEventListener('keydown', this.onKeyDown);
// }

// componentWillUnmount() {
//   window.removeEventListener('keydown', this.onKeyDown);
// }

// onKeyDown = e => {
//   if (e.code === 'Escape') {
//     this.props.onClose();
//   }
// };
