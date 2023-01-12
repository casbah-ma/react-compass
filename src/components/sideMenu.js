import styled from "styled-components";
import mapImg from '../medias/map.jpg'
import compassImg from '../medias/compass.jpg'

const SideMenu = () => {
    return (
        <MenuContainer>
              <MenuElem bgImage={ compassImg } active/>
            <MenuElem bgImage={ mapImg } />
        </MenuContainer>
    )
}

const MenuContainer = styled.div`
    position: fixed;
    left:15px;
    top:15px;
    width:80px;
    height:100%;
`

const MenuElem = styled.div`
    width:50px;
    height:50px;
    border:${props=>props.active ? '5px solid #1ef896' : '5px solid white'} ;
    border-radius:50%;
    margin-bottom:10px;
    background-image: url(${props => props.bgImage});
    background-size:contain ;
`

export default SideMenu

