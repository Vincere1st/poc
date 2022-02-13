import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './user/entities/user.entity'
import { UserService } from './user/user.service'
import { UserController } from './user/user.controller'
import { UserRepository } from './user/user.repository'
import { PluginModule } from './plugin/plugin.module'

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://root:password@poc.test:16317'),
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }]), PluginModule.registerPluginsAsync(),
    ],
    controllers: [AppController, UserController],
    providers: [AppService, UserService, UserRepository]
})

export class AppModule {
}
