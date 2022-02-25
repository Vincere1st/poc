import {Controller, Get, Post, UseGuards, Request, Sse, MessageEvent} from '@nestjs/common'
import { AppService } from './app.service'
import { LocalAuthGuard } from './auth/guards/local-auth.guard'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { AuthService } from './auth/auth.service'
import {interval, map, Observable} from 'rxjs'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly authService: AuthService
    ) {}

    @Get('ping')
    pong(): string {
        return this.appService.pong()
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('auth/token/refresh')
    async refreshToken(@Request() req) {
        const test = req
        return this.authService.login(req.body);
    }


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.body;
    }
}
