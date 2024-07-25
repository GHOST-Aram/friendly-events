import { Venue } from '../../data-access/model'

export const validData: Venue= {
    name: "Uhuru Park",
    city: "Nairobi",
    street: "34 North Road",
    description: "Lorem Ipsum",
    accessibility: "Accessible by ramp",
    coordinates: {
        latitude: -36.3,
        longitude: -12.5
    }
}

export const invalidData = {}
