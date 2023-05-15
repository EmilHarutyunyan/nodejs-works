import * as yup from 'yup';

export const schema_signup = yup.object().shape({
  username: yup
    .string()
    .max(40)
    .min(3, 'User Name must be at least 3 characters')
    .required('Required User Name'),
  email: yup
    .string()
    .email('Email should have correct format')
    .required('Email is a required field'),
  password: yup
    .string()
    .min(8)
    .max(32)
    .required('No password provided.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    //   'Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number:'
    //   ),
   role: yup.array().of(yup.string())
});

export const schema_signin = yup.object().shape({
  email: yup
    .string()
    .email('Email should have correct format')
    .required('Email is a required field'),
  password: yup
    .string()
    .max(32)
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required('No password provided.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});


const validationRegister = async (req,res,next) => {
  try {
    schema_signup.validateSync(req.body)
    next()
  } catch (err) {
    return res.status(400).json({ message: err.errors });
  }
}
const validationLogin = async (req, res, next) => {
  try {
    schema_signin.validateSync(req.body)
    next()
  } catch (err) {
    return res.status(400).json({ message: err.errors });
  }
}

export {
  validationRegister,
  validationLogin
};