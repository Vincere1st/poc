import { Module } from '@nestjs/common'
import { ZigbeePluginController } from './zigbee-plugin.controller'
import { ZigbeePluginService } from './zigbee-plugin.service'
import { ClientsModule, Transport } from '@nestjs/microservices'


@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'TEST_CLIENT',
                transport: Transport.MQTT,
                options: {
                    subscribeOptions: { qos: 0 },
                    url: 'mqtt://mqtt.poc.test:16384'
                }
            },
        ])
    ],
    controllers: [ZigbeePluginController],
    providers: [ZigbeePluginService]
})
export class ZigbeePluginModule {
}