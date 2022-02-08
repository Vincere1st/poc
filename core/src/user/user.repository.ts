import { Injectable, UseInterceptors } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './entities/user.entity'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { GetUserDto } from './dto/get-user.dto'
import { UserDto } from './dto/user.dto'
import MongooseClassSerializerInterceptor from '../Interceptors/mongooseClassSerializerInterceptor'

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDto>) {
    }

    @UseInterceptors(MongooseClassSerializerInterceptor(CreateUserDto))
    create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
        const newUser = new this.userModel(createUserDto)
        return newUser.save()
    }

    async findAll(): Promise<GetUserDto[]> {
        return this.userModel.find().exec()
    }
}