import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices'

@Controller()
export class AppController {
}
