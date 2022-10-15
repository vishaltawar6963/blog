import React from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { userLoginAction } from '../redux/action/authAction';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { login } = useSelector(state => state.auth)
    const formik = useFormik({
        initialValues: {
            email: "admin@gmail.com",
            password: "123"
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .required("please Enter Valid Email"),
            password: yup
                .string()
                .required("please Enter valid password")
        }),
        onSubmit: values => {
            console.log(values);
            dispatch(userLoginAction(values))
        }
    })
    useEffect(() => {
        login && navigate('/')
        login && toast.success("Login Successfully", {
            position: toast.POSITION.TOP_CENTER
        })
    }, [login])

    return <>
        <div class="container">
            <div class="row">
                <div class="col-sm-4 col-lg-4 col-md-6 offset-sm-4 mt-5">
                    <div class="card mt-5 shadow-lg p-3 mb-5 bg-white rounded">
                        <div class="card-header text-center"><strong>Login</strong></div>
                        <div class="card-body">
                            <div>
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
                                    type="password"
                                    id="password"
                                    placeholder="Enter Your Password"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">{formik.errors.password}</div>
                            </div>
                            <button type="button" onClick={formik.handleSubmit} class="btn btn-success w-100 mt-3">
                                Login
                            </button>
                            <p class="text-center mt-3">
                                Dont Have Account? <Link to='/register'><button type="button" class="btn btn-outline-success">Register Here</button></Link>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
