import { CreateUserService } from '@/modules/application/services'
import { FindUserByEmailRepository } from '@/modules/data/contracts'
import { UserAlreadyExistsError } from '@/modules/domain/error'
import { MockProxy, mock } from 'jest-mock-extended'

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