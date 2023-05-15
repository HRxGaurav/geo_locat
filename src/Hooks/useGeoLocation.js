import { useState, useEffect } from "react";

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" },
        mapLink: "",
        error:{
            code:"",
            message: ""
        }
    });

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
            mapLink: `https://www.google.com/maps/search/${location.coords.latitude},+${location.coords.longitude}?shorturl=1`,

        });
    };

    const onError = (error) => {
        setLocation({
            loaded: false,
            error: {
                code: error.code,
                message: error.message,
                
            },
        });
        
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
};

export default useGeoLocation;