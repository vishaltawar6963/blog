import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { getUserBlogAction } from '../../redux/action/blogAction'
import { allUserAction } from '../../redux/action/userAction'
import { baseUrl } from '../../url'


export default function Dashboard() {
    const dispatch = useDispatch()
    const { allUser } = useSelector(state => state.user)
    const { userBlogs } = useSelector(state => state.blog)
    const [show, setshow] = useState(false)
    useEffect(() => {
        dispatch(allUserAction())
    }, [])
    const handleShow = id => {
        setshow(true)
        dispatch(getUserBlogAction(id))
    }
    return <>
        <div className="container">
            <div className="row">
                <div className="col-sm-3 mt-5">
                    <table class="table table-dark table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">photo</th>
                                <th scope="col">name</th>
                                <th scope="col">email</th>
                            </tr>
                        </thead>
                        {
                            allUser && allUser.map(item => <tbody>
                                <tr onClick={e => handleShow(item._id)} >
                                    <td><img src={`${baseUrl}/${item.avatar}`} width={60} referrerPolicy="no-referrer" alt="" className='rounded' /></td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                </tr>
                            </tbody>)
                        }
                    </table>
                </div>
                <div className="col-sm-1"></div>

                {
                    show && <div className="col-sm-8 mt-5">
                        <div className="row">
                            {
                                userBlogs && userBlogs.map(item => <> <div className="col-sm-6 p-4">
                                    <div class="card text-center">
                                        {
                                            item.publish
                                                ? <strong className='m-2 text-success'>Blog Has Publish</strong>
                                                : <strong className='m-2 text-danger'>Blog Has Not Publish</strong>

                                        }
                                        <Link to={`/detail/${item._id}`} > <img src={`${baseUrl}/${item.image}`} className='img-fluid' alt="" /></Link>
                                        <span className='text-muted mt-1'><strong>{item.category}</strong></span>
                                        <h3 className=''>{item.title}</h3>
                                        <Link to={`/detail/${item._id}`}>View Detail</Link>
                                    </div>
                                </div>

                                </>)
                            }

                        </div>
                    </div>
                }
            </div>
        </div>

    </>
}
