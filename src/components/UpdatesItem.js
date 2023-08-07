import React from 'react'
import '../styles/UpdatesItem.css'
import updateImg from './UpdateImg.png'

export default function UpdatesItem(props) {

    const { data } = props;

    return (
        <div className='row justify-content-around'>
            {
                data.map((article) => {
                    return <div key={article._id} className="card mb-3 news-item col-lg-3 col-md-4 col-sm-5">
                        <img src={article.image || updateImg} className="card-img-top news-img mt-2" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-wrap">{article.title}</h5>
                            <p className="card-text">{article.description || "No description"}...</p>
                            <a href={article.link} className="btn btn-success" target='_blank'>Read More</a>
                        </div>
                    </div>
                })
            }
        </div>
    )
}
