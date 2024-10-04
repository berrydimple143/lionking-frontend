import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import PaymentButton from '@/components/buttons/payment-button';

const CollectableInformation = ({ 
    selectedArea, 
    formatCurrency, 
    totalPayment, 
    formatDate, 
    totalCollectibles,
    computeBalance,
    setShowPrintModal,
    selectedCollectables }) => {
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
          title: '#',
          dataIndex: 'id',
          key: 'id',         
          width: 5,        
          responsive: ['md'],   
          fixed: 'left',          
          multiple: 8,         
          render: (text, record, index) => {
            return index + 1;
          }     
        },
        {
          title: 'Last Name',
          dataIndex: 'last_name',
          key: 'last_name',
          width: 120,
          responsive: ['md'],
          fixed: 'left',
          ...getColumnSearchProps('last_name'),
          sorter: (a, b) => a.last_name.localeCompare(b.last_name),
          sortDirections: ['descend', 'ascend'],
          multiple: 7,             
        },
        {
          title: 'First Name',
          dataIndex: 'first_name',
          key: 'first_name',
          width: 120,
          responsive: ['md'],
          fixed: 'left',          
          ...getColumnSearchProps('first_name'),
          sorter: (a, b) => a.first_name.localeCompare(b.first_name),
          sortDirections: ['descend', 'ascend'],
          multiple: 6,            
        },
        {
          title: 'Middle Name',
          dataIndex: 'middle_name',
          key: 'middle_name',
          width: 120,
          responsive: ['md'],
          fixed: 'left',          
          ...getColumnSearchProps('middle_name'),
          sorter: (a, b) => a.middle_name.localeCompare(b.middle_name),
          sortDirections: ['descend', 'ascend'],
          multiple: 5,            
        },
        {
          title: 'Ext. Name',
          dataIndex: 'extension_name',
          key: 'extension_name',
          width: 80,
          align: 'center',
          responsive: ['md'],
          fixed: 'left',          
          ...getColumnSearchProps('extension_name'),
          sorter: (a, b) => a.extension_name.localeCompare(b.extension_name),
          sortDirections: ['descend', 'ascend'],
          multiple: 4,            
        },
        {
          title: 'Parcel Price',
          dataIndex: 'contact',
          key: 'contact',
          width: 90,
          responsive: ['md'],
          fixed: 'left',       
          multiple: 3,   
          render: (text, record, index) => {         
            if(record.contact.price) {
              return formatCurrency(record.contact.price, 'PHP');
            } else {
              return formatCurrency(0.00, 'PHP');
            }       
          }  
        },
        {
          title: 'Total Payment',
          dataIndex: 'id',
          key: 'id',
          width: 90,
          responsive: ['md'],
          fixed: 'left',
          multiple: 2,   
          render: (text, record, index) => {         
            if(record.payments.length > 0) {              
              return formatCurrency(totalPayment(record.payments), 'PHP');
            } else {
              return formatCurrency(0.00, 'PHP');
            }       
          }  
        },
        {
          title: 'Total Balance',
          dataIndex: 'id',
          key: 'id',
          width: 90,
          responsive: ['md'],
          fixed: 'left',
          multiple: 1,   
          render: (text, record, index) => {         
            if(record.payments.length > 0) {              
              return computeBalance(record.contact.price, totalPayment(record.payments), 'PHP');
            } else {
              return formatCurrency(0.00, 'PHP');
            }       
          }  
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
              Collectibles for "{ selectedArea }" area
          </h1>    
          <Space>
            <button onClick={() => setShowPrintModal(true)} className='text-lg border border-gray-300 shadow-md text-gray-900 uppercase px-2 py-1 bg-white rounded-sm'><Space><SearchOutlined /> Print Preview</Space></button>
            <h1 className='text-lg shadow-2 border border-white shadow-sm text-white uppercase px-2 py-1 bg-red-500 rounded-md'>Total Collectibles: { formatCurrency(totalCollectibles(selectedCollectables), 'PHP') }</h1>
          </Space>             
        </div>
            <div className="pt-2">
              <Table                
                rowKey='id'                 
                columns={columns}
                dataSource={selectedCollectables}
                bordered={true}
                size="small"
                pagination={{
                  position: ['bottomLeft'],
                  pageSize: 6,
                  defaultCurrent: 1,
                  total: selectedCollectables.length,
                }}                
              />
            </div>
      </div>
  );
};
export default CollectableInformation;

