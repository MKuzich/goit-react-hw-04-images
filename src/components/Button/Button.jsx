import { LoadMoreBtn } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ loadMore }) => {
  const onClickHandler = () => {
    loadMore();
  };

  return (
    <LoadMoreBtn type="button" onClick={onClickHandler}>
      Load more
    </LoadMoreBtn>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
