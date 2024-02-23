import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { deleteBlogAction, getAllBlogAction, getUserBlogAction, updateBlogAction } from '../../redux/action/blogAction'
import { baseUrl } from '../../url'
// import { userUpdateAction } from '../../redux/action/authAction'

export default function Account() {
    const { login } = useSelector(state => state.auth)
    const { userBlogs } = useSelector(state => state.blog)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllBlogAction())
        dispatch(getUserBlogAction(login.id))
    }, [])

    return <>
        <div className="container-flui m-5">
            <div className="row mt-5">
                <div className="col-sm-9">
                    <div className="container">
                        <div className="row">
                            <h1 className='text-center'>Mr. {login.name}'s Blogs</h1>
                            {
                                userBlogs
                                    ? userBlogs.map(item => <> <div className="col-sm-6 col-md-12 col-lg-6 p-4">
                                        <div class="card h-100 text-center">
                                            {
                                                item.publish
                                                    ? <strong className='m-2 text-success'>Blog Has Publish</strong>
                                                    : <strong className='m-2 text-danger'>Blog Has Not Publish</strong>

                                            }
                                            <Link to={`/detail/${item._id}`} > <img src={`${baseUrl}/${item.image}`} className='p-4' width={300} alt="" /></Link>
                                            <span className='text-muted mt-1'><strong>{item.category}</strong></span>
                                            <h3 className=''>{item.title}</h3>
                                            <Link to={`/detail/${item._id}`}>View Detail</Link>
                                        </div>
                                    </div>

                                    </>)
                                    : <><div className="col-sm-8 offset-sm-2 mt-5">
                                        <div class="card text-center">
                                            <div class="card-body"><h2>Mr. {login.name} Yoy Have Not Create Any Blog</h2></div>
                                        </div>
                                    </div>
                                    </>

                            }
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 p-4">
                    <div class="card">
                        <div class="card-body text-center">

                            <img src={login.avatar ? `${baseUrl}/${login.avatar}` : "https://www.pngitem.com/pimgs/m/256-2560570_transparent-man-icon-png-png-download.png"} className='img-fluid' alt="" />
                            <div className='mt-3'>
                                <h1>{login.name}</h1>
                                <h4>{login.email}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
