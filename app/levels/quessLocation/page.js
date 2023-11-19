"use client";

import {useSearchParams} from "next/navigation";
import {Canvas, useLoader, useThree} from "@react-three/fiber";
import {Html, OrbitControls, useProgress} from "@react-three/drei";
import {BackSide,TextureLoader} from "three"
import {Suspense, useEffect, useState} from "react"
import {guessPlaces} from "@/app/page";

const PhotoSphere = ({rotation,src,setTime}) => {
    const texture = useLoader(TextureLoader, src)
    useEffect(() => {
        if(!texture) return
        window.parent.postMessage({"type": "loaded"}, "*")
        const func = () => {
            setTime(prev => {
                if(prev === 15) return 15
                return prev + 0.5
            })
        }
        const intervalId = window.setInterval(func, 500)
        return () => window.clearInterval(intervalId)
    },[texture])
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

export default function GuessLocation() {
    const searchParams = useSearchParams()
    const data = guessPlaces[searchParams.get('id')]
    const location = "https://data.vitasha.ru/perm300/panorams/"+data.src
    const [time, setTime] = useState(0)
    const onEndd = () => {
        window.parent.postMessage({"type": "endVideo"}, "*")
        URL.revokeObjectURL(src)
    }
    return <div className="w-full h-screen flex flex-col overflow-hidden bg-[black]">
        <div className="absolute z-10 top-20 left-10">
            {time}
        </div>
        <Canvas linear className="border-none">
            <Suspense fallback={<Loader/>}>
                <PhotoSphere rotation={Math.PI/2} src={location} setTime={setTime}/>
            </Suspense>
            {/*<Stats/>*/}
            <CameraControls/>
        </Canvas>
    </div>
}