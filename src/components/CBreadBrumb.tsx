import { Breadcrumb } from "antd";
import { Link, Params, useMatches } from "react-router-dom";

type Match = {
  id: string;
  pathname: string;
  data: unknown;
  params: Params<string>;
  handle: unknown | any;
};

const CBreadcrumb: React.FC = () => {
  const matches: Match[] = useMatches();

  const items = matches.map((match) => {
    const { pathname, handle } = match;
    return {
      key: pathname,
      title: <Link to={pathname}>{handle?.label}</Link>
    }
  });
  return (
    <Breadcrumb style={{ margin: '16px 0' }} items={items} />
  )
}

export default CBreadcrumb;