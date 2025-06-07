import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { 
    Shield, 
    TrendingUp, 
    Users, 
    Zap, 
    Lock, 
    Globe, 
    ArrowRight, 
    Star,
    CheckCircle,
    Coins,
    Target,
    Sparkles
} from "lucide-react"

export function HeroSection() {
    const navigate = useNavigate()
    const [currentStat, setCurrentStat] = useState(0)
    
    const stats = [
        { label: "Campaigns Funded", value: "2,500+", icon: Target },
        { label: "ETH Raised", value: "12,450", icon: Coins },
        { label: "Active Backers", value: "15,000+", icon: Users },
        { label: "Success Rate", value: "89%", icon: TrendingUp }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const features = [
        {
            icon: Shield,
            title: "Blockchain Security",
            description: "Smart contracts ensure transparent and secure transactions"
        },
        {
            icon: Lock,
            title: "Trustless System",
            description: "No intermediaries, funds are released automatically"
        },
        {
            icon: Globe,
            title: "Global Access",
            description: "Support projects from anywhere in the world"
        }
    ]

    const trustIndicators = [
        "Audited Smart Contracts",
        "Transparent Transactions",
        "Community Verified",
        "Decentralized Platform"
    ]

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-60"></div>
                <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-40"></div>
                <div className="absolute bottom-40 left-20 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-50"></div>
                <div className="absolute bottom-20 right-40 w-4 h-4 bg-emerald-300 rounded-full animate-pulse opacity-30"></div>
                
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

                
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 backdrop-blur-sm">
                            <Shield className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-300 text-sm font-medium">Secured by Arbitrum Blockchain</span>
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                <span>
                                    <span className="text-white">Fund the</span>
                                    <br />
                                    <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        Future
                                    </span>
                                    <br />
                                    <span className="text-white">with</span>
                                    <span className="text-emerald-400 ml-4">Web3</span>
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl">
                                Discover groundbreaking projects, support innovative creators, and be part of the 
                                <span className="text-emerald-400 font-semibold"> decentralized funding revolution</span>.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={() => navigate('/create-campaign')}
                                className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/25"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    Start Your Campaign
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                            </button>
                            
                            <button 
                                onClick={() => navigate('/home')}
                                className="px-8 py-4 border-2 border-gray-400 hover:border-emerald-400 text-gray-300 hover:text-emerald-400 font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm hover:bg-emerald-500/10"
                            >
                                Explore Campaigns
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {trustIndicators.map((indicator, index) => (
                                <div key={index} className="flex items-center gap-2 text-gray-300">
                                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                    <span className="text-sm">{indicator}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                            <div className="text-center space-y-4">
                                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex items-center justify-center">
                                    {(() => {
                                        const StatIcon = stats[currentStat].icon
                                        return <StatIcon className="w-8 h-8 text-white" />
                                    })()}
                                </div>
                                <div>
                                    <h3 className="text-4xl font-bold text-white mb-2">
                                        {stats[currentStat].value}
                                    </h3>
                                    <p className="text-gray-300">{stats[currentStat].label}</p>
                                </div>
                            </div>
                            <div className="flex justify-center gap-2 mt-6">
                                {stats.map((_, index) => (
                                    <div 
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            index === currentStat ? 'bg-emerald-400 w-8' : 'bg-gray-500'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <feature.icon className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                                            <p className="text-gray-400 text-sm">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-white font-semibold">Live Network Status</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                        <span className="text-emerald-400 text-sm">Connected</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 overflow-hidden">
                                    {[...Array(5)].map((_, i) => (
                                        <div 
                                            key={i}
                                            className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 border border-emerald-400/30 rounded-lg flex items-center justify-center animate-pulse"
                                            style={{ animationDelay: `${i * 0.5}s` }}
                                        >
                                            <div className="w-3 h-3 bg-emerald-400 rounded-sm opacity-60"></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-gray-400 text-xs">
                                        Secured by Arbitrum • Gas fees from $0.01
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg 
                    className="w-full h-20 text-gray-50" 
                    viewBox="0 0 1200 120" 
                    preserveAspectRatio="none"
                >
                    <path 
                        d="M0,60 C400,0 800,120 1200,60 L1200,120 L0,120 Z" 
                        fill="currentColor"
                    />
                </svg>
            </div>
        </div>
    )
}
