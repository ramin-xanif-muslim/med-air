import { message } from "antd";
import sendRequest from "./sendRequest";


const messageOnSave = (res, nameFunc) => {
    if (res && typeof res !== "string") {
        message.success({
            content: nameFunc + " saved",
            key: nameFunc + "_save",
            duration: 2,
        });
    } else {
        message.error({
            content: nameFunc + " don't saved",
            key: nameFunc + "_save",
            duration: 2,
        });
    }
};

export const fetchPatientId = async () => {
    try {
        let res = await sendRequest("patientid", {}, "get");
        return res.data;
    } catch (e) {
        message.error({
            content: e,
            key: "doc_save",
            duration: 2,
        });
    }
};

export const postPersonInfo = async (obj) => {
    let res = await sendRequest("vite", obj, "post");
    messageOnSave(res, "Person Info");
    return res
};

export const postMorby = async (obj) => {
    let res = await sendRequest("morby", obj, "post");
    messageOnSave(res, "Disease History");
};

export const postVisit = async (obj) => {
    let res = await sendRequest("visits", obj, "post");
    messageOnSave(res, "Visit");
};

export const postAnalyses = async (obj) => {
    let res = await sendRequest("analyses", obj, "post");
    messageOnSave(res, "Analyses");
};

export const postTreatment = async (obj) => {
    let res = await sendRequest("treatment", obj, "post");
    messageOnSave(res, "Treatment");
};

export const putVisitFormCalendar = async (obj) =>
    sendRequest("visitsformcalendar", obj, "post");

const controlPatient = async (patientId) =>
    sendRequest(`patients/${patientId}`);

export const handleAddVisit = async ({ sendObj }) => {
    let patientId;
    if (sendObj.patientId) {
        let id = sendObj.patientId;
        controlPatient(id).then((res) => {
            if (!res?.data) {
                message.warning({
                    content: "The Patient not find",
                    key: "info_message",
                    duration: 4,
                });
            } else {
                patientId = sendObj.patientId;
            }
        });

        patientId = sendObj.patientId;
    } else {
        patientId = await fetchPatientId();
    }
    const {
        patientName,
        patientSurName,
        patientPatronymic,
        visitDate,
        phoneNumber,
        status,
        visitReason,
    } = sendObj;
    let sendObjVisit = {
        patientVisitsList: [
            {
                patientId,
                status,
                visitDate,
                visitReason,
            },
        ],
    };
    let sendPersonInfo = {
        patientId,
        patientName,
        patientSurName,
        patientPatronymic,
        phoneNumber,
    };
    if (patientId) {
        if (!sendObj.patientId) {
            await postPersonInfo(sendPersonInfo);
        }
        let res = await putVisitFormCalendar(sendObjVisit);
    }
    return true
};


export const fetchPathologistsPlace = async () => {
    let res = await sendRequest("managers/pathologists");
    if (res?.data) {
        return res.data
    }
};
export const fetchManagersPlace = async () => {
    let res = await sendRequest("managers/places");
    if (res?.data) {
        return res.data
    }
};
