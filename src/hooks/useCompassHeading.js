import { useEffect, useState } from "react";
import fulltilt from '../lib/fulltilt'

const FULLTILT = fulltilt()

export default function useCompassHeading() {
  const [heading, setHeading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    var promise = FULLTILT.getDeviceOrientation({ 'type': 'world' });
    promise.then(function (deviceOrientation) {
      setError('no orientation data yet!')
      deviceOrientation.listen(function() {
        var currentOrientation = deviceOrientation.getScreenAdjustedEuler();
        var compassHeading = 360 - currentOrientation.alpha;
        setHeading(compassHeading.toFixed([0]))
        setError(null)
      });
  
    }).catch(function(errorMessage) { 
      setError(errorMessage)
    });
  },[])

  return [heading, error];
}


/**
 *  Previous implementation
 */

  /*
  function deviceOrientationListener(event) {
    var alpha = event.alpha; //z axis rotation [0,360)
    //Check if absolute values have been sent
    if (typeof event.webkitCompassHeading !== "undefined") {
      alpha = event.webkitCompassHeading; //iOS non-standard
      setHeading(alpha.toFixed([0]))
    }
    else {
      setError("Your device is reporting relative alpha values. Cannot detect north");
      setHeading((360 - alpha).toFixed([0]))
    }
  }

  useEffect(() => {
    if (window.DeviceOrientationAbsoluteEvent) {
      window.addEventListener("DeviceOrientationAbsoluteEvent", deviceOrientationListener);
    } // If not, check if the device sends any orientation data
    else if(window.DeviceOrientationEvent){
      window.addEventListener("deviceorientation", deviceOrientationListener);
    } // Send an alert if the device isn't compatible
    else {
      setError('Your Device not compatible')
    }

    return () => {
      try {
        //removeEventListener("DeviceOrientationAbsoluteEvent")
        //removeEventListener("deviceorientation")
      } catch (error) {
        
      }
    };
  }, []);

*/
