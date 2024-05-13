"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { FiKey } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import Banner from "@/components/banner";
import { account, ID } from "@/ts/appwrite";
import PopUp from "@/components/popUp";

export default function UserSignUp() {
    const router = useRouter();

    function GetParameterValues(param: string) {  
        var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');  
        for (var i = 0; i < url.length; i++) {  
            var urlparam = url[i].split('=');  
            if (urlparam[0] == param) {  
                return urlparam[1];  
            }  
        }  
    }
    const show = GetParameterValues("show");
    console.log('SHOW',show);

    const [form, setForm] = useState("SignUp");
    function handleform(getForm: string) {
        setForm(getForm);
    }

    const [values, setValues] = useState({username: '', email: '', password: '', confirm_password: ''});
    const handleChange = (event: any) => {
        setValues((prevState) => ({
            ...prevState, [event.target.name] : event.target.value
        }));
    };

    const [registrationErrors, setRegistrationErrors] = useState({
        isCustomError: false,
        customError: "",
        usernameError: false,
        passwordError: false,
        emailError: false,
        confirmPasswordError: false
    });
    const [loginErrors, setLoginErrors] = useState({
        isCustomError: false,
        customError: "",
        passwordError: false,
        emailError: false,
    });

    function SignUp(formData: {username: string, email: string, password: string, confirm_password: string}) {
        console.log(formData);
        const {username, email, password, confirm_password} = formData;

        function isValidEmail(email: string) {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            return regex.test(email);
        }
    
        function isValidPassword(password: string) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
            return regex.test(password);
        }
    
        function isValidConfirmPassword(password: string, confirm_password: string) {
            return password === confirm_password;
        }
    
        function isValidUsername(username: string) {
            const regex = /^[a-z A-z]{6,30}/g;
            return regex.test(username);
        }
        
        const newErrors = {
            isCustomError: false,
            customError: "",
            usernameError: !isValidUsername(username),
            emailError: !isValidEmail(email),
            passwordError: !isValidPassword(password),
            confirmPasswordError: !isValidConfirmPassword(password, confirm_password)
        };
        

        const registerUser = async () => {
            const register = await account.create(ID.unique(), email, password, username).catch(
                    (error: any) => {
                        console.log(error.message);
                        if(error.message === 'The password you are trying to use contains references to your name, email, phone or userID. For your security, please choose a different password and try again.') {
                            newErrors.isCustomError = true;
                            newErrors.customError = error.message;
                            setRegistrationErrors(newErrors);
                        }else if(error.message === 'Rate limit for the current endpoint has been exceeded. Please try again after some time.') {
    
                        }else if (error.message === 'A user with the same id, email, or phone already exists in this project.') {
                            
                        }
                    }
                );
            console.log(register);
            router.push('/?show=true');
            if(register) {
                setForm('SignIn');
            }
        }
    
        let proceed = Object.values(newErrors).every(error => !error);
    
        if (proceed) {
            registerUser();
        }
    
        console.log(`USERNAME ERROR : ${registrationErrors.usernameError}`);
        console.log(`MAIL ERROR : ${registrationErrors.emailError}`);
        console.log(`PASSWORDERROR ERROR : ${registrationErrors.passwordError}`);
        console.log(`CONFIRMPASSWORD ERROR : ${registrationErrors.confirmPasswordError}`);
        return newErrors;
    }

    const Login = (formData: {email: string, password: string}) => {
        const { password, email } = formData;
    
        function isValidEmail(email: string) {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            return regex.test(email);
        }
    
        function isValidPassword(password: string) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
            return regex.test(password);
        }
        
        const newErrors = {
            isCustomError: false,
            customError: "",
            emailError: !isValidEmail(email),
            passwordError: !isValidPassword(password),
        };
    
        const loginUser = async () => {
            try {
                const userLogin =  await account.createEmailSession(email, password).catch(
                    (error: any) => {
                        console.log(error.message);
                        newErrors.isCustomError = true;
                        newErrors.customError = error.message;
                        setLoginErrors(newErrors);
                    }
                );
                console.log('userLogin',userLogin);
                const user = await account.get();
                if(userLogin) {
                    localStorage.setItem('user', JSON.stringify({'userId': user.$id, 'email': email}));
                    router.push('http://localhost:3000/store');
                }
            }catch {
                (e: any) => console.log(e);
            }
            
        }
        
        let proceed = Object.values(newErrors).every(error => !error);
        
        if (proceed) {
            loginUser();
        }
    
        console.log(`MAIL ERROR : ${newErrors.emailError}`);
        console.log(`PASSWORDERROR ERROR : ${newErrors.passwordError}`);
        return newErrors;
    }
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const signUpErrors = form === 'SignUp' ? SignUp(values) : registrationErrors;
        console.log(signUpErrors);
        const signInErrors = form === 'SignUp' ? loginErrors : Login(values);
        console.log(signInErrors);
        form === 'SignUp' ? setRegistrationErrors(signUpErrors) : setLoginErrors(signInErrors);
    }
    const [showPassword, setShowPassword] = useState(false);
    function showOrHidePassword() {
        setShowPassword(!showPassword);
    }
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    function showOrHideConfirmPassword() {
        setShowConfirmPassword(!showConfirmPassword);
    }
    return (
        <>
            <Banner title={form} description={`${form === "SignUp" ? "Sign Up" : "Sign In"} with your email to read the awesome books of your favorite authors in our website for free!`}/>
            <main className="sm:px-1 lg:py-20 lg:px-72">
                <section className="sign-up-container bg-secondary-bg-color text-center p-8">
                    <h1 className="form-title font-cardo text-center text-primary-color text-xxl font-bold pb-4 underline decoration-quaternary-color decoration-solid underline-offset-8">{form === "SignUp" ? "Create Account" : "Login"}</h1>
                    <p className="form-description font-inter text-center text-secondary-font-color text-sm font-normal leading-7 pb-8 ">{`${form === "SignUp" ? "Sign Up" : "Sign In"} with your email to read the awesome books of your favorite authors in our website for free!`}</p>
                    <p className={`${registrationErrors.isCustomError ? 'block' : 'hidden'} text-center font-inter text-red-600 text-sm`}>{registrationErrors.customError}</p>
                    <p className={`${loginErrors.isCustomError ? 'block' : 'hidden'} text-center font-inter text-red-600 text-sm`}>{loginErrors.customError}</p>
                    <form className="sign-up-form" onSubmit={(event) => {handleSubmit(event)}} action="" method="post">
                        <FaRegUser className={`${form === "SignUp" ? "" : "hidden"} inline text-quaternary-color`} /><input value={values.username} type="text" name="username" onChange={(event) => {handleChange(event)}} className={`${form === "SignUp" ? "" : "hidden"} username font-inter text-secondary-font-color text-m p-2 w-4/5 md:w-96 m-4 border-solid border border-input-border-color font-normal`} placeholder="Username..." required={form === 'SignUp'}/><br/>
                        <p className={`${registrationErrors.usernameError ? 'block' : 'hidden'} text-center font-inter text-red-600 text-sm`}>{`Must contain atleast 6 and atmost 30 characters`}</p>
                        <MdOutlineEmail className="inline text-quaternary-color"/><input value={values.email} type="email" name="email" onChange={(event) => {handleChange(event)}} className={`email font-inter text-secondary-font-color text-m p-2 w-4/5 md:w-96 m-4 border-solid border border-input-border-color font-normal`} placeholder="Email..." required/><br/>
                        <p className={`${registrationErrors.emailError ? 'block' : 'hidden'} text-center font-inter text-red-600 text-sm`}>{`Provide a valid email`}</p>
                        <p className={`${loginErrors.emailError ? 'block' : 'hidden'} text-center font-inter text-red-600 text-sm`}>{`Provide a valid email`}</p>
                        <FiKey className="inline text-quaternary-color" /><div className="relative inline"><input value={values.password} type={showPassword ? 'text' : 'password'} name="password" onChange={(event) => {handleChange(event)}} className={`password font-inter text-secondary-font-color text-m p-2 w-4/5 md:w-96 m-4 border-solid border border-input-border-color font-normal `} placeholder="Password..." required/>{showPassword ? <FaEye onClick={() => showOrHidePassword()} className="inline cursor-pointer text-quaternary-color absolute top-[2px] right-[35px]"/> : <FaEyeSlash onClick={() => showOrHidePassword()} className="inline cursor-pointer text-quaternary-color absolute top-[2px] right-[35px]"/>}</div><br/>
                        <p className={`${registrationErrors.passwordError ? 'block' : 'hidden'} text-center font-inter text-red-600 text-sm`}>{`Password should be atleast 8 and atmost 16 characters. Must contain atleast 1 lowercase letter, 1 uppercase letter, 1 digit and 1 special character and should not be related to your username/ email`}</p>
                        <p className={`${loginErrors.passwordError ? 'block' : 'hidden'} text-center font-inter text-red-600 text-sm`}>{`Provide a correct password`}</p>
                        <FiKey className={`${form === "SignUp" ? "" : "hidden"} inline text-quaternary-color`} /><div className="relative inline"><input value={values.confirm_password} type={showConfirmPassword ? 'text' : 'password'} name="confirm_password" onChange={(event) => {handleChange(event)}} className={`${form === "SignUp" ? "" : "hidden"} confirm-password font-inter text-secondary-font-color text-m p-2 w-4/5 md:w-96 m-4 border-solid border border-input-border-color font-normal`} placeholder="Confirm Password..."  required={form === 'SignUp'}/>{showConfirmPassword ? <FaEye onClick={() => showOrHideConfirmPassword()} className={`${form === "SignUp" ? "" : "hidden"} cursor-pointer inline text-quaternary-color absolute top-[2px] right-[35px]`}/> : <FaEyeSlash onClick={() => showOrHideConfirmPassword()} className={`${form === "SignUp" ? "" : "hidden"} cursor-pointer inline text-quaternary-color absolute top-[2px] right-[35px]`}/>}</div><br/>
                        <p className={`${registrationErrors.confirmPasswordError ? 'block' : 'hidden'} text-center font-inter text-red-600 text-sm`}>{`Match the Password`}</p>
                        <input type="submit" className="submit font-cardo text-primary-color text-m p-2 w-4/5 md:w-96 m-4 bg-quaternary-color font-bold cursor-pointer"></input>
                    </form>
                    <p className="font-cardo text-center text-primary-color text-m font-normal leading-7 pb-3">{form === "Sign Up" ? "Have an account?" : "Create an account"}<a onClick={() => {handleform(form === "SignUp" ? "SignIn" : "SignUp")}} className="change-form no-underline pl-2 cursor-pointer">{form === "SignUp" ? "Sign In" : "Sign Up"}</a></p>
                    <p className="font-inter text-center text-secondary-font-color text-sm font-normal leading-7 pb-3"><span className="px-3 lg:px-5">Terms of Service</span><span className="px-3 lg:px-5">Privacy</span><span className="px-3 lg:px-5">Help</span></p>
                    <p className="font-inter text-center text-secondary-font-color text-sm font-normal leading-7 pb-3"><i className="fa fa-regular fa-copyright fa-sm pr-2"></i> 2023 Pages, Inc.</p>
                </section>
                {show === 'true' ? <PopUp category="User" message="Registered Successfully! Login to your account"/> : null }
            </main>
        </>
  );
}