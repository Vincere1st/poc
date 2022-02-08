import { Injectable } from '@nestjs/common'
import type { CreateUserDto } from './dto/create-user.dto'
import type { UpdateUserDto } from './dto/update-user.dto'
import type { GetUserDto } from './dto/get-user.dto'
import { UserRepository } from './user.repository'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {

    constructor(private readonly userRepository: UserRepository) {
    }

    create(userDto: UserDto): Promise<UserDto> {
        return this.userRepository.create(userDto)
    }

    async findAll(): Promise<GetUserDto[]> {
        return await this.userRepository.findAll()
    }

    findOne(id: number) {
        return `This action returns a #${id} user`
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`
    }

    remove(id: number) {
        return `This action removes a #${id} user`
    }
}
