import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllBlogAction } from '../redux/action/blogAction'
import { Link } from "react-router-dom"
import { baseUrl } from '../url'


export default function Home() {
    const dispatch = useDispatch()
    const { allBlogs } = useSelector(state => state.blog)
    const [inp, setinp] = useState("")
    const [select, setselect] = useState("All")
    useEffect(() => {
        dispatch(getAllBlogAction())
    }, [])
    return <>

        <div className="container-flui m-5">
            <div className='text-center col-sm-4 offset-sm-4'>
                <form class="form-inline my-2 my-lg-0 d-flex flex-column gap-3">
                    <input
                        value={inp}
                        onChange={e => setinp(e.target.value)}
                        class="form-control bg-dark text-light mr-sm-2"
                        type="search"
                        placeholder="Search Blogs"
                        aria-label="Search" />
                    <select
                        value={select}
                        onChange={e => setselect(e.target.value)}
                        class="form-select bg-success text-light">
                        <option selected value="All">All</option>
                        <option value='Web Development'>Web Development</option>
                        <option value='App Development'>App Development</option>
                        <option value='Data Scientist'>Data Scientist</option>
                        <option value='Game Developer'>Game Developer</option>
                    </select>
                </form>
            </div>
            <div className="row mt-5">
                <div className="col-sm-9">
                    <div className="container">

                        <div className="row mt-">
                            {
                                allBlogs && allBlogs.filter(item => item.title.toLowerCase().includes(inp.toLowerCase())).filter(item =>
                                    select == "All" && item ||
                                    select == "Web Development" && item.category == "Web Development" ||
                                    select == "App Development" && item.category == "App Development" ||
                                    select == "Data Scientist" && item.category == "Data Scientist" ||
                                    select == "Game Developer" && item.category == "Game Developer"
                                ).map(item => <div className="col-sm-6 p-4">
                                    <div class="card h-100 text-center">
                                        <Link to={`/detail/${item._id}`} > <img src={`${baseUrl}/${item.image}`} className='p-4 hover' height={300} alt="" /></Link>
                                        <div className='p-3'>
                                            <span className='mt-1'><strong>{item.category}</strong></span> <br />
                                            <span className='p-4'><strong className='text-muted m-1'>Created By : </strong><strong> Mr. {item.userId.name}</strong></span>
                                            <h3 className=''>{item.title}</h3>
                                            <Link to={`/detail/${item._id}`}>View Detail</Link>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 mt-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <span>What are the benefits of blogs in education?</span>
                            <h1>Blogs</h1>
                            <img src="https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg?w=2000" className='img-fluid' alt="" />
                            <p>Reading blogs benefits you in two ways here — first you are reading what you are reading and second, you are improving your vocabulary at the same time. You will encounter words which are totally new for you and reading blogs will give you an idea about the word usage i.e. how they are used in a sentence <br /> Blogs give you something to share and talk about on your social media channels. Another great reason for starting a blog is to help your social media. A blog article gives you something to talk about and share. Choose topics that people are likely to share and post them on Twitter, Facebook, Google + and LinkedIn.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
