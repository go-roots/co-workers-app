import React, { Fragment } from 'react'

const Recommend = () => {
    return (
        <Fragment>
            <div class="col">
                <ul class="list-group">
                    <li class="list-group-item social-link"><span>Recommend Bob on&nbsp;<a href="#">Linkedin</a></span>
                    </li>
                    <li class="list-group-item social-link"><span>Follow him on&nbsp;<a href="#">Facebook</a>,&nbsp;<a
                                href="#">Instagram</a>,&nbsp;</span><a href="#">Twitter</a></li>
                    <li class="list-group-item social-link"><span>Check out his&nbsp;<a
                                href="#">Github</a>&nbsp;and&nbsp;<a href="#">Youtube</a>&nbsp;accounts</span></li>
                </ul>
            </div>
        </Fragment>
    )
}

export default Recommend
