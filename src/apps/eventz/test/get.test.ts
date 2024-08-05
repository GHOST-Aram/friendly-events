import { assert} from "../../../zero/testing";
import { app } from "./config/app";
import { describe, expect, test } from "@jest/globals";
import request from 'supertest'

describe('GET events Route', () =>{


    test('Responds with Validation Errors (status 400): Invalid reference Id', 
        async() =>{
            const response = await request(app).get('/events/64c9e4f2df7cc072af2acxx')
                
            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with Not Found(status 404): event does not exist.', 
        async() =>{
            const response = await request(app).get('/events/64c9e4f2df7cc072af2ac8a4')
            assert.respondsWithNotFound(response)
        }
    )

    test('Responds with paginated events array(status 200): Default lenght 10 ', 
        async() =>{
            const response = await request(app).get('/events')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 10)
        }
    )

    test('Responds with paginated array (Status 200): Length equals given limit.', 
        async() =>{
            const response = await request(app).get(
                '/events?page=1&limit=23')

            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 23)
        } 
    )

    test('Responds with paginated array (Status 200): Length equals given query params.', 
        async() =>{
            const response = await request(app).get(
                '/events?title=cool title&createdBy=64c9e4f2df7cc072af2ac9e4&limit=23')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 23)

            response.body.forEach((item: any) =>{
                expect(item.title).toBe('cool title')
                expect(item.createdBy).toBe('64c9e4f2df7cc072af2ac9e4')
            })
        } 
    )

    test('Responds with found resource (status 200): GET operation success.', 
        async() =>{
            const response = await request(app).get(
                '/events/64c9e4f2df7cc072af2ac9e4')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithFoundResource(response)
        }
    )
})