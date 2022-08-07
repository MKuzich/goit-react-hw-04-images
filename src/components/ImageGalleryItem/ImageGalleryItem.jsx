import { Item, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  onClickShowModal,
  url,
  name,
  originalUrl,
}) => {
  function onClickHandler() {
    onClickShowModal(originalUrl, name);
  }
  return (
    <Item onClick={onClickHandler}>
      <Image src={url} alt={name} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClickShowModal: PropTypes.func.isRequired,
  originalUrl: PropTypes.string.isRequired,
};
