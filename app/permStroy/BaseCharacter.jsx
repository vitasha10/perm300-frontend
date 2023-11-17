import { useSphere } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {FlyControls, OrbitControls} from "@react-three/drei";

const BaseCharacter = (props) => {
    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3();
    const sideVector = new THREE.Vector3();
    const speed = new THREE.Vector3();
    const SPEED = 5;

    const { camera, gl } = useThree();

    const [ref, api] = useSphere((index) => ({
        mass: 1,
        type: 'Dynamic',

        //position: [0, 10, 0],
        ...props,
    }));

    const { forward, backward, left, right, jump } = props
    const velocity = useRef([0, 0, 0]);
    useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), []);

    const vec = useRef(new THREE.Vector3())
    const orbitRef = useRef(null)
    const target = new THREE.Vector3(0, 0, 0)
    useFrame((state) => {
        target.lerp(ref.current.getWorldPosition(vec.current), 0.02)
        //console.log(vec.current)
        orbitRef.current.position.copy(vec.current)
        //state.controls.target.set(vec);
        //state.controls.update()
        //state.camera.lookAt(target)
    })
    useFrame((state) => {
        //ref.current.getWorldPosition(camera.target);
        frontVector.set(0, 0, Number(backward) - Number(forward));
        sideVector.set(Number(left) - Number(right), 0, 0);
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);
        speed.fromArray(velocity.current);

        api.velocity.set(direction.x, velocity.current[1], direction.z);
        if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) api.velocity.set(velocity.current[0], 5, velocity.current[2]);
    })
    return <group>
        {/*<OrbitControls ref={orbitRef} minDistance={3} maxDistance={5} enablePan={false} enableDamping={true} makeDefault args={[camera, gl.domElement]} />*/}
            <FlyControls ref={orbitRef} makeDefault object={camera} domElement={gl.domElement}/>
            <mesh castShadow position={props.position} visible={true} ref={ref}>
                <sphereGeometry args={props.args} />
                <meshStandardMaterial color="green"/>
            </mesh>
        </group>
}

export default BaseCharacter