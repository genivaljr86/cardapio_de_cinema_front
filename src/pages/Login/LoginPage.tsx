import React from 'react';
import { Row, Col, Card, Avatar } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';
import JurassicLogo from '../../resources/img/Jurassic_Park_logo.png';
import Title from 'antd/es/typography/Title';

const AvatarWrapper = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const ColFullHeight = styled(Col)`
  height: 100vh;
  > .ant-row {
    height: 100vh;
  }
`;

const LoginPage: React.FC = () => {

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <Row>
        <ColFullHeight span={12}
          style={{
            background: '#001529'
          }}>
          <Row align={'middle'} justify={'center'}>
            <Col>
              <img src={JurassicLogo} alt="Jurassic Park Logo" />
              <Title type='danger'
                level={2}
                code
                style={{
                  textAlign: 'center'
                }}>
                GESTÃO DE NEGÓCIOS
              </Title>
            </Col>
          </Row>
        </ColFullHeight>
        <ColFullHeight span={12}>
          <Row align={'middle'} justify={'center'}>
            <Col span={8}>
              <Card>
                <AvatarWrapper>
                  <Avatar size={72} icon={<UserOutlined />} />
                </AvatarWrapper>
                <Form
                  name="normal_login"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Por favor insira seu usuário!' }]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Usuário"
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    name="senha"
                    rules={[{ required: true, message: 'Por favor insira sua Senha!' }]}
                  >
                    <Input
                      prefix={<LockOutlined />}
                      type="password"
                      placeholder="Senha"
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Lembre de mim</Checkbox>
                    </Form.Item>

                    <a href="/">
                      Esqueci a senha
                    </a>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" size='large' block>
                      Entrar
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </ColFullHeight>
      </Row>
    </>
  )
}

export const LoginPageRoute = {
  path: '/login',
  element: <LoginPage />,
};

export default LoginPage;