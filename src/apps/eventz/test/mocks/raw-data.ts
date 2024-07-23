import { Event } from '../../data-access/model'

export const validEventData: Event= {
    category: "Music Concert",
    venue: "Quiver Lounge",
    title:"Ramogi Night",
    city: "Nairobi",
    date: "23 July 2024",
    time: {
        start: "12:37:48 PM",
        end: "12:37:48 PM",
        zone: "GMT+03:00"
    },
    duration: " 3 days",
    ageLimit: {
        min: 17,
        max: 25
    },
    availableTickets: 100,
    ticketPrice: 2500
}

export const invalidEventData = {
    category: "",
    title:"",
    city: "",
    date: "7/23/2024",
    time: {
        start: "2200hrs",
        end: "0000hrs",
    },
    duration: "3",
    ageLimit: {
        min: "17red",
        max: "25trf"
    },
    availableTickets: "One hundred",
    ticketPrice: "One hindred"
}
