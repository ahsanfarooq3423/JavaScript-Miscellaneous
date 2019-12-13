import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {

    state = {
        controls : {
            email: {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : 'Mail Address'
                },
                value : '',
                validation : {
                    required : true,
                    isEmail : true
                },
                valid : false,
                touched : false
            },

            password: {
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder : 'Password'
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 6
                },
                valid : false,
                touched : false
            }
        }
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id : key,
                config : this.state.orderForm[key]
            });
        }

        const form = formElementArray.map(formElement => {
            <Input
                key = {formElement.id}
                elementType = {formElement.config.elementType}
                invalid = {!formElement.config.valid}
                shouldValidate = {formElement.config.valid}
                touched = {formElement.config.touched}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value}
                changed = {(event) => this.inputChangeHandler(event, formElement.id )}
            />
        })

        return(
            <div>
                <form>
                    {form}
                    <Button btnType = "Succes">SUBMIT</Button>
                </form>
            </div>
        )
    }
}

export default Auth;