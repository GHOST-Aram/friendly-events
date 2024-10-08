import { HydratedDocument, Model, ObjectId, Schema, model } from "mongoose"

export interface Venue{
    type: string
    name: string
    capacity: number
    bookingTerms: {
        fee: number
        timeSpan: string
    }
    availabilityStatus: string
    createdBy: ObjectId
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

const searchablePaths = [
    'type', 'name', 'createdBy', 'capacity', 'availabilityStatus',

    'address.cityOrTown', 'address.street','address.block.name', 'address.block.floor', 

    'accessibilityFeatures.stairCase', 'accessibilityFeatures.elevator', 
    'accessibilityFeatures.ramp', 'accessibilityFeatures.escallator', 

    `bookingTerms.fee`, `bookingTerms.timeSpan`,
]
const uniqueObjectkeys = ['type', 'name', 'capacity', 'address']

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

    bookingTerms: {
        fee: { type: Number, required: true },
        timeSpan: { 
            type: String,
            enum: ['hour', 'day', 'week', 'month'], 
            required: true
        },
    },

    availabilityStatus: {
        type: String,
        enum: ['available', 'booked', 'inactive'],
        required: true
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
            floor: {
                type:Number,
                required: function(){
                    return Boolean(this.address.block.name)
                }
            }
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
        latitude: { type: Number, required: true }, 
        longitude: { type: Number, required: true } 
    }
})

export type HydratedVenueDoc = HydratedDocument<Venue>

export const Venue = model<Venue, VenueModel>('Venue', venueSchema)

export { searchablePaths, uniqueObjectkeys }