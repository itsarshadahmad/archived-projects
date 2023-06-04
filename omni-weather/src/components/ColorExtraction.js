import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ColorExtractor } from "react-color-extractor";

export function ColorExtraction({ imageLink, setColors }) {

  const [color, setColor] = useState()

  useEffect(() => {
    let light = []
    let dark = []
    if (color) {
      color.forEach(element => {
        wc_hex_is_light(element) ? light.push(element) : dark.push(element)
      })

      if (dark.length > light.length) {
        setColors(light)
      } else {
        setColors(dark)
      }
    }
  }, [color, setColors])

  function wc_hex_is_light(color) {
    const hex = color.replace('#', '');
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    return brightness > 155;
  }

  const getColors = (colors) => {
    setColors([...colors]);
    setColor([...colors])
  }

  return (
    <ColorExtractor getColors={getColors} >
      <img alt="" src={imageLink} style={{ display: 'none' }} />
    </ColorExtractor>
  );
}