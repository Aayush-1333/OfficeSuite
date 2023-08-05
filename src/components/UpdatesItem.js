import React from 'react'
import '../styles/UpdatesItem.css'

export default function UpdatesItem() {
    return (
        <div className="card news-item p-2 my-4 align-self-center">
            <img src="https://th.bing.com/th/id/OIP.u1-LmbkCyPdCw9lUK6ZfEwHaE8?w=267&h=180&c=7&r=0&o=5&pid=1.7" className="card-img-top" alt="test" />

            <div className="card-body">
                <h5 className="card-title">New version release 4.0!</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button className="btn btn-primary">Go somewhere</button>
            </div>
        </div>
    )
}
