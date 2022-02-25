import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './users/entities/users.entity'
import { UsersService } from './users/users.service'
import { UsersRepository } from './users/users.repository'
import { PluginModule } from './plugin/plugin.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
@Module({
    imports: [
        MongooseModule.forRoot('mongodb://root:password@poc.test:16317'),
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }]),
        PluginModule.registerPluginsAsync(),
        AuthModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService, UsersService, UsersRepository]
})

export class AppModule {
}
