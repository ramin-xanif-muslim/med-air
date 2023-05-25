import { useGlobalContext } from "../context/index.js"
import { useStore } from "../store/index.js"

function useResetProfilePatient() {

    const { personInfoForm, diseaseHistoryForm, patientForm, setFamilyMembersList, treatmentHistoryForm, searchPatientForm } = useGlobalContext()

    const setDataSourceDiseaseHistoryTable = useStore((store) => store.setDataSourceDiseaseHistoryTable)

    const setSavedDrawingCanvas = useStore((store) => store.setSavedDrawingCanvas)


    const setDescriptionsCanvas = useStore((store) => store.setDescriptionsCanvas)

    const setDataSourceVisitTable = useStore((store) => store.setDataSourceVisitTable)

    const setDataSourceAnalysisTable = useStore((store) => store.setDataSourceAnalysisTable)

    const setDataSourceTreatmentTable = useStore((store) => store.setDataSourceTreatmentTable)

    const setRecipeList = useStore((store) => store.setRecipeList)


    const resetProfilePatient = () => {
        searchPatientForm.resetFields()
        patientForm.resetFields()
        personInfoForm.resetFields()
        diseaseHistoryForm.resetFields()
        treatmentHistoryForm.resetFields()
        setFamilyMembersList([])
        setDataSourceDiseaseHistoryTable([])
        setSavedDrawingCanvas({})
        setDescriptionsCanvas({})
        setDataSourceVisitTable([])
        setDataSourceAnalysisTable([])
        setDataSourceTreatmentTable([])
        setRecipeList([])
    }

    return { resetProfilePatient }
}

export default useResetProfilePatient