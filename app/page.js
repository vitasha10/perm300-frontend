"use client";
import {
    AdaptivityProvider,
    ConfigProvider,
    AppRoot,
    Avatar,
    SplitLayout,
    SplitCol,
    View,
    Panel,
    PanelHeader,
    FixedLayout,
    Separator, Spacing,
    Text,
    Group,
    SimpleCell,
    Tabbar, Epic,
    TabbarItem, useAdaptivityConditionalRender, usePlatform
} from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import {
    Icon36Users,
} from "@vkontakte/icons";
import "@vkontakte/vkui/dist/cssm/styles/themes.css";

//import '@vkontakte/vkui-tokens/themes/vkCom/cssVars/declarations/onlyVariables.css';
//import '@vkontakte/vkui-tokens/themes/vkComDark/cssVars/declarations/onlyVariablesLocal.css';
import Image from "next/image";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {Clusterer, Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import {StyledBtn} from "@/components/StyledBtn";
import {PanelHeaderBack} from "@vkontakte/vkui/src/components/PanelHeaderBack/PanelHeaderBack";



const ProfileInfo = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        bridge.send('VKWebAppGetUserInfo').then(data => {
            console.log(data)
            if (data.id) setData(data)
        }).catch(e => console.log(e))
    })
    return <SimpleCell
        before={<Avatar size={72} src={data?.photo_100 ? data.photo_100 : "#"} fallbackIcon={<Icon36Users />} />}
        subtitle={data?.city?.title ? data?.city?.title : ""}
    >
        {data ? data.first_name + " " + data.last_name : "Загрузка..."}
    </SimpleCell>
    return !data ? <></> : <div className="flex w-full h-[84px] px-4 py-1.5 items-center">
        <div className="relative rounded-[50%] w-[72px] h-[72px] overflow-hidden">
            <Image src={data.photo_100} fill sizes="100vw" alt={data.photo_100}/>
        </div>
        <div className="h-fit w-fit ml-3">
            <Text className="text-[20px] text-[white] font-vk font-medium break-words">{data.first_name} {data.last_name}</Text>
            <Text className="text-[14px] text-[#E2E2E2] font-vk font-normal break-words">{data?.city?.title}</Text>
        </div>
    </div>
}
const places = [
    {
        geometry: [58.0357, 56.31005],
        name: "Музей пермской артиллерии",
        src: "mpa"
    },
    {
        geometry: [58.01656, 56.23717],
        name: "Зоопарк"
    },
    {
        geometry: [58.00816, 56.21635],
        name: "Театр-Театр"
    },
    {
        geometry: [58.01926, 56.27148],
        name: "Планетарий"
    },
    {
        geometry: [58.02069, 56.25127],
        name: "Теплоходы"
    },
    {
        geometry: [58.01063, 56.23748],
        name: "Пермский медведь"
    },
]
const quessPlaces = [
    {
        geometry: [58.01025, 56.22747],
        name: "Эспланада",
        src: "esplanada.jpg",
    },
    {
        geometry: [58.00843, 56.21767],
        name: "Театр-Театр",
        src: "teatr.jpg",
    },
    {
        geometry: [57.98248, 56.19747],
        name: "Памятник Сухареву",
        src: "suharev.jpg",
    },
    {
        geometry: [57.98146, 56.19852],
        name: "Дом наоборот",
        src: "domnaoborot.jpg",
    },
    {
        geometry: [57.99731, 56.17503],
        name: "Сквер Кормшикова",
        src: "skverKormshikova.jpg",
    },
    {
        geometry: [57.97748,  56.18564],
        name: "ДК Гагарина",
        src: "dkGagarina.jpg",
    },
    {
        geometry: [57.97201, 56.15355],
        name: "ТЦ Планета",
        src: "planeta.jpg",
    },
    {
        geometry: [57.99056, 56.19372],
        name: "Печатная фабрика Гознак",
        src: "goznak.jpg",
    },
    {
        geometry: [57.98626, 56.21665],
        name: "ул. Стахановская",
        src: "stahanovskaya.jpg",
    },
]
const PlaceMarks = ({openedScene, setOpenedScene, openedScreen, setOpenedScreen}) => {
    useEffect(() => {
        window.openScene = index => {
            setOpenedScreen("scene")
            setOpenedScene(index)
        }
    },[])
    return <Clusterer
        options={{
            hasHint: false,
            preset: "islands#invertedRedClusterIcons",
            groupByCoordinates: true,
            //balloonPanelMaxMapArea: Infinity
        }}
    >
        {places.map((item,i) => <Placemark key={"plcmrk"+i} geometry={item.geometry}
         properties={{
             item: i,
             balloonContentHeader: "Квест: "+item.name,
             balloonContentBody: `<button class=" text-[white] font-bold text-[14px]" onclick="window.openScene(${i});">
                Открыть
            </button>`
         }}
           options={{
               preset: "islands#redDotIcon"
           }}
        />)}
        {quessPlaces.map((item,i) => <Placemark key={"plcmrQssk"+i} geometry={item.geometry}
           properties={{
               item: i,
               balloonContentHeader: "Угадано: "+item.name,
               balloonContentBody: `<button class=" text-[white] font-bold text-[14px]" onclick="/*window.openScene(${i});*/">
                Смотреть
            </button>`
           }}
           options={{
               preset: "islands#darkGreenDotIcon"
           }}
        />)}
    </Clusterer>
}

