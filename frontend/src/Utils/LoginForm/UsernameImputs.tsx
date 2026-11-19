import { addErrorStyles, removeErrorStyles } from "./ErrorStyles";
import { useState } from "react";
import { ShowPassword, HidePassword } from "../../components/icons";

export const useImputsHooks = () => {
    const [username, setUsername] = useState<string>('');
    const [usernameError, setUsernameError] = useState<null | string>(null);
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<null | string>(null);
    const [passwordAgain, setPasswordAgain] = useState<string>('');
    const [passwordAgainError, setPasswordAgainError] = useState<null | string>(null);
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<null | string>(null);

  return { username, setUsername, usernameError, setUsernameError, password, setPassword,
    passwordError, setPasswordError, passwordAgain, setPasswordAgain, passwordAgainError,
    setPasswordAgainError, email, setEmail, emailError, setEmailError
   };
};

type InputFormState = ReturnType<typeof useImputsHooks>;

export const UsernameField = ({ form }: { form: InputFormState }) => {
    const { username, setUsername, usernameError, setUsernameError } = form;
    const filterUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        const value = e.target.value;

        if (value === "") {
            setUsername("");
            setUsernameError(null);
        /*remove red color for error*/
            removeErrorStyles(target);
            return;
        }
        
        const nameCheck = /^[\da-zA-ZáčďéěíňóřšťůúýžÁČĎÉĚÍŇÓŘŠŤŮÚÝŽ_-]+$/g;

        const passedArr = value.match(nameCheck);

        if (!passedArr){
            /*display red color for error*/
            setUsernameError("Používej pouze: písmena, čísla, _, -");
            addErrorStyles(target);
            return;
        }

        setUsername(passedArr.join());
        setUsernameError(null);

        /*remove red color for error*/
        removeErrorStyles(target);    
    }

    return (
        <div className="ring-2 ring-outline w-11/12">
            <p className="form-cell-text my-1 w-40" id="usernameDescription">Jméno na stránce</p>
            <div className="input-flex">
              <label className="w-30" htmlFor="username">Jméno:</label>
              <input
                id="username"
                maxLength={40}
                className="m-2 mb-4 ring-2 focus:ring-base-h ring-input-outline"
                type="text"
                value={username}
                onChange={(e) => filterUsername(e)}
                autoComplete="username"
                required
              />
              </div>
            {usernameError && <p className="error ml-18 my-2">{usernameError}</p>}
          </div>
    )
}

export const PasswordField = ({ form, hideInstructions = false }: { form: InputFormState; hideInstructions?: boolean }) => {
    const { password, setPassword, passwordError, setPasswordError } = form;
    const [passwordType, setPasswordType] = useState<string>('password');
    const [showPassword, setShowPassword] = useState<true | false>(false);

    const filterPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        const value = e.target.value;

        if (value === "") {
        setPassword("");
        setPasswordError(null);
        /*remove red color for error*/
        removeErrorStyles(target);
        return;
        }

        const numberCheck = /\d/g;
        const upperCaseCheck = /\p{Lu}/gu;
        const xssCheck = /<.+>/g;

        if (upperCaseCheck.test(value) && numberCheck.test(value) && value.length >= 8 && xssCheck.test(value) == false){
        setPassword(value);
        setPasswordError(null);

        /*remove red color for error*/
        removeErrorStyles(target);  
        return;
        } 
        else{
        setPasswordError("V heslu chybí číslo, velké písmeno, nebo je moc krátké.");
        setPassword(value);
        addErrorStyles(target);
        }
    }

    const togglePasswordVisibility = () => {
        if (showPassword){
        setShowPassword(false);
        setPasswordType("password");
        }
        else{
        setShowPassword(true);
        setPasswordType("text");
        }
    }

    return(
        <div className="ring-2 ring-outline w-11/12">
            {
                !hideInstructions  && 
                <div>
                    <p className="form-cell-text my-1 w-28">Heslo musí:</p>
                    <ul className="list-disc w-60 text-left ml-13 mb-2">
                        <li key="rule-1">Být alespoň 8 znaků</li>
                        <li key="rule-2">Obsahovat velké písmeno</li>
                        <li key="rule-3">Obsahovat číslo</li>
                    </ul>
                </div>
            }

            <div className="input-flex relative">
              <label className="w-30" htmlFor="password">Heslo:</label>
              <input
                id="password"
                maxLength={30}
                className="m-2 mt-4 mb-4 ring-2 focus:ring-base-h ring-input-outline"
                type={passwordType}
                value={password}
                onChange={(e) => filterPassword(e)}
                autoComplete="new-password"
                required
              />
              <button className="absolute top-7 right-12 no_margin" onClick={togglePasswordVisibility} type="button">{showPassword && <ShowPassword /> || <HidePassword />}</button>
            </div>
            {passwordError && <p className="error ml-18 my-2">{passwordError}</p>}
        </div>
    )

}

