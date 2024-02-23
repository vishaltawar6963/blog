import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteBlogAction, getSingleBlogAction, updateBlogAction, updateBlogPublishAction } from '../redux/action/blogAction'
import parse from "html-react-parser"
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill'
import { baseUrl } from '../url'

export default function Detail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { singleBlog, blogDeleted, blogUpdated } = useSelector(state => state.blog)
    const { login } = useSelector(state => state.auth)
    const [isPublish, setisPublish] = useState(singleBlog?.publish)
    const [preview, setpreview] = useState()
    const [desc, setdesc] = useState()
    const [image, setimage] = useState()
    const intialValues = {
        title: "React is awesome",
        category: ""
    }
    const [blogData, setblogData] = useState(intialValues)

    const handleChange = (e) => {
        const img = e.target.files[0]
        setimage(img)
        const imgUrl = URL.createObjectURL(img)
        console.log(imgUrl);
        setpreview(imgUrl)
    }
    const handleAddBlog = async () => {
        const fd = new FormData()
        fd.append("title", singleBlog.title)
        fd.append("desc", desc)
        fd.append("image", image)
        fd.append("category", singleBlog.category)
        dispatch(updateBlogAction(fd, singleBlog._id))
        console.log(desc);
        for (const item of fd.entries()) {
            console.log(item);
            console.warn(`${item[0]}${item[1]}`);
        }
    }



    const handleDeleteBlog = () => {
        dispatch(deleteBlogAction(id))
        blogDeleted && toast.error("Blog Updated", {
            position: toast.POSITION.TOP_CENTER
        }) 
    }

    useEffect(() => {
        dispatch(getSingleBlogAction(id))
        if(blogDeleted){
navigate('/account')
        }
    }, [blogDeleted])


    return <>
        <div className="container">
            <div className="row">
                {
                    singleBlog && <div className="col-sm-8 offset-sm-2">
                        <div class="card m-5">
                            <div class="card-body">
                                <div className=" text-center">
                                    {
                                        singleBlog.userId._id == login?.id || login.admin ?
                                            <div class="form-check form-switch d-flex justify-content-between">
                                                <div>
                                                    <input
                                                        class="form-check-input mt-2"
                                                        type="checkbox"
                                                        id="id"
                                                        defaultChecked={singleBlog.publish}
                                                        onChange={e => setisPublish(e.target.checked)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={e => dispatch(updateBlogAction(isPublish, singleBlog._id))}
                                                        class="btn btn-outline-success">
                                                        {isPublish ? "publish Ad" : "Unpublish Ad"}
                                                    </button>
                                                </div>
                                                <div>
                                                    <button type="button" class="btn btn-outline-primary m-1" data-bs-toggle="modal" data-bs-target="#blogUpdateModal">Edit Blog</button>
                                                    <button type="button" class="btn btn-outline-danger m-1" data-bs-toggle="modal" data-bs-target="#deleteBlogModal">Delete Blog</button>
                                                </div>
                                            </div>

                                            : ""
                                    }
                                    {/* {
                                        login && login.admin && <div class="form-check form-switch text-start">
                                            <input
                                                class="form-check-input mt-3"
                                                type="checkbox"
                                                id="id"
                                                defaultChecked={singleBlog.publish}
                                                onChange={e => setisPublish(e.target.checked)}
                                            />
                                            <button
                                                type="button"
                                                onClick={e => dispatch(updateBlogAction(isPublish, singleBlog._id))}
                                                class="btn btn-outline-success">
                                                {isPublish ? "publish Ad" : "Unpublish Ad"}
                                            </button>
                                            <button type="button" class="btn btn-outline-danger m-1" data-bs-toggle="modal" data-bs-target="#deleteBlogModal">Delete Blog</button>
                                        </div>
                                    } */}

                                    <img src={`${baseUrl}/${singleBlog.image}`} className='img-fluid m-4' width={500} alt="" />
                                </div>

                                <div className=" d-flex align-items-center flex-column">
                                    <span className='mt-2'> Blog Created By : <strong className='text-ligh'> Mr {singleBlog.userId.name}</strong></span>
                                    <p className='mt-2 text-ligh'>{singleBlog.userId.email}</p>
                                    <strong>{singleBlog.category}</strong>
                                    <h1 className='p-'>{singleBlog.title}</h1>
                                    <p className='mx-5 px-4 text-center text-dark'>{parse(singleBlog.desc)}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
        {/* <!-- Delete Blog Modal --> */}
        <div class="modal fade" id="deleteBlogModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h3>Are You Sure For Delete Blog</h3>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeleteBlog}>Delete</button>
                    </div>
                </div>
            </div>
            {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus voluptatum sed temporibus assumenda. Voluptate enim magni laudantium cupiditate accusantium deserunt qui exercitationem fuga? Adipisci, alias eaque dignissimos accusamus officiis quam!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus voluptatum sed temporibus assumenda. Voluptate enim magni laudantium cupiditate accusantium deserunt qui exercitationem fuga? Adipisci, alias eaque dignissimos accusamus officiis quam!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus voluptatum sed temporibus assumenda. Voluptate enim magni laudantium cupiditate accusantium deserunt qui exercitationem fuga? Adipisci, alias eaque dignissimos accusamus officiis quam! */}
        </div>
        {/* <!--Blog Update Modal --> */}
        <div class="modal fade" id="blogUpdateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* <div className="card-body"> */}
                        {
                            singleBlog && <>
                                <div>
                                    <label for="title" class="form-label text-muted">Blog Title</label>
                                    <input
                                        type="text"
                                        id='title'
                                        value={singleBlog.title}
                                        onChange={e => singleBlog({ ...singleBlog, title: e.target.value })}
                                        className='form-control' />
                                </div>
                                <div className="mt-2">
                                    <ReactQuill theme="snow"
                                        value={singleBlog.desc}
                                        onChange={setdesc}
                                    />
                                </div>
                                <div>
                                    <label for="image" class="form-label text-muted">Blog Image</label>
                                    <input
                                        id='image'
                                        type="file"
                                        onChange={handleChange}
                                        className='form-control' />
                                </div>
                                <img src={preview} className='img-fluid' alt="" />
                                <div>
                                    <label for="title" class="form-label text-muted">Blog Title</label>
                                    <select
                                        onChange={e => setblogData({ ...blogData, category: e.target.value })}
                                        class="form-select"
                                        value={singleBlog.category}
                                        aria-label="Default select example">
                                        <option selected>Select category</option>
                                        <option value='Web Development'>Web Development</option>
                                        <option value='App Development'>App Development</option>
                                        <option value='Data Scientist'>Data Scientist</option>
                                        <option value='Game Developer'>Game Developer</option>
                                    </select>
                                </div>
                                <br />


                            </>
                        }
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" onClick={handleAddBlog} data-bs-dismiss="modal" class="btn btn-success">Update Blog</button>
                    </div>
                </div>

                {/* </div> */}
            </div>
        </div>
    </>
}