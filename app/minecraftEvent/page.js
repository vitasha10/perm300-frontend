"use client";
import { Canvas } from "@react-three/fiber"
import { Sky, PointerLockControls, KeyboardControls } from "@react-three/drei"
import { Physics } from "@react-three/rapier"
import { Ground } from "./ground"
import { Player } from "./player"
import { Cube, Cubes } from "./cube"

export default function Normal() {
    return <div className="w-full h-screen flex flex-col overflow-hidden bg-[black]">
        <KeyboardControls
            map={[
                { name: "forward", keys: ["ArrowUp", "KeyW"] },
                { name: "backward", keys: ["ArrowDown", "KeyS"] },
                { name: "left", keys: ["ArrowLeft", "KeyA"] },
                { name: "right", keys: ["ArrowRight", "KeyD"] },
                { name: "jump", keys: ["Space"] },
            ]}>
            <Canvas  shadows camera={{ fov: 45 }}>
                <Sky sunPosition={[100, 20, 100]} />
                <ambientLight intensity={2} />
                <pointLight castShadow intensity={1800} position={[100, 100, 100]} />
                <Physics gravity={[0, -30, 0]}>
                    <Ground />
                    <Player />
                    <Cube position={[0, 0.5, -10]} />
                    <Cubes />
                </Physics>
                <PointerLockControls />
            </Canvas>
        </KeyboardControls>
    </div>
}
