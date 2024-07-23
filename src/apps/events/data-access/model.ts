import { HydratedDocument, Model, Schema, model, ObjectId } from "mongoose"

export interface Event{
    category: ObjectId
    venue: ObjectId
    title: string
    graphic?: {
        name: string,
        data: Buffer,
        contentType: string
    }
    city: string
    dateAndTime: string
    duration: string
    ageLimit: {
        min: number,
        max: number
    }
    availableTickets: number
    ticketPrice: number
}

export type EventModel = Model<Event>

const eventSchema = new Schema<Event, EventModel>({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'EventCategory',
        required: true
    },
    venue: {
        type: Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },

    title: String,
    graphic: {
        name: String,
        data: Buffer,
        contentType: String
    },
    city: {
        type: String,
        required: true
    },
    dateAndTime: {
        type: String,
        required: true
    },
    duration: {
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
    }
})

export type HydratedEventDoc = HydratedDocument<Event>

export const Event = model<Event, EventModel>('Event', eventSchema)

