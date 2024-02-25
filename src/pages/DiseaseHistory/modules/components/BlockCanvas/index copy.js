import { Flex } from "@chakra-ui/react";
import React, { memo, useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Canvas from "./Canvas";
import image from "../../../../../modules/images/man.png";
import { Button } from "antd";

const imgs = ["deseaseImage1", "deseaseImage2", "deseaseImage3"];

function BlockCanvas() {
    const [selectedImg, setSelectedImg] = useState(0);
    const increment = () => {
        setSelectedImg((prevState) => (prevState + 1) % imgs.length);
    };

    const decrement = () => {
        setSelectedImg(
            (prevState) => (prevState - 1 + imgs.length) % imgs.length
        );
    };
    console.log(selectedImg);
    return (
        <Flex direction="column" w="full" h="full">
            <Flex justify="space-between">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={decrement}
                />
                <Button
                    onClick={increment}
                    type="text"
                    icon={<ArrowRightOutlined />}
                />
            </Flex>
            <Canvas imageName={imgs[selectedImg]} image={image} />
        </Flex>
    );
}

export default memo(BlockCanvas);
