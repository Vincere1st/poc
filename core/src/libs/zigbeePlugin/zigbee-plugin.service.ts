import {Injectable} from '@nestjs/common'
import {MicroserviceOptions, Transport} from '@nestjs/microservices'
import {Subject} from "rxjs";
import microserviceLoader from "../../plugin/microserviceLoader";

// const Docker = require('dockerode')

@Injectable()
export class ZigbeePluginService {
    constructor() {
        this.addMicroserviceMqtt()
    }

    public subject = new Subject()

    addMicroserviceMqtt() {
        const mqttmicroservice: MicroserviceOptions = {
            transport: Transport.MQTT,
            options: {
                subscribeOptions: {qos: 2},
                url: 'mqtt://mqtt.poc.test:16384'
            }
        }
        microserviceLoader.addMicroservice(mqttmicroservice)
    }

    // getDataService(payload: number []) {
    //     const record = new MqttRecordBuilder(`${payload}`)
    //         .setQoS(2)
    //         .build()
    //     this.client.send('zigbee2mqtt-output', record).subscribe(res => {
    //         console.log('response output: <', res, '>')
    //     })
    //     this.subject.next({ data: { payload } })
    // }


    constructSubject(payload) {
        this.subject.next({data: {payload}})
        console.log(this.subject)
    }

    async buildContainerZigbee2Mqtt(): Promise<string> {
        try {
// TODO up les containers avec le fichier docker-compose et changer le messagen, voir si on peut récupérer les états lors du pull et du up
            return 'Téléchargement est installation des dépendances de Zigbee2MQTT effectué'
        } catch (e) {
            console.log(e)
        }
    }
}
