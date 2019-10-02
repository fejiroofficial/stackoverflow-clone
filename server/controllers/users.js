import jwt from 'jsonwebtoken';
import User from '../models/user';

/** user controller class */
class UserController {
  /**
 * @function signup
 * @memberof UserController
 * @static
 */
static signup(req, res) {
    User.create(req.body)
    .then(user => {
        const token = jwt.sign({
            id: user.id,
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
          }, process.env.SECRET_KEY, { expiresIn: '24hrs' });
        return res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token
        });
    });
}

}

export default UserController;