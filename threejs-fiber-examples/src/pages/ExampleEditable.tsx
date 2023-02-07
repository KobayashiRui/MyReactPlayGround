import React from 'react';
import { Canvas } from '@react-three/fiber';
import { getProject } from '@theatre/core';
import {editable as e, SheetProvider, extension} from '@theatre/r3f';
import studio from '@theatre/studio';

studio.extend(extension)
studio.initialize()

export default function ExampleEditable() {
  return (
    <Canvas>
      <SheetProvider
        getSheet={() => getProject('Playground - R3F').sheet('R3F-Canvas')}
      >
          <ambientLight intensity={0.5} />
          {/* Mark objects as editable. */}
          {/* Properties in the code are used as initial values and reset points in the editor. */}
          <e.spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            uniqueName="Spotlight"
          />
          <e.pointLight uniqueName="PointLight" />
          <e.mesh uniqueName="Box">
            <boxBufferGeometry />
            <meshStandardMaterial color="orange" />
          </e.mesh>
      </SheetProvider>
    </Canvas>
  );
}