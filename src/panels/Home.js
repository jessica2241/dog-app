import React, {useState} from "react";
import {
    Alert,
    Button,
    Caption,
    Cell,
    Div,
    Group,
    InfoRow,
    ModalCard,
    ModalRoot,
    Panel,
    Progress, Text,
    View,
    Header,
    Gallery,
    PanelHeader, ModalPageHeader, PanelHeaderButton, ModalPage, CellButton
} from "@vkontakte/vkui";
import Api from "../Api";
import VkApi from '../VkApi'
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import List from "@vkontakte/vkui/dist/components/List/List";
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel'
import Icon56LockOutline from '@vkontakte/icons/dist/56/lock_outline';
import Icon28MessagesOutline from '@vkontakte/icons/dist/28/messages_outline';
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";

const Home = (User) => {



    const [popout, setPopout] = useState(null);
    const [status, setStatus] = useState(false);
    let [count, setCount] = useState(1247);
    let [maxCount, setMaxCount] = useState(8000);
    let [modal, setModal] = useState(null);

    let [bonus, setBonus] = useState(false);



    const idGroup: number = 0
    const idApp: number = 7509109
    let api: Api = new Api(idApp)
    const http = new XMLHttpRequest()







    const ClickInfo = (event: React.MouseEvent) => {
        setModal("info")
    }

    // eslint-disable-next-line no-extend-native
    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };




    async function t() {
        await sleep(200)
    }
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }


    // eslint-disable-next-line no-unused-vars
    function pause() {
        return new Promise(resolve => setTimeout(() => {
            console.log(``);
            resolve();
        }, 1500));
    }


    function ClickStory() {

        api.vkApi.getAccessToken(api.idApp, 'stories').then(
            data => {
                console.log(data)
                const vk = new VkApi(data.accessToken);
                setPopout(<ScreenSpinner size='large'/>)                //TODO: LINK
                vk.request("stories.getPhotoUploadServer", "add_to_news=1&link_url=https://vk.com/app7509109").then(
                    data => {
                        let uurl = data['response']['upload_url']
                        let url = 'https://help-please.mooo.com:81/dog?id=' + User.User.id.toString()+'&url='+uurl
                        http.open("GET", url)
                        http.send()
                        http.onreadystatechange = function () {
                            if (this.readyState === 4 && this.status === 200) {
                                const data = JSON.parse(this.responseText);
                                console.log(data)
                                setPopout(null)
                                setBonus(true)
                                if (data === true) {
                                    setPopout(
                                        <Alert
                                            onClose={function () {
                                                setPopout(null)
                                            }}
                                        >
                                            <h2>Круто!</h2>
                                            <p> Вы успешно опубликовали историю! Спасибо!</p>
                                        </Alert>)
                                } else {
                                    console.log(data);
                                    setPopout(
                                        <Alert
                                            actions={[{
                                                title: 'Отмена',
                                                autoclose: true,
                                                mode: 'cancel'
                                            }, {
                                                title: 'Повторить',
                                                autoclose: true,
                                            }]}
                                            onClose={function () {
                                                setPopout(null)
                                            }}
                                        >
                                            <h2>Ошибка запроса #003</h2>
                                            <p> {data} </p>
                                        </Alert>)
                                }
                            } else {
                                setPopout(
                                    <Alert
                                        actions={[{
                                            title: 'Отмена',
                                            autoclose: true,
                                            mode: 'cancel'
                                        }, {
                                            title: 'Повторить',
                                            autoclose: true,
                                        }]}
                                        onClose={function () {
                                            setPopout(null)
                                        }}
                                    >
                                        <h2>Ошибка #2023</h2>
                                        <p>Временно недоступно. Попробуйте позже.</p>
                                    </Alert>)
                            }
                        }
                    },
                    err => {
                        console.log(err)
                        setPopout(
                            <Alert
                                actions={[{
                                    title: 'Отмена',
                                    autoclose: true,
                                    mode: 'cancel'
                                }, {
                                    title: 'Повторить',
                                    autoclose: true,
                                }]}
                                onClose={function () {
                                    setPopout(null)
                                    ClickStory()
                                }}
                            >
                                <h2>Ошибка #113</h2>
                                <p>Временно недоступно. Попробуйте позже.</p>
                            </Alert>)
                    }
                )
            })
    }



    return (
                <View modal={
                    <ModalRoot
                    activeModal={modal}
                    onClose={() => setModal(null)}>

                        <ModalPage
                            id="info"
                            header={
                                <ModalPageHeader

                                    right={<PanelHeaderButton > <Icon24Cancel/> </PanelHeaderButton>}
                                >
                                    Подробная информация
                                </ModalPageHeader>
                            }
                        >
                            <Text weight="regular" style={{ marginBottom: 16 }}>
                                🆘🆘УМОЛЯЕМ ПОМOГИТЕ! НУЖНО CПАСТИ CБИТУЮ AВТОМOБИЛЕМ СОБAКУ 🆘🆘🆘

                                Сегoдня около 10:00 на тeрритории предприятия обнаружила трaвмировaнную собаку всю в крови ! Бeдное животное от страха забилось под припaркованную газель и скулилo от боли и ужаса происходящего! Рядом оживленнaя трасса и что скорeе всего - собачку сбила машина и как обычно никто конечно же нe остaновился помочь! Ну а что, это же всего лишь собака не так ли ?! Нeгодовaнию и гневу уже просто нет предела! Ну как ? Кaк можно навредить бaззащитному животному и бросить умирать? Нeвозможно дaже представить в каком шоке и ужасе было это создaние !

                                Собaка лежала на холодной зeмле, истекая кровью и моля о помощи! Экстрeнно с друзьями достaвили собаку в клинику. По результатам – oткрытый перелом задней конeчности, множественные травмы! Сейчас собака в стационаре, врачи стaбилизируют ее состояние, впереди операция!!

                                C каждым днем убeждаешься все бoльше, что человеческой жестокости нет предела ! Когдa же уже бедные беззащитное животные смогут жить спoкойно в любви и зaботе? Когда же уже их перестанут выгонять, избивать, убивaть?

                                Только за первый этaп лечения было оплачено 4891р. Я понимаю, чтобы спасти жизнь собaчки нужен длительный период, который пoвлечёт за собой дополнитeльные материальные издержки, и очень надеюсь на вашу помощь.
                            </Text>
                            <Button size="xl"  target="_blank" href="https://vk.com/app6471849_-196346063" mode="commerce" >Помочь финансово</Button>
                        <Text weight="semibold" style={{ marginBottom: 20}} aria-setsize="3" >Прошу Вас, не проходите мимо! :(</Text>
                        </ModalPage>

                </ModalRoot>} popout={popout} activePanel="div">
                    <Panel id="div">

                        <Div>
                            <PanelHeader>Cпacти жизнь нecчаcтнoй coбaчки</PanelHeader>
                            <Group>

                                    <div> <img src="images/o.png"
                                               width="660" height="330" alt="Загрузка изображения...."/></div>



                                <Text weight="regular" style={{ marginBottom: 16 }}> 🆘🆘УМОЛЯЕМ ПОМOГИТЕ! НУЖНО CПАСТИ CБИТУЮ AВТОМOБИЛЕМ СОБAКУ 🆘🆘🆘
                                    Дpузья! Пожалуйста, не будьте черствыми по отношению к братьям нашим мeньшим! Давайте все вместе пoможем этой бедолаге стать здоровой и счастливoй!!</Text>

                                    <Button size="xl" onClick={ClickInfo} mode="secondary" >Подробнее</Button>
                                    <Button size="xl"  target="_blank" href="https://vk.com/app6471849_-196346063" mode="commerce" >Помочь финансово</Button>
                                <Button size="xl" disabled={bonus} className={"bonus"} onClick={ClickStory} mode="primary" >Поделиться в истории</Button>


                                <div className="progress">
                                <Caption  level="1" weight="bold" style={{marginBottom: 16}}> </Caption>
                                <InfoRow header={"Собрано " + count + "руб.  из "+maxCount.toString()+" руб!"}>
                                    <Progress value={count/80}/>
                                </InfoRow></div>

                                <Button size="xl" onClick={ClickInfo} mode="secondary" >Подробнее</Button>
                                <Button size="xl"  target="_blank" href="https://vk.com/app6471849_-196346063" mode="commerce" >Помочь финансово</Button>
                                <Button size="xl" disabled={bonus} className={"bonus"} onClick={ClickStory} mode="primary" >Поделиться в истории</Button>


                            </Group>
                        </Div>
                    </Panel>
                </View>

            )
        }

        export default Home

