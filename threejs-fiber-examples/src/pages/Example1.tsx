import { useEffect, useRef } from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import BoxMesh from '../components/BoxMesh'

const mdTheme = createTheme();

export default function Example1(){

    return (
        <ThemeProvider theme={mdTheme}>
            <Box  component="main" sx={{ 
                        display: 'flex',
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto'
                    }
            }>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Canvas>
                  <ambientLight />
                  <pointLight position={[10, 10, 10]} />
                  <BoxMesh position={[-1.2, 0, 0]} />
                  <BoxMesh position={[1.2, 0, 0]} />
                </Canvas>
                </Container>
                </Box>
        </ThemeProvider>
    )

}