import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import ExpenseButton from '@/components/buttons/expenses-button';

const ReportsTable = ({
  title,
  tableData,
  handleAdd,
  handlePrint,
  formatDate,
  formatCurrency,
  setSelectedExpenseDate,
  setMode
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [columns, setColumns] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex.replace("_", " ")}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const setAllComponents = () =>
  {
    const  col = [
        {
          title: 'Date of Payment',
          dataIndex: 'transaction_date',
          key: 'transaction_date',
          width: 200,
          responsive: ['md'],
          fixed: 'left',
          ...getColumnSearchProps('transaction_date'),
          sorter: (a, b) => a.transaction_date.localeCompare(b.transaction_date),
          sortDirections: ['descend', 'ascend'],
          multiple: 4,
          onCell: (record, index) => {
              return {
                  onClick: (ev) => {
                    setSelectedRowKeys([]);
                    setSelectedRowKeys([record.transaction_date, index]);
                    setSelectedExpenseDate(record.transaction_date);
                  },
              };
          },
          render: (text, record, index) => {
            return formatDate(record.transaction_date, 'MMMM DD, YYYY')
          }
        },        
        {
          title: 'Number of Payments',
          dataIndex: 'total_transaction',
          key: 'total_transaction',
          width: 200,
          responsive: ['md'],
          fixed: 'left',
          ...getColumnSearchProps('total_transaction'),
          sorter: (a, b) => a.total_transaction.localeCompare(b.total_transaction),
          sortDirections: ['descend', 'ascend'],
          multiple: 3,
          onCell: (record, index) => {
              return {
                  onClick: (ev) => {
                    setSelectedRowKeys([]);
                    setSelectedRowKeys([record.transaction_date, index]);
                    setSelectedExpenseDate(record.transaction_date);
                  },
              };
          },
        },   
        {
          title: 'Total Payments Per Client',
          dataIndex: 'total_expense',
          key: 'total_expense',
          width: 200,
          responsive: ['md'],
          fixed: 'left',
          ...getColumnSearchProps('total_expense'),
          sorter: (a, b) => a.total_expense.localeCompare(b.total_expense),
          sortDirections: ['descend', 'ascend'],
          multiple: 2,
          onCell: (record, index) => {
              return {
                  onClick: (ev) => {
                    setSelectedRowKeys([]);
                    setSelectedRowKeys([record.transaction_date, index]);
                    setSelectedExpenseDate(record.transaction_date);
                  },
              };
          },
          render: (text, record, index) => {
            return formatCurrency(record.total_expense, 'PHP');
          }
        },                       
        {
          title: 'Action',
          dataIndex: 'transaction_date',
          align: 'center',
          key: 'transaction_date',
          fixed: 'right',
          width: 100,
          multiple: 1,
          render: (text, record, index) => <ExpenseButton page="reports" handlePrint={handlePrint} handleAdd={handleAdd} setMode={setMode} text={`${text}`} />,
        }
      ];
      setColumns(col);
  }

  useEffect(() => {
    setAllComponents();
  }, []);

  return (
    <div className="flex flex-col shadow-md p-2 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-red-600 via-red-50 to-red-600">
      <div className='flex items-center justify-between'>
        <h1 className="text-3xl ml-2 shadow-2 text-white uppercase tracking-widest">
            {`${title}`}
        </h1>        
        </div>
            <div className="pt-2">
              <Table                
                rowKey='id' 
                rowSelection={{
                  selectedRowKeys,
                  getCheckboxProps: (record) => {
                    return {
                      disabled: true,
                    };
                  }
                }} 
                columns={columns}
                dataSource={tableData}
                bordered={true}
                size="small"
                pagination={{
                  position: ['bottomLeft'],
                  pageSize: 7,
                  defaultCurrent: 1,
                  total: tableData.length,
                }}                
              />
            </div>
      </div>
  );
};
export default ReportsTable;

