import {Button, Form, Input, Space} from "antd";
import React from "react";
import {withTranslation} from "react-i18next";
import {InboxOutlined} from "@ant-design/icons";
import Dragger from "antd/lib/upload/Dragger";
import {isValueEmpty} from "../../../../Utils/empty";
import apiAddress from "../../../../Utils/API/apiAddress";
import {fileUpload, fileUploadWithoutMD5} from "../../../../Utils/fileUpload";

interface ItemUploadPropsType {
    label: string       // Form 标签
    name: string        // Form 字段
    accept: string      // 可接受的文件类型
}

/**
 * @function: 提交文件集合
 * */
const ItemUploadMulti = (props: ItemUploadPropsType & any) => {

    return (
        <>
            <Form.Item
                label={props.label ?? "上传文件"}
                name={props.name}
                rules={[{required: props.required}]}
            >
                <UploadPro {...props}/>
            </Form.Item>
        </>
    )
}

const UploadPro = (props: any)=>{

    const {value, onChange} = props

    let nameList: string[] = []
    for (let nm of props.accept.split(",")) {
        nameList.push("*" + nm)
    }
    let nameListStr = ""
    for (let x of nameList) {
        if (nameListStr.length !== 0) nameListStr += "/"
        nameListStr += x;
    }

    return (
        <>
            <Dragger
                multiple={true}
                accept={props.accept}
                action=""
                listType="text"
                showUploadList={true}
                beforeUpload={() => false}
                onChange={(info)=>{
                    let fileListOrg: any = []
                    for(let x of info.fileList){
                        fileListOrg.push(x.originFileObj)
                    }
                    onChange(fileListOrg)
                }}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
                <p className="ant-upload-hint">
                    请上传一个或多个 {nameListStr} 文件
                </p>
            </Dragger>
        </>
    )
}

export default withTranslation()(ItemUploadMulti)