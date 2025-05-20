import { useState, useEffect } from 'react';
import styles from './Register.module.css';
import { useAuthentication } from '../hooks/useAuthentication';
 
const Register = () => {
    const [displayName, setName] = useState('');
    const [displayEmail, setEmail] = useState('');
    const [displayPassword, setPassword] = useState('');
    const [displayConfirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const {createUser, error: AuthError, loading} = useAuthentication();
 
    const handleSubmit = async(e)=> {
        e.preventDefault();
 
        setError("")
 
        const user = {
            displayName,
            displayEmail,
            displayPassword
        }
     
        if (displayPassword !== displayConfirm) {
            setError("As senhas precisam ser iguais!")
            return
        }
        const res = await createUser(user);
    }

    useEffect(() => {
        if(AuthError){
            setError(AuthError);
        }
    }, [AuthError]);
 
    return (
        <div className={styles.register}>
            <h2>Cadastre-se para ter Acesso ao Site</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>
                        Nome:
                    </span>
                    <input type="text" name="displayName" required placeholder="Nome do Usuário" />
                    value={displayName}
                    onChange={(e) => displayName(e.target.value)}
                </label>
                <label>
                    <span>
                        E-mail:
                    </span>
                    <input type="text" name="displayName" required placeholder="E-mail" />
                    value={displayEmail}
                    onChange={(e) => setEmail(e.target.value)}
                </label>
                <label>
                    <span>
                        Senha:
                    </span>
                    <input type="password" name="displayName" required placeholder="Senha" />
                    value={displayPassword}
                    onChange={(e) => setPassword(e.target.value)}
                </label>
                <label>
                    <span>
                        Confirmar Senha:
                    </span>
                    <input type="password" name="displayName" required placeholder="Repetir Senha" />
                    value={displayConfirm}
                    onChange={(e) => setConfirm(e.target.value)}
                </label>
                {!loading && <button className="btn">Cadastrar</button>}
                {loading &&  <button className="btn" disabled>Aguarde...</button>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}
 
export default Register