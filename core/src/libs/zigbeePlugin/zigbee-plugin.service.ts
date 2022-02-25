import {Inject, Injectable, OnModuleInit} from '@nestjs/common'
import {ClientProxy, MicroserviceOptions, MqttRecordBuilder, Transport} from '@nestjs/microservices'
import {NestFactory} from '@nestjs/core'
import {AppModule} from '../../app.module'
import {map, Observable, Subject} from "rxjs";
import {ZigbeePluginController} from "@domoPlugins/zigbeePlugin/zigbee-plugin.controller";

// const Docker = require('dockerode')

@Injectable()
export class ZigbeePluginService implements OnModuleInit {
    onModuleInit() {
        this.main()
    }

    constructor(
        @Inject('TEST_CLIENT') private client: ClientProxy,
    ) {
        client.connect()
    }

    public subject = new Subject()
    private payload
    private zigbeePluginController: ZigbeePluginController

    getDataService(payload: number []) {
        const record = new MqttRecordBuilder(`${payload}`)
            .setQoS(2)
            .build()
        this.client.send('zigbee2mqtt-output', record).subscribe(res => {
            console.log('response output: <', res, '>')
        })
        this.subject.next({ data: { payload } })
    }

    setObservable(payload) {
        this.subject.subscribe(x=> {
            console.log({test: x})
        })
    }

    async main() {
        const app = await NestFactory.create(AppModule)
        const microservice = app.connectMicroservice({
            transport: Transport.MQTT,
            options: {
                subscribeOptions: {qos: 2},
                url: 'mqtt://mqtt.poc.test:16384',
            }
        })

        await app.startAllMicroservices()
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
