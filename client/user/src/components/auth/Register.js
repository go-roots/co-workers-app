import React, { Fragment } from 'react'
import logoSVG from '../../assets/img/logo_large.svg'
import linkedin from '../../assets/img/linkedin.png'
import { Link } from 'react-router-dom'


const Register = () => {
    return (
        <Fragment style={{ background: "rgb(115,173,58)" }}>
            <div className="login-clean">
                <form method="post">
                    <h2 className="sr-only">Login Form</h2>
                    <div className="illustration">
                        <img alt='' src={logoSVG} />
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center" id="social">
                        <a
                            className="btn"
                            role="button"
                            href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&amp;state=123456789&amp;scope=r_liteprofile%20w_member_social%20r_emailaddress&amp;client_id=78c26netqagx2n&amp;redirect_uri=https%3A%2F%2Fco-workers.herokuapp.com%2Floading"
                        >
                            <img alt='' src={linkedin} />
                        </a>
                        <p style={{ color: "#000000" }}>(recommended,<a href="#">&nbsp;see why</a>)</p>
                    </div>
                    <div className="form-group">
                        <input className="form-control inputs" type="text" placeholder="First name" />
                    </div>
                    <div className="form-group">
                        <input className="form-control inputs" type="text" placeholder="Last name" />
                    </div>
                    <div className="form-group">
                        <input className="form-control form-control-sm inputs" type="email" name="email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input className="form-control form-control-sm inputs" type="password" name="password" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block btn-sm" type="submit">Sign up</button>
                    </div>
                    <Link id="sign-in" className="forgot" to="/login">Already have an account ? Sign in.</Link>
                </form>
            </div>
        </Fragment>
    )
}

export default Register;
