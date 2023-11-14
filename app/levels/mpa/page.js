"use client";

import Image from "next/image";
import {useEffect, useState} from "react";

const StyledBtn = ({children,className,onClick}) => {
    return <button onClick={onClick} className={"flex border-none font-medium font-unb py-2 w-[80vw] mx-auto rounded-[32px] mt-8 justify-center active:py-2.5 active:mt-[30px]"+" "+className} style={{
        boxShadow: '0px 0px 16px #3A36FF',
        textShadow: "0px 2px 8px rgba(255, 255, 255, 0.10)",
        background: "#030D1B66",
    }}>{children}</button>
}

export default function Lev1() {
    const [step, setStep] = useState(0)
    useEffect(() => {

    },[])
    return step === 0 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-10" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Музей пермской артиллерии</h2>
        <Image src="/mpaMain.jpg" className="mt-4 mx-auto flex" width="300" height="200" alt="Музей пермской артиллерии"/>
        <h3 className="text-[white] text-[14px] font-unb text-center w-[70vw] mt-20 mx-auto flex">Для прохождения данной локации необходимо находится в радиусе 100м от музея.</h3>
        <StyledBtn onClick={() => setStep(1)} className="text-[red] text-[20px]">Я тут!</StyledBtn>
        <StyledBtn onClick={() => {
            window.parent.postMessage({"type": "closeScene"}, "*")
        }} className="text-[white] text-[14px]">Выйти из локации</StyledBtn>
    </div> : step === 1 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-10" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}></h2>
        <StyledBtn onClick={() => setStep(0)} className="text-[white] text-[14px]">Вернутся</StyledBtn>
        <StyledBtn onClick={() => {
            window.parent.postMessage({"type": "closeScene"}, "*")
        }} className="text-[white] text-[14px]">Выйти из локации</StyledBtn>
    </div> : <div className="bg-[#19191A] h-screen w-full">

    </div>
}