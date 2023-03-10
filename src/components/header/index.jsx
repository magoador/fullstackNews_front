import React from "react";

import styles from "./Header.module.scss";
import userLogin from "../../assets/img/userLogin.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  fetchUsers,
  loginUser,
  logout,
  setLoginError,
  setRegistrationError,
} from "../../redux/slices/usersSlice";

const NewsHeader = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUsers());

    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(logRef.current)) {
        setOpenLogin(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch]);

  const [openLogin, setOpenLogin] = React.useState(false);
  const [hasAccaunt, setHasAccaunt] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const usersState = useSelector((state) => state.users);

  const logRef = React.useRef();

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
  };

  const handleRegistrationButtunDisabled = () => {
    if (
      !firstName ||
      !lastName ||
      !login ||
      !password ||
      usersState.registrationError
    ) {
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
    dispatch(loginUser({ login, password }));
  };

  const handleLogOut = () => {
    dispatch(logout());
    formClear()
  };

  const handleOnChangeLogin = (e) => {
    setLogin(e.target.value);
    dispatch(setLoginError(""));
    dispatch(setRegistrationError(""));
  };

  const handleOnChangeLogPassword = (e) => {
    setPassword(e.target.value);
    dispatch(setLoginError(""));
  };

  return (
    <div className={styles.newsHeader}>
      <div className={styles.newsLink}>
        <Link to="http://localhost:3000/news">Новости</Link>
      </div>
      <div className={styles.newsAuthorization} ref={logRef}>
        <img onClick={handleOpenLogin} width={30} src={userLogin} alt="" />
        {openLogin ? (
          usersState.token ? (
            <div className={styles.loginForm}>
              <div className={styles.logAccRow}>
                <div className={styles.logAccColumn}>
                  {usersState.loggedUser.firstName}
                </div>
                <div className={styles.logAccColumn}>
                  {usersState.loggedUser.lastName}
                </div>
              </div>
              {usersState.loggedUser.login}
              <button className={styles.logoutButton} onClick={handleLogOut}>
                Выйти из аккаунта
              </button>
            </div>
          ) : hasAccaunt ? (
            <div className={styles.loginForm}>
              <div className={styles.description}>Логин</div>
              <div className={styles.input}>
                <input
                  onChange={(e) => handleOnChangeLogin(e)}
                  value={login}
                  type="text"
                  placeholder="Введите логин..."
                />
              </div>
              <div className={styles.description}>Пароль</div>
              <div className={styles.input}>
                <input
                  onChange={(e) => handleOnChangeLogPassword(e)}
                  value={password}
                  type="text"
                  placeholder="Введите пароль..."
                />
              </div>
              <div className={styles.loginError}>{usersState.loginError}</div>
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
                  onChange={(e) => handleOnChangeLogin(e)}
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
              {usersState.registrationError && (
                <div className={styles.registrationError}>
                  {usersState.registrationError}
                </div>
              )}
              {usersState.signUp && (
                <div className={styles.logSuccess}>
                  Вы успешно зарегистрировались!
                </div>
              )}
              <div className={styles.registrationButton}>
                <button
                  onClick={handleAddUser}
                  disabled={handleRegistrationButtunDisabled()}
                >
                  Зарегистрироваться
                </button>
              </div>
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
