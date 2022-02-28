import {Controller, Post, Request, Sse} from '@nestjs/common'
import {ZigbeePluginService} from './zigbee-plugin.service'
import {Ctx, MessagePattern, MqttContext, Payload} from '@nestjs/microservices'

@Controller('zigbee2mqtt')
export class ZigbeePluginController {
    constructor(private readonly zigbeePluginService: ZigbeePluginService) {
    }

    private id = 0

    @Post('/install')
    async clone(): Promise<string> {
        const response = await this.zigbeePluginService.buildContainerZigbee2Mqtt()
        return response
    }

    @Post('test')
    async test(@Request() req) {
        console.log(req)
        this.zigbeePluginService.constructSubject(req.body);
    }


    @MessagePattern('zigbee2mqtt/+')
    getData(@Payload() payload: any, @Ctx() context: MqttContext) {
        console.log(`---NEW Message ${context.getTopic()}---`)
        console.log('Payload: ', payload)
        console.log('Packet: ', context.getPacket())
        this.zigbeePluginService.constructSubject({payload, context});
    }


    @Sse('/zigbee')
    sse(): any {
        return this.zigbeePluginService.subject.asObservable()
    }
}
