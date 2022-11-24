
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "Sakila API Docs"
        },
        host: ["http://localhost:3030"],
        basePath: "/"
    },
    apis: ['*.js'],
    schema: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"]
}

export {
    options
};
