import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import GroupButton from '../../components/buttons/group-button';

const DocumentTable = ({
  title,
  tableData,
  handleDelete,
  setShowModal,
  setShowDeleteModal,
  setSelectedItemForDelete,
  setSelectedItemForEdit,
  setPage,
  setModalTitle,
  computeDiff,
  formatDate,
  viewProfile,
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
          title: 'Document Name',
          dataIndex: 'document_name',
          key: 'document_name',
          width: 150,
          responsive: ['md'],
          fixed: 'left',
          ...getColumnSearchProps('document_name'),
          sorter: (a, b) => a.document_name.localeCompare(b.document_name),
          sortDirections: ['descend', 'ascend'],
          multiple: 5,
        },
        {
          title: 'Document Number',
          dataIndex: 'document_number',
          width: 200,
          className: 'text-sm',
          responsive: ['md'],
          fixed: 'left',
          key: 'document_number',
          ...getColumnSearchProps('document_number'),
          sorter: (a, b) => a.document_number.localeCompare(b.document_number),
          sortDirections: ['descend', 'ascend'],
          multiple: 4,
        },
        {
          title: 'Date Issued',
          dataIndex: 'issue_date',
          responsive: ['md'],
          fixed: 'left',
          width: 100,
          key: 'issue_date',
          ...getColumnSearchProps('issue_date'),
          sorter: (a, b) => a.issue_date.localeCompare(b.issue_date),
          sortDirections: ['descend', 'ascend'],
          multiple: 3,
          render: (text, record, index) => {
            return formatDate(text, 'MMM DD, YYYY');
          }
        },
        {
          title: 'Expiry Date',
          dataIndex: 'expiry_date',
          responsive: ['md'],
          fixed: 'left',
          width: 100,
          key: 'expiry_date',
          ...getColumnSearchProps('expiry_date'),
          sorter: (a, b) => a.expiry_date.localeCompare(b.expiry_date),
          sortDirections: ['descend', 'ascend'],
          multiple: 2,
          render: (text, record, index) => {
            const daystogo = computeDiff(text) + 1;
            const fdate = formatDate(text, 'MMM DD, YYYY');
            if(daystogo >= 7 && daystogo < 30) {
                return (<span class="badge text-white text-bg-danger p-2">{fdate}</span>);
            } else if(daystogo >= 30 && daystogo < 90) {
                return (<span class="badge text-black-50 text-bg-yellow p-2">{fdate}</span>);
            } else if(daystogo == 90) {
                return (<span class="badge text-black-50 text-bg-orange p-2">{fdate}</span>);
            } else if(daystogo > 90) {
                return (<span class="badge text-black-50 text-bg-light p-2">{fdate}</span>);
            } else {
                return (<span class="badge text-white text-bg-secondary p-2">{fdate}</span>);
            }
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
        <Space size="middle">
          <h1 className="h4">
              {`${title}`}
          </h1>
          <button type="button" onClick={() => setShowModal(true) } class="btn btn-labeled btn-success">
          <span class="btn-label"><PlusCircleOutlined /></span> Add Document</button>
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
export default DocumentTable;

