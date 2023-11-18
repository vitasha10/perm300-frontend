"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {StyledBtn} from "@/components/StyledBtn";
import axios from "axios";
import {apiUrl} from "@/app/page";

export default function CirkPage() {
    const [step, setStep] = useState(0)
    const [correct,setCorrect] = useState(0)
    useEffect(() => {
        if(correct === 5) {
            axios.post(apiUrl+"/saveProgress",{
                src: "cirk"
            }).then(obj => console.log(obj)).catch(e => {
                console.log(e)
                alert("Ошибка сохранения результата")
            })
        }
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
            На территории парка располагается Пермская ротонда. Кто был её архитектором?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Вячеслав Уральский</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Мендель Футрик</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">Иван Свиязев</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Иван Турчевич</StyledBtn>
    </div> : step === 2 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Второй вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-4">
            В городском саду не раз побывал великий князь Михаил Александрович Романов. В какое время это могло происходить?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">Начало 20 века</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">19 век</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Конец 20 века</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">18 век</StyledBtn>
    </div> : step === 3 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Третий вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-20">
            Какого бренд-персонажа нет в парке?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Пони Карамелька</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Паркуша</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Пёсик Дик</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">Белочка Ириска</StyledBtn>
    </div> : step === 4 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Четвёртый вопрос:</h2>
        <h3 className="text-[white] text-[18px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-20">
            Какой памятник стоит на территории парка?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">Памятник бездомному коту</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Памятник больной собаке</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Памятник оставленным животным</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">Памятник бездомной собаке</StyledBtn>
    </div> : step === 5 ? <div className="bg-[#19191A] h-screen w-full">
        <h2 className="text-[red] text-[28px] font-unb text-center m-0 pt-20" style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
        }}>Пятый вопрос:</h2>
        <h3 className="text-[white] text-[16px] font-unb text-center w-[70vw] mt-4 mx-auto flex mb-20">
            Сколько лет парку исполнилось в 2023 году?
        </h3>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">100</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
            setCorrect(prev => prev + 1)
        }} className="text-[white] text-[14px]">95</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">75</StyledBtn>
        <StyledBtn onClick={() => {
            setStep(prev => prev + 1)
        }} className="text-[white] text-[14px]">110</StyledBtn>
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