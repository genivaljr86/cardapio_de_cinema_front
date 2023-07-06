import { Button, Col, Pagination, Row, Table, notification } from "antd"
import { TablePaginationConfig, TableProps } from "antd/es/table"
import useCTableHooks from "./hooks"
import { useEffect, useRef } from "react"
import { ColumnType } from "antd/lib/table";
import { ExclamationCircleFilled } from "@ant-design/icons";

interface CTableProps extends TableProps<any> {
  onChangeTable?: (filter?: any) => void;
  onDelete?: (id: number) => Promise<any>;
  footerActions?: (updateTable: any) => JSX.Element;
  totalRecords?: number | null;
}

const CTable: React.FC<CTableProps> = ({ dataSource, footer, footerActions, onChangeTable, onDelete, columns, totalRecords, ...props }) => {
  const initialLoading = useRef(true)
  const {
    tableParams, setTableParams,
    Modal
  } = useCTableHooks()

  const updateTable = () => {
    if (onChangeTable) {
      const params = {
        'pagination[page]': tableParams.pagination?.current,
        'pagination[pageSize]': tableParams.pagination?.pageSize
      }
      onChangeTable(params);
    }
  }

  if (onDelete) {
    if (!columns?.some((c: ColumnType<any>) => c.dataIndex === 'actions')) {
      columns?.push({
        title: '',
        align: 'right',
        dataIndex: 'actions'
      })
    }

    dataSource = dataSource?.map((item) => {
      return {
        ...item,
        actions: <Button type="link" onClick={() => showDeleteConfirm(item.key)}>Apagar</Button>
      }
    })

    const showDeleteConfirm = (id: number) => {
      Modal.confirm({
        title: 'Tem certeza que desejar apagar?',
        icon: <ExclamationCircleFilled />,
        content: 'Essa ação é irreversivel.',
        okText: 'Sim',
        okType: 'danger',
        cancelText: 'Não',
        onOk() {
          return new Promise((resolve, reject) => {
            try {
              const response = onDelete(id!);
              notification.success({
                message: 'Sucesso!',
                description: 'Item apagado com sucesso'
              })
              updateTable()
              resolve(response);
            } catch (error) {
              notification.error({
                message: 'Erro!',
                description: 'Não foi possivel apagar agora, tente mais tarde'
              })
              reject(error)
            }
          })
        },
      })
    }

  }

  if (footerActions) {
    footer = (currentPageData) => {
      return (
        <Row wrap={false}>
          <Col flex="auto">
            <div>
              {footerActions(updateTable)}
            </div>
          </Col>
          <Col flex="none">
            {
              (onChangeTable && totalRecords) &&
              <Pagination
                defaultCurrent={1}
                pageSize={tableParams.pagination?.pageSize}
                current={tableParams.pagination?.current}
                total={totalRecords}
                onChange={(page) => {
                  setTableParams({
                    ...tableParams,
                    pagination: {
                      ...tableParams.pagination,
                      current: page
                    }
                  })
                }} />
            }
          </Col>
        </Row>
      )
    }
  }

  useEffect(() => {
    if (onChangeTable) {
      if (totalRecords === null) return
      setTableParams(
        {
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: totalRecords
          },
        }
      )
    }
    //eslint-disable-next-line
  }, [totalRecords])

  useEffect(() => {
    if (onChangeTable) {
      if (totalRecords === null) return

      if (initialLoading.current) {
        initialLoading.current = false
        return
      }
      updateTable()
    }
    //eslint-disable-next-line
  }, [tableParams])

  useEffect(() => {
    if (onChangeTable) updateTable()
    //eslint-disable-next-line
  }, [])

  const handleTableChange = (
    pagination: TablePaginationConfig
  ) => {
    setTableParams({ pagination })
  }

  return <Table
    dataSource={dataSource}
    columns={columns}
    pagination={tableParams.pagination}
    onChange={handleTableChange}
    footer={footer}
    {...props}
  />
}

export default CTable