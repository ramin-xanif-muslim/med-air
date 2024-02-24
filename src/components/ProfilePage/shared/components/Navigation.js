import { memo, useEffect, useState } from "react";
import { Segmented } from "antd";

const Navigation = ({
    inViewPatient,
    inViewPersonInfo,
    inViewDiseaseHistory,
    inViewVisits,
    inViewAnalysis,
    inViewTreatment,
}) => {
    const [activeSection, setActiveSection] = useState("PersonInfo");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!isProcessing) {
            if (inViewPatient) setActiveSection("Patient");
            else if (inViewPersonInfo) setActiveSection("PersonInfo");
            else if (inViewDiseaseHistory) setActiveSection("DiseaseHistory");
            else if (inViewVisits) setActiveSection("Visits");
            else if (inViewAnalysis) setActiveSection("Analysis");
            else if (inViewTreatment) setActiveSection("Treatment");
        }
    }, [
        inViewPatient,
        inViewPersonInfo,
        inViewDiseaseHistory,
        inViewVisits,
        inViewAnalysis,
        inViewTreatment,
    ]);

    const handleSegmentChange = (value) => {
        setIsProcessing(true);
        setActiveSection(value);
        const element = document.getElementById(value);
        element.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
        setTimeout(() => setIsProcessing(false), 1000);
    };

    return (
        <Segmented
            style={{
                backgroundColor: "inherit",
            }}
            size="small"
            options={[
                "Patient",
                "PersonInfo",
                "DiseaseHistory",
                "Visits",
                "Analysis",
                "Treatment",
            ]}
            value={activeSection}
            onChange={handleSegmentChange}
        />
    );
};

export default memo(Navigation);
