import { Dropdown } from 'primereact/dropdown';
import {useState} from "react";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        data: state.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePlace: (selected_place) => dispatch({type:'UPDATE_PLACE', payload: selected_place }),
    }
}

function SelectCountry(props) {
    const [city,setCity] = useState();
    const citySelectItems = [
        {label: 'Cairo', value: {data:{lat: 30.0444, lng: 31.2357}, message: 'It is very hot in, Cairo', sentiment: 'Neutrual'}},
        {label: 'Nairobi', value: {data:{lat: 1.2921, lng: 36.8219}, message: 'There is new project started in, Nairobi',sentiment: 'Positive'}},
        {label: 'Dubai ',  value: {data:{lat: 25.2048, lng: 55.2708},message: 'Dubai EXPO 2020 will create a new image for the middle, Dubai',sentiment: 'Positive'}},
        {label: 'New York', value: {data:{lat: 40.7128, lng: 75.0060}, message: 'I hate black people, there are so many of them in, New York',sentiment: 'Negative'}},
        {label: 'Jeddh', value: {data:{lat: 21.4858, lng: 39.1925},message: 'Do you COVID Vaccine, Jeddh, is good?',sentiment: 'Negative'}}
    ];

    const onUpdateCity = (e) => {
             setCity(e.value);
             console.log(e)
             props.updatePlace(e.value)
    }

    return(
        <div>
            <Dropdown value={city} options={citySelectItems} onChange={onUpdateCity} placeholder="Select a City"/>
        </div>
    )
}
export default connect(mapStateToProps,mapDispatchToProps)(SelectCountry);