import { Controller, Post } from '@nestjs/common'
import { ZigbeePluginService } from './zigbee-plugin.service'
import { Ctx, MqttContext, MessagePattern, Payload } from '@nestjs/microservices'

@Controller('zigbee2mqtt')
export class ZigbeePluginController {
    constructor(private readonly zigbeePluginService: ZigbeePluginService) {
    }

    @Post('/install')
    async clone(): Promise<string> {
        const response = await this.zigbeePluginService.buildContainerZigbee2Mqtt()
        return response
    }

    @MessagePattern('zigbee2mqtt/+')
    sumData(@Payload() payload: number[], @Ctx() context: MqttContext) {
        console.log(`---NEW Message ${context.getTopic()}---`)
        console.log('Payload: ', payload)
        console.log('Packet: ', context.getPacket())
        this.zigbeePluginService.sumDataService(payload)
    }
}
