"use client";
import {createContext, Suspense, useEffect, useState} from "react"
import {Loader, PointerLockControls, Sky, StatsGl} from '@react-three/drei';
import { ThreeModel } from './components/ThreeModel.jsx';
import { BaseCharacter } from './ui/BaseCharacter.jsx';
import {Canvas, useThree} from "@react-three/fiber";
import {Lights} from "@/app/permStroyPC/components/Lights";
import {Physics} from "@react-three/cannon";
import {Floor} from "@/app/permStroyPC/components/Floor";
import Image from "next/image";
import {permStroyMaterials, permStroyMaterialsKeys} from "@/app/permStroyPC/utils/helpers";
import {Cubes} from "@/app/permStroyPC/components/Cubes";
import {DoubleSide} from "three"
import {Text} from 'troika-three-text'
export const MaterialContext = createContext(null)

const MaterialControls = ({children}) => {
    const [curMaterial, setCurMaterial] = useState(0)
    useEffect(() => {
        const handleKeyUp = (e) => {
            if(typeof permStroyMaterialsKeys[e.code] === "string") setCurMaterial(Number(permStroyMaterialsKeys[e.code])-1)
        }
        document.addEventListener('keyup', handleKeyUp)
        return () => document.removeEventListener('keyup', handleKeyUp)
    }, [])
    return <MaterialContext.Provider value={[curMaterial,setCurMaterial]}>
        <div className="flex absolute bottom-10 left-32 w-fit h-fit z-10">
            {permStroyMaterials.map((item,i) => <Image className="flex" width="40"
                  height={curMaterial === i ? 50 : 40} src={"/"+item} key={"matt"+item+i} alt={item} onClick={() => setCurMaterial(Number(i))}/>)}
            {/*<div className={(curMaterial === -1 ? "h-[50px]" : "h-10") +` bg-[black] text-[white] w-10`}
                 onClick={() => setCurMaterial(-1)}>Убрать блок</div>*/}
        </div>
        {children}
    </MaterialContext.Provider>
}

const App = () => {
    //console.log("rerenderapp")
    //const screen = useVideoTexture("/medved3.mp4")
    const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.src = "/medved3_permStroy.mp4";//"/medved3.mp4";
        vid.crossOrigin = "Anonymous";
        vid.loop = true;
        vid.muted = true;
        vid.play();
        return vid;
    });
    //myScene.add(myText)
    const {scene} = useThree()
    /*useEffect(() => {
        const myText = new Text()
        myText.text = 'Добро пожаловать в\nПермьСтрой!'
        scene.add(myText)
        myText.anchorX = "center"
        myText.anchorY = "middle"
        myText.textAlign = "center"
        myText.fontSize = 0.4
        myText.position.x = 6.5
        myText.position.y = 5.7
        myText.position.z = -9.5
        myText.color = 0xFF0000

        myText.sync()
    },[])*/
    return <>
        <BaseCharacter controls args={[0.5]} color="yellow" />
        <mesh position={[7, 3,-10]} rotation={[0,0,0]}>
            <meshStandardMaterial emissive={"#343434"} side={DoubleSide}>
                <videoTexture attach="map" args={[video]} />
                <videoTexture attach="emissiveMap" args={[video]} />
            </meshStandardMaterial>
            <planeGeometry args={[9/1.5,16/1.5]}/>
        </mesh>
    </>
}

export default function PermStroyPC() {
    //console.log('rerPermStroyPC')
    return <Suspense fallback={null}>
        <MaterialControls>
            <Canvas camera={{ fov: 70,
                rotation: [0.19419950123939406, -0.40903040078765235, 0.07806387821208098], }}>
                <Lights />
                <Physics gravity={[0, -9.8, 0]}>
                    <App/>
                    <Cubes/>
                    <Sky />
                    {/*<BaseBox text={false} position={[0, 0.5, 0]} args={[2, 1, 2]} color="red" />
                    <BaseBox text={false} position={[5, 1, 0]} args={[1.5, 2, 1.3]} color="orange" />
                    <BaseBox text={false} position={[0, 0.5, 5]} args={[3, 1, 1.3]} color="green" />*/}
                    <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[10, 0, -5]} />
                    <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[0, 0, 15]} />
                    <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[-10, 0, 5]} />
                    <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[-5, 0, -5]} />
                    <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[0, 0, -10]} />
                    <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[10, 0, 5]} />
                    <Floor rotation={[Math.PI / -2, 0, 0]} color="white" />
                </Physics>
                <PointerLockControls />
                <StatsGl/>
            </Canvas>
        </MaterialControls>
        <Loader />
        <style>
            {`
            * {
                box-sizing: border-box;
            }
    
                html,
                body,
                canvas {
                width: 100%;
                max-height: 100vh;
                max-width: 100wh;
                height: 100%;
                margin: 0;
                padding: 0;
            }
    
                .dot {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                transform: translate3d(-50%, -50%, 0);
                border: 2px solid white;
            }`}
        </style>
        <div className="dot" />
    </Suspense>
}