import { useBox } from '@react-three/cannon'
import {useGLTF, Sparkles, useTexture} from '@react-three/drei'
import {useCallback, useRef, useState} from "react";
import { create } from 'zustand'

// This is a naive implementation and wouldn't allow for more than a few thousand boxes.
// In order to make this scale this has to be one instanced mesh, then it could easily be
// hundreds of thousands.

const useCubeStore = create((set) => ({
    cubes: [],
    addCube: (x, y, z, m) => set((state) => ({ cubes: [...state.cubes, [x, y, z, m]] })),
}))

export const Cubes = ({newM}) => {
    const cubes = useCubeStore((state) => state.cubes)
    return cubes.map((coords, index) => <Cube key={index} position={[coords[0],coords[1],coords[2]]} m={coords[3]} newM={newM}/>)
}


const ThreeModel = ({ ...props }) => {
    const { nodes, materials } = useGLTF('/model.gltf')
    const [ref] = useBox((index) => ({
        type: 'Static',
        mass: 1,
        args: props.args,
        position: props.position,
        ...props,
    }))
    return <group ref={ref} {...props} dispose={null}>
        <Sparkles count={200} scale={[20, 20, 10]} size={3} speed={2} />
        <mesh scale={props.scale} castShadow receiveShadow
            geometry={nodes['tree-beech'].geometry} material={materials.color_main}/>
    </group>
};

export default ThreeModel





export function Cube(props) {
    const [ref] = useBox((index) => ({
        type: 'Static',
        mass: 1,
        args: props.args,
        position: props.position,
        ...props,
    }))
    const [hover, set] = useState(null)
    const addCube = useCubeStore((state) => state.addCube)
    const texture = useTexture(props.m)
    const onMove = useCallback((e) => {
        e.stopPropagation()
        set(Math.floor(e.faceIndex / 2))
    }, [])
    const onOut = useCallback(() => set(null), [])

    return <mesh ref={ref} receiveShadow castShadow onPointerMove={onMove} onPointerOut={onOut} onClick={(e) => {
        e.stopPropagation()
        const {x, y, z} = ref.current.position
        const dir = [
            [x + 1, y, z,props.newM],
            [x - 1, y, z,props.newM],
            [x, y + 1, z,props.newM],
            [x, y - 1, z,props.newM],
            [x, y, z + 1,props.newM],
            [x, y, z - 1,props.newM],
        ]
        addCube(...dir[Math.floor(e.faceIndex / 2)])
    }}>
        {[...Array(6)].map((_, index) => (
            <meshStandardMaterial attach={`material-${index}`} key={index} map={texture} color={hover === index ? "hotpink" : "white"} />
        ))}
        <boxGeometry />
    </mesh>
}