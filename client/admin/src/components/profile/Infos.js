import React from 'react'

const Infos = () => {
    return (
        <div className="col-lg-8">
            <div className="row mb-3 d-none">
                <div className="col">
                    <div className="card text-white bg-primary shadow">
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col">
                                    <p className="m-0">Peformance</p>
                                    <p className="m-0"><strong>65.2%</strong></p>
                                </div>
                                <div className="col-auto"><i className="fas fa-rocket fa-2x"></i>
                                </div>
                            </div>
                            <p className="text-white-50 small m-0"><i className="fas fa-arrow-up"></i>&nbsp;5% since last
                      month</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card text-white bg-success shadow">
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col">
                                    <p className="m-0">Peformance</p>
                                    <p className="m-0"><strong>65.2%</strong></p>
                                </div>
                                <div className="col-auto"><i className="fas fa-rocket fa-2x"></i>
                                </div>
                            </div>
                            <p className="text-white-50 small m-0"><i className="fas fa-arrow-up"></i>&nbsp;5% since last
                      month</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="card shadow mb-3">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 font-weight-bold">Profile infos</p>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <input className="form-control" type="text" placeholder="url of the user's website"
                                                name="website" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <input className="form-control" type="email" placeholder="Company name" name="company" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <input className="form-control" type="text" placeholder="Position in the company"
                                                name="position" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <input className="form-control" type="text" placeholder="Github username" name="github" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <input className="form-control" type="text" placeholder="Set of skills" name="skills" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <input className="form-control" type="text" placeholder="City" name="city" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <input className="form-control" type="text" placeholder="Country" name="country" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row d-flex flex-column" id="social-links-container"
                                    style={{ margintop: "15px", marginbottom: "20px" }}>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">
                                        <strong>
                                            Social links
                          </strong>
                                    </label>
                                    <input className="form-control" type="text" placeholder="Twitter" name="twitter" />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Facebook" name="facebook" />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Youtube" name="youtube" />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Linkedin" name="linkedin" />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Instagram" name="instagram" />
                                </div>
                            </form>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-sm" type="submit">
                                Save Settings
                    </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Infos
