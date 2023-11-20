"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {StyledBtn} from "@/components/StyledBtn";
import axios from "axios";
import {apiUrl, useUserId} from "@/app/page";

export default function LevTeplohodi() {
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
        func(correct,"teplohodi").then(r => {})
    },[correct])
    return step === 0 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-10" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Пермские теплоходные компании</h2>
        <Image src="/teplohodiMain.jpg" className="mt-4 mx-auto flex" width="300" height="200" alt="Музей пермской артиллерии"/>
        <StyledBtn onClick={() => setStep(1)} className="text-[red] text-[20px]">Начать!</StyledBtn>
        <StyledBtn onClick={() => {
            window.parent.postMessage({"type": "closeScene"}, "*")
        }} className="text-[white] text-[14px]">Выйти из локации</StyledBtn>
    </div> : step === 1 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Первый вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-20">
            Когда родилось Пермское параходное общество?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">1835</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">1862</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">1846</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">1858</StyledBtn>
    </div> : step === 2 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Второй вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-20">
            На каком судне нельзя отправиться на «прогулку» по Каме?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">Илья Муромец</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Хирург Разумовский</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Москва-42</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Николай Васильевич Гоголь</StyledBtn>
    </div> : step === 3 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Третий вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-20">
            Какое предприятие было основано в 1931 году?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Здание речного вокзала</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">Судостроительный завод «Кама»</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Ремонтно-эксплуатационная база Камского флота</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Камская Гидроэлектростанция</StyledBtn>
    </div> : step === 4 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Четвёртый вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-4">
            В 1919 году, во время Гражданской войны, Камский флот был почти полностью уничтожен. Сколько судов погибло в Лёвшинском пожаре?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">96</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">81</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">58</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">109</StyledBtn>
    </div> : step === 5 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Пятый вопрос:</h2>
        <h3 className="text-[white] text-[16px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-4">
            Согласно энциклопедиям 19-го века, одним из первых российских пароходов было судно, построеное в 1815-м году, на нынешней территории Пермского края. Как назывался пароход?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">«Пермский первенец»</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">«Братья Каменские»</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">«Вильгельм Пик»</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">Пожва</StyledBtn>
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