import { assert} from "../../../z-library/testing/response-assertion";
import { app } from "./config/app";
import { describe, test } from "@jest/globals";
import request from "supertest"

describe.only('DELETE users not Allowed', () =>{
    test('Rejects delete-all request: (status 405): Method not allowed.', 
        async() =>{
            const response = await request(app).delete('/users')
            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Rejects delete by ID request: (status 405): Method not allowed.', 
        async() =>{
            const response = await request(app).delete(
                '/users/64c9e4f2df7cc072af2ac8a4')

            assert.respondsWithMethodNotAllowed(response)
        }
    )

})