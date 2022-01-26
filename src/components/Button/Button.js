import React from "react";
import PropTypes from "prop-types";
import { ButtonLoadMore } from "./Button.styled";

export default function Button({ loadMore }) {
  return (
    <ButtonLoadMore type="button" onClick={loadMore}>
      Load more
    </ButtonLoadMore>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
