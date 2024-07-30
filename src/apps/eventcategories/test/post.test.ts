import { assert} from "../../../z-library/testing";
import { describe, test } from '@jest/globals'
import request from 'supertest'
import {app} from './config/app'
import * as data from './mocks/raw-data'


describe('POST categories', () =>{

    test('Rejects request with client defined Id (status 405): Method not allowed. ', 
        async() =>{
            const response = await request(app).post('/categories/64c9e4f2df7cc072af2ac9e4')
            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with validation errors (status 400): Invalid input.', 
        async() =>{
            const response = await request(app).post('/categories').send(data.invalidData)

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)

        }
    )

    test('Responds with created resource (status 201): Operation Success.', 
        async() =>{
            const response = await request(app).post('/categories').send(data.validData)
            assert.respondsWithCreatedResource(response)
        }
    )  
})