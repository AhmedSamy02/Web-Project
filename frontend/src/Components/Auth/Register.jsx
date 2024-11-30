import React from 'react';
import Form from './Form';
import {
    Box, 
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material';

export default function Register() {
    const isNonMobile = useMediaQuery("(min-width: 800px)");
    return (
        <Box>
            <Box
                width="100%"
                backgroundColor={"green"}
                p="0.7rem 8%"
                textAlign="center"
            >
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem,2rem,2.25rem)"
                    color='white'
                >
                    Tazkarti
                </Typography>
            </Box>
            <Box
                width={isNonMobile ? "50%" : "93%"}
                margin=" 2rem auto"
                padding="2rem"
                borderRadius="1.5rem"
                // backgroundColor=""
            >
                <Form />
            </Box>
        </Box>
    );
}