import User from '../models/user.js'

export default class UserRepository {
    /**
     * Add User
     * @param Array data
     * @return User newUser
     */
    async addUser(data) {
        const newUser = new User()

        Object.keys(data).forEach((key) => {
            newUser[key] = data[key]
        })
        newUser.save()
        return newUser
    }

    /**
     * Get User
     * @param String UserId
     * @return User
     */
    async getUser(UserId) {
        return User.findById(UserId);
    }

    /**
     * Update User
     * @param Array UserDetails
     * @return User UserData
     */
    async updateUser(UserDetails) {
        const UserData = await User.findById({
            _id: UserDetails.id,
        })
        if (!UserData) {
            return null
        }
        Object.assign(UserData, UserDetails)
        await UserData.save()

        return UserData.populate('role_id')
    }

 

    /**
     * Delete User
     * @param String UserId
     * @return Boolean true|false
     */
    async deleteUser(UserId) {
        const UserData = await User.findById({ _id: UserId })
        if (!UserData) {
            return false
        }
        await User.deleteOne(UserData)
        return true
    }
    async checkIdExists(data) {
        const userData = await User.findOne({ _id:data })
        return userData
    }
}