import { assert} from "../../../zero/testing";
import { app } from "./config/app";
import { describe, test } from "@jest/globals";
import request from "supertest"
import * as data from "./mocks/raw-data";


describe('PATCH categories route', () =>{

    test('Rejects patch-all request (status 405): Method not allowed.', 
        async() =>{
            const response = await request(app).patch('/categories').send(data.validData)

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with Validation Errors (status 400): Invalid reference Id', 
        async() =>{
            const response = await request(app).patch('/categories/64c9e4f2df7cc072af2acxx')
                .send(data.validData)

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with validation errors (status 400): Invalid input', 
        async() =>{
            const response = await request(app).patch('/categories/64c9e4f2df7cc072af2ac9e4')
                .send(data.invalidData)

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )  

    test('Responds with Not Found(404): event does not exist', 
        async() =>{
            const response = await request(app).patch('/categories/64c9e4f2df7cc072af2ac8a4')
                .send(data.validData)

            assert.respondsWithNotFound(response)   
        }
    )

    test('Responds with modified resource and location URI(status 200): '+
        'PATCH operation success.', 
        async() =>{
            const response = await request(app).patch('/categories/64c9e4f2df7cc072af2ac9e4')
                .send(data.validData)

            assert.respondsWithSuccess(response)
            assert.respondsWithModifedResource(response)
        }
    )
})