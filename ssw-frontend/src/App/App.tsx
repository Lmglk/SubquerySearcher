import React from 'react';
import './App.css';
import { Canvas } from '../Canvas/Canvas';
import { Node } from '../Node/Node';

const App: React.FC = () => {
    return (
        <Canvas>
            <Node id={1} x={500} y={250} radius={15} label={'1'} />
            <Node id={2} x={1000} y={250} radius={15} label={'2'} />
        </Canvas>
    );
};

export default App;
