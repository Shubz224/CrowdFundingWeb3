import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ArbitrumSepolia } from '@thirdweb-dev/chains'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { App } from './app'
import './index.css'
import { Toaster } from 'sonner'
import { StateContextProvider } from './contexts'
import{AuthProvider}from "./utils/AuthContext"
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <ThirdwebProvider activeChain={ArbitrumSepolia} clientId={"1b375590eca360b28c55ce2bdf51b0f9"}>
        <Router>
            <StateContextProvider>
                <AuthProvider>
                <App />
                </AuthProvider>
                
            </StateContextProvider>
        </Router>
        <Toaster richColors />
    </ThirdwebProvider>
)