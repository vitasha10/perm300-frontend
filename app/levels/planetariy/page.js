"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {StyledBtn} from "@/components/StyledBtn";
import axios from "axios";
import {apiUrl, useUserId} from "@/app/page";

export default function LevPlanetariy() {
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
        func(correct,"planetariy").then(r => {})
    },[correct])
    return step === 0 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-10" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Пермский планетарий</h2>
        <Image src="/planetariyMain.jpg" className="mt-4 mx-auto flex" width="300" height="200" alt="Музей пермской артиллерии"/>
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
            Что не наблюдают в телескоп?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">крупные кометы</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">метеоритные потоки</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">звёздные скопления</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Луну</StyledBtn>
    </div> : step === 2 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Второй вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-40">
            Когда День рождения «Пермского планетария»?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">1 февраля</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">21 мая</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">12 апреля</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">9 апреля</StyledBtn>
    </div> : step === 3 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Третий вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-40">
            Какой программы нет в Пермском планетарии?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Окно во вселенную</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">Все мы — звёзды</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Пришелец из пояса астероидов</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Предание о звёздах</StyledBtn>
    </div> : step === 4 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Четвёртый вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-40">
            В каком году в планетарии была прочитана первая лекция?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">1968</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">1972</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">1961</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">1988</StyledBtn>
    </div> : step === 5 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Пятый вопрос:</h2>
        <h3 className="text-[white] text-[16px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-4">
            Кто является директором «Пермского  пларетария»?
        </h3>
            <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Маркин Виталий</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Нечаева Оксана</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Вепрева Наталья</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">Балтина Таисья</StyledBtn>
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