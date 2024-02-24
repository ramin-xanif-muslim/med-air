import { Box, useMediaQuery } from "@chakra-ui/react";
import "./App.css";
import ReactComponent from "./components/RoutComponent";
import SideBar from "./components/SideBar";
import { useLocalStorageStore } from "./modules/store";
import Login from "./pages/Login";
import { Layout } from "antd";
import { ErrorBoundary } from "./pages/Error";
import BottomBar from "./components/BottomBar/BottomBar";

function App() {
    // useEffectOnDidMountApp()

    const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

    const token = useLocalStorageStore((store) => store.token);

    // if (!token) return <Login />;

    return (
        <Layout
            style={{
                minHeight: "100vh",
                position: "relative",
            }}
        >
            <Layout className="brent-bg-color">
                {isLargerThan800 && <SideBar />}

                <Layout.Content
                    style={{
                        overflow: "auto",
                        height: "100vh",
                        position: "relative",
                    }}
                >
                    <Box p={["1", "4"]} mb={[10, null]}>
                        {/* <Breadcrumb /> */}

                        <ErrorBoundary>
                            <ReactComponent />
                        </ErrorBoundary>
                    </Box>
                </Layout.Content>
                {!isLargerThan800 && <BottomBar />}
            </Layout>
        </Layout>
    );
}

export default App;
