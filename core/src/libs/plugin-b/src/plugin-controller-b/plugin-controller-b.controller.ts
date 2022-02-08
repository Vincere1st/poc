import { Controller, Get } from '@nestjs/common';

@Controller('plugin-controller-b')
export class PluginControllerBController {
    @Get()
    test() {
        return 'workspluginB';
    }
}
