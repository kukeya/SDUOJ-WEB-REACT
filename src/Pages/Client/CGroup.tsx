import React from "react";
import {withRouter} from "react-router-dom";
import {Card, Form, Input, List, Select, Space, Tag, Typography} from "antd";
import cApi from "Utils/API/c-api"
import {ClockCircleOutlined, UserOutlined} from "@ant-design/icons";
import {unix2Date} from "../../Utils/Time";
import Avatar from "../../Component/user/Avatar";
import {isValueEmpty} from "../../Utils/empty";
import QuitGroupBtn from "../../Component/group/QuitGroupBtn";
import JoinGroupBtn from "../../Component/group/JoinGroupBtn";
import {UrlPrefix} from "../../Config/constValue";
import TableWithPagination from "../../Component/common/Table/TableWithPagination";

const CGroup = (props: any) => {


    return (
        <>
            <div style={{textAlign: "center", margin: "0 auto"}}>
                <div style={{textAlign: "left", maxWidth: "1500px", margin: "0 auto"}}>
                    {/*<Button onClick={() => {*/}
                    {/*    props.history.push("/group")*/}
                    {/*    window.location.reload()*/}
                    {/*}}>*/}
                    {/*    返回老版 Group*/}
                    {/*</Button>*/}
                    <div className={"GroupPage"}>
                        <TableWithPagination
                            useList={true}
                            cardProps={{}}
                            name={"GroupList"}
                            title={"用户组"}
                            API={cApi.getGroupList}
                            size={"small"}
                            grid={{gutter: 8, column: 4, md: 2, lg: 3, xl: 3, sm: 2, xs: 1}}
                            initRequestProps={{isParticipating: "1"}}
                            getForm={(onFinish: any) => {
                                return (
                                    <Space size={30}>
                                        <Form.Item label={"搜索"} name={"title"}>
                                            <Input onPressEnter={() => {
                                                onFinish()
                                            }}/>
                                        </Form.Item>
                                        <Form.Item label={"分类"} name={"isParticipating"}>
                                            <Select onChange={onFinish} style={{width: 80}}
                                                    defaultValue={"1"}>
                                                <Select.Option value={"1"}>我的</Select.Option>
                                                <Select.Option value={"0"}>全部</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Space>
                                )
                            }}
                            useFormBtn={false}
                            defaultPageSize={12}
                            renderItem={(item: any) => {
                                if(item.status === null)
                                    item.status = 0
                                return (
                                    <List.Item
                                        key={item.groupId}
                                    >
                                        <Card
                                            extra={
                                                <>
                                                    {item.status === 1 && (
                                                        <Tag color={"green"}>申请中</Tag>
                                                    )}
                                                    {item.status === 2 && (
                                                        <QuitGroupBtn groupId={item.groupId} groupName={item.title}/>
                                                    )}
                                                    {item.status === 3 && (
                                                        <Tag color={"orange"}>申请被拒绝</Tag>
                                                    )}
                                                    {(item.status === 0 || item.status === 3) && item.openness !== 2 && (
                                                        <JoinGroupBtn groupId={item.groupId} groupName={item.title}/>
                                                    )}
                                                    {item.status === 0 && item.openness === 2 && (
                                                        <Tag color={"red"}>私有</Tag>
                                                    )}
                                                </>
                                            }
                                            title={
                                                <a type={"text"}>
                                                    <Typography.Title
                                                        level={5}
                                                        ellipsis={{rows: 1, tooltip: item.title}}
                                                        style={{marginBottom: 0}}
                                                        onClick={() => {
                                                            props.history.push(UrlPrefix + "/group/" + item.groupId)
                                                        }}>{item.title}</Typography.Title>
                                                </a>
                                            }
                                            size={"small"}
                                            className={"GroupListItemCard"}
                                            actions={[
                                                <span> <ClockCircleOutlined/> {unix2Date(item.gmtCreate)}</span>,
                                                <span> <UserOutlined/> {item.memberNum}</span>
                                            ]}
                                        >
                                            <List.Item.Meta
                                                style={{padding: 12, margin: 0}}
                                                avatar={
                                                    <div onClick={() => {
                                                        props.history.push(UrlPrefix + "/group/" + item.groupId)
                                                    }}>
                                                        <Avatar email={item.owner.email} shape={"square"} size={60}/>
                                                    </div>
                                                }
                                                description={
                                                    <>
                                                        <div>创建人：{item.owner.username}</div>
                                                        <div>
                                                            <Typography.Paragraph
                                                                ellipsis={{rows: 2, expandable: true, symbol: '更多'}}
                                                                style={{marginBottom: 0, color: "rgba(0, 0, 0, 0.45)"}}
                                                            >
                                                                简介：{isValueEmpty(item.description) ? "无" : item.description}
                                                            </Typography.Paragraph>
                                                        </div>
                                                    </>
                                                }
                                            />
                                        </Card>
                                    </List.Item>
                                )
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );

}

export default withRouter(CGroup)