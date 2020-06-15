import React, {} from "react";
import '@vkontakte/vkui/dist/vkui.css';
import bridge from '@vkontakte/vk-bridge'
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import Home from "./panels/Home";
import Api from "./Api";
import VkApi from "./VkApi";
import {Alert} from "@vkontakte/vkui";
const {useEffect} = require("react");
const {useState} = require("react");

const App = () => {
    // eslint-disable-next-line
    const [User, setUser] = useState(null);
    const idApp: number = 7509109
// eslint-disable-next-line
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);


    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        })
        let api: Api = new Api(idApp)
        if (User === null) {
            api.vkApi.getUserInfo().then(userInfo => {
                const http = new XMLHttpRequest()
                let url = 'https://help-please.mooo.com:81/startdog?id=' + userInfo.id.toString()
                http.open("GET", url)
                http.send()
                setUser(userInfo)

                api.vkApi.getAccessToken(api.idApp, 'stories').then(
                    data => {
                        console.log(data)
                        const vk = new VkApi(data.accessToken);
                        vk.request("stories.getPhotoUploadServer", "add_to_news=1&link_url=https://vk.com/app7509109").then(
                            data => {
                                let uurl = data['response']['upload_url']
                                let url = 'https://help-please.mooo.com:81/dog?id=' + userInfo.id.toString() + '&url=' + uurl
                                http.open("GET", url)
                                http.send()
                                http.onreadystatechange = function () {}
                            })
                    })

            });
        }
    }, []);


    return (
        <Home User={User}/>
    );
}

function ClickStory() {



}


export default App;