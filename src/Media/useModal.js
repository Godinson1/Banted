import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [images, setImages] = useState(false);

  function toggle(data) {
    setImages(data);
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
    images
  }
};

export default useModal;