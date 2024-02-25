import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./ProfilePage/ProfilePage";

const Calendar = React.lazy(() => import("../pages/Calendar"));
const Search = React.lazy(() => import("../pages/Search"));
const ReceptionLocations = React.lazy(() =>
    import("../pages/ReceptionLocations")
);
const Medications = React.lazy(() => import("../pages/Medications"));
const Pathologists = React.lazy(() => import("../pages/Pathologists"));
const Managers = React.lazy(() => import("../pages/Managers"));

const ReactComponent = () => {
    return (
        <Suspense
            fallback={
                <Stack>
                    <Skeleton height="40px" borderRadius="15px" />
                    <Skeleton height="40px" borderRadius="15px" />
                </Stack>
            }
        >
            <Routes>
                <Route path="/managers" element={<Managers />} />
                <Route path="/pathologists" element={<Pathologists />} />
                <Route path="/medications" element={<Medications />} />
                <Route
                    path="/reception_locations"
                    element={<ReceptionLocations />}
                />
                <Route path="/search" element={<Search />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/profile" element={<ProfilePage />} />

                <Route path="*" element={<Calendar />} />
            </Routes>
        </Suspense>
    );
};
export default ReactComponent;
