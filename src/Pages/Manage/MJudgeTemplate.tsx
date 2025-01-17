import React, {Component} from "react";
import {Role, Sex} from "../../Type/Iuser";
import {ManOutlined, QuestionOutlined, WomanOutlined} from "@ant-design/icons";
import {Button, Card, Space, Tag} from "antd";
import TableWithSelection from "../../Component/common/Table/TableWithSelection";
import MApi from "../../Utils/API/m-api";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import TableWithPagination from "../../Component/common/Table/TableWithPagination";
import {unix2Time} from "../../Utils/Time";
import UserFormProfile from "../../Component/user/Form/UserFormProfile";
import UserFormAdditional from "../../Component/user/Form/UserFormAdditional";
import mApi from "../../Utils/API/m-api";
import ModalFormUseForm from "../../Component/common/Form/ModalFormUseForm";
import TemplateMForm from "../../Component/judgeTemplate/Form/TemplateMForm";

const MJudgeTemplate = (props: any) => {
    const pathArray = props.location.pathname.split("/")
    const type = pathArray[pathArray.length - 1]

    let colData: any[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 50,
            responsive: ["lg", "sm", "xs"]
        },
        {
            title: props.t("Owner"),
            dataIndex: "username",
            width: "auto",
            responsive: ["lg"],
        },
        {
            title: props.t("title"),
            dataIndex: "title",
            width: "auto",
            responsive: ["lg", "sm"],
        },
        {
            title: props.t("comment"),
            dataIndex: "comment",
            width: "auto",
            responsive: ["lg"],
        },
        {
            title: props.t("CreateTime"),
            dataIndex: "gmtCreate",
            width: "auto",
            responsive: ["lg", "sm"],
            render: (text: string) => {
                return unix2Time(parseInt(text))
            }
        },
        {
            title: props.t("ModifiedTime"),
            dataIndex: "gmtModified",
            width: "auto",
            responsive: ["lg", "sm"],
            render: (text: string) => {
                return unix2Time(parseInt(text))
            }
        },
        {
            title: props.t("operator"),
            width: "150px",
            render: (text: any, rows: any) => {
                return <Space size={3}>
                    <ModalFormUseForm
                        TableName={`TemplateList-${type}`}
                        width={600}
                        title={rows.title}
                        type={"update"}
                        subForm={[
                            {
                                component: <TemplateMForm/>,
                                label: ""
                            },
                        ]}
                        dataLoader={async () => {
                            return mApi.getOneTemplate({id: rows.id}).then((value: any) => {
                                return Promise.resolve(value)
                            })
                        }}
                        updateAppendProps={{id: rows.id}}
                        dataSubmitter={(value: any) => {
                            return mApi.updateTemplate({type: type === "io" ? 0 : 2, ...value})
                        }}
                    />
                    <ModalFormUseForm
                        TableName={`TemplateList-${type}`}
                        width={600}
                        title={"新建模板(克隆自" + rows.title + ")"}
                        type={"fork"}
                        subForm={[
                            {
                                component: <TemplateMForm/>,
                                label: ""
                            },
                        ]}
                        dataLoader={async () => {
                            return mApi.getOneTemplate({id: rows.id}).then((value: any) => {
                                return Promise.resolve(value)
                            })
                        }}
                        dataSubmitter={(value: any) => {
                            return mApi.createTemplate({type: type === "io" ? 0 : 2, ...value})
                        }}
                    />
                </Space>
            }
        }
    ]

    return (
        <div style={{marginTop: -20, overflow: "hidden"}}>
            <Card
                size={"small"}
                bordered={false}
                title={type === "io" ? "基础IO模板" : "高阶评测模板"}
                extra={
                    <>
                        <ModalFormUseForm
                            TableName={`TemplateList-${type}`}
                            width={600}
                            title={"新建模板"}
                            type={"create"}
                            subForm={[
                                {
                                    component: <TemplateMForm/>,
                                    label: ""
                                },
                            ]}
                            dataSubmitter={(value: any) => {
                                return mApi.createTemplate({type: type === "io" ? 0 : 2, ...value})
                            }}
                        />
                    </>
                }
            >
                <TableWithPagination
                    name={`TemplateList-${type}`}
                    columns={colData}
                    API={(paras: any) => {
                        return MApi.pageTemplateList({...paras, type: type === "io" ? 0 : 2})
                    }}
                    size={"small"}
                    rowKey={"id"}
                />
            </Card>
        </div>
    )

}

export default withTranslation()(withRouter(MJudgeTemplate))