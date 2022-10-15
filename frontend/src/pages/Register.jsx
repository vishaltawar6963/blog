import React, { useEffect, useState } from 'react'
import { useFormik } from "formik"
import * as yup from "yup"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { userRegisterAction } from '../redux/action/authAction';

export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [preview, setpreview] = useState()
    const [profile, setprofile] = useState()
    const { login } = useSelector(state => state.auth)
    const formik = useFormik({
        initialValues: {
            name: "admin",
            email: "admin@gmail.com",
            password: "123",
            cpassword: "123"
        },
        validationSchema: yup.object({
            name: yup
                .string()
                .required("please enter name"),
            email: yup
                .string()
                .required("please enter valid email"),
            password: yup
                .string()
                .required("please enter valid password")
                .min(3, "please enter minimum 3 chsrsdter")
                .max(5, "please enter maximum 5 chsrsdter"),
            cpassword: yup
                .string()
                .required("please enter confirm pasword")
                .min(3, "please enter minimum 3 chsrsdter")
                .max(5, "please enter maximum 5 chsrsdter")
                .oneOf([yup.ref("password")], "password do not match")
        }),
        onSubmit: values => {
            const fd = new FormData()
            fd.append("name", values.name)
            fd.append("email", values.email)
            fd.append("password", values.cpassword)
            fd.append("avatar", profile)
            dispatch(userRegisterAction(fd))
        }
    })
    const handleChange = e => {
        const img = e.target.files[0]
        setprofile(img)
        const imgUrl = URL.createObjectURL(img)
        setpreview(imgUrl)
    }


    useEffect(() => {
        login && navigate('/')
    }, [login])
    return <>
        <div class="container">
            <div class="row">
                <div class="col-sm-4 col-lg-4 col-md-6 offset-sm-4 mt-5">
                    <div class="card shadow-lg p-3 mb-5 bg-white rounded">
                        <div class="card-header text-center"><strong>Register</strong></div>
                        <div class="card-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <label for="name" class="form-label text-muted">First name</label>
                                    <input
                                        name='name'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        class={formik.errors.name && formik.touched.name ? "form-control is-invalid" : "form-control"}
                                        type="text"
                                        id="name"
                                        placeholder="Enter your name"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.name}</div>
                                </div>
                                <div class="mt-2">
                                    <label for="email" class="form-label text-muted">First Email</label>
                                    <input
                                        name='email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        class={formik.errors.email && formik.touched.email ? "form-control is-invalid" : "form-control"}
                                        type="text"
                                        id="email"
                                        placeholder="Enter Your Email"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.email}</div>
                                </div>
                                <div class="mt-2">
                                    <label for="password" class="form-label text-muted">Password</label>
                                    <input
                                        name='password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        class={formik.errors.password && formik.touched.password ? "form-control is-invalid" : "form-control"}
                                        type="text"
                                        id="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.password}</div>
                                </div>
                                <div class="mt-2">
                                    <label for="cpassword" class="form-label text-muted"
                                    >Confirm Password</label
                                    >
                                    <input
                                        name='cpassword'
                                        value={formik.values.cpassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        class={formik.errors.cpassword && formik.touched.cpassword ? "form-control is-invalid" : "form-control"}
                                        type="text"
                                        id="cpassword"
                                        placeholder="Confirm Your Password"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.cpassword}</div>
                                </div>
                                <div>
                                    <label for="title" class="form-label text-muted">Blog Title</label>
                                    <input
                                        type="file"
                                        onChange={handleChange}
                                        className='form-control' />
                                    <img src={preview} className='img-fluid' alt="" />
                                </div>
                                <button type="submit" class="btn btn-success w-100 mt-3">
                                    Register
                                </button>
                                <p class="text-center mt-3">
                                    Already Have Account? <Link to='/login'><button type="button" class="btn btn-outline-success">Login Here</button></Link>
                                </p>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
