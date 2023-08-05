import React from 'react'
import '../styles/UpdatesItem.css'
import updateImg from './UpdateImg.png'

export default function UpdatesItem() {
    return (
        <div className="card news-item p-2 my-4 align-self-center">
            <img src={updateImg} className="card-img-top" alt="test" />

            <div className="card-body">
                <h5 className="card-title">New version release 4.0!</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button className="btn btn-primary">Go somewhere</button>
            </div>
        </div>
    )
}
