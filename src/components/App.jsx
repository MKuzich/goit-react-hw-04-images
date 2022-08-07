import React, { PureComponent } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { getPictures } from 'services/api';
import { Wrapper } from './App.styled';

export class App extends PureComponent {
  state = {
    page: 1,
    request: null,
    response: [],
    isLoading: false,
    showModal: null,
  };

  async componentDidUpdate(_, prevState) {
    const { request, page } = this.state;
    if (prevState.request !== request || prevState.page !== page) {
      this.setState({ isLoading: true });
      const receivedPictures = await getPictures(request, page);
      this.setState(prevState => {
        return { response: [...prevState.response, ...receivedPictures] };
      });
      this.setState({ isLoading: false });
    }
  }

  onClickShowModal = (url, name) => {
    this.setState({ showModal: { url, name } });
  };

  onClickCloseModal = () => {
    this.setState({ showModal: null });
  };

  increasePage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  onSubmit = request => {
    if (this.state.request !== request) {
      this.setState({ response: [], request });
    }
    this.setState({ request });
  };

  render() {
    const { response, isLoading, showModal } = this.state;

    return (
      <Wrapper>
        <GlobalStyle />
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery>
          {response &&
            response.map(({ id, webformatURL, tags, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  onClickShowModal={this.onClickShowModal}
                  key={id}
                  originalUrl={largeImageURL}
                  url={webformatURL}
                  name={tags}
                />
              );
            })}
        </ImageGallery>
        {isLoading && <Loader />}
        {response.length > 0 && <Button loadMore={this.increasePage} />}

        {showModal && (
          <Modal
            closeModal={this.onClickCloseModal}
            url={showModal.url}
            name={showModal.name}
          />
        )}
      </Wrapper>
    );
  }
}
