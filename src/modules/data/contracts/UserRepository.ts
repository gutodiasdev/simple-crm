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