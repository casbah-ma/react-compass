
import { useEffect, useState } from 'react';
    
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

export function useWatchPosition(options) {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
    const watch = navigator.geolocation.watchPosition(
        setPosition,
        setError,
        options
    );

    return () => navigator.geolocation.clearWatch(watch);
    }, [options]);

    return [position, error];
}