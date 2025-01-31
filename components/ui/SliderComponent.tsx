import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

interface SliderProps {
  renderItem: ({ item }: { item: any }) => React.ReactElement;
  data: any[];
}

const Slider: React.FC<SliderProps> = ({ renderItem, data }) => {
  return (
    <Carousel
      loop
      width={width}
      height={200}
      autoPlay={true}
      autoPlayInterval={3000}
      data={data}
      scrollAnimationDuration={1000}
      renderItem={renderItem}
    />
  );
};

export default Slider;
