"use client";

import {useSearchParams} from "next/navigation";
import {Canvas, useLoader, useThree} from "@react-three/fiber";
import {Html, OrbitControls, useProgress} from "@react-three/drei";
import {BackSide,TextureLoader} from "three"
import {Suspense} from "react"

const PhotoSphere = ({rotation,src}) => {
    const texture = useLoader(TextureLoader, src)
    return <group dispose={null}>
        <mesh position={[0,0,0]} rotation={[0,rotation,0]}>
            <sphereGeometry args={[256, 32, 32]} scale={[-1, 1, 1]}/>
            <meshBasicMaterial map={texture} side={BackSide} toneMapped={false} />
        </mesh>
    </group>
}
const CameraControls = () => {
    const { camera, gl } = useThree();
    return <OrbitControls maxDistance={250} enablePan={false} position={[0, 0, 0]} args={[camera, gl.domElement]} />;
}

const Loader = () => {
    const { progress } = useProgress()
    return <Html center>{progress} % Загружено</Html>
}

export default function QuessLocation() {
    const searchParams = useSearchParams()
    const location = "/dirt.jpg"//searchParams.get('location')
    const onEndd = () => {
        window.parent.postMessage({"type": "endVideo"}, "*")
        URL.revokeObjectURL(src)
    }
    return <div className="w-full h-screen flex flex-col overflow-hidden bg-[black]">
        <Canvas linear className="border-none">
            <Suspense fallback={<Loader />}>
                <PhotoSphere rotation={Math.PI/2} src={location}/>
            </Suspense>
            {/*<Stats/>*/}
            <CameraControls/>
        </Canvas>
    </div>
}