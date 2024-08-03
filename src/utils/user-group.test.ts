import { describe, expect } from "@jest/globals";
import { userGroup } from "./user-group";

const user0 = { userGroup: 'superuser' }
const user1 = { userGroup: 'host' }
const user2 = { userGroup: 'attendee'}
const user3 = { userGroup: 'organizer'}

describe("User Group is admin", () =>{
    test("Returns true if user is 'superuser'", () =>{

        expect(userGroup.isAdmin(user0)).toEqual(true)
    })

    test(" Returns false if user group is not superuser", () =>{
        expect(userGroup.isAdmin(user1)).toBe(false)
        expect(userGroup.isAdmin(user2)).toBe(false)
        expect(userGroup.isAdmin(user3)).toBe(false)
    })
})

describe("User Group is host", () =>{
    test("Returns true if user is 'host'", () =>{

        expect(userGroup.isHost(user1)).toEqual(true)
    })

    test(" Returns false if user group is not 'host'", () =>{
        expect(userGroup.isHost(user0)).toBe(false)
        expect(userGroup.isHost(user2)).toBe(false)
        expect(userGroup.isHost(user3)).toBe(false)
    })
})

describe("User Group is attendee", () =>{
    test("Returns true if user is 'attendee'", () =>{

        expect(userGroup.isAttendee(user2)).toEqual(true)
    })

    test(" Returns false if user group is not 'attendee'", () =>{
        expect(userGroup.isAttendee(user0)).toBe(false)
        expect(userGroup.isAttendee(user1)).toBe(false)
        expect(userGroup.isAttendee(user3)).toBe(false)
    })
})

describe("User Group is organizer", () =>{
    test("Returns true if user is 'organizer'", () =>{

        expect(userGroup.isOrganizer(user3)).toEqual(true)
    })

    test(" Returns false if user group is not 'organizer'", () =>{
        expect(userGroup.isOrganizer(user0)).toBe(false)
        expect(userGroup.isOrganizer(user1)).toBe(false)
        expect(userGroup.isOrganizer(user2)).toBe(false)
    })
})