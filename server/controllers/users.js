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
            data: {
                token
            }
        });
    });
}

  /**
 * @function login
 * @memberof UserController
 * @static
 */
static login(req, res) {
    const { body: { email, password } } = req;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Incorrect Email or password'
                });
            }
            user.comparePassword(password, user.password);
            const token = jwt.sign({
                id: user.id,
                firstname: user.firstName,
                lastname: user.lastName,
                email: user.email,
              }, process.env.SECRET_KEY, { expiresIn: '24hrs' });

            return res.status(201).json({
                success: true,
                message: 'Login successful',
                data: {
                    token
                }
            });
        }).catch(err => {
            return res.status(500).json({
                error: 'An error occured!',
                success: false
            });
        });
}

}

export default UserController;