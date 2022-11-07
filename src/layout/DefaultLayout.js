import React from 'react'
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

const DefaultLayout = () => {
    const random = () => Math.round(Math.random() * 100)
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
    // return <CTable columns={columns} items={items} />
    return (
        <>
            <ReactPolling
                url={"https://sats-kitchen-poc.herokuapp.com/location/1/components"}
                interval={3000} // in milliseconds(ms)
                retryCount={3} // this is optional
                onSuccess={resp => {
                    console.log({resp});
                    return true;
                }}
                onFailure={() => console.log("handle failure")} // this is optional
                render={({startPolling, stopPolling, isPolling}, resp) => {
                    if (isPolling) {
                        return <CTable columns={columns} items={resp}/>
                    } else {
                        return (
                            <>
                                <CCol xs={12}>
                                    <CCard className="mb-4">
                                        <CCardHeader>Room Summary</CCardHeader>
                                        <CTable striped>
                                            <CTableHead>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="col">Ingredient</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col">Tray Count</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col">Total Weight</CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="row">Chicken Wings</CTableHeaderCell>
                                                    <CTableDataCell>5</CTableDataCell>
                                                    <CTableDataCell>5kg</CTableDataCell>
                                                </CTableRow>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="row">Beef Strips</CTableHeaderCell>
                                                    <CTableDataCell>15</CTableDataCell>
                                                    <CTableDataCell>25kg</CTableDataCell>
                                                </CTableRow>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="row">Chicken Breasts</CTableHeaderCell>
                                                    <CTableDataCell>13</CTableDataCell>
                                                    <CTableDataCell>30kg</CTableDataCell>
                                                </CTableRow>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="row">Duck Breasts</CTableHeaderCell>
                                                    <CTableDataCell>5</CTableDataCell>
                                                    <CTableDataCell>5kg</CTableDataCell>
                                                </CTableRow>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="row">Chicken Drumsticks</CTableHeaderCell>
                                                    <CTableDataCell>3</CTableDataCell>
                                                    <CTableDataCell>18kg</CTableDataCell>
                                                </CTableRow>
                                            </CTableBody>
                                        </CTable>
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
                    }
                }}
            />
        </>
    )
}

export default DefaultLayout
