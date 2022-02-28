import { Module } from '@nestjs/common'
import { ZigbeePluginController } from './zigbee-plugin.controller'
import { ZigbeePluginService } from './zigbee-plugin.service'

@Module({
    imports: [],
    controllers: [ZigbeePluginController],
    providers: [ZigbeePluginService]
})
export class ZigbeePluginModule {
}