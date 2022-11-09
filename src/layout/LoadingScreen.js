import React from 'react'
import {CCard, CCol, CContainer, CRow, CSpinner} from "@coreui/react";

const LoadingScreen = () => {

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={12}>
                        <CCard className="p-4 align-items-center">
                            <CSpinner></CSpinner>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default LoadingScreen
