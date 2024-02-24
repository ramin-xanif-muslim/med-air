import { Tabs } from "antd";

import ReceptionLocations from "../ReceptionLocations";
import Medications from "../Medications";
import Pathologists from "../Pathologists";
import styles from "./styles.module.css"

const Managers = () => {
    return (
        <div className={styles.container}>
        <Tabs
            defaultActiveKey="1"
            centered
            items={[
                {
                    label: "Reception Locations",
                    key: "ReceptionLocations",
                    children: <ReceptionLocations />,
                },
                {
                    label: "Medications",
                    key: "Medications",
                    children: <Medications />,
                },
                {
                    label: "Pathologists",
                    key: "Pathologists",
                    children: <Pathologists />,
                },
            ]}
        />
        </div>
    );
};

export default Managers;
