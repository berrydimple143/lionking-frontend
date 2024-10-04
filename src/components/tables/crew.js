import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import GroupButton from '../../components/buttons/group-button';

const CrewTable = ({
  title,
  tableData,
  handleDelete,
  setShowModal,
  setShowDeleteModal,
  setSelectedItemForDelete,
  setSelectedItemForEdit,
  setPage,
  setModalTitle,
  viewProfile,
  ranks,
  rankChanged,
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
          width: 200,
          className: 'text-sm',
          responsive: ['md'],
          fixed: 'left',
          key: 'middle_name',
          ...getColumnSearchProps('middle_name'),
          sorter: (a, b) => a.middle_name.localeCompare(b.middle_name),
          sortDirections: ['descend', 'ascend'],
          multiple: 5,
        },
        {
          title: 'Last Name',
          dataIndex: 'last_name',
          width: 200,
          className: 'text-sm',
          responsive: ['md'],
          fixed: 'left',
          key: 'last_name',
          ...getColumnSearchProps('last_name'),
          sorter: (a, b) => a.last_name.localeCompare(b.last_name),
          sortDirections: ['descend', 'ascend'],
          multiple: 4,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          responsive: ['md'],
          fixed: 'left',
          width: 100,
          key: 'age',
          ...getColumnSearchProps('age'),
          sorter: (a, b) => a.age.localeCompare(b.age),
          sortDirections: ['descend', 'ascend'],
          multiple: 3,
        },
        {
          title: 'Rank',
          dataIndex: 'rank',
          responsive: ['md'],
          fixed: 'left',
          width: 150,
          key: 'rank',
          ...getColumnSearchProps('rank'),
          sorter: (a, b) => a.rank.localeCompare(b.rank),
          sortDirections: ['descend', 'ascend'],
          multiple: 2,
          render: (text, record, index) => {
            return text.name;
          }
        },
        {
          title: 'Action',
          dataIndex: 'id',
          align: 'center',
          key: 'id',
          fixed: 'right',
          width: 260,
          multiple: 1,
          render: (text, record, index) => <GroupButton viewProfile={viewProfile} setModalTitle={setModalTitle} handleDelete={handleDelete} setShowDeleteModal={setShowDeleteModal} setMode={setMode} setSelectedItemForDelete={setSelectedItemForDelete} setSelectedItemForEdit={setSelectedItemForEdit} setShowModal={setShowModal} setPage={setPage} text={`${text}`} />,
        }
      ];
      setColumns(col);
  }

  useEffect(() => {
    setAllComponents();
  }, []);

  return (
      <div className="flex flex-col">
        <div className="row align-items-start">
            <Space size="middle">
              <h1 className="h4">
                  {`${title}`}
              </h1>
              <button type="button" onClick={() => setShowModal(true) } class="btn btn-labeled btn-success">
              <span class="btn-label"><PlusCircleOutlined /></span> Add Crew</button>
            </Space>
        </div>
        <div className="row align-items-start pt-4">
            <div className="col">
              <Space size="middle">
                <p className="h5">Search by rank:</p>
                <Select
                  className="form-control"
                  style={{
                    width: '250px',
                  }}
                  id="rank_id"
                  onChange={rankChanged}
                  placeholder="Select a rank here ...">
                  {" "}
                  {ranks && ranks.map((item, index) => <Select.Option value={item.id} key={index}>{item.name}</Select.Option>)}
                </Select>
              </Space>
            </div>
        </div>

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
export default CrewTable;

