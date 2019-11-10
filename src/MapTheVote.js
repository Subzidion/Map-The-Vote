import React, { useState, useEffect } from 'react';
import './MapTheVote.css';

import RenderMap from './RenderMap';

function MapTheVote() {
  const [mapGeometry, setMapGeometry] = useState();

  function fetchGeometry() {
    fetch("https://opendata.arcgis.com/datasets/f14766ecd6274702bd786b214cb916e7_0.geojson")
    .then(response => response.json())
    .then(data => setMapGeometry(data));
  }

  useEffect(() => fetchGeometry(), []);

  if(mapGeometry) {
    return (
      <div className="container">
        <RenderMap geometry={mapGeometry} />
      </div>
    );
  } else {
    return (
      <div className="container">
        Loading...
      </div>
    );
  }
}

export default MapTheVote;