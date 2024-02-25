import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { Button } from "antd";
import React from "react";
import useSavePatient from "../../../../modules/hooks/useSavePatient";
import useResetProfilePatient from "../../../../modules/hooks/useResetProfilePatient";
import { useGlobalContext } from "../../../../modules/context/index.js";

const Buttons = () => {
    const { handleSave, isLoading } = useSavePatient();
    const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

    const { resetProfilePatient } = useResetProfilePatient();

    const handleClear = () => {
        resetProfilePatient();
    };

    const { patientForm } = useGlobalContext();
    const { patientId, patientName, patientSurName } =
        patientForm.getFieldsValue();

    return (
        <Flex
            style={{
                position: "sticky",
                top: 25,
                zIndex: 60,
            }}
            w="full"
            bg="pink.200"
            pb="1"
        >
            <Flex
                gap="2"
                color="white"
                textTransform="uppercase"
                alignItems="center"
                fontWeight="semibold"
                letterSpacing="5px"
            >
                <Box>{patientName}</Box>
                <Box>{patientSurName}</Box>
                <Box>№{patientId}</Box>
            </Flex>
            <Flex gap="2" ml="auto">
                <Button
                    onClick={handleSave}
                    form="patientForm"
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    size={isLargerThan600 ? "middle" : "small"}
                >
                    Save
                </Button>

                <Button
                    onClick={handleClear}
                    danger
                    size={isLargerThan600 ? "middle" : "small"}
                >
                    Clear
                </Button>
            </Flex>
        </Flex>
    );
};

export default Buttons;
