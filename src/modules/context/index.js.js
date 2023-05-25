import { Form } from "antd";
import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const AppProvider = ({ children }) => {

    // person info -> vite
    // deseses history  -> morby
    // visit  -> visits
    // analiseis ->  analyses
    // treatment - > treatment


    const [searchPatientForm] = Form.useForm();
    const [patientForm] = Form.useForm();
    const [personInfoForm] = Form.useForm(); //vite
    const [diseaseHistoryForm] = Form.useForm(); //morby
    const [treatmentHistoryForm] = Form.useForm(); //treatment

    const [inPatientCollapse, setInPatientCollapse] = useState(true);
    const [familyMembersList, setFamilyMembersList] = useState([])

    const values = {
        treatmentHistoryForm,
        diseaseHistoryForm,
        personInfoForm,
        searchPatientForm,
        patientForm,
        
        inPatientCollapse, setInPatientCollapse,
        familyMembersList, setFamilyMembersList,
    };
    return (
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
