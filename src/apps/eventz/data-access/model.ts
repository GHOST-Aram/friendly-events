import { HydratedDocument, Model, ObjectId, Schema, model } from "mongoose"

export interface Event{
    category: string
    venue: string
    title: string
    createdBy: ObjectId,
    graphic?: {
        name: string,
        data: Buffer,
        contentType: string
    }
    city: string
    date: string
    time: {
        start: string
        end?: string
        zone: string
    }
    duration: string
    ageLimit: {
        min: number,
        max: number
    }
    availableTickets: number
    ticketPrice: number
}

const searchablePaths = ['category', 'venue', 'title', 'createdBy', 'city' ]
const uniqueObjectkeys = ['venue', 'title', 'date', 'time', 'city']

export type EventModel = Model<Event>

export const eventSchema = new Schema<Event, EventModel>({
    category: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },

    title: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    graphic: {
        name: String,
        data: Buffer,
        contentType: String
    },
    city: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        start: {
            type: String,
            required: true
        },
        end:  {
            type: String,
        },
        zone: {
            type: String,
            required: true
        }
    },
    duration:{
        type: String,
        required: true
    },
    ageLimit: {
        min: {
            type: Number,
            required: true
        },
        max: Number,
    },
    availableTickets: {
        type: Number,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    }
})

export type HydratedEventDoc = HydratedDocument<Event>

export const Event = model<Event, EventModel>('Event', eventSchema)

export { searchablePaths, uniqueObjectkeys }

