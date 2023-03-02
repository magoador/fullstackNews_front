import React from "react";

import styles from "./Header.module.scss";
import userLogin from "../../assets/img/userLogin.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/slices/usersSlice";

const NewsHeader = () => {
  const dispatch = useDispatch();

  const [openLogin, setOpenLogin] = React.useState(false);
  const [hasAccaunt, setHasAccaunt] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [registered, setRegistered] = React.useState(false);
  const [loginSuccess, setLoginSuccess] = React.useState(false);

  const users = useSelector((state) => state.users.users);

  const handleOpenLogin = () => {
    setOpenLogin(!openLogin);
  };

  const formClear = () => {
    setFirstName("");
    setLastName("");
    setLogin("");
    setPassword("");
  };

  const handleHasAccaunt = () => {
    setHasAccaunt(!hasAccaunt);
    formClear();
  };

  const handleAddUser = () => {
    dispatch(addUser({ firstName, lastName, login, password }));
    setRegistered(true);
    formClear();
  };

  const handleRegistrationButtunDisabled = () => {
    if (!firstName || !lastName || !login || !password) {
      return true;
    }
    return false;
  };

  const handleLoginButtunDisabled = () => {
    if (!login || !password) {
      return true;
    }
    return false;
  };

  const handleLoginButton = () => {
    const user = users.find(
      (user) => user.login === login && user.password === password
    );
    if (user) {
      setLoginSuccess(true);
    } else {
      setLoginSuccess(false);
    }
    return user
  };

  return (
    <div className={styles.newsHeader}>
      <div className={styles.newsLink}>
        <Link to="http://localhost:3000/news">Новости</Link>
      </div>
      <div className={styles.newsAuthorization}>
        <img onClick={handleOpenLogin} width={30} src={userLogin} alt="" />
        {openLogin ? (
          hasAccaunt ? (
            loginSuccess ? (
              <div className={styles.loginForm}>
                <div className={styles.successText}>Добро пожаловать!</div>
              </div>
            ) : (
              <div className={styles.loginForm}>
                <div className={styles.description}>Логин</div>
                <div className={styles.input}>
                  <input
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                    type="text"
                    placeholder="Введите логин..."
                  />
                </div>
                <div className={styles.description}>Пароль</div>
                <div className={styles.input}>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="text"
                    placeholder="Введите пароль..."
                  />
                </div>
                <div className={styles.registrationButton}>
                  <button
                    disabled={handleLoginButtunDisabled()}
                    onClick={handleLoginButton}
                  >
                    Войти
                  </button>
                </div>
                <div className={styles.questionText} onClick={handleHasAccaunt}>
                  У меня нет аккаунта
                </div>
              </div>
            )
          ) : (
            <div className={styles.loginForm}>
              <div className={styles.description}>Имя</div>
              <div className={styles.input}>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  type="text"
                  placeholder="Введите имя..."
                />
                {!firstName && (
                  <div className={styles.inputEmptyError}>
                    Поле не может быть пустым
                  </div>
                )}
              </div>
              <div className={styles.description}>Фамилия</div>
              <div className={styles.input}>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  type="text"
                  placeholder="Введите фамилию..."
                />
                {!lastName && (
                  <div className={styles.inputEmptyError}>
                    Поле не может быть пустым
                  </div>
                )}
              </div>
              <div className={styles.description}>Логин</div>
              <div className={styles.input}>
                <input
                  onChange={(e) => setLogin(e.target.value)}
                  value={login}
                  type="text"
                  placeholder="Введите логин..."
                />
                {!login && (
                  <div className={styles.inputEmptyError}>
                    Поле не может быть пустым
                  </div>
                )}
              </div>
              <div className={styles.description}>Пароль</div>
              <div className={styles.input}>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="text"
                  placeholder="Введите пароль..."
                />
                {!password && (
                  <div className={styles.inputEmptyError}>
                    Поле не может быть пустым
                  </div>
                )}
              </div>
              <div className={styles.registrationButton}>
                <button
                  onClick={handleAddUser}
                  disabled={handleRegistrationButtunDisabled()}
                >
                  Зарегистрироваться
                </button>
              </div>
              {registered && (
                <div className={styles.registered}>Вы зарегистрировались!</div>
              )}
              <div className={styles.questionText} onClick={handleHasAccaunt}>
                У меня есть аккаунт
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default NewsHeader;
