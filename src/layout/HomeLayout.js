import React from 'react'
import {CCard, CCol, CContainer, CHeader, CRow} from "@coreui/react";

const LocationLayout = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CHeader><h1>Locations</h1></CHeader>
                            <ul>
                                <li key={1}><a href="/location?id=1">Holding Area</a></li>
                                <li key={2}><a href="/location?id=2">GN Buffer</a></li>
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
                            <CHeader><a href={"/ovens"}>Foodbank Summary</a></CHeader>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow className="justify-content-center">
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CHeader><a href="https://sats-kitchen-poc.herokuapp.com/restart" target="_blank">Restart</a></CHeader>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default LocationLayout
