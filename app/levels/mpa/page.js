"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {StyledBtn} from "@/components/StyledBtn";
import axios from "axios";
import {apiUrl, useUserId} from "@/app/page";

export default function LevMpa() {
    const [step, setStep] = useState(0)
    const [correct,setCorrect] = useState(0)
    const vkId = useUserId()
    const func = async (corr, name) => {
        if(corr === 5) {
            axios.post(apiUrl+"/addQuestRooms",{
                userid: vkId,
                data: name
            }).then(obj => console.log(obj)).catch(e => {
                console.log(e)
                alert("Ошибка сохранения результата")
            })
        }
    }
    useEffect(() => {
        func(correct,"mpa").then(r => {})
    },[correct])
    return step === 0 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-10" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Музей пермской артиллерии</h2>
        <Image src="/mpaMain.jpg" className="mt-4 mx-auto flex" width="300" height="200" alt="Музей пермской артиллерии"/>
        <h3 className="text-[white] text-[14px] font-unb text-center w-[70vw] mt-20 mx-auto flex">
            Для прохождения данной локации необходимо находится в радиусе 100м от музея.</h3>
        <StyledBtn onClick={() => setStep(1)} className="text-[red] text-[20px]">Я тут!</StyledBtn>
        <StyledBtn onClick={() => {
            window.parent.postMessage({"type": "closeScene"}, "*")
        }} className="text-[white] text-[14px]">Выйти из локации</StyledBtn>
    </div> : step === 1 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Первый вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-40">
            Чему посвящён музей?</h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Истории российской артиллерии и развитию «Егошихинских заводов»</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">Истории российской артиллерии и развитию «Мотовилихинских заводов»</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Истории «Пермской» артиллерии</StyledBtn>
    </div> : step === 2 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Второй вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-40">
            Сколько всего музеев артиллерии в Пермском крае?</h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">1</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">2-3</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">4-5</StyledBtn>
    </div> : step === 3 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Третий вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-40">
            Сколько выстрелов на счету у пермской царь-пушки?</h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">0</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">7</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">313</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">412</StyledBtn>
    </div> : step === 4 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Четвёртый вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-40">
            Сколько выставлено образцов военной техники?</h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">32</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">45</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">56</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">100</StyledBtn>
    </div> : step === 5 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Пятый вопрос:</h2>
        <h3 className="text-[white] text-[16px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-4">
            На цокольном этаже музея располагаются полноразмерные макеты рудника по добыче медистого песчаника и избы рабочего. С такого же медеплавильного завода начинался и сам город Пермь, который старше «Мотовилихи» всего на ... лет.</h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">5</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">6</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">12</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">13</StyledBtn>
    </div> : <div className="bg-[#19191A] h-screen w-full">
        {correct === 5 ? <>
            <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
                textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
            }}>Ура! Пройдено на 100%!<br/>Ваш бонус в разделе профиль!</h2>
            <StyledBtn onClick={() => {
                window.parent.postMessage({"type": "closeScene"}, "*")
            }} className="text-[red] text-[20px]">Выйти</StyledBtn>
        </> : <>
            <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
                textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
            }}>{correct}/5</h2>
            <StyledBtn onClick={() => {
            setCorrect(0)
            setStep(1)
        }} className="text-[red] text-[20px]">Перепройти</StyledBtn></>}
    </div>
}