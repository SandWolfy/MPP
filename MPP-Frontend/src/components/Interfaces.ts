export interface IMagicItem {
    id: number
    name: string
    location: string
    usableClass: string
    price: number
}

export interface IBuff {
    bid: number
    mid: number
    name: string
    intensity: number
}

export interface IUser {
    id: number
    username: string
    password: string
    role: number
    description: string
}
