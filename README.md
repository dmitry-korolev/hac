# Home Assistant configuration

## Most useful automations
Disclaimer: I am using Node-red for almost every automation at my house.
### Motion lights
I am using lights automations widely. At some point I came up with a pretty nice solution:

This is a node-red subflow with four properties: 
1. switch_id
1. sensor_id
1. timeour — timeout in minutes
1. condition_template — optional property. If set, will be checked before turning the switch on.

[See the code](https://flows.nodered.org/flow/22b6e96a2da78da87eda037b1a4f758c).


## Devices

| Device                                         | Type          | Units | Interface | Comment             |
| ---------------------------------------------- | ------------- | ----- | --------- | ------------------- |
| **Switches**                                   |               |       |           |                     |
| Aqara double key wired wall switch QBKG12LM    | Switch        | 6     | Zigbee    |                     |
| Aqara single key wired wall switch QBKG11LM    | Switch        | 7     | Zigbee    |                     |
| Mi power plug ZNCZ02LM                         | Switch        | 2     | Zigbee    |                     |
| **Sensors and buttons**                        |               |       |           |                     |
| Aqara single key wireless wall switch WXKG03LM | Button        | 3     | Zigbee    |                     |
| Mi wireless button WXKG01LM                    | Button        | 1     | Zigbee    |                     |
| Aqara motion sensor RTCGQ11LM                  | Sensor        | 7     | Zigbee    |                     |
| Mi door & window contact sensor MCCGQ01LM      | Sensor        | 5     | Zigbee    |                     |
| Aqara smart home cube MFKZQ01LM                | Sensor        | 2     | Zigbee    |                     |
| Tuya Temperature & humidity sensor TS0201      | Sensor        | 3     | Zigbee    |                     |
| **Lights**                                     |               |       |           |                     |
| Yeelight Lightstrip 2                          | Light         | 1     | WiFi      |                     |
| Yeelight Ceiling Lamp 650                      | Light         | 1     | WiFi      |                     |
| **Media devices**                              |               |       |           |                     |
| Yandex.Station                                 | Smart Speaker | 1     | WiFi      |                     |
| Yandex.Station Mini                            | Smart Speaker | 1     | WiFi      |                     |
| LG 55UM7450                                    | TV            | 1     | WiFi      |                     |
| PS4                                            | Home Console  | 1     | WiFi      |                     |
| IPad 4                                         | Tablet        | 1     | WiFi      | Used as a wallmount |
| **Other**                                      |               |       |           |                     |
| Xiaomi Roborock S1                             | Robot Vacuum  | 1     | WiFi      |                     |

## Automations

## Useful links
Железки для wallmount
* https://community.home-assistant.io/t/wallpanel-for-android-formerly-homedash/16217
* https://community.home-assistant.io/t/hadashboard-tablet-hardware-options/13355

Про термостат
* https://ivan.bessarabov.ru/blog/moes-smart-thermostat-custom-firmare-and-home-assistant
* https://www.inhomekit.ru/2020/05/15/lutchshiy-termostat-dlya-teplogo-pola/

Всякие карточки
* https://home-assistant-cards.bessarabov.com/
