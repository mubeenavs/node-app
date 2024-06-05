 import Employee from "../models/Employee.js";
 /**find by id  */
 export default class Auth{
    async findById(userId) {
        const user = await Employee.findById(userId);
        return user;
      }
}
