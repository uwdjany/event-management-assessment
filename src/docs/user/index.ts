import responses from "../responses"

const user = {
'/user/signup':{
    post:{
        tags:['user'],
        summary:'Create a new user, we have two different roles ADMIN or USER',
        parameters:[{
            in:'body',
            name:'body',
            schema:{
                example:{
                    'name':'Test',
                    'email':'test@example.com',
                    'password':'Test@123'
                }
            }
        }],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses,
    }
},
"/user/login":{
    post:{
        tags:["user"],
        summary:"user login",
        description:`For test users credentials use these ones:NormalUser 
        email:'regular@example.com',
        password: 'regularpassword'.
        ADMIN:email: 'admin@example.com',
        password: 'adminpassword',`,
        parameters:[
            {
                in:"body",
                name:"body",
                schema:{
                    example:{
                        "email":"admin@example.com",
                        "password":"adminpassword"
                    }
                }
            },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses,
    }
},
"/user/logout":{
    put:{
        tags:["user"],
        summary:"Driver logout",
        security:[
            {
                JWT:[]
            }
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses,
    }
},
}

export default user