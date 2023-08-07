import { FindUserByEmailRepository, SaveUserRepository } from '@/modules/data/contracts'
import { CreateUserError, UserAlreadyExistsError } from '@/modules/domain/error'
import { CreateUser, GenerateUUID } from '@/modules/domain/features'

export class CreateUserService implements CreateUser {
    constructor(
        private readonly userRepository: FindUserByEmailRepository & SaveUserRepository,
        private readonly UUIDGeneratorService: GenerateUUID
    ) { }

    async execute(input: CreateUser.Input): Promise<CreateUser.Ouput> {
        const user = await this.userRepository.findUserByEmail({ email: input.email })
        if (user) throw new UserAlreadyExistsError()
        const id = this.UUIDGeneratorService.execute()
        try {
            await this.userRepository.saveUser({...input, id: id})
            return {
                token: '',
                refreshToken: ''
            }
        } catch (error: any) {
            throw new CreateUserError(error.stack)
        }
    }
}
