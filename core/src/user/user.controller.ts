import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    HttpStatus,
    UseInterceptors,
    ClassSerializerInterceptor
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { GetUserDto } from './dto/get-user.dto'
import MongooseClassSerializerInterceptor from '../Interceptors/mongooseClassSerializerInterceptor'
import { UserDto } from './dto/user.dto'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @UseInterceptors(MongooseClassSerializerInterceptor(CreateUserDto))
    @Post()
    async create(response, @Body() createUser: CreateUserDto) {
        return await this.userService.create(createUser)
    }

    @UseInterceptors(MongooseClassSerializerInterceptor(GetUserDto))
    @Get()
    findAll(): Promise<GetUserDto[]> {
        return this.userService.findAll()
    }

    @UseInterceptors(MongooseClassSerializerInterceptor(GetUserDto))
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id)
    }

    @UseInterceptors(MongooseClassSerializerInterceptor(UpdateUserDto))
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto)
    }

    @UseInterceptors(MongooseClassSerializerInterceptor(UserDto))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id)
    }
}
