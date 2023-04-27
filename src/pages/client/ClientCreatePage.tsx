const ClientCreatePage: React.FC = () => {
  return (<>
    <h1>Cliente Create Page</h1>
  </>)
}

export const ClientCreatePageRoute = {
  path: 'clients/new',
  element: <ClientCreatePage />
}
export default ClientCreatePage;