import { CoffeeOutlined, DollarOutlined, HomeOutlined, PoweroffOutlined, TeamOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useMatches } from "react-router-dom";


const CSidebarMenu: React.FC = () => {
  const location = useLocation();
  const maches = useMatches()
  const [current, setCurrent] = useState(location.pathname)
  useEffect(() => {
    if (location) {
      if (current !== maches[1].pathname) {
        setCurrent(maches[1].pathname);
      }
    }
  }, [maches, current, location]);

  const sideMenuItens: MenuProps['items'] = [
    {
      key: '/app/',
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
      style={{ height: '100%', borderRight: 0, fontSize: '16px' }}
      items={sideMenuItens}
      selectedKeys={[current]}
    />
  )
}

export default CSidebarMenu;