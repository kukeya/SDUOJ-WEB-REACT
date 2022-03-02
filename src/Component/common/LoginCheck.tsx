import {withRouter} from "react-router-dom";
import {Dispatch, useEffect} from "react";
import {examID} from "../../Type/types";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {UserReducer} from "../../Redux/Reducer/user";
import {UserInfo, UserState} from "../../Type/Iuser";
import cApi from "Utils/API/c-api"

const LoginCheck = (props: any) => {

    useEffect(()=>{
        if(props.isLogin === false){
            cApi.getProfile().then((res: any)=>{
                props.setUserInfo({type: "setUserInfo", data: res})
                props.userLogin({type: "userLogin"})
            }).catch(()=>{
                props.history.push("/v2/login?to=" + props.location.pathname)
            })
        }
    }, [props.isLogin])

    return (
        <></>
    )
}


const mapStateToProps = (state: any) => {
    const State: UserState = state.UserReducer
    return {isLogin: State.isLogin}
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUserInfo: (data: any) => dispatch(data),
    userLogin: (data: any) => dispatch(data)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(withRouter(LoginCheck)))