import React, {useEffect, useState} from 'react'
import {useSearchParams} from "react-router-dom";
import {
    CCard,
    CCardHeader,
    CCol,
    CContainer,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from "@coreui/react";
import ReactPolling from "react-polling";
import LoadingScreen from "./LoadingScreen";

const TrayLayout = () => {
    const [trays, setTrays] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        console.log(searchParams.get('id'));
        console.log(trays);
    });

    return (
        <>
            <ReactPolling
                url={"https://sats-kitchen-poc.herokuapp.com/tray"}
                interval={3000} // in milliseconds(ms)
                retryCount={3} // this is optional
                onSuccess={resp => {
                    setTrays(Object.keys(resp).map(
                        (key) => (resp[key] === null) ? resp[key] = '-' : resp[key]
                    ));
                    return true;
                }}
                onFailure={() => console.log("polling issue...")} // this is optional
                render={({startPolling, stopPolling, isPolling}) => {
                    if (isPolling && trays.length !== 0) {
                        return (
                            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                                <CContainer>
                                    <CRow className="justify-content-center">
                                        <CCol xs={12}>
                                            <CCard className="mb-4">
                                                <CCardHeader>Trays</CCardHeader>
                                                <CTable striped responsive>
                                                    <CTableHead>
                                                        <CTableRow>
                                                            <CTableHeaderCell scope="col">id</CTableHeaderCell>
                                                            <CTableHeaderCell scope="col">Tray ID</CTableHeaderCell>
                                                            <CTableHeaderCell scope="col">Gross
                                                                Weight</CTableHeaderCell>
                                                            <CTableHeaderCell scope="col">Tray Weight</CTableHeaderCell>
                                                            <CTableHeaderCell scope="col">Location
                                                                Name</CTableHeaderCell>
                                                            <CTableHeaderCell scope="col">SKU</CTableHeaderCell>
                                                            <CTableHeaderCell scope="col">Units</CTableHeaderCell>
                                                            <CTableHeaderCell scope="col">Check In
                                                                Date</CTableHeaderCell>
                                                            <CTableHeaderCell scope="col">Check Out
                                                                Date</CTableHeaderCell>
                                                        </CTableRow>
                                                    </CTableHead>
                                                    <CTableBody>
                                                        {
                                                            trays.map((tray) =>
                                                                <CTableRow>
                                                                    <CTableHeaderCell
                                                                        scope="row">{tray.id}</CTableHeaderCell>
                                                                    <CTableDataCell><a
                                                                        href={"/tray/" + tray.trayId}>{tray.trayShortId}</a></CTableDataCell>
                                                                    <CTableDataCell>{tray.grossWeight}</CTableDataCell>
                                                                    <CTableDataCell>{tray.tareWeight}</CTableDataCell>
                                                                    <CTableDataCell>{tray.locationName}</CTableDataCell>
                                                                    <CTableDataCell>{tray.sku}</CTableDataCell>
                                                                    <CTableDataCell>{tray.unit}</CTableDataCell>
                                                                    <CTableDataCell>{tray.componentName}</CTableDataCell>
                                                                    <CTableDataCell>{tray.checkInDate}</CTableDataCell>
                                                                    <CTableDataCell>{tray.checkOutDate}</CTableDataCell>
                                                                </CTableRow>
                                                            )
                                                        }
                                                    </CTableBody>
                                                </CTable>
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

export default TrayLayout
