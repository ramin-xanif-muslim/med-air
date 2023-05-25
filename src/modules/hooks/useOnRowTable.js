import { useNavigate } from "react-router";
import sendRequest from "../api/sendRequest";
import { useGlobalContext } from "../context/index.js";
import { useStore } from "../store";
import { useState } from "react";
import dayjs from "dayjs";

export const useOnRowTable = () => {

  const [isLoading, setIsLoading] = useState(false)

  const { personInfoForm, diseaseHistoryForm, patientForm, setFamilyMembersList, treatmentHistoryForm } = useGlobalContext()

  const navigate = useNavigate();

  const fetchPersonInfo = async (id) => {
    try{
      let res = await sendRequest("vite/" + id, {}, "get")
      if(res?.data) {
        console.log('res?.fetchPersonInfo',res?.data);
        res.data.birthDate = res.data.birthDate ? dayjs(res.data.birthDate) : null
        personInfoForm.setFieldsValue(res.data)
        patientForm.setFieldsValue(res.data)
      }
    }catch(error) {
      console.log('%c error','background: red; color: dark', error);
    }
  }

  const setDataSourceDiseaseHistoryTable = useStore((store) => store.setDataSourceDiseaseHistoryTable)
  const setSavedDrawingCanvas = useStore((store) => store.setSavedDrawingCanvas)
  const setDescriptionsCanvas = useStore((store) => store.setDescriptionsCanvas)

  const fetchDiseaseHistory = async (id) => {
    try{
      let res = await sendRequest("morby/" + id, {}, "get")
      if(res?.data) {
        console.log('res?.fetchDiseaseHistory',res?.data);
        diseaseHistoryForm.setFieldsValue(res.data)
        res?.data.deseaseHistoryDynamicsList.forEach(i => i.id = i.patientsComplaintsId)
        setDataSourceDiseaseHistoryTable(res.data.deseaseHistoryDynamicsList)
        setFamilyMembersList(res.data.familyMembersList)
        setSavedDrawingCanvas(res.data?.deseaseImagesList || {})
        if (res.data.deseaseImagesList?.deseaseImageDesc) {
          let descCanvas = JSON.parse(
            res.data.deseaseImagesList.deseaseImageDesc
          );
          setDescriptionsCanvas(descCanvas);
        }
      }
    }catch(error) {
      console.log('%c error','background: red; color: dark', error);
    }
  }

  const setDataSourceVisitTable = useStore((store) => store.setDataSourceVisitTable)

  const fetchVisits = async (id) => {
    try{
      let res = await sendRequest("visits/patientId/" + id, {}, "get")
      if(res?.data) {
        console.log('res?.fetchVisits',res?.data);
        res.data.forEach(i => i.id = i.visitId)
        setDataSourceVisitTable(res.data)
      }
    }catch(error) {
      console.log('%c error','background: red; color: dark', error);
    }
  }

  const setDataSourceAnalysisTable = useStore((store) => store.setDataSourceAnalysisTable)

  const fetchAnalyses = async (id) => {
    try{
      let res = await sendRequest("analyses/" + id, {}, "get")
      if(res?.data) {
        console.log('res?.fetchAnalyses',res?.data);
        res.data.forEach(i => i.id = i.analyzesId)
        setDataSourceAnalysisTable(res.data)
      }
    }catch(error) {
      console.log('%c error','background: red; color: dark', error);
    }
  }

  const setDataSourceTreatmentTable = useStore((store) => store.setDataSourceTreatmentTable)
  const setRecipeList = useStore((store) => store.setRecipeList)

  const fetchTreatment = async (id) => {
    try{
      let res = await sendRequest("treatment/" + id, {}, "get")
      if(res?.data) {
        console.log('res?.fetchTreatment',res?.data);
        treatmentHistoryForm.setFieldsValue(res.data)

        const { treatmentDynamics, recipeList } = res.data

        treatmentDynamics.forEach(i => i.id = i.treatmentId)
        setDataSourceTreatmentTable(treatmentDynamics)
        
        recipeList.forEach(i => i.id = i.recipeId)
        setRecipeList(recipeList)
      }
    }catch(error) {
      console.log('%c error','background: red; color: dark', error);
    }
  }

  const fetchData = (id) => {
    try {
      setIsLoading(true)
      Promise.all([
        fetchPersonInfo(id),
        fetchDiseaseHistory(id),
        fetchVisits(id),
        fetchAnalyses(id),
        fetchTreatment(id),
      ]).then(data => {
        setIsLoading(false)
        navigate("/person_info")
      })
    } catch (err) {
    }
  };


  const onRowTable = (record) => {
    try {
      fetchData(record.patientId)
    } catch (error) {
      console.log('%c error', 'background: red; color: dark', error.message);
    }
  };
  return { onRowTable, isLoading };
};
