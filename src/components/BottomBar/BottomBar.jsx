import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
    UserOutlined,
    CalendarOutlined,
    FileSearchOutlined,
    ProfileOutlined,
    LogoutOutlined,
} from "@ant-design/icons";

import styles from "./styles.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { useLocalStorageStore } from "../../modules/store";

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem("Calendar", "calendar", <CalendarOutlined />),
    getItem("Search", "search", <FileSearchOutlined />),
    getItem("Profile", "profile", <ProfileOutlined />),
    getItem("Managers", "managers", <UserOutlined />),
    getItem("Log Out", "logout", <LogoutOutlined />),
];
const BottomBar = () => {
    const [selectedKey, setSelectedKey] = useState(null);

    const navigate = useNavigate();

    const setToken = useLocalStorageStore((store) => store.setToken);

    const logOut = () => {
        setToken(null);
        localStorage.clear();
        navigate("/calendar");
    };

    const onSelect = (item) => {
        if (item.key === "logout") {
            logOut();
            return;
        }
        setSelectedKey(item.key);
        navigate(`/${item.key}`);
    };

    const location = useLocation();

    useEffect(() => {
        const link = location?.pathname.slice(1);
        setSelectedKey(link);
    }, []);

    return (
        <div className={styles.container}>
            <Flex w="full" justifyContent="space-between" alignItem="center">
                {items.map((i) => {
                    return (
                        <div
                            style={
                                selectedKey === i.key ? { color: "#fff" } : {}
                            }
                            onClick={() => onSelect(i)}
                            key={i.key}
                            className={styles.menuItem}
                        >
                            <Box>{i.icon}</Box>
                            <Box>{i.label}</Box>
                        </div>
                    );
                })}
            </Flex>
        </div>
    );
};

export default BottomBar;
