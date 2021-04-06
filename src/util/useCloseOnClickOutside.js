import { useEffect } from "react";

export default function useCloseOnClickOutside(
  ref,
  setShowRetweet,
  setAllow,
  setShow
) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowRetweet(false);
        if (setAllow || setShow) {
          setAllow(false);
          setShow(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setAllow, setShow, setShowRetweet]);

  return;
}
