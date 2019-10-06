import jwt from 'jsonwebtoken';
import User from '../models/user';
import responseHandler from '../utils/responseHelper';

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
        const message =  'Account created successfully';
        return responseHandler(res, 201, undefined, message, { token });
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
            let message = 'Incorrect Email or password';
            if (!user) return responseHandler(res, 401, false, message);
            const err = user.comparePassword(res, password, user.password);
            if (err) return responseHandler(res, 401, false, err);
            const token = jwt.sign({
                id: user.id,
                firstname: user.firstName,
                lastname: user.lastName,
                email: user.email,
              }, process.env.SECRET_KEY, { expiresIn: '24hrs' });
            message = 'Login was successful';
            return responseHandler(res, 201, undefined, message, { token });
        }).catch(error => responseHandler(res, 500, false, error.message));
}

}

export default UserController;
