import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import InnerExpenseButton from '@/components/buttons/inner-expenses-button';

const ExpensesHistory = ({ 
    formatCurrency, 
    formatDate, 
    handleDeleteExpense,
    setSelectedItemForDelete,
    selectedExpenseDate,
    selectedExpenses }) => {
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
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          width: 120,
          responsive: ['md'],
          fixed: 'left',
          ...getColumnSearchProps('description'),
          sorter: (a, b) => a.description.localeCompare(b.description),
          sortDirections: ['descend', 'ascend'],
          multiple: 3,   
        },      
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
          width: 120,          
          responsive: ['md'],
          fixed: 'left',
          ...getColumnSearchProps('amount'),
          sorter: (a, b) => a.amount.localeCompare(b.amount),
          sortDirections: ['descend', 'ascend'],
          multiple: 2,      
          render: (text, record, index) => {
            return formatCurrency(text, 'PHP');
          }    
        },             
        {
          title: 'Action',
          dataIndex: 'id',
          align: 'center',
          key: 'id',
          fixed: 'right',
          width: 100,
          multiple: 1,
          render: (text, record, index) => <InnerExpenseButton handleDeleteExpense={handleDeleteExpense} setSelectedItemForDelete={setSelectedItemForDelete} text={`${text}`} />,
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
          <h1 className="text-lg ml-2 shadow-2 text-white uppercase tracking-widest">
              List of Expenses for { formatDate(selectedExpenseDate, 'MMMM DD, YYYY') }
          </h1>          
        </div>
            <div className="pt-2">
              <Table                
                rowKey='id'                 
                columns={columns}
                dataSource={selectedExpenses}
                bordered={true}
                size="small"
                pagination={{
                  position: ['bottomLeft'],
                  pageSize: 5,
                  defaultCurrent: 1,
                  total: selectedExpenses.length,
                }}                
              />
            </div>
      </div>
  );
};
export default ExpensesHistory;

