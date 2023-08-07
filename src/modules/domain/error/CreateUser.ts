export class CreateUserError extends Error {
    constructor(message?: string) {
        super(`Erro ao tentar criar um usuário`)
    }
}
