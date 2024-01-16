import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

import {setWindowClass} from 'pages/UI/Bootstrap/AdminLTE/utils/helpers';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {Form, InputGroup} from 'react-bootstrap';
import {PfButton} from '@profabric/react-components';

const ForgotPassword = () => {
  

  const {handleChange, values, handleSubmit, touched, errors} = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required')
    }),
    onSubmit: (values) => {
      toast.warn('Not yet functional');
      // eslint-disable-next-line no-console
      console.log('values', values);
    }
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
          <p className="login-box-msg">
            recover.forgotYourPassword
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.email}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                {touched.email && errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-envelope" />
                    </InputGroup.Text>
                  </InputGroup>
                )}
              </InputGroup>
            </div>
            <div className="row">
              <div className="col-12">
                <PfButton type="submit" block>
                  {/* @ts-ignore */}
                  recover.requestNewPassword
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

export default ForgotPassword;