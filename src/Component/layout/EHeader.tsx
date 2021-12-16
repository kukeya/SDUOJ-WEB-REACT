import React, {Component, Dispatch} from "react";
import UserAvatarBack from "../user/UserAvatarBack";
import {Avatar, Button, Divider, Dropdown, Layout, Menu, Space} from "antd";
import ChangeLang from "../common/ChangeLang";
import {Link} from "react-router-dom";
import {DownOutlined, LogoutOutlined} from "@ant-design/icons";
import md5 from "js-md5";
import logo from "../../Assert/img/logo.png";
import {ExamState, IUserExamInfo} from "../../Type/IExam";
import {UserState} from "../../Type/Iuser";
import {examID} from "../../Type/types";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router";
import {userGetProfileTodo, userLogoutTodo} from "../../Redux/Action/user";
import ExamOver from "../exam/ExamOver";

const {Header} = Layout;

class EHeader extends Component<any, any> {

    render() {
        return (
            <Header className="site-layout-sub-header-background" style={{minWidth: 550}}>
                <div className="logo" style={{float: "left", marginTop: "-5px", marginLeft: "-10px"}} key={"logo"}>
                    <img src={logo} style={{width: "125px", height: '30px'}}
                         alt={"SDUOJ-logo"}/>
                </div>
                <div style={{float: "right"}} key={"operator"}>
                    {
                        [''].map(()=>{
                            console.log("交卷", this.props.location.pathname)
                            if(this.props.location.pathname.match(/\/exam\/running\//) != null){
                                return <ExamOver key={"ExamOver"}/>
                                // TODO 完成交卷的处理  完成考试结束的自动跳转
                            }
                        })
                    }
                    <ChangeLang/>
                    {
                        [''].map(() => {
                            if (this.props.isLogin) {
                                return (
                                    <Dropdown overlay={
                                        <Menu onClick={this.props.userLogout}>
                                            <Menu.Item key="1" icon={<LogoutOutlined/>}>
                                                {this.props.t("Logout")}
                                            </Menu.Item>
                                        </Menu>
                                    }>
                                        <Button type="text" size={"large"}>
                                            <Space>
                                                <div style={{marginTop: -10}}>
                                                    {this.props.realName}
                                                    <Divider type="vertical"/>
                                                    {this.props.sduId}
                                                </div>
                                                <DownOutlined style={{fontSize: 10, marginBottom: 20}}/>
                                            </Space>
                                        </Button>
                                    </Dropdown>
                                )
                            }
                        })
                    }
                </div>
            </Header>
        )
    }
}


const mapStateToProps = (state: any) => {
    const UState: UserState = state.UserReducer
    const realName = UState.userInfo?.realName
    const sduId = UState.userInfo?.sduId
    return {
        isLogin: UState.isLogin,
        realName: (realName === undefined || realName === null) ? UState.userInfo?.nickname : UState.userInfo?.realName,
        sduId: (sduId === undefined || sduId === null) ? UState.userInfo?.studentId : UState.userInfo?.sduId,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    userLogout: () => dispatch(userLogoutTodo()),
    getProfile: () => dispatch(userGetProfileTodo()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withTranslation()(
        withRouter(EHeader)
    ))