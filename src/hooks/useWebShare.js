import { useState, useEffect } from 'react';

function useWebShare(onSuccess = () => { }, onError = () => { }) {
  const [loading, setLoading] = useState(true);
    const [isSupported, setSupport] = useState(false);

  useEffect(
    () => {
      if (!!navigator.share) {
        setSupport(true);
      } else {
        setSupport(false);
      }
      setLoading(false);
    },
    [onSuccess, onError]
  );

  return {
    loading,
    isSupported,
    share: shareContent(onSuccess, onError),
  };
}

export default useWebShare;

function shareContent(onSuccess, onError) {
   
    return  (config) => {
      const url = window.location.href;
      const title = config.title || 'Visit BMK';
      const text = config.text;
      navigator
        .share({ text, title, url })
        .then(onSuccess)
        .catch(onError);
    };
}