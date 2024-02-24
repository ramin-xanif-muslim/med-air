import { useInView } from "react-intersection-observer";

import PersonInfo from "../../pages/PersonInfo";
import DiseaseHistory from "../../pages/DiseaseHistory";
import Visits from "../../pages/Visits";
import Analysis from "../../pages/Analysis";
import Treatment from "../../pages/Treatment";
import ProfilePatientForm from "../ProfilePatientForm";
import styles from "./styles.module.css";
import { Box, VStack } from "@chakra-ui/react";
import Navigation from "./shared/components/Navigation";

const ProfilePage = () => {
    const { ref: refPatient, inView: inViewPatient } = useInView();
    const { ref: refPersonInfo, inView: inViewPersonInfo } = useInView();
    const { ref: refDiseaseHistory, inView: inViewDiseaseHistory } =
        useInView();
    const { ref: refVisits, inView: inViewVisits } = useInView();
    const { ref: refAnalysis, inView: inViewAnalysis } = useInView();
    const { ref: refTreatment, inView: inViewTreatment } = useInView();
    return (
        <Box scrollSnapAlign="center" className={styles.container}>
            <VStack bg="pink.200" className={styles.header}>
                <Navigation
                    inViewPatient={inViewPatient}
                    inViewPersonInfo={inViewPersonInfo}
                    inViewDiseaseHistory={inViewDiseaseHistory}
                    inViewVisits={inViewVisits}
                    inViewAnalysis={inViewAnalysis}
                    inViewTreatment={inViewTreatment}
                />
            </VStack>
            <section className={styles.section} ref={refPatient}>
                <hr />
                <h2 id="Patient">Patient</h2>
                <ProfilePatientForm />
            </section>
            <section className={styles.section} ref={refPersonInfo}>
                <hr />
                <h2 id="PersonInfo">Person Info</h2>
                <PersonInfo />
            </section>
            <section className={styles.section} ref={refDiseaseHistory}>
                <hr />
                <h2 id="DiseaseHistory">Disease History</h2>
                <DiseaseHistory />
            </section>
            <section className={styles.section} ref={refVisits}>
                <hr />
                <h2 id="Visits">Visits</h2>
                <Visits />
            </section>
            <section className={styles.section} ref={refAnalysis}>
                <hr />
                <h2 id="Analysis">Analysis</h2>
                <Analysis />
            </section>
            <section className={styles.section} ref={refTreatment}>
                <hr />
                <h2 id="Treatment">Treatment</h2>
                <Treatment />
            </section>
        </Box>
    );
};

export default ProfilePage;
