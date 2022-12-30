import { useState, useEffect, useMemo } from "react";
import { getRhumbLineBearing, getDistance } from "geolib";
import getCardinal from "../lib/getCardinal";
import useCompassHeading from "../hooks/useCompassHeading";
import { useWatchPosition } from "../hooks/useWatchPosition";
import arrowwhite from "../medias/arrow-white.png";
import arrowgreen from "../medias/arrow-green.png";


function Compass({ latitude, longitude, title }) {
  const [compassHeading, compassError] = useCompassHeading();
  const [userPosition, positionError] = useWatchPosition();
  const [placeUserHeading, setPlaceUserHeading] = useState(false);
  const [distance, setDistance] = useState(0);
  const cardinal = useMemo(()=>getCardinal(placeUserHeading, true), [placeUserHeading]);

  useEffect(() => {
    if (userPosition && userPosition.coords && latitude && longitude) {
      const placeUserBearing = getRhumbLineBearing(
        { latitude, longitude },
        {
          latitude: userPosition.coords.latitude,
          longitude: userPosition.coords.longitude,
        }
      );
      setPlaceUserHeading(
        Math.abs(180 - Math.abs(compassHeading - placeUserBearing))
      );

      setDistance(
        getDistance(
          { latitude, longitude },
          {
            latitude: userPosition.coords.latitude,
            longitude: userPosition.coords.longitude,
          }
        )
      );
    }
  }, [latitude, longitude, userPosition, compassHeading]);
    console.log(userPosition)

  useEffect(() => {
    if (compassError) {
      console.error(compassError);
    }
    if (positionError) {
      console.error(positionError);
    }
  }, [compassError, positionError]);

  return (
    <div className="compass">
    
      <div className="title">
        <h4>{title}</h4>
              <h4>{distance} m</h4>
              <h4>{ cardinal }</h4>
              <h4>{compassError}</h4>
              <h4>{positionError}</h4>
              <h4>{placeUserHeading}deg</h4>
              <h4>{ JSON.stringify(userPosition) }</h4>
      </div>

      <div className="arrow">
        <img
          src={cardinal === "keep_ahead" ? arrowgreen : arrowwhite}
          alt="arrow"
          style={{ transform: "rotate(" + placeUserHeading + "deg)" }}
        />
      </div>
    </div>
  );
}

export default Compass;
