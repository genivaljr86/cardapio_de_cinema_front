import { useMatches } from "react-router-dom";

const ClientCreatePage: React.FC = () => {
  const matches = useMatches();

  console.log('matches', matches);
  return (<>
    <h1>Cliente Create Page</h1>
  </>)
}

export const ClientCreatePageRoute = {
  path: 'new',
  element: <ClientCreatePage />
}
export default ClientCreatePage;