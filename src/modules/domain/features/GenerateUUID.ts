export interface GenerateUUID {
    execute(): GenerateUUID.Ouput
}

export namespace GenerateUUID {
    export type Ouput = string
}