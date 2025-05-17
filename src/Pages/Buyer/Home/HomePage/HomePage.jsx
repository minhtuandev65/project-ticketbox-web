import React from "react";
import CarouselHotEvent from "../CarouselHotEvents/CarouselHotEvents";
import CarouselCategories from "../CarouselCategories/CarouselCategories";
import CityCardHome from "../CityCard/CityCardHome/CityCardHome";

function HomePage() {
  return (
    <>
      <CarouselHotEvent />
      <CarouselCategories />
      <CityCardHome />
    </>
  );
}

export default HomePage;
