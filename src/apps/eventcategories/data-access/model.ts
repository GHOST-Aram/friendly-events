import { HydratedDocument, Model, ObjectId, Schema, model } from "mongoose"

export interface EventCategory{
    name: string
    description: string
    createdBy: ObjectId
    graphic?: {
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
        minlength: 2,
        required: true 
    },

    description: {
        type: String,
        minlength: 10,
        maxlength: 1000,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    graphic: {
        name: { type: String },
        data: { type: Buffer },
        contentType: { type: String },
    }
})

export type HydratedCategoryDoc = HydratedDocument<EventCategory>

export const EventCategory = model<EventCategory, CategoryModel>('EventCategory', categorySchema)

export const searchablePaths = ['name', 'createdBy']
export const uniqueObjectkeys = ['name']