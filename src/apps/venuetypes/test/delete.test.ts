import { assert} from "../../../zero/testing";
import { app } from "./config/app";
import { describe, test } from "@jest/globals";
import request from "supertest"

describe('DELETE venue-types route', () =>{
    test('Rejects delete-all request: (status 405): Method not allowed.', 
        async() =>{
            const response = await request(app).delete('/venue-types')
            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with Validation Errors (status 400): Invalid reference Id', 
        async() =>{
            const response = await request(app).delete('/venue-types/64c9e4f2df7cc072af2acxx')

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with Not Found (status 404): event does not exist.', 
        async() =>{
            const response = await request(app).delete('/venue-types/64c9e4f2df7cc072af2ac8a4')

        assert.respondsWithNotFound(response)
        }
    )

    test('Responds with deleted resource Id (status 200): Delete Operation success.', 
        async() =>{
            const response = await request(app).delete('/venue-types/64c9e4f2df7cc072af2ac9e4')

            assert.respondsWithSuccess(response)
            assert.respondsWithDeletedResource(response)
        }
    )
})