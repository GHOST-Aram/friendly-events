import { Venue } from '../../data-access/model'

export const validData = {
    type: "5 star Hotel",
    name: "Paradise Eden",
    capacity: 20000,
    address: {
        cityOrTown: 'Nairobi',
        street: '34 North',
        block: {
            name: "Paradise Building",
            floor: 4,
        }
    },
    description: `
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Maiores libero illo praesentium autem nesciunt consectetur 
        repudiandae omnis eum similique in, quas rerum. Eveniet, 
        possimus doloremque?
    `,
    accessibilityFeatures: {
        stairCase: true,
        elevator: true,
        escallator: false,
        ramp: true
    },
    coordinates: {
        latitude: -36.3,
        longitude: -12.5
    }
}

export const invalidData = {
    name: "",
    capacity: "20000 seats",
    address: {
        cityOrTown: 'Nairobi',
        street: '34 North',
        block: {
            name: "Paradise Building",
            floor: "4th Floor",
        }
    },
    description: `
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Maiores libero illo.
    `,
    accessibilityFeatures: {
        stairCase: "available",
        elevator: "available",
        escallator: "not available",
        ramp: "available"
    },
    coordinates: {
        latitude: "36 degress south",
        longitude: "12 degrees east"
    }
}