export const PasswordFieldAgain = ({ form }: { form: InputFormState }) => {
    const { passwordAgain, setPasswordAgain, passwordAgainError, setPasswordAgainError, password } = form;
    const [showPasswordAgain, setShowPasswordAgain] = useState<true | false>(false);
    const [passwordTypeAgain, setPasswordTypeAgain] = useState<string>('password');

    const filterPasswordAgain = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        const value = e.target.value;
        const xssCheck = /<.+>/g;

        if (value === "") {
            setPasswordAgain("");
            setPasswordAgainError(null);
            /*remove red color for error*/
            removeErrorStyles(target);
            return;
        }

        if (password === value && xssCheck.test(value) == false){
            setPasswordAgain(value);
            setPasswordAgainError(null);

            /*remove red color for error*/
            removeErrorStyles(target);
            return;
        } 
        else{
            setPasswordAgainError("Heslo není stejné.");
            setPasswordAgain(value);
            addErrorStyles(target);
        }
    }

    const togglePasswordAgainVisibility = () => {
        if (showPasswordAgain){
        setShowPasswordAgain(false);
        setPasswordTypeAgain("password");
        }
        else{
        setShowPasswordAgain(true);
        setPasswordTypeAgain("text");
        }
    }

    return(
        <div className="ring-2 ring-outline w-11/12">
            <p className="form-cell-text my-1 w-65">Pro ověření uveďte heslo znovu</p>
            <div className="input-flex relative">
              <label className="w-30" htmlFor="passwordAgain">Heslo znovu:</label>
              <input
                id="passwordAgain"
                maxLength={30}
                className="m-2 mb-4 ring-2 focus:ring-base-h ring-input-outline"
                type={passwordTypeAgain}
                value={passwordAgain}
                onChange={(e) => filterPasswordAgain(e)}
                autoComplete="new-password"
                required
              />
              <button className="absolute top-5 right-12 no_margin" onClick={togglePasswordAgainVisibility} type="button">{showPasswordAgain && <ShowPassword /> || <HidePassword />}</button>
            </div>
            {passwordAgainError && <p className="error ml-18 my-2">{passwordAgainError}</p>}
        </div>
    )

}

export const EmailField = ({ form }: { form: InputFormState }) => {
    const { email, setEmail, emailError, setEmailError } = form;

    const filterEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        const value = e.target.value;

        if (value === "") {
        setEmail("");
        setEmailError(null);
        /*remove red color for error*/
        removeErrorStyles(target);
        return;
        }

        const emailCheck = /^.+@.+\..+$/g;
        const xssCheck = /<.+>/g;

        if (emailCheck.test(value) && xssCheck.test(value) == false){
        console.log(xssCheck.test(value))
        setEmail(value);
        setEmailError(null);

        /*remove red color for error*/
        removeErrorStyles(target);
        return;
        } 
        else{
        setEmailError("Použijte validní email.");
        setEmail(value);
        addErrorStyles(target);
        }
    }

    return(
        <div className="ring-2 ring-outline w-11/12">
        <p className="form-cell-text my-1 w-28">Platný email</p>
        <div className="input-flex">
            <label className="w-30" htmlFor="email">Email:</label>
            <input
            id="email"
            maxLength={40}
            className="m-2 mb-4 ring-2 focus:ring-base-h ring-input-outline"
            type="text"
            value={email}
            onChange={(e) => filterEmail(e)}
            autoComplete="email"
            required
            />
        </div>
        {emailError && <p className="error ml-18 my-2">{emailError}</p>}
        </div>
    )
}