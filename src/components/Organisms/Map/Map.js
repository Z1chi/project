import React, { useEffect, useState } from "react";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

import { GEO_URL } from './constants/geo';

import './map.scss'

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

export const Map = ({ countryIdList }) => {
    return (
        <div className='map'>
            <ComposableMap
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 147
                }}
            >
                <Geographies geography={GEO_URL}>
                    {({ geographies }) =>
                        geographies.map((geo, countryId) => {
                            if(countryId==16) {
                                // console.log('geo', geo)
                            }
                        return (
                            <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={countryIdList.find( item => item === countryId) ? '#b21': '#12b'}
                            />
                        );
                        })
                    }
                </Geographies>
            </ComposableMap>

        </div>
    )
}