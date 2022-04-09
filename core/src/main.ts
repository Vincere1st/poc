import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import microserviceLoader from "./plugin/microserviceLoader";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: false })
    app.enableCors({
        origin: 'https://poc.test',
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS'
    })

    const microservices = microserviceLoader.getMicroservices()
    for (const microservice of microservices) {
        app.connectMicroservice(microservice)
    }

    await app.startAllMicroservices()

    app.useGlobalPipes(new ValidationPipe())
    await app.listen(3000)

}

bootstrap()
