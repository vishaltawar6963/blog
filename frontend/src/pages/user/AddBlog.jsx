import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlogAction } from '../../redux/action/blogAction'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';


export default function Account() {
    const { blogAdded } = useSelector(state => state.blog)
    const dispatch = useDispatch()
    const [preview, setpreview] = useState()
    const [desc, setdesc] = useState()
    const intialValues = {
        title: "React is awesome",
        image: "",
        category: ""
    }
    const [blogData, setblogData] = useState(intialValues)


    const handleAddBlog = async () => {
        const fd = new FormData()
        fd.append("title", blogData.title)
        fd.append("desc", desc)
        fd.append("image", blogData.image)
        fd.append("category", blogData.category)
        dispatch(addBlogAction(fd))



    }
    const handleChange = (e) => {
        const img = e.target.files[0]
        setblogData({ ...blogData, image: img })
        const imgUrl = URL.createObjectURL(img)
        console.log(imgUrl);
        setpreview(imgUrl)

    }
    useEffect(() => {
        blogAdded && toast.success("Blog Added Successfully", {
            position: toast.POSITION.TOP_CENTER
        })
    }, [blogAdded])

    return <>
        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-3 mt-5">
                    <h1 className='text-center text-light mb-3'>ADD BLOG</h1>
                    <div className="card mt-5">
                        <div className="card-header">Add Blog</div>
                        <div className="card-body">
                            <div>
                                <label for="title" class="form-label text-muted">Blog Title</label>
                                <input
                                    type="text"
                                    id='title'
                                    value={blogData.title}
                                    onChange={e => setblogData({ ...blogData, title: e.target.value })}
                                    className='form-control' />
                            </div>
                            <div className="mt-2">
                                <ReactQuill theme="snow"
                                    value={desc}
                                    onChange={setdesc} />
                            </div>
                            <div>
                                <label for="title" class="form-label text-muted">Blog Title</label>
                                <input
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
                                    value={blogData.category}
                                    aria-label="Default select example">
                                    <option selected>Select category</option>
                                    <option value='Web Development'>Web Development</option>
                                    <option value='App Development'>App Development</option>
                                    <option value='Data Scientist'>Data Scientist</option>
                                    <option value='Game Developer'>Game Developer</option>
                                </select>
                            </div>
                            <br />
                            <button
                                onClick={handleAddBlog}
                                type="button"
                                class="btn btn-primary form-control">Add Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}