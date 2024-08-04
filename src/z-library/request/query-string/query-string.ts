import {ParsedQs} from 'qs'

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
}

const queryString = new QueryString()

export { queryString }