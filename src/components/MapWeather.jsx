import {useRef,useEffect} from 'react'
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { useSelector, useDispatch } from 'react-redux';
import { changeCoordsGeo } from '../features/weather/coordsSlice';
import env from "react-dotenv";

mapboxgl.accessToken = env.ACCESS_TOKEN;

const Map = () => {
    const dispatch = useDispatch()
    const containerMap = useRef(null)
    const geocoderContainer = useRef(null)
    const map = useRef(null)

    const coords = useSelector(state => state.coords)
    useEffect(() => {
        if (map.current) return; 
        map.current = new mapboxgl.Map({
            container: containerMap.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [coords.longitude, coords.latitude],
            zoom: 10,
            attributionControl:false
        });
        map.current.on('click',(e) => {
            console.log(e.lngLat)
            dispatch(changeCoordsGeo({longitude:e.lngLat.lng,latitude:e.lngLat.lat}))
        })
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: false,
            container: geocoderContainer.current
        });
        map.current.addControl(geocoder);
    },[coords])



    return (
        <>
            <div className='cocovilaint' ref={geocoderContainer} style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}></div>
            <div ref={containerMap} style={{ width: '100%', height: '500px' }} />
        </>
    )
}

export default Map