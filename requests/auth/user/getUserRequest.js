import Joi from "joi";
import UserRepository from "../../../repositories/userRepository.js";
const userRepo = new UserRepository()

/**
 * Add validation rules for the request*/
class GetUserRequest {
    static schema = Joi.object({
        id: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
    })
    constructor(req) {
        this.data = req.query;
    }

    async validate() {
        const { error, value } = GetUserRequest.schema.validate(this.data, { abortEarly: false })
        /**
        * Check id exist or not
        */

        const user = await userRepo.checkIdExists(this.data.id);
        if (error || user == null || user == undefined) {
            const validationErrors = {}
            error
                ? error.details.forEach((err) => {
                    validationErrors[err.context.key] = cleanErrorMessage(
                        err.message,
                    )
                })
                : []
            if (user == null || user == undefined) {
                validationErrors['id'] =
                    'Invalid id provided.'
            }
            throw validationErrors
        }
        return value;
    }
}

export default GetUserRequest;