import { assert} from "../../../zero/testing";
import { app } from "./config/app";
import { describe, test } from "@jest/globals";
import request from 'supertest'

describe('GET venues Route', () =>{

    test('Responds with Validation Errors (status 400): Invalid reference Id', 
        async() =>{
            const response = await request(app).get('/venues/64c9e4f2df7cc072af2acxx')

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with Not Found(status 404): event does not exist.', 
        async() =>{
            const response = await request(app).get(
                '/venues/64c9e4f2df7cc072af2ac8a4')
            assert.respondsWithNotFound(response)
        }
    )

    test('Responds with paginated venues array(status 200): Default lenght 10 ', 
        async() =>{
            const response = await request(app).get('/venues')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 10)
        }
    )

    test('Responds with paginated array (Status 200): Length equals given limit.', 
        async() =>{
            const response = await request(app).get(
                '/venues?page=1&limit=23')

            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 23)
        } 
    )

    test('Search by Query params: Result contains documents with properties that match the search values.', 
        async() =>{
            const response = await request(app).get(
                '/venues?name=cool name&type=stadium&createdBy=64c9e4f2df7cc072af2ac9e4&limit=23')

            response.body.forEach((item: any) =>{
                expect(item.name).toBe('cool name')
                expect(item.type).toBe('stadium')
                expect(item.createdBy).toBe('64c9e4f2df7cc072af2ac9e4')
            })

            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 23)
        } 
    )

    test('Nested search params: Responds with correct documents if search query contains nested properties.', 
        async() =>{
            const response = await request(app).get(
                '/venues?bookingTerms.fee=5000&address.cityOrTown=New York')

            response.body.forEach((item: any) =>{
                expect(item.bookingTerms.fee).toBe(5000)
                expect(item.address.cityOrTown).toBe('New York')
            })

            assert.respondsWithSuccess(response)
        } 
    )

    test('Responds with found resource (status 200): GET operation success.', 
        async() =>{
            const response = await request(app).get(
                '/venues/64c9e4f2df7cc072af2ac9e4')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithFoundResource(response)
        }
    )
})