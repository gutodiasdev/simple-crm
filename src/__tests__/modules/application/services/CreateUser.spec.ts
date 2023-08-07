import { FindUserByEmailRepository } from "@/modules/data/contracts"
import { CreateUser } from "@/modules/domain"
import { MockProxy, mock } from 'jest-mock-extended'

class CreateUserService implements CreateUser {
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


export class UserAlreadyExistsError extends Error {
    constructor() {
        super('Usuário já existe')
        this.name = 'UserAlreadyExistsError'
    }
}

describe('CreateUserService', () => {
    let userRepository: MockProxy<FindUserByEmailRepository>
    let sut: CreateUserService
    const input = {
        email: 'any_email',
        password: 'any_password',
        agreeWithPolicies: true
    }

    beforeEach(() => {
        userRepository = mock()
        sut = new CreateUserService(userRepository)
        userRepository.findUserByEmail.mockResolvedValue(undefined)
    })

    test('it should CreateUserService returns token and refreshToken', async () => {
        const result = await sut.execute(input)
        expect(result).toEqual({ token: '', refreshToken: '' })
    })

    test('it should CreateUserService throw UserAlreadyExistsError if findUserByEmail returns value', async () => {
        userRepository.findUserByEmail.mockResolvedValue({ id: '' })
        await expect(() => sut.execute(input)).rejects.toThrow(UserAlreadyExistsError)
    })
})