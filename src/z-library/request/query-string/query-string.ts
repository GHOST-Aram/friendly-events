import {ParsedQs} from 'qs'
import { Paginator } from '../../http'

class QueryString{
    public createSearchDocument = (query:ParsedQs, searchablePaths: string[]): {} =>{
        const keys = this.removeUnSearchablePaths(query, searchablePaths)
        const searchDoc = this.createObject(keys, query)
    
        return searchDoc
    }
    
    private removeUnSearchablePaths = (query: ParsedQs, searchablePaths: string[]):string[] =>{
    
        return Object.keys(query).filter(key => (
            searchablePaths.includes(key) && query[key] 
        ))
    }
    
    private createObject = (keys:string[], query: ParsedQs) =>{
        let searchDoc = {}
        keys.forEach(key =>{ searchDoc = { ...searchDoc, [key]: query[key] } })
    
        return searchDoc
    }

    public getPaginationParams = (query: ParsedQs): Paginator =>{
        const paginator = {
            skipDocs: 0,
            limit: 10
        }

        try {
            const page = Math.abs(Number(query.page)) || 1
            const limit = Math.abs(Number(query.limit))

            if(page && limit){
                paginator.skipDocs = (page - 1) * limit
                paginator.limit = limit
            }
        } catch (error) {
            console.log(error)
        }   

        return paginator
    }
}

const queryString = new QueryString()

export { queryString }