import { HydratedDocument, Model, Schema, model, ObjectId } from "mongoose"

export interface VenueCategory {
    name: string
    description: string
    createdBy: ObjectId
}

//Keys that an be searched using query string
const searchablePaths = ['name', 'createdBy']

// A combination of keys for a search document 
// that can be used to search a specific document in the DB
const uniqueObjectkeys = ['name']

export type VenueCategoryModel = Model<VenueCategory>

export const venueCatSchema = new Schema<VenueCategory, VenueCategoryModel>({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        minlength: 10,
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

export { searchablePaths, uniqueObjectkeys }