import { UsergroupAddOutlined, BookOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
const DefaultCard = ({ user_count, client_count, agent_count, areas_count, managers_count }) => (
  <Row gutter={16}>
    <Col span={6}>
      <Card
        style={{ 
          backgroundColor: '#0F21B9', 
          borderTop: '1px solid #0F21B9', 
          borderLeft: '1px solid #0F21B9', 
          borderBottom: '3px solid #bcbcbc',
          borderRight: '3px solid #bcbcbc',
          borderRadius: '2px',
        }}
      >
        <Statistic
          title="Total Areas"
          titleStyle={{
            color: "#fff"
          }} 
          value={areas_count}
          precision={0}
          valueStyle={{
            color: '#fff',
          }}
          prefix={<BookOutlined />}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card 
        style={{ 
          backgroundColor: '#C9270A', 
          borderTop: '1px solid #C9270A', 
          borderLeft: '1px solid #C9270A', 
          borderBottom: '3px solid #bcbcbc',
          borderRight: '3px solid #bcbcbc',
          borderRadius: '2px',
        }}
        >
        <Statistic
          title="Total Clients"
          value={client_count}
          precision={0}
          valueStyle={{
            color: '#fff',
          }}
          prefix={<UsergroupAddOutlined />}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card
        style={{ 
          backgroundColor: '#1B9B09', 
          borderTop: '1px solid #1B9B09', 
          borderLeft: '1px solid #1B9B09', 
          borderBottom: '3px solid #bcbcbc',
          borderRight: '3px solid #bcbcbc',
          borderRadius: '2px',
        }}
      >
        <Statistic
          title="Total Agents"
          value={agent_count}
          precision={0}
          valueStyle={{
            color: '#fff',
          }}
          prefix={<UsergroupAddOutlined />}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card 
        style={{ 
          backgroundColor: '#F3AC09', 
          borderTop: '1px solid #F3AC09', 
          borderLeft: '1px solid #F3AC09', 
          borderBottom: '3px solid #bcbcbc',
          borderRight: '3px solid #bcbcbc',
          borderRadius: '2px',
        }}
      >
        <Statistic
          title="Total Unit Managers"
          value={managers_count}
          precision={0}
          valueStyle={{
            color: '#cf1322',
          }}
          prefix={<UsergroupAddOutlined />}
        />
      </Card>
    </Col>
  </Row>
);
export default DefaultCard;
