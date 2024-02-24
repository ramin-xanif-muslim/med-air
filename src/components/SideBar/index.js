import React, { memo, useEffect, useState } from "react";
import {
    UserOutlined,
    CalendarOutlined,
    FileSearchOutlined,
    ProfileOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Center, Image } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorageStore, useStore } from "../../modules/store";
import { correctBreadcrumbItems } from "../../modules/functions";
import logo from "../../modules/images/MedAir.jpg";

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const profileSubMenus = [
    "person_info",
    "disease_history",
    "visits",
    "analysis",
    "treatment",
];

const items = [
    getItem("Calendar", "calendar", <CalendarOutlined />),
    getItem("Search", "search", <FileSearchOutlined />),
    getItem("Profile", "profile", <ProfileOutlined />),
    // getItem('Profile', 'profile', <ProfileOutlined />, [
    //     getItem('Person info', 'person_info'),
    //     getItem('Disease history', 'disease_history'),
    //     getItem('Visits', 'visits'),
    //     getItem('Analysis', 'analysis'),
    //     getItem('Treatment', 'treatment'),
    // ]),
    // getItem('Managers', 'managers', <UserOutlined />, [
    //     getItem('Reception locations', 'reception_locations'),
    //     getItem('Medications', 'medications'),
    //     getItem('Pathologists', 'pathologists'),
    // ]),
    getItem("Managers", "managers", <UserOutlined />),
    getItem("Log Out", "logout", <LogoutOutlined />),
];

function SideBar() {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);

    const navigate = useNavigate();

    const setToken = useLocalStorageStore((store) => store.setToken);
    const setBreadcrumbItems = useStore((store) => store.setBreadcrumbItems);

    const logOut = () => {
        setToken(null);
        localStorage.clear();
        // window.location.reload();
        navigate("/calendar");
    };

    const onSelect = (e) => {
        const { selectedKeys, keyPath } = e;
        const navLink = selectedKeys[0];
        if (navLink === "logout") {
            logOut();
            return;
        }
        setBreadcrumbItems(correctBreadcrumbItems(keyPath));
        navigate(`/${navLink}`);
    };

    const location = useLocation();

    useEffect(() => {
        const link = location?.pathname.slice(1);
        setSelectedKey(link);
    }, [location?.pathname]);

    return (
        <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            <Center>
                <Image className="circle" src={logo} alt="medAir" />
            </Center>

            <Menu
                onSelect={onSelect}
                theme="dark"
                mode="inline"
                items={items}
                selectedKeys={[selectedKey]}
            />
        </Layout.Sider>
    );
}

export default memo(SideBar);
