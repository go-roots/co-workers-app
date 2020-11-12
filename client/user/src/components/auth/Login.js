import React, { Fragment, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { removeAllAlerts } from '../../store/actions/alerts';
import { loginUser } from '../../store/actions/auth';
import { setLinkedinState } from '../../store/actions/globalVars';

import logoSVG from '../../assets/img/logo_large.svg'
import connectLinkedin from '../../assets/img/connect-linkedin.jpg'
import Alert from '../../components/layout/Alert';


const Login = props => {

    const linkedinState = 's95bid7c9z9UC3B9bcdczu90ngg';

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const onSubmitHandler = async e => {
        e.preventDefault();
        await dispatch(removeAllAlerts());
        return dispatch(loginUser(formData.email, formData.password));
    }

    if (isAuth) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div style={{ background: "rgb(115,173,58)" }}>
            <div className="login-clean">
                <Alert />
                <form onSubmit={e => onSubmitHandler(e)}>
                    <h2 className="sr-only">Login Form</h2>
                    <div className="illustration">
                        <img alt='' src={logoSVG} />
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center" id="social">
                        <a
                            className="btn"
                            role="button"
                            href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&amp;state=${linkedinState}&amp;scope=r_liteprofile%20w_member_social%20r_emailaddress&amp;client_id=78c26netqagx2n&amp;redirect_uri=https%3A%2F%2Fco-workers.herokuapp.com%2Floading`}
                            onClick={e => dispatch(setLinkedinState(linkedinState))}
                        >
                            <img alt='' src={connectLinkedin} />
                        </a>
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control form-control-sm inputs"
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control form-control-sm inputs"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary btn-block btn-sm" type="submit">Sign in</button>
                    </div>
                    <Link id="sign-in" className="forgot" to="/register">Don't have an account yet ? Sign up</Link>
                    <a className="forgot" href="#">Forgot your email or password?</a>
                </form>
            </div>
        </div>
    )
}

export default Login;
