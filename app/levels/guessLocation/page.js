"use client";

import {useSearchParams} from "next/navigation";
import {Canvas, useLoader, useThree} from "@react-three/fiber";
import {Html, OrbitControls, useProgress} from "@react-three/drei";
import {BackSide,TextureLoader} from "three"
import {Suspense, useEffect, useState} from "react"
import {guessPlaces, places} from "@/app/page";
import Image from "next/image";
import {Clusterer, Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import {FixedLayout} from "@vkontakte/vkui";

const PhotoSphere = ({rotation,src,setTime,justSee}) => {
    const texture = useLoader(TextureLoader, src)
    useEffect(() => {
        if(!texture) return
        window.parent.postMessage({"type": "loaded"}, "*")
        if(justSee) return
        const func = () => {
            setTime(prev => {
                if(prev === 0) return 0
                return prev - 0.5
            })
        }
        const intervalId = window.setInterval(func, 500)
        return () => window.clearInterval(intervalId)
    },[texture,justSee])
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
    const justSee = searchParams.get('justsee') !== null
    const location = "https://data.vitasha.ru/perm300/panorams/"+data.src
    const [time, setTime] = useState(15)
    const [itog, setItog] = useState(null)
    const dots = [
        {
            geometry: data.geometry,
            func: "closeSuccess",
        },
        {
            geometry: guessPlaces[(Number(searchParams.get('id')) + 3) % guessPlaces.length].geometry,
            func: "closeBad",
        },
        {
            geometry: guessPlaces[(Number(searchParams.get('id')) + 5) % guessPlaces.length].geometry,
            func: "closeBad",
        }
    ]
    useEffect(() => {
        window.closeSuccess = () => setItog(1)
        window.closeBad = () => setItog(2)
    },[])
    useEffect(() => {
        if(itog === 1) {
            window.parent.postMessage({"type": "closeSuccess"}, "*")
        }
        if(itog === 2) {
            window.parent.postMessage({"type": "closeBad"}, "*")
        }
    },[itog])
    return <div className="w-full h-screen flex flex-col overflow-hidden bg-[#19191A]">
        {justSee || time === 0? <></> : <div className="absolute z-10 top-4 left-10">
            <h3 className="text-[red] text-[14px] font-unb text-center w-[70vw] mx-auto flex">
                Осталось времени: {time}
            </h3>
        </div>}
        {time > 0 ? <Canvas linear className="border-none">
            <Suspense fallback={<Loader/>}>
                <PhotoSphere justSee={justSee} rotation={Math.PI/2} src={location} setTime={setTime}/>
            </Suspense>
            <CameraControls/>
        </Canvas> : <FixedLayout vertical={"top"}>
            <div className="flex flex-col">
                <div className="flex ml-2 mb-2">
                    <div className="rounded-[8px] bg-[#A5A5A5] pt-2 pl-2">
                        <Image src={"/redDotIcon2.png"} width="30" height="30" alt="darkGreenDotIcon" />
                    </div>
                    <span className="ml-1.5 mt-2">- выбери один верный</span>
                </div>
            </div>
            <div className="flex">
                <YMaps query={{ lang: "ru_RU", load: "package.full", apikey: "81add0fa-3543-4b14-8d8a-60e97bcfa380" }} >
                    <Map
                        width={"100vw"}
                        height={"95vh"}
                        defaultState={{
                            center: [58.00819, 56.21612],
                            zoom: 12,
                            type: "yandex#hybrid",
                            controls: [
                                "zoomControl",

                            ],
                        }}
                        defaultOptions={{
                            suppressMapOpenBlock: true,
                            copyrightLogoVisible: false,
                            copyrightProvidersVisible: false,
                            copyrightUaVisible: false,
                        }}
                    >
                        <Clusterer
                            options={{
                                hasHint: false,
                                preset: "islands#invertedRedClusterIcons",
                                groupByCoordinates: true,
                                //balloonPanelMaxMapArea: Infinity
                            }}
                        >
                            {dots.map((item,i) => <Placemark key={"plcmrQsskGss"+i+String(item.geometry[0])} geometry={item.geometry}
                                properties={{
                                    item: i,
                                    balloonContentHeader: "Ответ - эта точка?",
                                    balloonContentBody: `<button class=" text-[black] font-bold text-[14px]" onclick="window.`+item.func+`();">
                                        Да
                                    </button>`
                                }}
                                options={{
                                    preset: "islands#redDotIcon"
                                }}
                            />)}
                        </Clusterer>
                    </Map>
                </YMaps>
            </div>
        </FixedLayout>}
    </div>
}