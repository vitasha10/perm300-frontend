"use client"
import {Suspense, useEffect, useState} from "react"
import {OrbitControls, Sky} from '@react-three/drei'
import ThreeModel from "@/app/permStroy/ThreeModel";
import BaseCharacter from "@/app/permStroy/BaseCharacter";
import BaseBox from "@/app/permStroy/BaseBox";
import BasicScene from "@/app/permStroy/BasicScene";
import {Cube} from "@/app/permStroy/ThreeModel";
import {Cubes} from "@/app/permStroy/ThreeModel"
import Image from "next/image";

const materials = [
    "dirt.jpg",
    "diamond.webp",
    "gold.webp",
    "oakp_planks.webp",
    "red_wool.webp"
]
const keys = { Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5' }; //, Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9', Digit0: '0'

const keysWWW = { KeyW: 'forward', KeyS: 'backward', KeyA: 'left', KeyD: 'right', Space: 'jump' };
const moveFieldByKey = (key) => keysWWW[key];
const Cont = ({materials,currentMaterial,setCurrentMaterial,MoveBtn}) => {
    return <div className="flex absolute bottom-10 left-10 w-fit h-fit z-10">
        {materials.map((item,i) => <Image className="flex" width="40" height={currentMaterial === i ? "50" : "40"} src={"/"+item} key={"matt"+item+i} alt={item} onClick={() => setCurrentMaterial(i)}/>)}
        <div className="flex flex-col w-[120px] h-[120px]">
            <div className="h-1/3 w-full flex items-center justify-center">
                <MoveBtn where={"forward"}/>
            </div>
            <div className="h-1/3 w-full flex items-center justify-center">
                <MoveBtn where={"left"}/>
                <MoveBtn where={"jump"}/>
                <MoveBtn where={"right"}/>
            </div>
            <div className="h-1/3 w-full flex items-center justify-center">
                <MoveBtn where={"backward"}/>
            </div>
        </div>
    </div>
}

export default function PermStroy() {
    useEffect(() => {
        //const handleKeyDown = (e) => setCurrentMaterial((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
        const handleKeyUp = (e) => {
            if(typeof  keys[e.code] === "string") setCurrentMaterial(Number(keys[e.code])-1)
        }
        //document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            //document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);
    const [currentMaterial, setCurrentMaterial] = useState(0)

    const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false, jump: false });

    const MoveBtn = ({where}) => {
        return <button className="unsel w-1/3 h-full flex bg-[#000000AA]" onPointerDown={() => setMovement(prev => {
            return {...prev, [where]: true}
        })}  onPointerUp={() => setMovement(prev => {
            return {...prev, [where]: false}
        })}/>
    }

    useEffect(() => {
        const handleKeyDown = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
        const handleKeyUp = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return <Suspense fallback={null}>
            <Cont {...{materials,currentMaterial,setCurrentMaterial,MoveBtn}}/>
            <BasicScene>
                {/*<BaseBox text={false} position={[0, 0.5, 0]} args={[2, 1, 2]} color="red" />
                <BaseBox text={false} position={[5, 1, 0]} args={[1.5, 2, 1.3]} color="orange" />
                <BaseBox text={false} position={[0, 0.5, 5]} args={[3, 1, 1.3]} color="green" />
*/}
                <BaseCharacter controls args={[0.5]} color="yellow" {...movement} />
                <Cubes newM={materials[currentMaterial]} />
                <Cube position={[0, 0.5, -10]} m={"dirt.jpg"} newM={materials[currentMaterial]} />
                <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[10, 0, -5]} />
                <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[0, 0, 10]} />
                <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[-10, 0, 5]} />
                <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[-5, 0, -5]} />
                <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[0, 0, -10]} />
                <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[10, 0, 5]} />
                <Sky />
            </BasicScene>
        </Suspense>
}


//<OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />