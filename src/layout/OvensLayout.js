import React, {useState} from 'react'
import {CCard, CCardHeader, CCol, CContainer, CRow, CTable,} from '@coreui/react'
import ReactPolling from "react-polling";
import LoadingScreen from "./LoadingScreen";

const OvensSummaryLayout = () => {
    const [ovens, setOvens] = useState([]);
    const ovensCols = [
        {
            key: 'dishName',
            label: 'Name',
            _props: {scope: 'col'},
        },
        {
            key: 'dishSku',
            label: 'SKU',
            _props: {scope: 'col'},
        },
        {
            key: 'amount',
            label: 'Count',
            _props: {scope: 'col'},
        },
    ];
    return (
        <>
            <ReactPolling
                url={"https://sats-kitchen-poc.herokuapp.com/oven/aggregate"}
                interval={3000} // in milliseconds(ms)
                retryCount={3} // this is optional
                onSuccess={resp => {
                    setOvens(resp);
                    return true;
                }}
                onFailure={() => console.log("polling issue...")} // this is optional
                render={({startPolling, stopPolling, isPolling}) => {
                    if (isPolling && ovens !== null) {
                        return (
                            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                                <CContainer>
                                    <CRow className="justify-content-center">

                                        <CCol xs={12}>
                                            <CCard className="mb-4">
                                                <CCardHeader>Foodbank Summary</CCardHeader>
                                                <CTable striped responsive columns={ovensCols}
                                                        items={ovens}/>
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

export default OvensSummaryLayout
