import {Button, Card, Form, Space, Table} from "antd";
import React, {Dispatch, useEffect, useState} from "react";
import {defaultPageSize} from "../../../Config/constValue";
import {UserState} from "../../../Type/Iuser";
import {ManageState} from "../../../Type/IManage";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router";
import Search from "antd/es/input/Search";
import {TableState} from "../../../Type/ITable";
import {ck} from "../../../Utils/empty";
import {SizeType} from "antd/lib/config-provider/SizeContext";
import {ColumnsType} from "antd/lib/table/interface";
import {useForm} from "antd/es/form/Form";

export interface TableWithPaginationProps {
    API: any                  // 表格查询数据的接口
    size: SizeType            // 表格的大小
    columns: ColumnsType<any> // 表格的列
    name: string              // 表格名称
    APIRowsTransForm?: any    // 针对API传输的数据进行转化的函数
    search?: boolean          // 是否开启搜索功能
    defaultPageSize?: number  // 表格默认的页大小

    // 面向 可选择的行 开放的接口
    // setDataSource?: any       // 输出当前表格的数据
    rowKey?: any              // 作为 key 记录的值
    rowSelection?: any        // 可选列的相关配置

}

const TableWithPagination = (props: any) => {
    const [total, setTotal] = useState<number>(0)                   // 项的总数
    const [tableData, setTableDataX] = useState()                            // 表格核心数据
    const [loading, setLoading] = useState(true)                    // 表格的加载状态
    const [PageNow, setPageNow] = useState<number>(1)               // 当前的页码数
    const [PageSize, setPageSize] = useState<number>(ck(props.defaultPageSize, defaultPageSize))         // 当前的页大小
    const [searchText, setSearchText] = useState<string | undefined>()        // 搜索的文本
    const [tableVersion, setTableVersion] = useState<number>(0)     // 表格版本（控制表格刷新）

    const setTableData = (data: any) => {
        setTableDataX(data)
        // 若有 选中行 的相关配置，传递数据进行更新
        if (props.setDataSource !== undefined && props.name !== undefined)
            props.setDataSource(data, props.name)
    }

    const getInfo = (pageNow: number, pageSize?: number, searchKey?: string, moreProps?: any) => {
        let ps = pageSize === undefined ? PageSize : pageSize
        setPageNow(pageNow)
        setPageSize(ps)
        setLoading(true)
        props.API({
            pageNow: pageNow,
            pageSize: ps,
            searchKey: searchKey === undefined ? searchText : searchKey,
            ...moreProps
        }).then((data: any) => {
            // console.log("data", data)
            if (data.rows === null) data.rows = []
            if (props.APIRowsTransForm !== undefined) {
                setTableData(props.APIRowsTransForm(data.rows))
            } else setTableData(data.rows)
            if (data.totalNum !== undefined) {
                setTotal(data.totalNum)
                if(props.name !== undefined)
                    props.setTableInfo(props.name, {total: data.totalNum})
            } else {
                setTotal(ps * data.totalPage);
                if(props.name !== undefined)
                    props.setTableInfo(props.name, {total: ps * data.totalPage})
            }
            setLoading(false)
        })
    }

    useEffect(() => {
        getInfo(PageNow, PageSize)
    }, [props.name])

    // 带有表单的筛选
    const [form] = useForm()
    const onFinish = () => {
        const values = form.getFieldsValue()
        if (JSON.stringify(values) !== "{}")
            getInfo(1, PageSize, undefined, values)
    };
    const onReset = () => {
        const values = form.getFieldsValue()
        form.resetFields();
        const valuesAfter = form.getFieldsValue()
        // 重置前后若发生改变，则重新加载表格
        if (JSON.stringify(values) !== JSON.stringify(valuesAfter))
            getInfo(1, PageSize, undefined, undefined)

    };

    // useEffect(() => {
    //     getInfo(PageNow, PageSize)
    // }, [])

    useEffect(() => {
        // 监听表格的版本变化，当版本变更时更新表格
        const propsTableVersion = props.tableData[props.name]?.tableVersion
        if (propsTableVersion !== undefined && tableVersion !== propsTableVersion) {
            // 如果数据被外部应用更新，则用 redux 中的数据更新当前行
            if (propsTableVersion < 0) {
                setTableVersion(-propsTableVersion)
                setTableDataX(props.tableData[props.name]?.dataSource)
            } else {
                // 否则，重新进行请求
                setTableVersion(propsTableVersion)
                getInfo(PageNow, PageSize)
            }
        }
    }, [props.tableData, tableVersion])

    return (
        <Card
            bordered={false}
            size={"small"}
            extra={
                (props.search === true || props.getForm !== undefined) && (
                    <>
                        {props.search === true && (
                            <Search
                                key={"search"}
                                placeholder={props.t("searchUser")}
                                onSearch={(text) => {
                                    setSearchText(text)
                                    setPageNow(1)
                                    const values = form.getFieldsValue()
                                    getInfo(1, PageSize, text, values)
                                }}
                                enterButton
                                style={{width: 300}}
                            />
                        )}
                        {props.getForm !== undefined && (
                            <Form form={form}>
                                {props.getForm(onFinish)}
                                <Space style={{marginLeft: "30px"}} size={20}>
                                    <Button type="primary" onClick={onFinish}>
                                        筛选
                                    </Button>
                                    <Button htmlType="button" onClick={onReset}>
                                        重置
                                    </Button>
                                </Space>
                            </Form>
                        )}
                    </>
                )
            }
        >
            <Table
                rowKey={props.rowKey}
                loading={loading}
                size={props.size}
                columns={props.columns}
                rowSelection={props.rowSelection}
                dataSource={tableData}
                pagination={{
                    onChange: (page, pageSize)=>{
                        const values = form.getFieldsValue()
                        getInfo(page, pageSize, searchText, values)
                    },
                    current: PageNow,
                    defaultPageSize: ck(props.defaultPageSize, defaultPageSize),
                    total: total,
                    hideOnSinglePage: true,
                    showQuickJumper: true,
                    showLessItems: true,
                    showSizeChanger: ck(props.showSizeChanger, true),
                    pageSizeOptions: ["5", "15", "20", "50", "80"],
                }}
            />
        </Card>
    )

}

const mapStateToProps = (state: any) => {
    const UState: UserState = state.UserReducer
    const TState: TableState = state.TableReduce
    return {
        roles: UState.userInfo?.roles,
        tableData: {...TState.tableData}
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setTableInfo: (name: string, data: any)=> dispatch({
        type: "setTableInfo",
        name: name,
        data: data
    }),
    setDataSource: (data: any, name: string) =>
        dispatch({type: "setDataSource", data: data, name: name, add: false})
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(
    withRouter(TableWithPagination)
))

