import {MaterialContext} from "@/app/permStroyPC/page";
import { io } from 'socket.io-client'
import {useCallback, useContext, useEffect, useReducer, useState} from "react";
import {useBox} from "@react-three/cannon";
import {useTexture} from "@react-three/drei";
import {permStroyMaterials} from "@/app/permStroyPC/utils/helpers";
import {useThree} from "@react-three/fiber";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const URL = "https://api.perm300.tech" //"http://164.92.243.80:4001" //process.env.NODE_ENV === 'production' ? 'http://164.92.243.80:4001' : 'http://vitasha.ddns.net:4001/';
export const socket = io(URL);

const reducer = (state,action) => {
    if (action.type === 'add') {
        return [...state,
            [state.length,state.length,0,"/dirt.jpg"]
        ]
    }
    return state
}
const createInitialState = () => {
    return [
        [
            [0,0,0,"/dirt.jpg"]
        ]
    ]
}

const Cube = props => {
    const [curMaterial, setCurMaterial] = useContext(MaterialContext)
    const [ref] = useBox((index) => ({
        type: 'Static',
        mass: 1,
        //args: props.args,
        position: props.position,
        //...props,
    }))
    const [hover, set] = useState(null)
    const texture = useTexture(props.m)
    const onMove = useCallback(e => {
        e.stopPropagation()
        set(Math.floor(e.faceIndex / 2))
    }, [])
    const onOut = useCallback(() => set(null), [])

    return <mesh ref={ref} /*receiveShadow castShadow*/ onPointerMove={onMove} onPointerOut={onOut} onClick={(e) => {
        e.stopPropagation()
        const {x, y, z} = ref.current.position
        if(curMaterial === -1) {
            socket.emit("changeBlocks", {
                type: "remove",
                x,
                y,
                z
            })
            return
        }
        const dir = [
            [x + 1, y, z],
            [x - 1, y, z],
            [x, y + 1, z],
            [x, y - 1, z],
            [x, y, z + 1],
            [x, y, z - 1],
        ]
        socket.emit("changeBlocks", {
            type: "add",
            x: dir[Math.floor(e.faceIndex / 2)][0],
            y: dir[Math.floor(e.faceIndex / 2)][1],
            z: dir[Math.floor(e.faceIndex / 2)][2],
            m: permStroyMaterials[curMaterial],
        })

        props.setCubes(state => {
            return [...state,
                [...dir[Math.floor(e.faceIndex / 2)],permStroyMaterials[curMaterial]]
                //[state.length,state.length,0,"/dirt.jpg"]
            ]
        })
        //addCube(...dir[Math.floor(e.faceIndex / 2)])
    }}>
        {[...Array(6)].map((_, index) => (
            <meshStandardMaterial attach={`material-${index}`} key={index} map={texture} color={hover === index ? "hotpink" : "white"} />
        ))}
        <boxGeometry />
    </mesh>
}

export const Person = props => {
    //console.log(props)
    /*const [ref] = useBox((index) => ({
        type: 'Static',
        mass: 1,
        //args: props.args,
        position: props.position,

        //...props,
    }))*/
    const texture = useTexture("/steve.png")
    const gltf  = useLoader(GLTFLoader, '/minecraft_-_steve.glb')
    /*fbx.children.forEach((mesh, i) => {
        mesh.material = texture;
    });*/
    return <mesh rotation={props.rotation} position={props.position}>
        {/*<meshStandardMaterial map={texture}/>*/}
        <primitive object={gltf.scene} rotation={[0,Math.PI,0]} scale={0.03} />
    </mesh>
}


export const Cubes = () => {
    console.log('rerCubes')
    const [isConnected, setIsConnected] = useState(false)

    const [cubes, setCubes] = useState([
        [0,0,0,"/dirt.jpg"]
    ])
    const [people, setPeople] = useState([])

    useEffect(() => {
        function onConnect() {
            console.log("connSoc")
            setIsConnected(true)
        }
        function onDisconnect() {
            setIsConnected(false)
        }
        const onSetBlocksServer = args => {
            //console.log(args)
            setCubes(args)
        }
        const onSetPeopleServer = args => {
            console.log("onSetPeopleServer",args)
            setPeople(args.filter(item => item.id !== socket.id))
        }
        if(socket.connected) setIsConnected(true)
        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('setBlocksServer', onSetBlocksServer)
        socket.on('setPeopleServer', onSetPeopleServer)
        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('setBlocksServer', onSetBlocksServer)
        }
    }, [])
    const { camera } = useThree()
    //console.log(232,[camera.rotation.x,camera.rotation.y,camera.rotation.z],[camera.position.x,camera.position.y,camera.position.z])
    useEffect(() => {
        if(isConnected) {
            console.log("ffCon")
            socket.emit("getBlocks")
            const intervalId = setInterval(() => {
                socket.emit("getBlocks")
            }, 3000)
            return () => clearInterval(intervalId);
        }
    }, [isConnected])
    useEffect(() => {
        if(isConnected) {
            console.log("ffConPeople")
            socket.emit("getPeople")
            const intervalId = setInterval(() => {
                socket.emit("getPeople")
            }, 3)
            return () => clearInterval(intervalId);
        }
    }, [isConnected])
    useEffect(() => {
        if(isConnected) {
            console.log("ffConPeopleSend")
            socket.emit("moveMainPerson",{
                position: [camera.position.x,camera.position.y,camera.position.z],
                rotation: [camera.rotation.x,camera.rotation.y,camera.rotation.z],
            })
            const intervalId = setInterval(() => {
                socket.emit("moveMainPerson",{
                    position: [camera.position.x,camera.position.y,camera.position.z],
                    rotation: [camera.rotation.x,camera.rotation.y,camera.rotation.z],
                })
            }, 3)
            return () => clearInterval(intervalId);
        }
    }, [isConnected])
    permStroyMaterials.map(item => void useTexture(item))
    return <>
        {people.map((item,i) => <Person key={"ppl"+i+"i"+item.id} {...item}/>)}
        {cubes.map((coords, index) => <Cube key={"bbcb"+coords[0]+"D"+coords[1]+"d"+coords[2]+"s"+coords[3]+"ds"+index} position={[coords[0], coords[1], coords[2]]} setCubes={setCubes} m={coords[3]}/>)}
    </>

}