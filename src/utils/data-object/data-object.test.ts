import { createObjectFromKeys } from "./data-object";
import { describe, test, expect } from "@jest/globals";


describe("Copy data into Object", () =>{
    test("Creates an object with all the provided paths with correct values", () =>{
        const pathsToCopy = ['name', 'age', 'height']
        const dataObj = {name: 'Erick Otieno', age: 45, height: '5.5ft'}

        const result:any = createObjectFromKeys(pathsToCopy, dataObj)

        pathsToCopy.forEach(path =>{ expect(result).toHaveProperty(path) })

        expect(result.name).toBe('Erick Otieno')
        expect(result.age).toEqual(45)
        expect(result.height).toBe('5.5ft')
        
    })

    test("Returns an object with undefined values for non-existing keys", () =>{
        const pathsToCopy = ['name', 'weight']
        const dataObj = {name: 'Erick Otieno', age: 45, height: '5.5ft'}
    
        const result: any = createObjectFromKeys(pathsToCopy, dataObj)
    
        pathsToCopy.forEach(path => { expect(result).toHaveProperty(path) })
    
        expect(result.name).toBe('Erick Otieno')
        expect(result.weight).toBeUndefined()
    })

    test("Returns an empty object when provided paths array is empty", () =>{
        const pathsToCopy: string[] = []
        const dataObj = {name: 'Erick Otieno', age: 45, height: '5.5ft'}
    
        const result: any = createObjectFromKeys(pathsToCopy, dataObj)
    
        expect(result).toEqual({})
    })

    test("Returns an object with undefined values when provided object is empty", () =>{
        const pathsToCopy = ['name', 'age']
        const dataObj: any = {}
    
        const result: any = createObjectFromKeys(pathsToCopy, dataObj)
    
        pathsToCopy.forEach(path => { expect(result).toHaveProperty(path) })
    
        expect(result.name).toBeUndefined()
        expect(result.age).toBeUndefined()
    })

    test("Returns an object with correct and undefined values for mixed keys", () =>{
        const pathsToCopy = ['name', 'age', 'weight']
        const dataObj = {name: 'Erick Otieno', age: 45, height: '5.5ft'}
    
        const result: any = createObjectFromKeys(pathsToCopy, dataObj)
    
        pathsToCopy.forEach(path => { expect(result).toHaveProperty(path) })
    
        expect(result.name).toBe('Erick Otieno')
        expect(result.age).toEqual(45)
        expect(result.weight).toBeUndefined()
    })

    test("Does not mutate the original object", () =>{
        const pathsToCopy = ['name', 'age']
        const dataObj = {name: 'Erick Otieno', age: 45, height: '5.5ft'}
    
        const result: any = createObjectFromKeys(pathsToCopy, dataObj)
    
        expect(result).not.toBe(dataObj)
        expect(dataObj).toEqual({name: 'Erick Otieno', age: 45, height: '5.5ft'})
    })    
})
