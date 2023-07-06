import { Button, Table, notification } from "antd"
import { TablePaginationConfig, TableProps } from "antd/es/table"
import useCTableHooks from "./hooks"
import { useEffect, useRef } from "react"
import { ColumnType } from "antd/lib/table";
import { ExclamationCircleFilled } from "@ant-design/icons";

interface CTableProps extends TableProps<any> {
  onChangeTable?: (filter?: any) => void;
  totalRecords?: number | null;
  onDelete?: (id: number) => Promise<any>;
}

const CTable: React.FC<CTableProps> = ({ dataSource, onChangeTable, onDelete, columns, totalRecords, ...props }) => {
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
            onDelete(id!)
              .then(response => {
                notification.success({
                  message: 'Sucesso!',
                  description: 'Item apagado com sucesso'
                })
                updateTable();
                resolve(response);
              })
              .catch(err => {
                notification.error({
                  message: 'Erro!',
                  description: 'Não foi possivel apagar agora, tente mais tarde'
                });
                reject(err);
              });
          })
        },
      });
    };

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
  }, [tableParams])

  useEffect(() => {
    if (onChangeTable) {
      updateTable()
    }
  }, [])

  const handleTableChange = (
    pagination: TablePaginationConfig
  ) => {
    setTableParams({ pagination })
  }



  // const newDatasource = dataSource?.map((item, index) => {
  //   return {
  //     ...item,
  //     name: item.name + ' ' + index,
  //   }
  // }
  // )
  return <Table
    dataSource={dataSource}
    columns={columns}
    {...props}
    pagination={tableParams.pagination}
    onChange={handleTableChange}
  />
}

export default CTable