import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: false })
    app.enableCors({
        origin: 'http://{{core.domain.value}}',
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS'
    })
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(3000)

}

bootstrap()
