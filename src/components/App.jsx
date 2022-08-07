import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { getPictures } from 'services/api';
import { Wrapper } from './App.styled';

export const App = () => {
  const [page, setPage] = useState(1);
  const [request, setRequest] = useState(null);
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    if (isFirstMount) {
      setIsFirstMount(false);
      return;
    }

    setIsLoading(true);
    getPictures(request, page)
      .then(r =>
        setResponse(prevState => {
          return [...prevState, ...r];
        })
      )
      .catch(console.log)
      .finally(setIsLoading(false));
  }, [request, page, isFirstMount]);

  const onClickShowModal = (url, name) => {
    setShowModal({ url, name });
  };

  const increasePage = () => {
    setPage(prevState => prevState + 1);
  };

  const onSubmit = query => {
    if (request !== query) {
      setResponse([]);
      setRequest(query);
      return;
    }
    setRequest(query);
    increasePage();
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery>
        {response &&
          response.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <ImageGalleryItem
                onClickShowModal={onClickShowModal}
                key={id}
                originalUrl={largeImageURL}
                url={webformatURL}
                name={tags}
              />
            );
          })}
      </ImageGallery>
      {isLoading && <Loader />}
      {response.length > 0 && <Button loadMore={increasePage} />}

      {showModal && (
        <Modal
          closeModal={() => setShowModal(null)}
          url={showModal.url}
          name={showModal.name}
        />
      )}
    </Wrapper>
  );
};
