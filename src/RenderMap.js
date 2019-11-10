import React, { useState } from "react";
import { geoMercator, geoPath } from "d3-geo";

function RenderMap(props) {
  var original_colors = {"1": "#440000", "2": "#004400", "3": "#000044", "4": "#444400", "5": "#440044", "6": "#004444", "7": "#444444"};
  const [colors, setColors] = useState(Object.assign({}, original_colors));

  const handleGeometryClick = index => {
    var district = props.geometry.features[index].properties.C_DISTRICT;
    console.log("District " +  district);
  }

  const handleMouseOver = index => {
    var district = props.geometry.features[index].properties.C_DISTRICT;
    colors[district] = "#5522aa";
    setColors(Object.assign({}, colors));
  }

  const handleMouseOut = index => {
    var district = props.geometry.features[index].properties.C_DISTRICT;
    colors[district] = original_colors[district];
    setColors(Object.assign({}, colors));
  }
  
  var width = 960;
  var height = 700;
  var projection = geoMercator().scale(1).translate([0, 0]);
  var path = geoPath().projection(projection);
  var b = path.bounds(props.geometry),
      s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
      t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
  projection.scale(s).translate(t);

  return (
    <svg width={ width } height={ height }>
      <g>
        {
          props.geometry.features.map((d,i) => (
            <path
              key={ `path-${ i }` }
              d={ geoPath().projection(projection)(d) }
              className="district"
              fill={ colors[props.geometry.features[i].properties.C_DISTRICT] }
              stroke="#FFFFFF"
              strokeWidth={ 0.5 }
              onClick={ () => handleGeometryClick(i) }
              onMouseOver={ () => handleMouseOver(i) }
              onMouseOut={ () => handleMouseOut(i) }
            />
          ))
        }
      </g>
    </svg>
  );
}

export default RenderMap;