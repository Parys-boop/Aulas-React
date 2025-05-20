import React from "react";
import styles from "./Loja.module.css";

const Loja = () => {
    return (
        <div>
            <h2 className={styles.title}>Cadastre sua loja aqui!</h2>
            <form>
                <label>
                    <span>Nome:</span>
                    <input type="text" className={styles.input} />
                </label>

                <label>
                    <span>Cidade:</span>
                    <input type="text" className={styles.input} />
                </label>

                <label>
                    <span>Endereço:</span>
                    <input type="text" className={styles.input} />
                </label>

                <label>
                    <span>Estado:</span>
                    <input type="text" className={styles.input} />
                </label>

                <button type="submit" className={styles.button}>
                    Cadastrar
                </button>
            </form>
        </div>
    );
};

export default Loja;
