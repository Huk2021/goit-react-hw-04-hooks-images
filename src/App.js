import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/Loader";
import fetchImages from "./services/images-api";
import Modal from "./components/Modal/Modal";
import "./App.css";

export default function App () {

  const[searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const[status, setStatus] = useState('idle');


   useEffect(() => {
    if (!searchQuery) {
      return;
    }
     fetchImages(searchQuery, page)
       .then((images) => {
         if (!images.hits.length) {
           alert("Картинка не найдена");
           setStatus('rejected');
           return;
         } else {
           const data = images.hits.map(
             ({ id, tags, webformatURL, largeImageURL }) => {
               return {
                 id,
                 webformatURL,
                 tags,
                 largeImageURL,
               };
             });
           setImages(state => [...state, ...data]);
           setStatus('resolved');
           setLoadMore(true);
         };
       
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => setStatus("rejected")
       );
  }, [searchQuery, page]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
    setStatus('idle');
  };

  const onClickButton = () => {
    setPage(page => page + 1);
    setStatus("pending")
   
  };

  const toggleModal = () => {
    setShowModal(showModal =>!showModal);
  };

  const onImageClick = (largeImageURL) => {
    setLargeImageURL( largeImageURL);
    toggleModal();
  };

  
    
    return (
      <div>
        <Searchbar onSubmit={handleFormSubmit} />

        {status === "pending" && (
          <>
            <ImageGallery images={images} onImageClick={onImageClick} />
            <Loader />
          </>
        )}

        {status === "resolved" && (
          <>
            <ImageGallery images={images} onImageClick={onImageClick} />
            {loadMore && <Button loadMore={onClickButton} />}
          </>
        )}

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  
}


