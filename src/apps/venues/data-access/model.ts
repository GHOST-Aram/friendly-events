import { HydratedDocument, Model, Schema, model } from "mongoose"

export interface Venue{
    type: string
    name: string
    capacity: number
    address: {
        cityOrTown: string
        street: string
        block: {
            name: string,
            floor: number
        }
    }
    pictures?: {
        name: string
        data: Buffer
        contentType: string
    }[]
    description: string
    accessibilityFeatures: {
        stairCase: boolean,
        elevator: boolean,
        escallator: boolean,
        ramp: boolean
    }
    coordinates: {
        latitude: number
        longitude: number
    }
}

export type VenueModel = Model<Venue>

export const venueSchema = new Schema<Venue,VenueModel>({

    type: {
        type: String,
        maxlength: 100,
        required: true
    },

    name: { 
        type: String, 
        maxlength: 100,
        required: true 
    },

    capacity: { 
        type: Number, 
        required: true 
    },

    address: {
        cityOrTown: { 
            type: String,
            maxlength: 100,
            required: true 
        },
        street: { 
            type: String,
            maxlength: 100,
        },
        block: {
            name: String,
            floor: Number
        }
    },
    
    pictures: [
        { 
            name: String, 
            data: Buffer, 
            contentType: String 
        }
    ],
    
    description: { 
        type: String,
        minlength: 100,
        maxlength: 1000, 
    },

    accessibilityFeatures: {
        stairCase: {
            type: Boolean,
            default: false
        },
        elevator: {
            type: Boolean,
            default: false
        },
        escallator: {
            type: Boolean,
            default: false
        },
        ramp: {
            type: Boolean,
            default: false
        }
    },

    coordinates: { 
        latitude: Number, 
        longitude: Number 
    }
})

export type HydratedVenueDoc = HydratedDocument<Venue>

export const Venue = model<Venue, VenueModel>('Venue', venueSchema)