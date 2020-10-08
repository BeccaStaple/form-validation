import React from "react"
import FormHeader from "../FormComponents/Header"
import SubmitButton from "../FormComponents/SubmitButton"

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const passwordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);



const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));

    Object.values(rest).forEach(val => {
        val === "" && (valid = false)
        console.log(valid)
    });

    return valid;
}
export default class CreateAccountForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            formErrors: {
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
        }
    }

    handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case "firstname":
                formErrors.firstname = value.length < 2 && value.length > 0 ? "minimun 2 characters required" : "";
                break;
            case "lastname":
                formErrors.lastname = value.length < 2 && value.length > 0 ? "minimum 7 characters" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value) && value.length > 0 ? "" : "invalid email address";
                break;
            case "password":
                formErrors.password = passwordRegex.test(value) && value.length > 0 ? "" : "password must be 8 characters long and contain at least 1 number & 1 letter";
                break;
            case "confirmPassword":
                formErrors.confirmPassword = value === this.state.password && value.length > 0 ? "" : "passwords do not match";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (formValid(this.state)) {
            alert(`--FORM SUBMITTED--\n Thank you ${this.state.firstname}`);
            console.log(`${this.state.firstname}`)
        } else {
            alert("FORM INVALID");
        }
    }


    render() {
        const { formErrors } = this.state;
        
        return (

            <div className="page-container">
                <div className="form-container">
                    <FormHeader />


                    <form className="form-sec" onSubmit={this.handleSubmit} formNoValidate>


                        <div className="firstname">
                            <label className="label" htmlFor="firstname">First Name</label>
                            <br />
                            <input
                                type="text"
                                className="input"
                                placeholder="first name"
                                name="firstname"
                                onChange={this.handleChange}
                            />
                            <br />
                            {formErrors.firstname.length > 0 && (
                                <span className="errorMsg">{formErrors.firstname}</span>
                            )}
                        </div>

                        <div className="lastname">
                            <label className="label" htmlFor="lastname">Last Name</label>
                            <br />
                            <input
                                type="text"
                                className="input"
                                placeholder="last name"
                                name="lastname"
                                onChange={this.handleChange}
                            />
                            {formErrors.lastname.length > 0 && (
                                <span className="errorMsg">{formErrors.lastname}</span>
                            )}
                        </div>




                        <div className="email">
                            <label className="label" htmlFor="email">Email</label>
                            <br />
                            <input type="text"
                                className="input"
                                placeholder="email"
                                name="email"
                                onChange={this.handleChange}
                            />
                            {formErrors.email.length > 0 && (
                                <span className="errorMsg">{formErrors.email}</span>
                            )}
                        </div>

                        <div className="password">
                            <label className="label" htmlFor="password">Password</label>
                            <br />
                            <input
                                type="password"
                                className="input"
                                placeholder="password"
                                name="password"
                                onChange={this.handleChange}
                            />
                            {formErrors.password.length > 0 && (
                                <span className="errorMsg">{formErrors.password}</span>
                            )}
                        </div>

                        <div className="confirmPassword">
                            <label className="label" htmlFor="confirm-password">Confirm Password</label>
                            <br />
                            <input
                                type="password"
                                className="input"
                                placeholder="confirm password"
                                name="confirmPassword"
                                onChange={this.handleChange}
                            />
                            {formErrors.confirmPassword !== formErrors.password.value && (
                                <span className="errorMsg">{formErrors.confirmPassword}</span>
                            )}
                        </div>

                        <div className="button-sec">
                            <SubmitButton />
                        </div>

                    </form>
                </div>


            </div>

        );
    }

}