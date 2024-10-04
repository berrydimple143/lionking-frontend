import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import GroupButton from '../../components/buttons/group-button';

const UserTable = ({
  title,
  tableData,
  handleDelete,
  setShowModal,
  setShowDeleteModal,
  setSelectedItemForDelete,
  setSelectedItemForEdit,
  setPage,
  setModalTitle,
  setMode
}) => {
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
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: 120,
          responsive: ['md'],
          fixed: 'left',
          ...getColumnSearchProps('name'),
          sorter: (a, b) => a.name.localeCompare(b.name),
          sortDirections: ['descend', 'ascend'],
          multiple: 5,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          width: 200,
          className: 'text-sm',
          responsive: ['md'],
          fixed: 'left',
          key: 'email',
          ...getColumnSearchProps('email'),
          sorter: (a, b) => a.email.localeCompare(b.email),
          sortDirections: ['descend', 'ascend'],
          multiple: 4,
        },
        {
          title: 'Username',
          dataIndex: 'username',
          responsive: ['md'],
          fixed: 'left',
          width: 200,
          key: 'username',
          ...getColumnSearchProps('username'),
          sorter: (a, b) => a.username.localeCompare(b.username),
          sortDirections: ['descend', 'ascend'],
          multiple: 3,
        },
        {
          title: 'Role',
          dataIndex: 'role',
          responsive: ['md'],
          fixed: 'left',
          width: 200,
          key: 'role',
          ...getColumnSearchProps('role'),
          sorter: (a, b) => a.role.localeCompare(b.role),
          sortDirections: ['descend', 'ascend'],
          multiple: 2,
          render: (text, record, index) => {
            return record.role;
            //return text;
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
          render: (text, record, index) => <GroupButton setModalTitle={setModalTitle} handleDelete={handleDelete} setShowDeleteModal={setShowDeleteModal} setMode={setMode} setSelectedItemForDelete={setSelectedItemForDelete} setSelectedItemForEdit={setSelectedItemForEdit} setShowModal={setShowModal} setPage={setPage} text={`${text}`} />,
        }
      ];
      setColumns(col);
  }

  useEffect(() => {
    setAllComponents();
  }, []);

  return (
      <div className="flex flex-col">
        <Space size="middle">
          <h1 className="h4">
              {`${title}`}
          </h1>
          <button type="button" onClick={() => setShowModal(true) } class="btn btn-labeled btn-success">
          <span class="btn-label"><PlusCircleOutlined /></span> Add User</button>
        </Space>
            <div className="pt-2">
              <Table
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
export default UserTable;

