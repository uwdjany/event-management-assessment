import responses from "../responses"

const event = {
'/event/create':{
    post:{
        tags:['Event'],
        summary:'Create an event',
        security:[
            {
                JWT:[]
            }
        ],
        parameters:[{
            in:'body',
            name:'body',
            schema:{
                example:{
                    "title": "Music Festival 2024",
                    "date": "2024-08-15T18:00:00",
                    "location": "Central Park, New York",
                    "description": "Join us for the annual Music Festival in Central Park! Enjoy live performances from top artists in various genres.",
                    "ticketAvailability": 500,
                    "ticketPrice": 50.00
                  }
                  
            }
        }],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses,
    }
},
"/event/allevents":{
    get:{
        tags:["Event"],
        summary:"get all events",
        security:[
            {
            JWT:[]
        }
                 ],
        parameters:[],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses,
    }
},
"/event/update":{
    put:{
        tags:["Event"],
        summary:"update event details",
        security:[
            {
                JWT:[]
            }
        ],
        parameters:[
            {
                in:"query",
                name:"id",
                type:"string"
            },
            {
                in:"body",
                name:"body",
                schema:{
                    example:{
                        "title": "Music Festival 2024",
                        "date": "2024-08-15T18:00:00",
                        "location": "Central Park, New York",
                        "description": "Join us for the annual Music Festival in Central Park! Enjoy live performances from top artists in various genres.",
                        "ticketAvailability": 500,
                        "ticketPrice": 50.00
                      }
                      
                }

            }
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses,
    }
},
}

export default event