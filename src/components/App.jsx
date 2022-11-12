import { useState, useEffect } from 'react';
// import { Component } from 'react';
import { fetchPhoto } from '../api/api';
import { SearchField } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { GlobalStyle } from 'GlobalStyle';
import { Button } from './Button';
import { Loader } from './Loader';
import Modal from './Modal';
import { Message } from './Message';
// import { toast } from 'react-toastify';

export default function App() {
  const per_page = 12;
  const [photos, setPhotos] = useState([]);
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [contentLoad, setContentLoad] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(
    'To display pictures, enter a query in the search field'
  );

  useEffect(() => {
    // setMessage('');
    getData(request, page, per_page);
  }, [page, per_page, request]);

  const getData = (request, page, per_page) => {
    setContentLoad(false);
    if (!request) {
      setContentLoad(true);
      return;
    }
    fetchPhoto(request, page, per_page).then(r => {
      if (r.hits.length === 0) {
        setMessage('Sorry, nothing was found, please try your search again');
      }
      const photos = r.hits.map(({ id, webformatURL, largeImageURL }) => ({
        id,
        webformatURL,
        largeImageURL,
      }));
      setPhotos(prevState => [...prevState, ...photos]);
      setTotalPages(r.totalHits / per_page);
      setContentLoad(true);
    });
  };

  const searchResponse = e => {
    e.preventDefault();
    if (!e.target.findForm.value) {
      setMessage('Please fill in the search field');
    }
    setRequest(e.target.findForm.value);
    setPage(1);
    setPhotos([]);
    e.target.reset();
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const getLargeImg = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app">
      <SearchField search={searchResponse} />
      {message && <Message message={message} />}
      <ImageGallery photos={photos} getLargeImg={getLargeImg} />
      {!contentLoad && <Loader />}
      {totalPages > page && <Button text="Load more" loadMore={loadMore} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={onCloseModal} />
      )}

      <GlobalStyle />
    </div>
  );
}
