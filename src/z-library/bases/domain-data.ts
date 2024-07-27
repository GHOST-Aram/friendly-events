import { RequestData } from "../request/request-data"

export interface DomainData{
    createInputDocument :(reqData: RequestData) => any
}