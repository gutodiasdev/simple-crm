import { CreateUser } from "@/modules/domain"

class CreateUserService implements CreateUser {
    async execute(input: CreateUser.Input): Promise<CreateUser.Ouput> {
        return {
            token: '',
            refreshToken: ''
        }
    }
}

describe('CreateUserService', () => {
    let sut: CreateUserService
    const input = {
        email: 'any_email',
        password: 'any_password',
        agreeWithPolicies: true
    }

    beforeEach(() => {
        sut = new CreateUserService
    })

    test('it should CreateUserService returns token and refreshToken', async () => {
        const result = await sut.execute(input)
        expect(result).toEqual({ token: '', refreshToken: '' })
    })
})