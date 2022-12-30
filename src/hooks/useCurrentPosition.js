import { useEffect, useState } from "react";

/**
 * // Usage: 
 *  import { useCurrentPosition } from 'react-use-geolocation';

    function Example() {
        const [position, error] = useCurrentPosition();

        if (!position && !error) {
            return <p>Waiting...</p>;
        }

        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            <div>
            <p>Latitude: {position.coords.latitude}</p>
            <p>Longitude: {position.coords.longitude}</p>
            </div>
        );
    }
*/


export function useCurrentPosition(options) {
  const [position, setPosition] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    let canceled = false;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!canceled) {
          setPosition(position);
        }
      },
      (error) => {
        if (!canceled) {
          setError(error);
        }
      },
      options
    );

    return () => {
      canceled = true;
    };
  }, [options]);

  return [position, error];
}
