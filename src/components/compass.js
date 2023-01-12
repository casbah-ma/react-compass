import { useState, useEffect, useMemo } from "react";
import { getRhumbLineBearing, getDistance } from "geolib";
import styled from "styled-components";
import getCardinal from "../lib/getCardinal";
import useCompassHeading from "../hooks/useCompassHeading";
import { useWatchPosition } from "../hooks/useWatchPosition";
import arrowwhite from "../medias/arrow-white.png";
import arrowgreen from "../medias/arrow-green.png";

function Compass({ latitude, longitude, setIsError, setKeepAhead }) {
  const [compassHeading, compassError] = useCompassHeading();
  const [userPosition, positionError] = useWatchPosition();
  const [placeUserHeading, setPlaceUserHeading] = useState(false);
  const [distance, setDistance] = useState(0);
  const cardinal = useMemo(
    () => getCardinal(placeUserHeading, true),
    [placeUserHeading]
  );

  useEffect(() => {
    try {
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
        setIsError(false);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
  }, [latitude, longitude, userPosition, compassHeading, setIsError]);

  useEffect(() => {
    if (compassError) {
      console.error(compassError);
    }
    if (positionError) {
      console.error(positionError);
    }
  }, [compassError, positionError]);

  useEffect(() => {
    setKeepAhead(cardinal === "keep_ahead");
  }, [cardinal, setKeepAhead]);

  return (
    <Container>
      {
        <>
          <CompassContainer
            style={{ transform: "rotate(" + placeUserHeading + "deg)" }}
          >
            <img
              src={cardinal === "keep_ahead" ? arrowgreen : arrowwhite}
              alt="arrow"
            />
          </CompassContainer>
          <Distance keepAhead={cardinal === "keep_ahead"}>{distance} m</Distance>
        </>
      }
    </Container>
  );
}

export default Compass;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const Distance = styled.div`
 color: ${p=>p.keepAhead ? 'white' : 'black'};

`;

const CompassContainer = styled.div``;