const ScenePage = ({openedScene, setOpenedScene, openedScreen, setOpenedScreen}) => {
    const [timestamp, setTimestamp] = useState(String(Math.floor(Date.now() / 1000)))
    useEffect(() => {
        const func = event => {
            // IMPORTANT: check the origin of the data!
            console.log(2424444,event)
            if (event.origin.indexOf("perm300.tech") !== -1) {
                // The data was sent from your site.
                // Data sent with postMessage is stored in event.data:
                if(event.data?.type == "closeScene") {
                    setOpenedScene(null)
                    setOpenedScreen("map")
                }
            } else {
                // The data was NOT sent from your site!
                // Be careful! Do not use it. This else branch is
                // here just for clarity, you usually shouldn't need it.
                return
            }
        }
        window.addEventListener('message', func)
        return () => {
            window.removeEventListener("message", func)
        }
    },[])
    return <div className="w-full h-[80vh] flex flex-col overflow-hidden">
        <iframe className={"w-full h-full border-none"} src={"https://"+timestamp+".perm300.tech/levels/"+places[openedScene].src}/>
    </div>
}

const MyPresentsItem = ({name, photo, onCLick}) => {
    return <div className="flex w-full shrink h-fit flex-col" onClick={onCLick}>
        <div className="w-full h-[200px] rounded-[8px] relative overflow-hidden">
            <Image style={{background: 'linear-gradient(0deg, #3A3A3A 0%, #3A3A3A 100%)', objectFit: "cover"}} fill sizes={"100vw"} src={photo} alt={name+photo}/>
        </div>
        <div className="relative text-[white] mt-1 text-[12px] font-unb" style={{
            fontFeatureSettings: "'clig' off, 'liga' off",
        }}>{name}</div>
    </div>
}

