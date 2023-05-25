import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Calendar = React.lazy(() => import("../pages/Calendar"));
const Search = React.lazy(() => import("../pages/Search"));
const PersonInfo = React.lazy(() => import("../pages/PersonInfo"));
const DiseaseHistory = React.lazy(() => import("../pages/DiseaseHistory"));
const Visits = React.lazy(() => import("../pages/Visits"));
const Analysis = React.lazy(() => import("../pages/Analysis"));
const Treatment = React.lazy(() => import("../pages/Treatment"));
const ReceptionLocations = React.lazy(() => import("../pages/ReceptionLocations"));
const Medications = React.lazy(() => import("../pages/Medications"));
const Pathologists = React.lazy(() => import("../pages/Pathologists"));

const ReactComponent = () => {

    return (
        <Suspense fallback={
            <Stack>
                <Skeleton height='40px' borderRadius='15px' />
                <Skeleton height='40px' borderRadius='15px' />
            </Stack>
        }>
            <Routes>
                <Route path="/pathologists" element={<Pathologists />} />
                <Route path="/medications" element={<Medications />} />
                <Route path="/reception_locations" element={<ReceptionLocations />} />
                <Route path="/treatment" element={<Treatment />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/visits" element={<Visits />} />
                <Route path="/disease_history" element={<DiseaseHistory />} />
                <Route path="/person_info" element={<PersonInfo />} />
                <Route path="/search" element={<Search />} />
                <Route path="/calendar" element={<Calendar />} />

                <Route path="*" element={<Calendar />} />
            </Routes>
        </Suspense>
    );
};
export default ReactComponent;
