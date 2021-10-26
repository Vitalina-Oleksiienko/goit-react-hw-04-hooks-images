
import { useState, useEffect } from 'react';
import Button from './components/Button/Button';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import PixabyFetch from './components/PixabyFetch/PixabyFetch';
import Searchbar from './components/Searchbar/Searchbar';

import './index.css';


const newPixabyFetch = new PixabyFetch();

export default function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [responseData, setResponseData] = useState([]);
  const [status, setStatus] = useState('init');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [largeImg, setLargeImg] = useState('');

  useEffect(() => {
    if (search === '') {
      return;
    }

    window.scrollTo({
      top: document.documentElement,
      behavior: 'smooth',
    });
    newPixabyFetch.resetPage();
    setStatus('pending');
    setPage(1);

    newPixabyFetch.searchQuery = search;
    newPixabyFetch
      .searchPhotos()
      .then(res => {
        if (res.data.hits.length !== 0) {
          setResponseData([...res.data.hits]);
        } else alert('Nothing to show! Change your search query');
      })
      .then(setPage(p => p + 1))
      .finally(() => {
        setStatus('success');
      });
  }, [search]);

  const onSearchFormSubmit = search => {
    setSearch(search);
  };

  const onClick = value => {
    setStatus('pending');
    setPage(page + 1);

    newPixabyFetch.searchPage = page;
    newPixabyFetch
      .searchPhotos()
      .then(res => {
        setResponseData(prevState => [...prevState, ...res.data.hits]);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setStatus('success');
        window.scrollTo({
          top: document.documentElement.scrollHeight - 1200,
          behavior: 'smooth',
        });
      });
  };

  const onModalOpen = e => {
    const found = responseData.find(el => el.id.toString() === e.target.id);

    setModalIsOpen(!modalIsOpen);
    setLargeImg(found.largeImageURL);
  };

  const onModalClose = e => {
    if (
      e.target.className === 'Overlay' &&
      e.currentTarget.className === 'Overlay'
    ) {
      setModalIsOpen(!modalIsOpen);
    }
  };

  const onModalCloseByEsc = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Searchbar onSearchFormSubmit={onSearchFormSubmit} />
      <ImageGallery images={responseData} onModalOpen={onModalOpen} />
      {status === 'pending' && <Loader />}
      {responseData.length > 0 && <Button onClick={onClick} />}
      {modalIsOpen && (
        <Modal
          onModalClose={onModalClose}
          onModalCloseByEsc={onModalCloseByEsc}
          largeImg={largeImg}
        />
      )}
    </>
  );
}


