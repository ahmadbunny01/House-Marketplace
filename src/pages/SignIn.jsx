import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

const SignIn = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const inputEvent = (e) => {
        const { name, value } = e.target;
        setFormData((prevalue) => {
            return {
                ...prevalue,
                [name]: value
            }
        })
    }
    const submitEvent = (e) => {
        e.preventDefault();
        emailRef.current.value = '';
        passwordRef.current.value = '';
        console.log(formData);
    }
    const showPasswordHandle = () => {
        if (showPassword === true) {
            setShowPassword(false)
        } else if (showPassword === false) {
            setShowPassword(true)
        }
    }
    return (
        <>
            <div className="min-w-screen min-h-screen bg-slate-100">
                <div className="container mx-auto">
                    <div className="mx-3 lg:mx-12 pt-4">
                        <h1 className="text-3xl font-black border-l-4 border-green-500 py-3 px-1">Sign In</h1>
                    </div>
                    <div className="flex justify-center mt-6">
                        <div className="flex w-full lg:w-2/6 flex-col p-8">
                            <h1 className="text-2xl font-black">Welcome Back.</h1>
                            <form className="flex flex-col mt-3">
                                <label htmlFor="email" className="mt-3 font-semibold">Email</label>
                                <input ref={emailRef} type="email" id="email" name="email" value={formData.email} className="mt-1 px-2 py-2 rounded-lg w-full outline-none" onChange={inputEvent} />
                                <label htmlFor="password" className="mt-3 font-semibold">Password</label>
                                <input ref={passwordRef} type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} className="mt-1 px-2 py-2 w-full rounded-lg outline-none" onChange={inputEvent} />
                                <div className="flex justify-end">
                                    <button type="button" onClick={() => showPasswordHandle()} className="-translate-y-8 -translate-x-2"><img src={visibilityIcon} className="w-6 h-6 object-contain" alt="showPassword" /></button>
                                </div>
                                <div className="mt-3 flex justify-end">
                                    <Link to="/forgotPassword" className="font-black text-sm text-green-500 hover:opacity-80">Forgot Password</Link>
                                </div>
                                <div className="flex justify-between mt-6 items-center">
                                    <h1 className="text-lg font-black">Sign In</h1>
                                    <button type="submit" onClick={submitEvent}><ArrowRightIcon fill="white" className="bg-green-500 rounded-full w-10 h-10 hover:translate-x-1 transition-all duration-500 hover:opacity-80" /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn;