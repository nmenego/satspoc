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
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHeaderCell,
    CTableRow,
    CToast,
    CToastBody
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilBalanceScale} from "@coreui/icons";
import LoadingScreen from "./LoadingScreen";

const TrayUpdateLayout = () => {
    const params = useParams();
    const [totalWeight, setTotalWeight] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [tray, setTray] = useState(null);
    const [trayId, setTrayId] = useState('');
    useEffect(() => {
        setTrayId(params.trayId);
        getTray();
    });

    const getTray = () => {
        axios.get(`https://sats-kitchen-poc.herokuapp.com/tray/${trayId}`).then(resp => {
                setTray(resp.data[0]);
                console.log({tray})
            }
        );
    }

    const postData = () => {
        axios.put(`https://sats-kitchen-poc.herokuapp.com/tray/${trayId}`, {
            weight: totalWeight
        }).then(resp => {
                setToastVisible(true)
            }
        );
    }

    let screen;
    if (tray === null) {
        screen = <LoadingScreen/>
    } else {
        screen = <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <h1>Tray {tray.trayShortId}</h1>
                                        <CTable responsive>
                                            <CTableBody>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="row">ID</CTableHeaderCell>
                                                    <CTableDataCell>{tray.trayShortId}</CTableDataCell>
                                                </CTableRow>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="row">Gross Weight</CTableHeaderCell>
                                                    <CTableDataCell>{tray.grossWeight}</CTableDataCell>
                                                </CTableRow>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="row">Tare Weight</CTableHeaderCell>
                                                    <CTableDataCell>{tray.tareWeight}</CTableDataCell>
                                                </CTableRow>
                                            </CTableBody>
                                        </CTable>

                                        <p className="text-medium-emphasis">Update Gross Weight for
                                            tray {tray.trayShortId}</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilBalanceScale}/>
                                            </CInputGroupText>
                                            <CFormInput type="totalWeight" id="totalWeight"
                                                        onChange={(e) => setTotalWeight(e.target.value)}/>
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton onClick={postData}>Update</CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0" href={"/tray"}>
                                                    Back
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CToast visible={toastVisible}>
                                                <CToastBody>Successfully updated tray!</CToastBody>
                                            </CToast>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    }
    return screen;
}


export default TrayUpdateLayout
