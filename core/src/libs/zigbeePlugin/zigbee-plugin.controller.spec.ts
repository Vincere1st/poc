import { Test, TestingModule } from '@nestjs/testing'
import { ZigbeePluginController } from './zigbee-plugin.controller'
import { ZigbeePluginService } from './zigbee-plugin.service'

describe('ZigbeePluginController', () => {
    let zigbeePluginController: ZigbeePluginController

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ZigbeePluginController],
            providers: [ZigbeePluginService],
        }).compile()

        zigbeePluginController = app.get<ZigbeePluginController>(ZigbeePluginController)
    })

    describe('root', () => {
        it('should return "Hello World!"', () => {
            // expect(zigbeePluginController.getHello()).toBe('Hello World!')
        })
    })
})
