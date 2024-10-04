import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import 'antd/dist/reset.css';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#0000FF',
              //colorBgContainer: '#aaa',
            },
          }}
        >
          <StyleProvider hashPriority="high">
            <Component {...pageProps} />
          </StyleProvider>
        </ConfigProvider>
  );
}
