import React, { useState } from "react";
import { geoMercator, geoPath } from "d3-geo";

function RenderMap(props) {
  const [colors, setColors] = useState(Object.assign({}, props.colors));

  const handleGeometryClick = index => {
    var index_identifier = props.geometry.features[index].properties[props.identifier];
    console.log(props.label + " " + index_identifier);
  }

  const handleMouseOver = index => {
    var index_identifier = props.geometry.features[index].properties[props.identifier];
    colors[index_identifier] = "#5522aa";
    setColors(Object.assign({}, colors));
  }

  const handleMouseOut = index => {
    var index_identifier = props.geometry.features[index].properties[props.identifier];
    colors[index_identifier] = props.colors[index_identifier];
    setColors(Object.assign({}, colors));
  }

  let width = 960, height = 500;
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