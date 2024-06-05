import Joi from 'joi'
// import EmployeeRepository from '../../../repositories/employeeRepository.js'
// import RoleRepository from '../../../repositories/roleRepository.js'

class AddUserRequest {
    // static employeeRepo = new EmployeeRepository()
    // static roleRepo = new RoleRepository()

    /**
     * Add validation rules for the request
     */
    static schema = Joi.object({
        name: Joi.string().required().messages({
            'string.empty': 'Please enter the  name.',
            'any.required': 'Please enter the  name.',
        }),
        email: Joi.string().email().required().messages({
            'string.empty': 'Please enter a valid email address.',
            'any.required': 'Please enter a valid email address.',
            'string.email': 'Please enter a valid email address.',
        }),
         password: Joi.string().required().messages({
            'any.required': `Password field cannot be left blank. Ensure your account's security by entering a new password.`,
            'string.empty': `Password field cannot be left blank. Ensure your account's security by entering a new password.`,
        }),
        password_confirmation: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                'any.required':
                    'This field cannot be empty. Please enter the password to confirm.',
                'string.empty':
                    'This field cannot be empty. Please enter the password to confirm.',
                'any.only':
                    'It looks like the passwords you entered do not match. Please double-check your passwords and try again.',
            }),
    })

    constructor(req) {

        this.data = {
            name: req.query.name,
            email: req.query.email,
            password:req.query.password,
            password_confirmation:req.query.password_confirmation
        }
    }

    async validate() {
        const { error, value } = AddUserRequest.schema.validate(this.data, {
            abortEarly: false,
        })

        if (error ) {
            const validationErrors = {}
            error
                ? error.details.forEach((err) => {
                      validationErrors[err.context.key] = err.message
                  })
                : []
            // if (checkRoleExists == null) {
            //     validationErrors['role'] =
            //         'Please specify the role of the employee.'
            // }
            // if (checkEmailExists !== null) {
            //     validationErrors['email'] =
            //         'Email id is already taken. Try another one.'
            // }
            // if (checkPhoneExists !== null) {
            //     validationErrors['phone'] =
            //         'Phone number is already taken. Try another one.'
            // }
            // if (checkEmployeeIdExists) {
            //     validationErrors['employee_id'] =
            //         'Employee with this id is exist. Try another one.'
            // }
            throw validationErrors
        }
        return value
    }
}

export default AddUserRequest