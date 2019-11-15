import React, { useState, useEffect } from "react";
import { Cascader } from "antd";
import RenderMap from "./RenderMap";
import { config } from "./Config";

import "./MapTheVote.css";
import 'antd/dist/antd.css';

function MapTheVote() {
  const [mapGeometry, setMapGeometry] = useState();
  const [map, setMap] = useState(config.options[0].value);

  useEffect(() => {
    function fetchGeometry() {
      fetch(config[map].geometry_source)
      .then(response => response.json())
      .then(data => {
        config[map].geometry = data;
        setMapGeometry(data);
      })
    }
    if(!config[map].geometry) {
      fetchGeometry();
    } else {
      setMapGeometry(config[map].geometry);
    }
  }, [map]);

  let render_map;
  if(mapGeometry) {
    render_map = <RenderMap map={ map } geometry={ mapGeometry } label={ config[map].label }
                            identifier={ config[map].identifier } colors={ config[map].colors } />
  } else {
    render_map = "Loading..."
  }

  return (
    <div className="container">
      <header>Map The Vote</header>
      <Cascader options={ config.options } onChange={ (value) => { setMap(value[0]); } }
                defaultValue={ [map] } placeholder="Select Map" />
      <div>
        { render_map }
      </div>
    </div>
  );
}

export default MapTheVote;