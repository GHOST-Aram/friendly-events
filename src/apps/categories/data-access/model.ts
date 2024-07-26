import { HydratedDocument, Model, Schema, model } from "mongoose"

export interface EventCategory{
    name: string
    description: string
    graphic: {
        name: string,
        data: Buffer
        contentType: string
    }
}

export type CategoryModel = Model<EventCategory>

export const categorySchema = new Schema<EventCategory,CategoryModel>({

    name: { 
        type: String, 
        maxlength: 100,
        required: true 
    },

    description: {
        type: String,
        minlength: 100,
        maxlength: 1000,
    },

    graphic: {
        name: { type: String, required: true },
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true },
    }
})

export type HydratedCategoryDoc = HydratedDocument<EventCategory>

export const EventCategory = model<EventCategory, CategoryModel>('EventCategory', categorySchema)