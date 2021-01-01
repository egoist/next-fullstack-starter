import '../css/tailwind.css'
import { Provider as UrqlProvider } from 'urql'
import { useUrqlClient } from '@src/lib/urql-client'

const App = ({ Component, pageProps }: any) => {
  const urqlClient = useUrqlClient()
  return (
    <UrqlProvider value={urqlClient}>
      <Component {...pageProps} />
    </UrqlProvider>
  )
}

export default App
