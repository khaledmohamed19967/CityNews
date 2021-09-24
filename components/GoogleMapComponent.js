import React, { useEffect,   useState, useRef } from 'react';
import { GMap } from 'primereact/gmap';
import { Toast } from 'primereact/toast';
import { loadGoogleMaps, removeGoogleMaps } from '../GoogleMaps';
import {connect} from "react-redux";
import {Button} from "primereact/button";
import { ProgressSpinner } from 'primereact/progressspinner';

const mapStateToProps = (state) => {
    return state;
}

function GoogleMapComponent (props) {
    const [googleMapsReady, setGoogleMapsReady] = useState(false);
    const [overlays, setOverlays] = useState(null);
    const [selectedCity, setSelectedCity] = useState(props.data)
    const toast = useRef(null);

    useEffect(() => {
        loadGoogleMaps(() => {
            setGoogleMapsReady(true);
        });

        return () => {
            removeGoogleMaps();
        }
    },[])

    const onMapReady = () => {
            let map;
            let marker = new google.maps.Marker({position: selectedCity,});
            setOverlays([marker]);
            const contentString =
                `<div>
                    <h3>${props.sentiment}</h3>
                    <p>${props.message}</p>
                </div>`
           let infoWindow = infoWindow||new google.maps.InfoWindow({content: contentString});
            infoWindow.open(map, marker);
    }


    const onOverlayClick = (event) => {
        let isMarker = event.overlay.getTitle !== undefined;
        if(isMarker) {
            let title = event.overlay.getTitle();
            let infoWindow = infoWindow||new google.maps.InfoWindow();
            infoWindow.setContent('<div>' + title + '</div>');
            infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());
            toast.current.show({severity:'info', summary:'Marker Selected', detail: title});
        }
        else {
            toast.current.show({severity:'info', summary:'Shape Selected', detail: ''});
        }
    }

    const selectTheCiy = async () => {
        setGoogleMapsReady(false);
        await setSelectedCity(props.data)
        setGoogleMapsReady(true);
    }

    const options = {
        center: selectedCity,
        zoom: 12
    };

    return (
        <div>
            <Toast ref={toast}></Toast>
            {
                googleMapsReady && (
                    <div className="card">
                        { setGoogleMapsReady ?
                            <GMap onOverlayClick={onOverlayClick} overlays={overlays} options={options} style={{width: '100%', minHeight: '400px'}} onMapReady={onMapReady}/>
                            :
                            <div className="loading_wrapper">
                                <ProgressSpinner/>
                            </div>
                        }
                    </div>
                )
            }
            {console.log(props.data.data)}
            <Button onClick={selectTheCiy} label="GO" className="p-button-primary apply_button"/>
        </div>
    );
}
export default connect(mapStateToProps)(GoogleMapComponent)