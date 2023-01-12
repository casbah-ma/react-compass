import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useQuery  } from "react-query";
import vibrate from "./lib/vibrate";
import Compass from "./components/compass";
import Departments from "./components/departments";
import SideMenu from "./components/sideMenu";
import MapComponent from "./components/map";
import { getDepartments } from "./services/getDepartments";

function App() {
  const [showMap, setShowMap] = useState(false)
  const [destination, setDestination] = useState(null);
  const [isError, setIsError] = useState(false)
  const [keepAhead, setKeepAhead] = useState(false)
  const selectedLocation = useMemo(() => {
    const path = window?.location?.pathname
    return path.replace('/','')
  }, [])


  const departmentList = useQuery(selectedLocation, () =>
  getDepartments({
    placeId: selectedLocation
  })
  );

  const departmentsData = departmentList?.data?.departments;

  useEffect(() => {
    if (departmentsData && departmentsData[0]) {
      setDestination(departmentsData[0]);
    }

  }, [departmentsData]);

  function handleChangeLocation(index) {
    setDestination(departmentsData[index]);
    vibrate({ duration: 200, interval: 150, count:1})
  }

  return (
    <>
      {
        selectedLocation &&  <SideMenu showMap={showMap} setShowMap={ setShowMap } />
      }

      {
        !selectedLocation && <h1>Missing arguments</h1>
      }
     
     
    
      {
         isError &&  <ErrorMessage>🔴 PLEASE TURN GPS ON  AND REFRESH</ErrorMessage>
     }
     
      {
        !showMap && selectedLocation && <CompassContainer keepAhead={keepAhead}>
        {
          destination?.latitude && 
          <Compass setIsError={setIsError}
            latitude={destination?.latitude}
            longitude={destination?.longitude}
            setKeepAhead={setKeepAhead}
          />
        }
       
      </CompassContainer>
      }

      {
        departmentsData &&  <DepartmentsContainer>
        <Label>Slide to Select Destination</Label>
        <Departments slides={departmentsData} onChange={handleChangeLocation} />
      </DepartmentsContainer>
   }
      
    

      {
        showMap && destination && <MapComponent latitude={ destination?.latitude } longitude={destination?.longitude } />
      }

    </>
  );
}

export default App;

const CompassContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh ;
  background-color: ${p=>p.keepAhead ? 'black' : '#ff3a3a'};
`;

const DepartmentsContainer = styled.div`
  position: fixed;
      z-index:9999 ;
  bottom: 0px;
  left: 20px;
  height: 90px;
  width: calc(100% - 50px);
`;

const Label = styled.label`
  font-size: 11px;
  opacity: 0.5;
  color: ${p=>p.keepAhead ? 'black' : 'white'};
`;

const ErrorMessage = styled.div`
  position: fixed;
  z-index: 9999999 ;
  top: 10px;
  left: 10px;
  background-color: black;
  padding: 5px;
  padding-right: 8px;
  color: white;
  border-radius: 5px;
`;