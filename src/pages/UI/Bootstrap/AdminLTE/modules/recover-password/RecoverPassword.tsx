import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { setWindowClass } from 'pages/UI/Bootstrap/AdminLTE/utils/helpers';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, InputGroup } from 'react-bootstrap';
import { PfButton } from '@profabric/react-components';

const RecoverPassword = () => {
  

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
      confirmPassword: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      toast.warn('Not yet functional');
      // eslint-disable-next-line no-console
      console.log('values', values);
    },
  });

  setWindowClass('hold-transition login-page');
  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <b>Admin</b>
            <span>LTE</span>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">recover.oneStepAway</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-lock" />
                    </InputGroup.Text>
                  </InputGroup>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                  isInvalid={
                    touched.confirmPassword && !!errors.confirmPassword
                  }
                />
                {touched.confirmPassword && errors.confirmPassword ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-lock" />
                    </InputGroup.Text>
                  </InputGroup>
                )}
              </InputGroup>
            </div>
            <div className="row">
              <div className="col-12">
                <PfButton type="submit" block>
                  {/* @ts-ignore */}
                  recover.changePassword
                </PfButton>
              </div>
            </div>
          </form>
          <p className="mt-3 mb-1">
            <Link to="/login">login.button.signIn.label</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
