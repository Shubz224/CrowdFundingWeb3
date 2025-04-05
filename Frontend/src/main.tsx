import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ArbitrumSepolia } from '@thirdweb-dev/chains'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { App } from './app'
import './index.css'
import { Toaster } from 'sonner'
import { StateContextProvider } from './contexts'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <ThirdwebProvider activeChain={ArbitrumSepolia} clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID}>
        <Router>
            <StateContextProvider>

                <App />


            </StateContextProvider>
        </Router>
        <Toaster richColors />
    </ThirdwebProvider>
)