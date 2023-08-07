export interface FindUserByEmailRepository {
    findUserByEmail(input: FindUserByEmailRepository.Input): Promise<FindUserByEmailRepository.Output>
}

export namespace FindUserByEmailRepository {
    export type Input = {
        email: string
    }
    export type Output = {
        id: string
    } | undefined
}

export interface SaveUserRepository {
    saveUser(input: SaveUserRepository.Input): Promise<SaveUserRepository.Ouput>
}

export namespace SaveUserRepository {
    export type Input = {
        id: string
        email: string
        password: string
        agreeWithPolicies: boolean
    }
    export type Ouput = void
}