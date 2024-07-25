import { HydratedDocument, Model, Schema, model } from "mongoose"

export interface Venue{
    name: string
    city: string
    street: string
    picture: {
        name: string
        data: Buffer
        contentType: string
    }
    description: string
    accessibility: string
    coordinates: {
        latitude: number
        longitude: number
    }
}

export type VenueModel = Model<Venue>

export const venueSchema = new Schema<Venue,VenueModel>({

    name: { 
        type: String, 
        maxlength: 100,
        required: true 
    },
    city: { 
        type: String,
        maxlength: 100,
        required: true 
    },
    street: { 
        type: String,
        maxlength: 100,
    },
    picture: { 
        name: String, 
        data: Buffer, 
        contentType: String 
    },
    description: { 
        type: String,
        minlength: 100,
        maxlength: 1000, 
    },
    accessibility: { 
        type: String,
        maxlength: 100,
    },
    coordinates: { 
        latitude: Number, 
        longitude: Number 
    }
})

export type HydratedVenueDoc = HydratedDocument<Venue>

export const Venue = model<Venue, VenueModel>('Venue', venueSchema)