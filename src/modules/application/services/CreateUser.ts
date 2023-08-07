import { UserAlreadyExistsError } from '@/__tests__/modules/application/services/CreateUser.spec'
import { FindUserByEmailRepository } from '@/modules/data/contracts'
import { CreateUser } from '@/modules/domain'

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
