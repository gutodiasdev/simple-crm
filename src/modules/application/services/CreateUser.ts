import { FindUserByEmailRepository } from '@/modules/data/contracts'
import { UserAlreadyExistsError } from '@/modules/domain/error'
import { CreateUser } from '@/modules/domain/features'

export class CreateUserService implements CreateUser {
    constructor(private readonly userRepository: FindUserByEmailRepository) {}

    async execute(input: CreateUser.Input): Promise<CreateUser.Ouput> {
        const user = await this.userRepository.findUserByEmail({ email: input.email })
        if (user) throw new UserAlreadyExistsError()
        return {
            token: '',
            refreshToken: ''
        }
    }
}
