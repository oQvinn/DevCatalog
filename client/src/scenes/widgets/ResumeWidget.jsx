import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {Box, Typography } from "@mui/material";
import MyDocument from "components/Document";

const ResumeWidget = ({userId, resumePath}) => {
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);

    const getUser = async() => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        getUser();
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    if(!user){
        return null;
    }

    return(
        <WidgetWrapper
            gap="0.5rem"
            pb="1.1rem"
        >
            <FlexBetween>
                <Box width="100%">
                    {user.resumePath ? 
                        <MyDocument path={user.resumePath}></MyDocument>
                    : 
                        <Typography>Hey! Your profile would look much better with a resume!</Typography>
                    }
                </Box>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default ResumeWidget;