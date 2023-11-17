export const StyledBtn = ({children,className,onClick}) => {
    return <button onClick={onClick} className={"flex border-none font-medium font-unb py-2 w-[80vw] mx-auto rounded-[32px] mt-8 justify-center active:py-2.5 active:mt-[30px]"+" "+className} style={{
        boxShadow: '0px 0px 16px #3A36FF',
        textShadow: "0px 2px 8px rgba(255, 255, 255, 0.10)",
        background: "#030D1B66",
    }}>{children}</button>
}