import React from 'react'

const Billing = () => {
    return (
        <div className="row">
            <div className="col">
                <h3 className="text-center consumption-title">Billing</h3>
                <p>Standard formula : 10€ + c * electricity consumption</p>
                <p>monthly subscription</p>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>May 2020</th>
                            <th>June 2020</th>
                            <th>July 2020</th>
                            <th>August 2020</th>
                            <th>September 2020</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Fixed cost</td>
                            <td>10</td>
                            <td>10</td>
                            <td>10</td>
                            <td>10</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>Variable cost</td>
                            <td>10</td>
                            <td>5</td>
                            <td>7</td>
                            <td>6</td>
                            <td>7</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>20€</td>
                            <td>15€</td>
                            <td>17€</td>
                            <td>16€</td>
                            <td>17€</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Billing
