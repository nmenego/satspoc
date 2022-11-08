import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {useParams} from "react-router-dom";
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CToast,
    CToastBody
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilBalanceScale} from "@coreui/icons";

const TrayUpdateLayout = () => {
    const params = useParams();
    const [totalWeight, setTotalWeight] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [trayId, setTrayId] = useState('');
    useEffect(() => {
        setTrayId(params.trayId);
    });

    const postData = () => {
        axios.put(`https://sats-kitchen-poc.herokuapp.com/tray/${trayId}`, {
            weight: totalWeight
        }).then(resp => {
                setToastVisible(true)
            }
        );
    }
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <h1>Update Tray</h1>
                                        <p className="text-medium-emphasis">Update Tray {trayId}</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilBalanceScale}/>
                                            </CInputGroupText>
                                            <CFormInput type="totalWeight" id="totalWeight"
                                                        onChange={(e) => setTotalWeight(e.target.value)}/>
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton onClick={postData}>Update tray weight</CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0" href={"/tray"}>
                                                    Back
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                        <CToast visible={toastVisible}>
                                            <CToastBody>Successfully updated tray!</CToastBody>
                                        </CToast>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}


export default TrayUpdateLayout
