import { Result } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ErrorPage = (props) => {
    const { errorMessage } = props;

    const [subTitle, setSubTitle] = useState(errorMessage);

    const location = useLocation();

    useEffect(() => {
        if(location?.state?.error){
            setSubTitle(JSON.stringify(location?.state?.error))
        }
    },[location?.state?.error])

    return (
        <Result
            status="error"
            title={subTitle}
        ></Result>
    );
};

export default ErrorPage;
