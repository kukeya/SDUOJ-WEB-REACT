import React, {Component} from "react";
import {Avatar, Button, Divider, Popover, Space} from "antd";
import {withRouter} from "react-router-dom";
import {RightOutlined, UserOutlined} from '@ant-design/icons';
import {withTranslation} from "react-i18next";
import md5 from "js-md5";
import UserAvatar from "./Avatar";


class UserAvatarBack extends Component<any, any> {
    render() {
        return (
            <>
                <Popover content={this.props.t("backToOJ")}>
                    <Button type="text" size={"large"}>
                        <div onClick={() => {
                            this.props.history.push("/v2")
                        }}>
                            <Space>
                                <div style={{marginTop: -10}}>
                                    {
                                        this.props.email != null && (
                                            <>
                                                <UserAvatar email={this.props.email}/>
                                                <Divider type="vertical"/>
                                            </>
                                        )
                                    }
                                    {this.props.username}
                                </div>
                                <RightOutlined style={{fontSize: 10, marginBottom: 20}}/>
                            </Space>
                        </div>
                    </Button>
                </Popover>
            </>
        )
    }
}

export default withTranslation()(withRouter(UserAvatarBack))