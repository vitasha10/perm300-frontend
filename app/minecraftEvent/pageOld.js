"use client";
import { io } from 'socket.io-client'
import {useEffect, useRef, useState} from "react"
import {KeyboardControls, OrbitControls, PointerLockControls, Sky, Stats, useTexture} from "@react-three/drei"
import {Canvas, useFrame, useThree} from "@react-three/fiber"
import {BackSide, Vector3} from "three"

import { /*Physics,*/ useSphere } from "@react-three/cannon"
import {Ground} from "@/app/minecraftEvent/ground";
import {Player} from "@/app/minecraftEvent/player";
import {Cube, Cubes} from "@/app/minecraftEvent/cube";
import {Physics, CuboidCollider, RigidBody} from "@react-three/rapier";

const URL = process.env.NODE_ENV === 'production' ? 'http://164.92.243.80:4001' : 'http://vitasha.ddns.net:4001/';
export const socket = io(URL);

const Scene = () => {
    const texture = useTexture("mainPhoto.jpeg")
    return <mesh position={[0,0,0]} rotation={[0,0,0]}>
        <sphereGeometry args={[256, 32, 32]} scale={[-1, 1, 1]}/>
        <meshBasicMaterial map={texture} side={BackSide} toneMapped={false}/>
    </mesh>
}
const SPEED = 6
const usePersonControls = () => {
    const keys = {
        KeyW: 'forward',
        KeyS: 'backward',
        KeyA: 'left',
        KeyD: 'right',
        Space: 'jump',
    }

    const moveFieldByKey = (key) => keys[key]

    const [movement, setMovement] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        jump: false,
    })

    useEffect(() => {
        const handleKeyDown = (e) => {
            setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }))
        }
        const handleKeyUp = (e) => {
            setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }))
        }
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])
    return movement
}

const aa = "gg"

const Person = ({playerModelReference,pos,orbit}) => {
    const { camera, gl } = useThree();
    const { forward, backward, left, right, jump } = usePersonControls()
    const [ref, api] = useSphere(() => ({
        mass: 0,
        position: [0, 1, 0],
        type: 'Dynamic',
    }))
    useEffect(() => api.position.subscribe(v => pos.current = v), [])
    useEffect(() => api.position.subscribe(v => {
        console.log(v)
        orbit.current.moveTo(v)
        orbit.current.update()
    }), [])
    useFrame(() => {
        // Calculating front/side movement ...
        let frontVector = new Vector3(0,0,0);
        let sideVector = new Vector3(0,0,0);
        let direction = new Vector3(0,0,0);

        frontVector.set(0, 0, Number(forward) - Number(backward))
        sideVector.set(Number(right) - Number(left), 0, 0)
        direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED)

        api.velocity.set(direction.x, 0, direction.z)
    })
    useFrame(() => {
        ref.current.getWorldPosition(playerModelReference.current.position)
    })
    useEffect(() => {
        function onMoveMainPersonServer(value) {
            if(aa !== "gg") {
                console.log()
                if(playerModelReference.current.position !== value) {
                    console.log("setted")
                    api.position.set(value[0], value[1], value[2])
                }
            }
        }

        socket.on('moveMainPersonServer', onMoveMainPersonServer)
        return () => {
            socket.off('foo', onMoveMainPersonServer)
        }
    },[])
    return <>
        {/*<OrbitControls ref={orbit} maxDistance={250} enablePan={false} args={[camera, gl.domElement]} />*/}
        <mesh ref={playerModelReference} rotation={[0,0,0]}>
            <boxGeometry attach="geometry" args={[10, 10, 10]} />
            <meshStandardMaterial attach="material" color="#6be092" />
        </mesh>
    </>
}


export default function MinecraftEvent() {
    const playerModelReference = useRef()
    const [isConnected, setIsConnected] = useState(false)
    const pos = useRef([0, 0, 0])
    const orbit = useRef(null)
    useEffect(() => {
        function onConnect() {
            setIsConnected(true)
        }
        function onDisconnect() {
            setIsConnected(false)
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
        }
    }, [])

    useEffect(() => {
        if(isConnected && aa === "gg") {
            const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
                socket.emit("moveMainPerson", pos.current)
            }, 100)

            return () => clearInterval(intervalId);
        }
    }, [isConnected])
    //if(!isConnected) return <>Подключение</>
    return <div className="w-full h-screen flex flex-col overflow-hidden bg-[black]">
        <KeyboardControls
            map={[
                { name: "forward", keys: ["ArrowUp", "w", "W", "ц", "Ц"] },
                { name: "backward", keys: ["ArrowDown", "s", "S", "ы", "Ы"] },
                { name: "left", keys: ["ArrowLeft", "a", "A", "ф", "Ф"] },
                { name: "right", keys: ["ArrowRight", "d", "D", "в", "В"] },
                { name: "jump", keys: ["Space"] },
            ]}>
            <Canvas linear shadows camera={{ fov: 45 }} className="border-none">
                <Sky sunPosition={[100, 20, 100]} />
                <ambientLight intensity={0.3} />
                <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
                <Physics gravity={[0, -30, 0]}>
                    <RigidBody type="fixed" colliders={false}>
                        <Ground />
                        <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
                    </RigidBody>
                    {/*<Player />*/}
                    {/*<Cube position={[0, 0.5, -10]} />*/}
                    {/*<Cubes />*/}
                    {/*<Person playerModelReference={playerModelReference} pos={pos} socket={socket} orbit={orbit}/>*/}
                </Physics>
                {/*<Scene/>*/}
                <Stats/>
                <PointerLockControls />
            </Canvas>
        </KeyboardControls>
    </div>
}