import { assert} from "../../../z-library/testing";
import { app } from "./config/app";
import { describe, test } from "@jest/globals";
import request from "supertest"
import * as rawData from "./mocks/raw-data";

describe('PUT categories route', () =>{
    
    test('Rejects update-all requests ( status 405): Method not Allowed.', 
        async() =>{
            const response = await request(app).put('/categories').send(rawData.validData)

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with Validation Errors (status 400): Invalid reference Id', 
        async() =>{
            const response = await request(app).put('/categories/64c9e4f2df7cc072af2acxx')
                .send(rawData.validData)
                
            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with validation errors (status 400): Invalid input.', 
        async() =>{
            const response = await request(app).put('/categories/64c9e4f2df7cc072af2ac9e4')
                .send(rawData.invalidData)

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )  

    test('Responds with created resource location URI(status 201): New user created.', 
        async() =>{
            const response = await request(app).put('/categories/64c9e4f2df7cc072af2ac8a4')
                .send(rawData.validData)

            assert.respondsWithCreatedResource(response)
        }
    )

    test('Responds with updated resource location URI (status 200): Update success.', 
        async() =>{
            const response = await request(app).put('/categories/64c9e4f2df7cc072af2ac9e4')
                .send(rawData.validData)
            assert.respondsWithSuccess(response)
            assert.respondsWithUpdatedResource(response)
        }
    )
})