const App = () => {
    const [openedScene,setOpenedScene] = useState(null)
    const { viewWidth } = useAdaptivityConditionalRender();
    const [openedScreen, setOpenedScreen] = useState("main")
    useEffect(() => {
        let nm = document.createAttribute("name")
        nm.value = "viewport"
        let cntnt = document.createAttribute("content")
        cntnt.value = "width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        let ell = document.createElement("meta")
        ell.setAttributeNode(nm)
        ell.setAttributeNode(cntnt)
        document.head.appendChild(ell)
        bridge.subscribe((e) => console.log(e));
        bridge.send("VKWebAppInit")
    },[])
    const platform = usePlatform()
    const [myPresents, setMyPresents] = useState(null)
    const [openedPresent, setOpenedPresent] = useState(null)
    const [myScore, setMyScore] = useState(0)
    useEffect(() => {
        setMyPresents([
            {
                name: "Скидка 3% на билет в театр-театр!",
                photo: "https://data.vitasha.ru/perm300/bonus-teatr-teatr.jpg",
                description: "Пермский академический Театр-Театр – ведущее учреждение культуры Прикамья. Неоднократный обладатель самых престижных театральных премий, среди которых «Золотая маска». \n"
            },
            {
                name: "Скидка 5% на покупку круиза из Перми на RiverBOOK",
                photo: "https://data.vitasha.ru/perm300/bonus-teatr-teatr.jpg"
            }
        ])
    },[])
    console.log(myPresents)
    console.log(platform)
    return <AppRoot>
        <SplitLayout draggable={"false"}  header={<PanelHeader separator={false} />}>
            <SplitCol width="100%" stretchedOnMobile autoSpaced>
                <Epic activeStory={openedScreen}
                      tabbar={openedScreen !== "scene" ?(
                          viewWidth.tabletMinus && (
                              <div className="fixed bottom-0 left-0 pb-[7px] w-full h-[70px] bg-[#454647]">
                                  <Tabbar style={{ position: 'static', margin: '0 0 10px', background: "#454647"}}>
                                      <TabbarItem selected={openedScreen === "main"} onClick={() => setOpenedScreen("main")} aria-label="Миры">
                                          <div className="items-center justify-center flex flex-col">
                                              <svg
                                                  className={"h-[2.6vh]  mt-[calc(2px_+_0.3vh)]"}
                                                  fill={openedScreen === "main" ? "#F00" : "#898989"}
                                                  preserveAspectRatio="none"
                                                  viewBox="0 0 2222.5 1014.98"
                                              >
                                                  <path
                                                      d="M405.99 608.99V304.91h-270.6V0h575.93L573.53 239.09c49.02 22.25 92.84 53.95 129.13 92.78C737.5 143.05 902.98 0 1101.88 0c154.4 0 288.66 86.19 357.32 213.09C1527.84 86.19 1662.11 0 1816.51 0c224.22 0 405.99 181.77 405.99 405.99s-181.77 405.99-405.99 405.99c-154.4 0-288.67-86.19-357.31-213.08-68.66 126.89-202.92 213.08-357.32 213.08-117.08 0-222.57-49.58-296.67-128.87-34.84 188.82-200.31 331.87-399.22 331.87C181.77 1014.98 0 833.21 0 608.99h405.99z"
                                                  ></path>
                                              </svg>
                                              <span style={{
                                                  color: openedScreen === "main" ? "#FFF" : "#898989"
                                              }} className="text-[1.35vh] font-medium mt-[calc(2px_+_0.4vh)]">Главная</span>
                                          </div>
                                      </TabbarItem>
                                      <TabbarItem selected={openedScreen === "map"} onClick={() => setOpenedScreen("map")} aria-label="Гардероб">
                                          <div className="items-center justify-center flex flex-col">
                                              <svg
                                                  className={"h-[3.3vh] w-[3.3vh] mt-0.5"}
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                              >
                                                  <g>
                                                      <g stroke={openedScreen === "map" ? "#FFF" : "#898989"} strokeWidth="1.5">
                                                          <path
                                                              strokeLinecap="round"
                                                              d="M7.529 16.47C2.589 11.534.589 5.528 3.058 3.059 5.048 1.067 9.338 1.982 13.513 5m2.958 2.529c4.939 4.939 6.94 10.944 4.47 13.413-1.988 1.989-6.27 1.078-10.441-1.932M20.942 3.058c2.47 2.469.468 8.474-4.47 13.413-4.94 4.939-10.945 6.94-13.414 4.47-1.991-1.99-1.076-6.28 1.942-10.455A24.48 24.48 0 017.529 7.53C12.468 2.59 18.473.589 20.942 3.058z"
                                                          ></path>
                                                          <path d="M14.5 12a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                                                      </g>
                                                  </g>
                                              </svg>
                                              <span style={{
                                                  color: openedScreen === "map" ? "#FFF" : "#898989"
                                              }} className="text-[1.35vh] font-medium mt-0.5">Карта</span>
                                          </div>
                                      </TabbarItem>
                                      <TabbarItem selected={openedScreen === "profile"} onClick={() => setOpenedScreen("profile")} aria-label="Профиль">
                                          <div className="items-center justify-center flex flex-col">
                                              <svg
                                                  className={"h-[3.3vh] w-[3.3vh] mt-0.5"}
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                              >
                                                  <path
                                                      stroke={openedScreen === "profile" ? "#FFF" : "#898989"}
                                                      strokeLinecap="round"
                                                      strokeWidth="1.5"
                                                      d="M19.1 10.66c1.11 1.314.88 2.921.88 4.34 0 3.906-5.267 5-7.98 5s-7.98-1.094-7.98-5c0-1.418-.231-3.026.88-4.34m14.2 0c-.195-.23-.43-.45-.716-.66m.716.66c.7.403.879-1.105.88-1.598V7.188C19.98 5.563 18.863 5 17.905 5c-.957 0-2.873 1.563-3.511 1.563-.766 0-.914-.157-2.394-.157s-1.628.157-2.394.157C8.968 6.563 7.052 5 6.095 5c-.958 0-2.075.563-2.075 2.188v1.875c.002.492.18 2 .88 1.597m0 0c.195-.23.43-.45.716-.66"
                                                  ></path>
                                                  <path
                                                      stroke={openedScreen === "profile" ? "#FFF" : "#898989"}
                                                      strokeWidth="1.5"
                                                      d="M12.826 16c0 .173-.36.313-.807.313-.445 0-.806-.14-.806-.313s.361-.313.806-.313c.446 0 .807.14.807.313zm2.674-2.406c0 .431-.217.781-.484.781s-.484-.35-.484-.781c0-.432.217-.781.484-.781s.484.351.484.781zm-6 0c0 .431-.217.781-.484.781s-.484-.35-.484-.781c0-.432.217-.781.484-.781s.484.351.484.781z"
                                                  ></path>
                                                  <path
                                                      stroke={openedScreen === "profile" ? "#FFF" : "#898989"}
                                                      strokeLinecap="round"
                                                      strokeWidth="1.5"
                                                      d="M22 15.469c-.483-.313-2.58-1.094-3.387-1.094m1.774 3.594c-.484-.313-1.613-1.094-2.42-1.094M2 15.469c.484-.313 2.58-1.094 3.387-1.094m-1.774 3.594c.484-.313 1.613-1.094 2.42-1.094"
                                                  ></path>
                                              </svg>
                                              <span style={{
                                                  color: openedScreen === "profile" ? "#FFF" : "#898989"
                                              }} className="text-[1.35vh] font-medium mt-0.5">Профиль</span>
                                          </div>
                                      </TabbarItem>
                                  </Tabbar>
                              </div>
                          )) : <></>}>
                    <View id="main" activePanel="main">
                        <Panel id="main" style={{
                            overflow: "hidden"
                        }}>
                            <FixedLayout vertical={"bottom"}>
                                <div className="absolute -bottom-[7vh] left-0 relative w-full min-h-[738px] h-[107vh]">
                                    <video src={"/medved.mp4"} className="w-full h-full" style={{
                                        objectFit: "cover",
                                        objectPosition: "top"
                                    }} priority playsInline muted loop autoPlay/>
                                </div>
                                <div className="h-[415px] absolute bottom-8 left-0" style={{width: '100%', opacity: 0.50, background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.40) 14%, black 100%)'}} />
                            </FixedLayout>
                            <FixedLayout>
                                <h1 className="flex mt-[14vh] justify-center w-full text-[5vh] font-unb font-medium text-[#F00] mb-0" style={{
                                    textShadow: "0px 0px 10px rgba(255, 255, 255, 0.50)",
                                }}>Пермь 300</h1>
                                <h2 className="flex justify-center w-full text-[2vh] font-unb font-normal text-[white] text-center " style={{
                                    textShadow: "0px 0px 10px rgba(255, 255, 255, 0.50)",

                                }}>Онлайн пространство,<br/>где всё реально!</h2>
                            </FixedLayout>
                            <FixedLayout vertical={"bottom"}>
                                {/*<h3 className="justify-center w-2/3 mb-40 text-[2.7vh] font-unb text-center font-medium text-[white] " style={{
                                    textShadow: "0px 0px 10px rgba(255, 255, 255, 0.50)",
                                }}>радик сюда надо медведя, который наша модель и город на фоне; можно 3сек видео чтобы рукой махал, <span className="text-[red]">щас картинка для примера</span></h3>*/}
                                <StyledBtn onClick={() => setOpenedScreen("map")} className="text-[red] text-[20px]">Карта с квестами</StyledBtn>
                                <StyledBtn onClick={() => setOpenedScreen("events")} className="text-[red] text-[20px]">Будущие события</StyledBtn>
                                <StyledBtn onClick={() => setOpenedScreen("quessLocation")} className="text-[red] text-[20px] mb-2 relative">
                                    <span>Узнай место в перми!</span>
                                    <svg className="absolute -top-12 -right-12 h-[14vh] w-[calc(104_/_117_*_14vh)]" fill="none" viewBox="0 0 104 117">
                                        <path
                                            stroke="#F00"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            d="M32.688 34.805c28.22-24.044 44.439-23.345 50.66-16.043 6.22 7.3 7.798 45.55-39.913 90.265"
                                        ></path>
                                        <path
                                            stroke="#F00"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            d="M45.184 96.973s-3.88 15.39-5.29 14.491c-1.408-.9 14.673-4.625 14.673-4.625"
                                        ></path>
                                    </svg>
                                </StyledBtn>
                                <div className="flex border-none font-medium font-unb py-2 w-[80vw] mx-auto justify-center text-center text-[12px] text-[#FFFFFF77] mb-14" style={{
                                    //boxShadow: '0px 0px 16px #3A36FF',
                                    textShadow: "0px 2px 8px rgba(255, 255, 255, 0.10)",
                                    //background: "#030D1B66",
                                }}>Собери достаточно баллов, чтобы присоединиться к онлайн событиям про Пермь и получить призы!</div>
                            </FixedLayout>
                            {/*<FixedLayout vertical={"bottom"}>
                                <svg className="absolute -top-4 right-[47px] h-[14vh] w-[calc(104_/_117_*_14vh)]" fill="none" viewBox="0 0 104 117">
                                    <path
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        d="M32.688 34.805c28.22-24.044 44.439-23.345 50.66-16.043 6.22 7.3 7.798 45.55-39.913 90.265"
                                    ></path>
                                    <path
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        d="M45.184 96.973s-3.88 15.39-5.29 14.491c-1.408-.9 14.673-4.625 14.673-4.625"
                                    ></path>
                                </svg>
                                <h3 className="flex justify-center w-full text-[2.7vh] font-unb text-center font-medium text-[white] " style={{
                                    textShadow: "0px 0px 10px rgba(255, 255, 255, 0.50)",
                                }}>ВЫБЕРИ<br/>СВОЙ МИР</h3>

                                <div className="h-[8vh]"/>
                            </FixedLayout>*/}
                        </Panel>
                    </View>
                    <View id="map" activePanel="map">
                        <Panel id="map">
                            <PanelHeader separator={false} /*transparent={true}*/
                                         before={<PanelHeaderBack onClick={() => setOpenedScreen("main")}/*label="Назад"*/ />}
                            >
                                Карта
                            </PanelHeader>
                            {/*<FixedLayout style={{zIndex: "initial"}}>
                                <div className="absolute -z-10 -top-[7vh] left-0 relative w-full h-[107vh] bg-[#2C2D2E]"/>
                            </FixedLayout>*/}
                            <Group>
                                <FixedLayout vertical={"top"}>
                                    <div className="flex flex-col">
                                        <div className="flex ml-2 mb-2">
                                            <Image src={"/darkGreenDotIcon.png"} width="30" height="30" alt="darkGreenDotIcon" />
                                            <span className="ml-1.5">- угаданные места</span>
                                        </div>
                                        <div className="flex ml-2 mb-2">
                                            <Image src={"/redDotIcon.png"} width="30" height="30" alt="redDotIcon" />
                                            <span className="ml-1.5">- места с квестами</span>
                                        </div>
                                    </div>
                                    <div className=" flex">
                                        <YMaps query={{ lang: "ru_RU", load: "package.full" }}>
                                            <Map
                                                width={"100vw"}
                                                height={"70vh"}
                                                defaultState={{
                                                    center: [58.00819, 56.21612],
                                                    zoom: 12,
                                                    type: "yandex#hybrid",
                                                    controls: [
                                                        "zoomControl",

                                                    ],
                                                }}
                                                defaultOptions={{
                                                    suppressMapOpenBlock: true,
                                                    copyrightLogoVisible: false,
                                                    copyrightProvidersVisible: false,
                                                    copyrightUaVisible: false,
                                                }}
                                            >
                                                <PlaceMarks {...{
                                                    openedScene,
                                                    setOpenedScene,
                                                    openedScreen,
                                                    setOpenedScreen
                                                }}/>
                                            </Map>
                                        </YMaps>
                                    </div>
                                </FixedLayout>
                            </Group>
                        </Panel>
                    </View>
                    <View id="scene" activePanel="scene">
                        <Panel id="scene">
                            <PanelHeader separator={false} transparent={true}/>
                            <Group>
                                <ScenePage {...{openedScene, setOpenedScene, openedScreen, setOpenedScreen}}/>
                            </Group>
                        </Panel>
                    </View>
                    <View id="events" activePanel="events">
                        <Panel id="events">
                            <PanelHeader separator={false} /*transparent={true}*/
                                         before={<PanelHeaderBack onClick={() => setOpenedScreen("main")}/*label="Назад"*/ />}
                            >
                                Будущие события
                            </PanelHeader>
                            <Group>

                            </Group>
                        </Panel>
                    </View>
                    <View id="quessLocation" activePanel="quessLocation">
                        <Panel id="quessLocation">
                            <PanelHeader separator={false} /*transparent={true}*/
                                         before={<PanelHeaderBack onClick={() => setOpenedScreen("main")}/*label="Назад"*/ />}
                            >
                                Угадай, где это?
                            </PanelHeader>
                            <Group>
                                <div className="flex w-40 h-40 bg-[#0f1011] justify-center items-center">
                                    <h1 className="w-fit text-[32px] text-center font-unb font-medium text-[#F00] pt-1" style={{
                                        //textShadow: "0px 0px 10px rgba(255, 255, 255, 0.50)",
                                    }}>Пермь
                                        <svg
                                            className={"h-[4.3vh]  mt-[calc(2px_+_2vh)]"}
                                            fill={"#F00"}
                                            preserveAspectRatio="none"
                                            viewBox="0 0 2222.5 1014.98"
                                        >
                                            <path
                                                d="M405.99 608.99V304.91h-270.6V0h575.93L573.53 239.09c49.02 22.25 92.84 53.95 129.13 92.78C737.5 143.05 902.98 0 1101.88 0c154.4 0 288.66 86.19 357.32 213.09C1527.84 86.19 1662.11 0 1816.51 0c224.22 0 405.99 181.77 405.99 405.99s-181.77 405.99-405.99 405.99c-154.4 0-288.67-86.19-357.31-213.08-68.66 126.89-202.92 213.08-357.32 213.08-117.08 0-222.57-49.58-296.67-128.87-34.84 188.82-200.31 331.87-399.22 331.87C181.77 1014.98 0 833.21 0 608.99h405.99z"
                                            ></path>
                                        </svg>
                                    </h1>
                                </div>
                                {JSON.stringify(quessPlaces.map(item => item.name))}
                            </Group>
                        </Panel>
                    </View>
                    <View id="usePresent" activePanel="usePresent">
                        <Panel id="usePresent">
                            <PanelHeader separator={false} /*transparent={true}*/
                                         before={<PanelHeaderBack onClick={() => setOpenedScreen("present")}/*label="Назад"*/ />}
                            >
                                Использование акции/подарка
                            </PanelHeader>
                            <Group>
                                <div className="text-center mt-10 mx-auto w-3/4">В этот момент якобы открывается сторонний ресурс</div>
                                <StyledBtn onClick={() => setOpenedScreen("present")}>Вернутся</StyledBtn>
                            </Group>
                        </Panel>
                    </View>
                    <View id="present" activePanel="present">
                        <Panel id="present">
                            <PanelHeader separator={false} /*transparent={true}*/
                                         before={<PanelHeaderBack onClick={() => setOpenedScreen("profile")}/*label="Назад"*/ />}
                            >
                                Подарок/акция
                            </PanelHeader>
                            {openedPresent !== null ? <Group>
                                <div className="w-full h-[200px] relative">
                                    <Image style={{background: 'linear-gradient(0deg, #3A3A3A 0%, #3A3A3A 100%)', objectFit: "cover"}} fill sizes={"100vw"} src={openedPresent.photo} alt={openedPresent.name}/>
                                </div>
                                <h2 className="text-[red] text-[16px] font-unb text-center m-0 pt-4 max-w-[90vw] mx-auto" style={{
                                    textShadow: "0px 0px 8px rgba(255, 255, 255, 0.13)",
                                }}>{openedPresent.name}</h2>
                                <div className="text-[white] text-[14px] font-unb px-2.5 m-0 pt-4">{openedPresent?.description ? openedPresent?.description : "Описание отсутствует"}</div>
                                <div className="mt-40"/>
                                <StyledBtn onClick={() => {
                                    setOpenedScreen("usePresent")
                                }} className={"text-[red]  w-2/3"}>Использовать!</StyledBtn>
                                <StyledBtn onClick={() => {
                                    setOpenedScreen("profile")
                                    setOpenedPresent(null)
                                }} className={"text-[red]  w-2/3"}>Получить заново</StyledBtn>
                            </Group> : <></>}
                        </Panel>
                    </View>
                    <View id="profile" activePanel="profile">
                        <Panel id="profile">
                            <PanelHeader fixed separator={false}>
                                Профиль
                            </PanelHeader>
                            <FixedLayout vertical="top" filled >
                                <Spacing size={24}>
                                    <Separator />
                                </Spacing>
                                <ProfileInfo/>
                                <Spacing size={24}>
                                    <Separator />
                                </Spacing>
                                <Text style={{
                                    fontSize: "20px",
                                    margin: "0 12px 12px 12px"
                                }} className="text-[#E2E2E2] font-vk font-medium">Мои баллы: <span className="text-[red]">{myScore}</span></Text>
                                <Text style={{
                                    fontSize: "20px",
                                    margin: "0 12px 12px 12px"
                                }} className="text-[#E2E2E2] font-vk font-medium">Мои награды</Text>
                            </FixedLayout>
                            <Group>
                                {myPresents !== null ? <>
                                    {myPresents.length > 0 ? <div className="mt-[175px] grid grid-cols-2 gap-x-4 gap-y-[7px] px-2.5 py-4 pb-10">
                                            {myPresents.map((item,i) => <MyPresentsItem key={"prsnts"+item.name+i} name={item.name} onCLick={() => {
                                                setOpenedPresent(item)
                                                setOpenedScreen("present")
                                            }} photo={item.photo}/>)}
                                    </div> : <div className="mt-[195px] text-center w-full font-medium text-[18px]">
                                        Пока что ты ничего не получил(<br/>Попробуй что-то <span className="text-[red]" onClick={() => setOpenedScreen("main")}>пройти!</span>
                                    </div>}
                                </> : <></>}
                            </Group>
                        </Panel>
                    </View>
                </Epic>
            </SplitCol>
        </SplitLayout>
    </AppRoot>
}







export default function FullApp() {
    return <ConfigProvider
        /* Без указания платформы вообще не работает. В платформе "vkcom" не работает корректно HeaderPanel */
        platform={"ios"}  appearance="dark" hasCustomPanelHeaderAfter={false}>
        <AdaptivityProvider>
            <App />
        </AdaptivityProvider>
    </ConfigProvider>
}