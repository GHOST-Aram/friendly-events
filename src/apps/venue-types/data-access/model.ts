import { HydratedDocument, Model, Schema, model, ObjectId } from "mongoose"

export interface VenueType {
    name: string
    description: string
    createdBy?: ObjectId
}

export type VenueTypeModel = Model<VenueType>

export const venueTSchema = new Schema<VenueType, VenueTypeModel>({
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

export type HydratedVenueType = HydratedDocument<VenueType>

export const VenueType = model('VenueType', venueTSchema)