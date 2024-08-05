import { describe } from "@jest/globals";
import { queryString } from "../query-string";

describe("Query String class", () =>{
    
    test("Returns correct search document given query and matching searchable paths", () =>{
        const query:any = {name: 'Jane', height: 50, age: 20, fitness: 'fit'}
        const searchablePaths = ['name', 'height', 'age', 'fitness']

        const searchDoc:any = queryString.createSearchDocument(query, searchablePaths)

        searchablePaths.forEach(path =>{
            expect(searchDoc).toHaveProperty(path)
            expect(searchDoc[path]).toBe(query[path])
        })
    })

    test("REturns correct search document given a query containing  both matching and umatching "+
        "searchable paths", 
        () =>{
            const query:any = {
                name: 'Jane', height: 50, age: 20, fitness: 'fit', nationality: 'Ethiopian'
            }
            const searchablePaths = ['name', 'height', 'age', 'fitness']
    
            const searchDoc:any = queryString.createSearchDocument(query, searchablePaths)
    
            searchablePaths.forEach(path =>{
                expect(searchDoc).toHaveProperty(path)
                expect(searchDoc[path]).toBe(query[path])
            })

            expect(searchDoc).not.toHaveProperty('nationality')
        }
    )

    test("Returns an empty search document if query is undefined or empty", () =>{
        const query = {}

        const searchablePaths = ['name', 'height', 'age', 'fitness']
        const searchDoc:any = queryString.createSearchDocument(query, searchablePaths)

        expect(Object.keys(searchDoc).length).toEqual(0)
    })
})