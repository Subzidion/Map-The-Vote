import React, { useState } from "react";
import { geoMercator, geoPath } from "d3-geo";

function RenderMap(props) {
  const [colors, setColors] = useState(Object.assign({}, props.colors));

  const handleGeometryClick = index => {
    var identifier = props.geometry.features[index].properties[props.identifier];
    console.log(props.label + " " + identifier);
  }

  const handleMouseOver = index => {
    var identifier = props.geometry.features[index].properties[props.identifier];
    colors[identifier] = "#5522aa";
    setColors(Object.assign({}, colors));
  }

  const handleMouseOut = index => {
    var identifier = props.geometry.features[index].properties[props.identifier];
    colors[identifier] = props.colors[identifier];
    setColors(Object.assign({}, colors));
  }

  let width = 960, height = 700;
  let projection = geoMercator().scale(1).fitSize([width, height], props.geometry);
  let path = geoPath().projection(projection);

  return (
    <svg width={ width } height={ height }>
      <g>
        {
          props.geometry.features.map((d,i) => (
            <path
              key={ `path-${ i }` }
              d={ path(d) }
              fill={ colors[props.geometry.features[i].properties[props.identifier]] }
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