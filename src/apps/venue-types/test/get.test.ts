import { assert} from "../../../z-library/testing/response-assertion";
import { app } from "./config/app";
import { describe, test } from "@jest/globals";
import request from 'supertest'

describe('GET venue-types Route', () =>{

    test('Responds with Not Found(status 404): event does not exist.', 
        async() =>{
            const response = await request(app).get(
                '/venue-types/64c9e4f2df7cc072af2ac8a4')
            assert.respondsWithNotFound(response)
        }
    )

    test('Responds with paginated venue-types array(status 200): Default lenght 10 ', 
        async() =>{
            const response = await request(app).get('/venue-types')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 10)
        }
    )

    test('Responds with paginated array (Status 200): Length equals given limit.', 
        async() =>{
            const response = await request(app).get(
                '/venue-types?page=1&limit=23')

            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 23)
        } 
    )

    test('Responds with paginated array (Status 200): Search by specific creatorId id', 
        async() =>{
            const response = await request(app).get(
                '/venue-types/creators/64c9e4f2df7cc072af2ac9e4?page=1&limit=23')

            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 23)
        } 
    )

    test('Responds with found resource (status 200): GET operation success.', 
        async() =>{
            const response = await request(app).get(
                '/venue-types/64c9e4f2df7cc072af2ac9e4')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithFoundResource(response)
        }
    )
})