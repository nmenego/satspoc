import React, {useEffect, useState} from 'react'
import {CCard, CCardHeader, CCol, CContainer, CHeader, CRow, CSpinner, CTable,} from '@coreui/react'
import ReactPolling from "react-polling";
import {useSearchParams} from "react-router-dom";

const LocationLayout = () => {
    const [locationName, setLocationName] = useState("");
    const [componentSummary, setComponentSummary] = useState([]);
    const [freshnessSummary, setFreshnessSummary] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        console.log({componentSummary});
        console.log({freshnessSummary});
    });
    const componentCols = [
        {
            key: 'locationId',
            label: 'Location ID',
            _props: {scope: 'col'},
        },
        {
            key: 'componentName',
            label: 'Content',
            _props: {scope: 'col'},
        },
        {
            key: 'trayCount',
            label: 'Tray Count',
            _props: {scope: 'col'},
        },
        {
            key: 'totalWeight',
            label: 'Total Weight',
            _props: {scope: 'col'},
        },
    ]
    const freshnessCols = [
        {
            key: 'trayShortId',
            label: 'Tray ID',
            _props: {scope: 'col'},
        },
        {
            key: 'componentName',
            label: 'Content',
            _props: {scope: 'col'},
        },
        {
            key: 'totalWeight',
            label: 'Total Weight',
            _props: {scope: 'col'},
        },
        {
            key: 'hoursLeft',
            label: 'Hours left',
            _props: {scope: 'col'},
        },
    ]
    return (
        <>
            <ReactPolling
                url={"https://sats-kitchen-poc.herokuapp.com/location/" + searchParams.get('id') + "/components"}
                interval={3000} // in milliseconds(ms)
                retryCount={3} // this is optional
                onSuccess={resp => {
                    setLocationName(resp.locationName);
                    setComponentSummary(resp.componentSummary);
                    setFreshnessSummary(resp.freshnessSummary)
                    return true;
                }}
                onFailure={() => console.log("polling issue...")} // this is optional
                render={({startPolling, stopPolling, isPolling}) => {
                    if (isPolling && componentSummary.length !== 0) {
                        return (
                            <CContainer>
                                <CHeader>{locationName}</CHeader>
                                <CRow className="justify-content-center">


                                    <CCol xs={12}>
                                        <CCard className="mb-4">
                                            <CCardHeader>Room Summary</CCardHeader>
                                            <CTable striped responsive columns={componentCols}
                                                    items={componentSummary}/>
                                        </CCard>
                                    </CCol>
                                    <CCol xs={12}>
                                        <CCard className="mb-4">
                                            <CCardHeader>Freshness Summary</CCardHeader>
                                            <CTable striped responsive columns={freshnessCols}
                                                    items={freshnessSummary}/>
                                        </CCard>
                                    </CCol>
                                </CRow>
                            </CContainer>
                        );
                    } else {
                        return (
                            <CContainer>
                                <CRow className="justify-content-center">
                                    <CCol xs={12}>
                                        <CSpinner></CSpinner>
                                    </CCol>
                                </CRow>
                            </CContainer>
                        );
                    }
                }}
            />
        </>
    )
}

export default LocationLayout
