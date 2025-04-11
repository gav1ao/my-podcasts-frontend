class UnauthorizedError extends Error {
    constructor(message) {
        super(message);

        this.name = "UnauthorizedError";
        this.statusCode = 401;
    }
}

class TokenError extends Error {
    constructor(message) {
        super(message);

        this.name = "TokenError";
        this.statusCode = 401;
    }
}
