import { useState, useEffect } from "react";
import styled from "styled-components";
import Compass from "./components/compass";
import Departments from "./components/departments";
import testData from "./testData.json";

function App() {
  const [destination, setDestination] = useState(null);
  const [isError, setIsError] = useState(false)
  const [keepAhead, setKeepAhead] = useState(false)
  const departmentsData = testData.departments;

  useEffect(() => {
    setDestination(departmentsData[0]);
  }, [departmentsData]);

  function handleChangeLocation(index) {
    setDestination(departmentsData[index]);
  }

  return (
    <>
    
      {
         isError &&  <ErrorMessage>🔴 PLEASE TURN GPS ON  AND REFRESH</ErrorMessage>
     }
     
      <CompassContainer keepAhead={keepAhead}>
        {
          destination?.latitude && 
          <Compass setIsError={setIsError}
            latitude={destination?.latitude}
            longitude={destination?.longitude}
            setKeepAhead={setKeepAhead}
          />
        }
       
      </CompassContainer>
      <DepartmentsContainer>
        <Label>Slide to Select Destination</Label>
        <Departments slides={departmentsData} onChange={handleChangeLocation} />
      </DepartmentsContainer>
  
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