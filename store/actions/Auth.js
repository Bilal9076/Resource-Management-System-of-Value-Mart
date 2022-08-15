import AsyncStorage from '@react-native-async-storage/async-storage';
export const DID_TRY_AUTO_LOGIN = 'DID_TRY_AUTO_LOGIN'
export const AUTHENTICATION = 'AUTHENTICATION'
export const LOGOUT = ' LOGOUT'

export const DidTryAutoLogin = ()=>{
    return {
        type:'DID_TRY_AUTO_LOGIN'
    }
 }

 export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(SetLogoutTimer(expiryTime));
        dispatch({
            type: AUTHENTICATION,
            userId: userId,
            token: token
        });
    };
};
export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCS9O-KfUVe_Rawm6p3eX16efYXCa2AdAs',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true

                })
            }
        );
        if (!response.ok) {
            const ResErrData = await response.json();
            const ErrorId = ResErrData.error.message;
            let message = 'Something went wrong!'
            if (ErrorId === 'EMAIL_EXISTS') {
                message = 'This email is already exist!'
            } else if (ErrorId === 'OPERATION_NOT_ALLOWED') {
                message = 'Password sign-in is disabled!'
            } else if (ErrorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                message = "Try again later!"
            }
            throw new Error(message);
        }
        const resData = await response.json();
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
        const ExpirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        SaveDataToStorage(resData.localId, resData.idToken, ExpirationDate)
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCS9O-KfUVe_Rawm6p3eX16efYXCa2AdAs',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true

                })
            }
        );
        if (!response.ok) {
            const ResErrData = await response.json();
            const ErrorId = ResErrData.error.message;
            let message = 'Something went wrong!'
            if (ErrorId === 'EMAIL_NOT_FOUND') {
                message = 'This Email can not be found!'
            } else if (ErrorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!'
            } else if (ErrorId === 'USER_DISABLED') {
                message = "This account is disabled by administrator"
            }
            throw new Error(message);
        }
        const resData = await response.json();
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
        const ExpirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        SaveDataToStorage(resData.localId, resData.idToken, ExpirationDate)
    };
};

export const Logout = () => {
    ClearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return {
        type: LOGOUT
    }
};

const ClearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const SetLogoutTimer = expiryTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(Logout());
        }, expiryTime);
    };   
};

const SaveDataToStorage = (userId, token, expirayDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expirayDate: expirayDate.toISOString()
        })
    )
}