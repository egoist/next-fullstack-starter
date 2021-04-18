import '../css/tailwind.css'
import { Provider as UrqlProvider } from 'urql'
import { useUrqlClient } from '$src/lib/urql-client'
import { Provider as AuthProvider } from 'next-auth/client'

const App = ({ Component, pageProps }: any) => {
  const urqlClient = useUrqlClient()
  return (
    <AuthProvider session={pageProps.session}>
      <UrqlProvider value={urqlClient}>
        <Component {...pageProps} />
      </UrqlProvider>
    </AuthProvider>
  )
}

export default App
