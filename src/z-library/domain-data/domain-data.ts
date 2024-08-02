import { RequestData } from "../request"

export interface DomainData{
    aggregateInputDocument :(reqData: RequestData) => Object
}
