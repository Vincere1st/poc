import {Controller, Get, Post, Sse, MessageEvent, UseInterceptors} from '@nestjs/common'
import {ZigbeePluginService} from './zigbee-plugin.service'
import {Ctx, MqttContext, MessagePattern, Payload} from '@nestjs/microservices'
import {interval, map, Observable, Subject, tap} from 'rxjs'

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
    getData(@Payload() payload: any, @Ctx() context: MqttContext) {
        console.log(`---NEW Message ${context.getTopic()}---`)
        // console.log('Payload: ', payload)
        // console.log('Packet: ', context.getPacket())
        this.zigbeePluginService.getDataService(payload)
        // this.zigbeePluginService.setObservable(payload)
    }


    @Sse('/zigbee')
    sse(): any {
        console.log('test')
        return this.zigbeePluginService.subject.asObservable()
    }
}
