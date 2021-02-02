import { useState, useEffect } from 'react';

const useGetRequest = (fetchFunction, url) => {
  const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    fetchFunction(abortCont.signal, url).then((data) => setData(data));
    return () => {
      abortCont.abort();
    };
  }, [fetchFunction, url]);
  return { data };
};

export default useGetRequest;

//   fetch(endpoint, { signal: abortCont.signal })
//     .then((res) => {
//       if (!res.ok) {
//         throw Error('Could not receive data from server');
//       }
//       return res.json();
//     })
//     .then((data) => {
//       setData(data);
//       setError(null);
//       setIsLoading(false);
//     })
//     .catch((err) => {
//       if (err.name === 'AbortError') {
//         console.log('fetch aborted');
//       } else {
//         setIsLoading(false);
//         setError(err.message);
//       }
//     });
