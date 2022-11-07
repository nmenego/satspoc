import React, {useEffect, useState} from 'react'
import {
    CCard,
    CCardHeader,
    CCol,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import ReactPolling from "react-polling";
import {useSearchParams} from "react-router-dom";

const LocationLayout = () => {
    const [componentSummary, setComponentSummary] = useState([]);
    const [freshnessSummary, setFreshnessSummary] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        console.log({componentSummary});
        console.log({freshnessSummary});
        console.log(searchParams.get('id'))
    });
    const componentCols = [
        {
            key: 'locationId',
            label: 'Location ID',
            _props: {scope: 'col'},
        },
        {
            key: 'componentName',
            label: 'Ingredient',
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
            key: 'trayId',
            label: 'Tray ID',
            _props: {scope: 'col'},
        },
        {
            key: 'componentName',
            label: 'Ingredient',
            _props: {scope: 'col'},
        },
        {
            key: 'expiryDate',
            label: 'Expiry Date',
            _props: {scope: 'col'},
        },
        {
            key: 'totalWeight',
            label: 'Total Weight',
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
                    console.log({resp});
                    setComponentSummary(resp.componentSummary);
                    setFreshnessSummary(resp.freshnessSummary)
                    return true;
                }}
                onFailure={() => console.log("polling issue...")} // this is optional
                render={({startPolling, stopPolling, isPolling}) => {
                    if (isPolling) {
                        return (
                            <>
                                <CCol xs={10}>
                                    <CCard className="mb-4">
                                        <CCardHeader>Room Summary</CCardHeader>
                                        <CTable striped columns={componentCols} items={componentSummary}/>
                                    </CCard>
                                </CCol>
                                <CCol xs={10}>
                                    <CCard className="mb-4">
                                        <CCardHeader>Freshness Summary</CCardHeader>
                                        <CTable striped columns={freshnessCols} items={freshnessSummary}/>
                                    </CCard>
                                </CCol>
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
