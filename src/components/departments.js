// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/scrollbar";

const DepartmentsSwiper = ({ slides, onChange }) => {
  return (
    <>
      {slides && (
        <Swiper
          scrollbar={{
            hide: true,
          }}
          onActiveIndexChange={(swiperCore) => {
            onChange(swiperCore.activeIndex);
          }}
          modules={[Scrollbar]}
          autoplay={false}
          spaceBetween={30}
          slidesPerView={"auto"}
          centeredSlides
        >
          {slides.map((s) => (
            <SwiperSlide key={s.name}>
              <ASlide>{s.name}</ASlide>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default DepartmentsSwiper;

const ASlide = styled.div`
  background-color: black;
  color: white !important;
  text-align: center;
  margin-bottom: 10px;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: #000;
  cursor: pointer;
  border: 3px solid;
  padding: 0.25em 0.5em;
  box-shadow: 0px 0px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`;
