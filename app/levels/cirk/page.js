"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {StyledBtn} from "@/components/StyledBtn";
import axios from "axios";
import {apiUrl, useUserId} from "@/app/page";

export default function CirkPage() {
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
        func(correct,"cirk").then(r => {})
    },[correct])
    return step === 0 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-10" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Пермский государственный цирк</h2>
        <Image src="/cirkMain.jpg" className="mt-4 mx-auto flex" width="300" height="200" alt="Пермский государственный цирк"/>
        <h3 className="text-[white] text-[14px] font-unb text-center w-[70vw] mt-20 mx-auto flex">
            Для прохождения данной локации необходимо находится в радиусе 100м от музея.
        </h3>
        <StyledBtn onClick={() => setStep(1)} className="text-[red] text-[20px]">Я тут!</StyledBtn>
        <StyledBtn onClick={() => {
            window.parent.postMessage({"type": "closeScene"}, "*")
        }} className="text-[white] text-[14px]">Выйти из локации</StyledBtn>
    </div> : step === 1 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Первый вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-20">
            В какое время состоялось первое цирковое представление в Перми?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">начало 20 века</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">начало 19 века</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">конец 19 века</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">конец 18 века</StyledBtn>
    </div> : step === 2 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Второй вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-20">
            Как сейчас зовут руководителя цирка?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">Анна Грибова</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Стефанов Сергей</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Разом Алиев</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Сумишевская Мария</StyledBtn>
    </div> : step === 3 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Третий вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-20">
            Когда отмечаетая Всемирный день цирка?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">первый понедельник июля</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">вторая суббота марта</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">первое воскресенье февраля</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">третья суббота апреля</StyledBtn>
    </div> : step === 4 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Четвёртый вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-20">
            Какой адрес Перского государственного цирка?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">ул. Уральская, 112</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">ул. Крупской, 12</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">ул. Лебедева, 46</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">бульвар Гагарина, 36</StyledBtn>
    </div> : step === 5 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Пятый вопрос:</h2>
        <h3 className="text-[white] text-[16px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-20">
            Какое животное никогда не выступало на арене Пермского цирка?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">слон</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">снежный барс</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">жираф</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">бегемот</StyledBtn>
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