import {Canvas} from '@react-three/fiber';
import {Loader, Stats} from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import Lights from "@/app/permStroy/Lights";
import Floor from "@/app/permStroy/Floor";

const BasicScene = ({ children }) => {
    return <div className="w-full h-screen flex flex-col overflow-hidden bg-[black]">
        <Canvas shadows camera={{ fov: 50 }}>
            <Lights />
            <Physics gravity={[0, -9.8, 0]}>
                {children}
                <Floor rotation={[Math.PI / -2, 0, 0]} color="white" />
            </Physics>
            <Stats className="fixed top-[0px_!important] left-[100px_!important]"/>
        </Canvas>
        <Loader />
    </div>

};

export default BasicScene