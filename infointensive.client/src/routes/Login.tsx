import './Login.tsx.css'

export default () => {
    return (
        <div id="loginPageContainer">
            <div id="loginFormContainer" className="shadow rounded">
                <form id="loginForm">
                    <div className="row">
                        <div className="col-12">
                            <h3>Sign In</h3>
                        </div>
                        <div className="col-12">
                            <label>Username</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter username"
                            />
                        </div>

                        <div className="col-12">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                            />
                        </div>

                        <div className="col-12">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                            />
                        </div>

                        <div className="col-12" style={{ visibility: "hidden" }}>
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm password"
                            />
                        </div>

                        <div className="col-12 row buttonsContainer">
                            <div className="col">
                                <button type="submit" id="registerButton" className="btn btn-outline-primary">
                                    Register
                                </button>
                            </div>
                            <div className="col">
                                <button type="submit" id="loginButton" className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}