export const validData:any = {
    category: "Music Concert",
    venue: "Quiver Lounge",
    title:"Ramogi Night",
    city: "Nairobi",
    date: "23-7-2024",
    time: {
        start: "1237",
        end: "1537",
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

export const invalidData = {
    category: "",
    title:"",
    city: "",
    date: "8 July 2024",
    time: {
        start: "12:00 PM",
        end: "12:00 AM",
    },
    duration: "3",
    ageLimit: {
        min: "17red",
        max: "25trf"
    },
    availableTickets: "One hundred",
    ticketPrice: "One hindred"
}
