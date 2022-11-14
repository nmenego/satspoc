import React, {useEffect, useState} from 'react'
import ReactPolling from "react-polling";
import {CCard, CCol, CContainer, CHeader, CRow, CSpinner} from "@coreui/react";
import LoadingScreen from "./LoadingScreen";

const LocationLayout = () => {
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        console.log({locations});
    });
    return (
        <>
            <ReactPolling
                url={"https://sats-kitchen-poc.herokuapp.com/location"}
                interval={1000} // in milliseconds(ms)
                retryCount={3} // this is optional
                onSuccess={resp => {
                    setLocations(resp);
                    return true;
                }}
                onFailure={() => console.log("polling issue...")} // this is optional
                render={({startPolling, stopPolling, isPolling}) => {
                    if (isPolling && locations.length !== 0) {
                        return (
                            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                                <CContainer>
                                    <CRow className="justify-content-center">
                                        <CCol xs={12}>
                                            <CCard className="mb-4">
                                                <CHeader><h1>Locations</h1></CHeader>
                                                <ul>
                                                    {
                                                        locations.map((location) =>
                                                            <li key={location.id}><a href={"/location?id=" + location.id}>{`${location.name}\n`}</a></li>
                                                        )
                                                    }
                                                </ul>
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                    <CRow className="justify-content-center">
                                        <CCol xs={12}>
                                            <CCard className="mb-4">
                                                <CHeader><a href={"/tray"}>Trays</a></CHeader>
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                    <CRow className="justify-content-center">
                                        <CCol xs={12}>
                                            <CCard className="mb-4">
                                                <CHeader><a href={"/oven?oven_code=OV-1100034"}>Oven 1</a></CHeader>
                                                <CHeader><a href={"/oven?oven_code=OV-1203256"}>Oven 2</a></CHeader>
                                                <CHeader><a href={"/oven"}>All ovens</a></CHeader>
                                                <CHeader><a href={"/ovens"}>Oven Aggregate</a></CHeader>
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                </CContainer>
                            </div>
                        );
                    } else {
                        return (
                            <LoadingScreen/>
                        );
                    }
                }}
            />
        </>
    )
}

export default LocationLayout
