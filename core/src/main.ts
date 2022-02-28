import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {ValidationPipe} from '@nestjs/common'
import microserviceLoader from "./plugin/microserviceLoader";
import {Subject} from "rxjs";

async function bootstrap() {
    const microServiceObservable$ = new Subject()
    const app = await NestFactory.create(AppModule, {cors: false})
    app.enableCors({
        origin: 'http://poc.test',
        // credentials: true,
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
