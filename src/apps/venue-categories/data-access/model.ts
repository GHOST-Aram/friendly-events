import { HydratedDocument, Model, Schema, model, ObjectId } from "mongoose"

export interface VenueCategory {
    name: string
    description: string
    createdBy: ObjectId
}

export type VenueCategoryModel = Model<VenueCategory>

export const venueCatSchema = new Schema<VenueCategory, VenueCategoryModel>({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        minlength: 100,
        maxlength: 1000,
        required: true,
    },
    createdBy: { 
        type: Schema.Types.ObjectId,
        required: true
    }
})

export type HydratedVenueCategory = HydratedDocument<VenueCategory>

export const VenueCategory = model('VenueCategory', venueCatSchema)