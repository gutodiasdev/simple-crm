import { CreateUserService } from '@/modules/application/services'
import { FindUserByEmailRepository, SaveUserRepository } from '@/modules/data/contracts'
import { CreateUserError, UserAlreadyExistsError } from '@/modules/domain/error'
import { GenerateUUID } from '@/modules/domain/features'
import { MockProxy, mock } from 'jest-mock-extended'

describe('CreateUserService', () => {
    let userRepository: MockProxy<FindUserByEmailRepository & SaveUserRepository>
    let generateUUIDService: MockProxy<GenerateUUID>
    let sut: CreateUserService
    const input = {
        email: 'any_email',
        password: 'any_password',
        agreeWithPolicies: true
    }

    beforeEach(() => {
        userRepository = mock()
        generateUUIDService = mock()
        sut = new CreateUserService(userRepository, generateUUIDService)
        userRepository.findUserByEmail.mockResolvedValue(undefined)
        generateUUIDService.execute.mockReturnValue('any_id')
    })

    test('it should CreateUserService returns token and refreshToken', async () => {
        const result = await sut.execute(input)
        expect(result).toEqual({ token: '', refreshToken: '' })
    })

    test('it should CreateUserService throw UserAlreadyExistsError if findUserByEmail returns value', async () => {
        userRepository.findUserByEmail.mockResolvedValue({ id: '' })
        await expect(() => sut.execute(input)).rejects.toThrow(UserAlreadyExistsError)
    })
    
    test('it should saveUser method is called with correct params', async () => {
        await sut.execute(input)
        expect(userRepository.saveUser).toHaveBeenCalledWith({
            id: 'any_id',
            email: 'any_email',
            password: 'any_password',
            agreeWithPolicies: true
        })
    })
     
    test('it should throw CreateUserError if CreateUserService fails to create new user', async () => {
        userRepository.saveUser.mockRejectedValueOnce({})
        await expect(() => sut.execute(input)).rejects.toThrow(CreateUserError)
    })
})