import React, {useEffect, useState} from 'react'
import ReactPolling from "react-polling";
import {CHeader} from "@coreui/react";

const LocationLayout = () => {
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        console.log({locations});
    });
    return (
        <>
            <ReactPolling
                url={"https://sats-kitchen-poc.herokuapp.com/location"}
                interval={3000} // in milliseconds(ms)
                retryCount={3} // this is optional
                onSuccess={resp => {
                    setLocations(resp);
                    return true;
                }}
                onFailure={() => console.log("polling issue...")} // this is optional
                render={({startPolling, stopPolling, isPolling}) => {
                    if (isPolling) {
                        return (
                            <>
                                <div>
                                    <CHeader>Locations</CHeader>
                                    <ul>
                                        {
                                            locations.map((location) =>
                                                <li key={location.id}><a href={"/location?id=" + location.id}>{`${location.name}\n`}</a></li>
                                            )
                                        }
                                    </ul>

                                </div>
                            </>
                        );
                    } else {
                        return (
                            <>
                                <div className="pt-3 text-center">
                                    <div className="sk-spinner sk-spinner-pulse"></div>
                                </div>
                            </>
                        );
                    }
                }}
            />
        </>
    )
}

export default LocationLayout
