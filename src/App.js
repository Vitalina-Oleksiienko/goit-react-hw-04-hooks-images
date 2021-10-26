
import './App.css';

import { Component } from 'react';
import Button from './components/Button/Button';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import PixabyFetch from './components/PixabyFetch/PixabyFetch';
import Searchbar from './components/Searchbar/Searchbar';

import './index.css';


const newPixabyFetch = new PixabyFetch();

export default class App extends Component {
  state = {
    search: '',
    page: 1,
    status: 'init',
    modalIsOpen: false,
    largeImg: '',
    responseData: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      window.scrollTo({
        top: document.documentElement,
        behavior: 'smooth',
      });
      newPixabyFetch.resetPage();
      this.setState({ status: 'pending', page: 1 });

      newPixabyFetch.searchQuery = this.state.search;
      newPixabyFetch
        .searchPhotos()
        .then(res => {
          if (res.data.hits.length !== 0) {
            this.setState({ responseData: [...res.data.hits] });
          } else alert('Nothing to show!');
        })
        .then(
          this.setState(prevState => ({
            page: prevState.page + 1,
          })),
        )
        .finally(() => {
          this.setState({ status: 'success' });
        });
    }
  }

  onSearchFormSubmit = search => {
    this.setState({ search });
  };
  onClick = value => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
    newPixabyFetch.searchPage = this.state.page;
    newPixabyFetch
      .searchPhotos()
      .then(res => {
        this.setState(prevState => ({
          responseData: [...prevState.responseData, ...res.data.hits],
        }));
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ status: 'success' });
        window.scrollTo({
          top: document.documentElement.scrollHeight - 1200,
          behavior: 'smooth',
        });
      });

  };
  onModalOpen = e => {
    const found = this.state.responseData.find(
      el => el.id.toString() === e.target.id,
    );

    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen,
      largeImg: found.largeImageURL,
    }));
  };

  onModalClose = e => {
    if (
      e.target.className === 'Overlay' &&
      e.currentTarget.className === 'Overlay'
    ) {
      this.setState(prevState => ({
        modalIsOpen: !prevState.modalIsOpen,
      }));
    }
  };

  onModalCloseByEsc = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSearchFormSubmit} />
        <ImageGallery
          images={this.state.responseData}
          onModalOpen={this.onModalOpen}
        />
        {this.state.status === 'pending' && <Loader />}
        {this.state.responseData.length > 0 && (
          <Button onClick={this.onClick} />
        )}
        {this.state.modalIsOpen && (
          <Modal
            onModalOpen={this.onModalOpen}
            onModalClose={this.onModalClose}
            onModalCloseByEsc={this.onModalCloseByEsc}
            largeImg={this.state.largeImg}
          />
        )}
      </>
    );
  }

}


