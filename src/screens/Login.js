import React from "react";
import styles from "./Login.module.css";

const Login = () => {
    return (
        <div>
            <h2>Faça seu login</h2>
            <form>
                <label>
                    <span>E-mail:</span>
                    <input type="text" name="displayName" required placeholder="E-mail" />
                </label>
                
                <label>
                    <span>Senha:</span>
                    <input type="password" name="password" required placeholder="Senha" />
                </label>
                
                <button className="btnEntrar">
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default Login;
