"use client";
import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import {CapsuleCollider, CuboidCollider, RigidBody, useRapier} from "@react-three/rapier"
import Axe from "./Axe"

const SPEED = 5
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const rotation = new THREE.Vector3()

export function Player({ lerp = THREE.MathUtils.lerp }) {
    const axe = useRef()
    const ref = useRef(null)
    const rapier = useRapier()
    const [, get] = useKeyboardControls()
    useFrame((state) => {
        if(ref.current === null) return
        const { forward, backward, left, right, jump } = get()
        const velocity = ref.current.linvel()
        // update camera
        //console.log(2223,ref.current.translation(),forward, backward, left, right, jump)
        state.camera.position.set(ref.current.translation()["x"],ref.current.translation()["y"],ref.current.translation()["z"])
        // update axe
        //axe.current.children[0].rotation.x = lerp(axe.current.children[0].rotation.x, Math.sin((velocity.length() > 1) * state.clock.elapsedTime * 10) / 6, 0.1)
        //axe.current.rotation.copy(state.camera.rotation)
        //axe.current.position.copy(state.camera.position).add(state.camera.getWorldDirection(rotation).multiplyScalar(1))
        // movement
        frontVector.set(0, 0, Number(backward) - Number(forward))
        sideVector.set(Number(left) - Number(right), 0, 0)
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation)
        ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })
        // jumping
        const ray = rapier.world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }))
        const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75
        if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 })
    })
    return (
        <>
            <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" enabledRotations={[false, false, false]} onCollisionEnter={({ manifold, target, other }) => {
                console.log(
                    "Collision at world position ",
                    manifold.solverContactPoint(0)
                );

                if (other.rigidBodyObject) {
                    console.log(
                        // this rigid body's Object3D
                        target.rigidBodyObject.name,
                        " collided with ",
                        // the other rigid body's Object3D
                        other.rigidBodyObject.name
                    );
                }
            }}>
                <CuboidCollider args={[2, 2, 2]}/>
            </RigidBody>
            <group ref={axe} onPointerMissed={(e) => (axe.current.children[0].rotation.x = -0.5)}>
                <Axe position={[0.3, -0.35, 0.5]} />
            </group>
        </>
    )
}
