import React, { useState, useEffect } from "react";
import { Cascader } from "antd";
import RenderMap from "./RenderMap";
import "./MapTheVote.css";
import 'antd/dist/antd.css';

var map_source = {"neighborhoods": "https://opendata.arcgis.com/datasets/b76cdd45f7b54f2a96c5e97f2dda3408_2.geojson", 
                      "sound_transit": "https://transit.land/api/v1/operators/o-c23-soundtransit.geojson",
                      "counties": "https://opendata.arcgis.com/datasets/12712f465fc44fb58328c6e0255ca27e_11.geojson",
                      "districts": "https://opendata.arcgis.com/datasets/f14766ecd6274702bd786b214cb916e7_0.geojson"};

var district_colors = {"1": "#440000", "2": "#004400", "3": "#000044", "4": "#444400", "5": "#440044", "6": "#004444", "7": "#444444"};
var neighborhood_colors = {};
var county_colors = {};

const map_picker_options = [
  {
    value: "neighborhoods",
    label: "Neighborhoods"
  },
  {
    value: "districts",
    label: "Districts"
  },
  {
    value: "counties",
    label: "Counties"
  },
  {
    value: "sound_transit",
    label: "Sound Transit"
  }
];

function MapTheVote() {
  const [mapGeometry, setMapGeometry] = useState();
  const [map, setMap] = useState(["neighborhoods"]);

  useEffect(() => {
    function fetchGeometry() {
      fetch(map_source[map[0]])
      .then(response => response.json())
      .then(data => setMapGeometry(data));
    }

    fetchGeometry();
  }, [map]);

  let render_map;
  if(mapGeometry && map[0] === "districts") {
    render_map = <RenderMap map={map[0]} geometry={mapGeometry} label="District" identifier="C_DISTRICT" colors={district_colors} />
  } else if(mapGeometry && map[0] === "neighborhoods") {
    render_map = <RenderMap map={map[0]} geometry={mapGeometry} label="Neighborhood" identifier="S_HOOD" colors={neighborhood_colors} />
  } else if(mapGeometry && map[0] === "sound_transit") {
    render_map = <RenderMap map={map[0]} geometry={mapGeometry} label="Sound Transit" identifier="S_HOOD" />
  } else if(mapGeometry && map[0] === "counties") {
    render_map = <RenderMap map={map[0]} geometry={mapGeometry} label="" identifier="JURISDICT_NM" colors={county_colors} />
  } else {
    render_map = "Loading..."
  }

  return (
    <div className="container">
      <header>Map The Vote</header>
      <Cascader options={map_picker_options} onChange={setMap} defaultValue={["neighborhoods"]} placeholder="Select Map" />
      <div>
        { render_map }
      </div>
    </div>
  );
}

export default MapTheVote;