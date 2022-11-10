import React, {useState} from 'react'
import {CCard, CCardHeader, CCol, CContainer, CRow, CTable,} from '@coreui/react'
import ReactPolling from "react-polling";
import {useSearchParams} from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const OvenLayout = () => {
    const [oven, setOven] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const ovenCols = [
        {
            key: 'ovenCode',
            label: 'Oven Code',
            _props: {scope: 'col'},
        },
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
        {
            key: 'insertedAt',
            label: 'Scan Time',
            _props: {scope: 'col'},
        },
    ];
    return (
        <>
            <ReactPolling
                url={"https://sats-kitchen-poc.herokuapp.com/oven?oven_code=" + searchParams.get("oven_code")}
                interval={3000} // in milliseconds(ms)
                retryCount={3} // this is optional
                onSuccess={resp => {
                    setOven(resp);
                    return true;
                }}
                onFailure={() => console.log("polling issue...")} // this is optional
                render={({startPolling, stopPolling, isPolling}) => {
                    if (isPolling && oven !== null) {
                        return (
                            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                                <CContainer>
                                    <CRow className="justify-content-center">

                                        <CCol xs={12}>
                                            <CCard className="mb-4">
                                                <CCardHeader>Oven Summary</CCardHeader>
                                                <CTable striped responsive columns={ovenCols}
                                                        items={oven}/>
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

export default OvenLayout
