import { RequestData } from "../request"

export interface DomainData{
    aggregateInputDocument :(reqData: RequestData) => any
    createUniqueSearchDocument: (inputData: any) => any
}
