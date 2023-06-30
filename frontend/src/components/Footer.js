/** FOOTER - FUNCTIONAL COMPONENT */

import { Container, Box } from '@mui/material';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <Container padding='10px'>
            <Box 
                display='flex'
                flexDirection= 'column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'  
                sx={{
                    paddingTop: '20px',
                    paddingBottom: '20px',
                }}              
            >
                <footer>
                    {`© Vanessa Li ${year}`}
                </footer>
            </Box>
        </Container>
    )
}