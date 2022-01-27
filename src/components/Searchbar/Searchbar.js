import { useState } from "react";
import PropTypes from "prop-types";
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  SearchFormInput,
} from "./Searchbar.styled";

export default function Searchbar({ onSubmit }) {

   const [searchQuery, setSearchQuery] = useState('');

  
  const handleChange = (e) => {
    setSearchQuery(e.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      alert("Ошибка! Введите любое слово");
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            onChange={handleChange}
            value={searchQuery}
            name="imgName"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
}


Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
