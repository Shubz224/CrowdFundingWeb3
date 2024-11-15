import { useContext, useEffect, useState } from "react"
import { Location, useLocation } from "react-router-dom"
import { StateContext } from "../contexts"
import { calculateBarPercentage, daysLeft } from "../utils"
import { CountBox } from "../components/countBox"
import { thirdweb } from "../assets"
import { CustomButton } from "../components/customButton"
import { Loader } from "../components/loader"

type ParsedCampaign = {
    owner: string
    title: string
    description: string
    target: string
    deadline: number
    amountCollected: string
    image: string
    pId: string
}

type ParsedDonation = {
    donator: string
    donation: string
}

export function CampaignDetails() {

    const { state } = useLocation() as Location<ParsedCampaign>
    const { donate, getDonations, contract, address } = useContext(StateContext)

    const [isLoading, setIsLoading] = useState(false)
    const [amount, setAmount] = useState('')
    const [donators, setDonators] = useState([] as ParsedDonation[])

    const remainingDays = daysLeft(state.deadline)

    async function fetchDonators() {
        const data = await getDonations(state.pId)

        setDonators(data)
    }

    useEffect(() => {
        if (contract) {
            fetchDonators()
        }
    }, [contract, address])

    async function handleDonate() {
        setIsLoading(true)
        try {
            await donate(state.pId, amount)
            await fetchDonators()
            setAmount('')
            setIsLoading(false)
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    return (
        <div>
            {isLoading && <Loader />}
            {!isLoading && (
                <>
                    <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
                        <div className="flex-1 flex-col">
                            <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl" />
                            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
                                <div className="absolute h-full bg-[#4acd8d]"
                                    style={{
                                        width: `${calculateBarPercentage(Number(state.target), Number(state.amountCollected))}%`,
                                        maxWidth: '100%'
                                    }} >
                                </div>
                            </div>
                        </div>
                        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
                            <CountBox title="Days Left" value={remainingDays} />
                            <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
                            <CountBox title="Total Backers" value={donators.length} />
                        </div>
                    </div>
                    <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
                        <div className="flex-[2] flex flex-col gap-[40px]">
                            <div>
                                <h4 className="font-epilogue font-semibold text-[18px] text-black
                                    uppercase">
                                    Creator
                                </h4>
                                <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                                    <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full
                                    bg-[#2c2f32] cursor-pointer">
                                        <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
                                    </div>
                                    <div>
                                        <h4 className="font-epilogue font-semibold text-[14px] text-black break-all">{state.owner}</h4>
                                        <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-epilogue font-semibold text-[18px] text-black
                                    uppercase">
                                    Story
                                </h4>
                                <div className="mt-[20px]">
                                    <p className="font-epilogue font-normal text-[16px] text-[black]
                                    leading-[26px] text-justify">
                                        {state.description}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-epilogue font-semibold text-[18px] text-black
                                    uppercase">
                                    Donators
                                </h4>
                                <div className="mt-[20px] flex flex-col gap-4">
                                    {donators.length > 0 && donators.map((donator, index) => (
                                        <div key={`${donator.donator}-${donator.donation}-${index}`}>
                                            <p className="font-epilogue font-normal text-[16px] text-black
                                            leading-[26px] break-all">
                                                {index + 1}. {donator.donator}
                                            </p>
                                            <p className="font-epilogue font-normal text-[16px] text-black
                                            leading-[26px] break-all">
                                                {donator.donation}
                                            </p>
                                        </div>
                                    ))}
                                    {donators.length === 0 && <p className="font-epilogue font-normal text-[16px] text-black
                                    leading-[26px] text-justify">
                                        No donators yet. Be the first one.
                                    </p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-epilogue font-semibold text-[18px] text-white
                                    uppercase">
                                Fund
                            </h4>
                            <div className="mt-[20px] flex flex-col p-4 bg-[#ECF1FF] rounded-[10px]">
                                <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center
                                    text-[#808191]
                                ">
                                    Fund the campaign
                                </p>
                                <div className="mt-[30px]">
                                    <input type="number" placeholder="ETH 0.1" step="0.01" className="w-full
                                    py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43]
                                     bg-transparent font-epilogue text-white text-[18px] leading-[30px]
                                     placeholder:text-[#4b5264] rounded-[10px]"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                    <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                                        <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                                            Back it because you believe in it.
                                        </h4>
                                        <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                                            Support the project for no reward, just because it speaks to you.
                                        </p>
                                    </div>
                                    <CustomButton
                                        btnType="button"
                                        title="Fund Campaign"
                                        styles="w-full bg-[#8c6dfd]"
                                        handleClick={handleDonate}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div >
    )
}