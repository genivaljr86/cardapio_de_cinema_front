import { CoffeeOutlined, DollarOutlined, HomeOutlined, PoweroffOutlined, TeamOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


const SidebarMenu: React.FC = () => {
  let location = useLocation();
  const [current, setCurrent] = useState(location.pathname)
  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  const sideMenuItens: MenuProps['items'] = [
    {
      key: '/app',
      icon: <HomeOutlined />,
      label: <Link to={'/app'}>Home</Link>
    },
    {
      key: '/app/products',
      icon: <CoffeeOutlined />,
      label: <Link to={'products'}>Produtos</Link>
    },
    {
      key: '/app/clients',
      icon: <TeamOutlined />,
      label: <Link to={'clients'}>Clientes</Link>
    },
    {
      key: '/app/orders',
      icon: <DollarOutlined />,
      label: <Link to={'orders'}>Vendas</Link>
    },
    {
      key: 'logout',
      icon: <PoweroffOutlined />,
      label: <Link to={'../login'}>Sair</Link>,
      danger: true
    }
  ]
  return (
    <Menu
      mode="inline"
      style={{ height: '100%', borderRight: 0 }}
      items={sideMenuItens}
      selectedKeys={[current]}
    />
  )
}

export default SidebarMenu;