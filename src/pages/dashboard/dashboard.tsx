import { FC } from "react"
import { Layout, Button } from 'antd';
import Nav from '../../main/components/Nav/Nav';
import Products from '../products/products'
import { Footer } from 'antd/lib/layout/layout';

const { Header, Content} = Layout;

const DashboardPage: FC = () => {
  return (
      <>
          <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: 'white' }}
        >
          <Nav />
        </Header>

        <Content
          style={{ padding: '10px 80px 80px 80px', backgroundColor: 'white' }}
        >
          <Products />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <p>Created by Alisa.</p>
        </Footer>
      </Layout>
    </Layout>
      </>
  )
}

export default DashboardPage
