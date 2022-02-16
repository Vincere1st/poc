import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { exec } from 'child_process'
import simpleGit from 'simple-git'
import { ClientProxy, MicroserviceOptions, MqttRecordBuilder, Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { useFactory } from '../../../../zigbee-service'
import { AppModule } from '../../app.module'

// const Docker = require('dockerode')

@Injectable()
export class ZigbeePluginService implements OnModuleInit {
    onModuleInit() {
        this.main()
    }

    constructor(
        @Inject('TEST_CLIENT') private client: ClientProxy)
    {
        client.connect()
    }

    sumDataService(payload: number []) {
        const response = payload
        const record = new MqttRecordBuilder(`${response}`)
            .setQoS(2)
            .build()
        this.client.send('zigbee2mqtt-output', record).subscribe(res => {
            console.log('response output: <', res, '>')
        })
    }

    async main() {
        const app = await NestFactory.create(AppModule)
        const microservice = app.connectMicroservice({
            transport: Transport.MQTT,
            options: {
                subscribeOptions: { qos: 2 },
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
