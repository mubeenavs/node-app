
export default class UserResponse {
    /**
     * Transform the user resource into an object.
     *
     * @param {Object} user - The user object to transform.
     * @return {Object} - An object containing selected properties from the user.
     */
    static async format(user) {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    }
}