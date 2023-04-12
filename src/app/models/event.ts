import { Gin } from "./Gin";

export interface tastingEvent {
    name: string,
    gins: Gin[],
    date: Date,
    code: number,
    id?: string
}