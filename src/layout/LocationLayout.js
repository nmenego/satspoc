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
    const random = () => Math.round(Math.random() * 100)
    const [items, setItems] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        console.log({items});
        console.log(searchParams.get('id'))
    });
    const columns = [
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
    return (
        <>
            <ReactPolling
                url={"https://sats-kitchen-poc.herokuapp.com/location/" + searchParams.get('id') + "/components"}
                interval={3000} // in milliseconds(ms)
                retryCount={3} // this is optional
                onSuccess={resp => {
                    console.log({resp});
                    setItems(resp);
                    return true;
                }}
                onFailure={() => console.log("polling issue...")} // this is optional
                render={({startPolling, stopPolling, isPolling}) => {
                    if (isPolling) {
                        return (
                            <>
                                <CCol xs={12}>
                                    <CCard className="mb-4">
                                        <CCardHeader>Room Summary</CCardHeader>
                                        <CTable striped columns={columns} items={items}/>
                                    </CCard>
                                </CCol>
                                <CCol xs={6}>
                                    <CCard className="mb-4">
                                        <CCardHeader>Nearly Expiring</CCardHeader>
                                        <CTable striped>
                                            <CTableHead>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="col">Tray ID</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col">Ingredient</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col">Total Weight</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col">Expiry Date</CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                <CTableRow color="warning">
                                                    <CTableHeaderCell scope="row">8751918</CTableHeaderCell>
                                                    <CTableDataCell>Chicken Wings</CTableDataCell>
                                                    <CTableDataCell>{random()} kg</CTableDataCell>
                                                    <CTableDataCell>Today</CTableDataCell>
                                                </CTableRow>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="row">8237492</CTableHeaderCell>
                                                    <CTableDataCell>Chicken Wings</CTableDataCell>
                                                    <CTableDataCell>{random()} kg</CTableDataCell>
                                                    <CTableDataCell>11/5</CTableDataCell>
                                                </CTableRow>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="row">8237492</CTableHeaderCell>
                                                    <CTableDataCell>Beef Strips</CTableDataCell>
                                                    <CTableDataCell>{random()} kg</CTableDataCell>
                                                    <CTableDataCell>11/5</CTableDataCell>
                                                </CTableRow>
                                            </CTableBody>
                                        </CTable>
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
