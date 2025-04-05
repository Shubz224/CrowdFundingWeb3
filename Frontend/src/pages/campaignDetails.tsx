import { useContext, useEffect, useState } from "react";
import { Location, useLocation } from "react-router-dom";
import { StateContext } from "../contexts";
import { calculateBarPercentage, daysLeft } from "../utils";
import { CountBox } from "../components/countBox";
import { CustomButton } from "../components/customButton";
import { Loader } from "../components/loader";

type ParsedCampaign = {
    owner: string;
    title: string;
    description: string;
    target: string;
    deadline: number;
    amountCollected: string;
    image: string;
    pId: string;
};

type ParsedDonation = {
    donator: string;
    donation: string;
};

export function CampaignDetails() {
    const { state } = useLocation() as Location<ParsedCampaign>;
    const { donate, getDonations, contract, address } = useContext(StateContext);

    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState("");
    const [donators, setDonators] = useState<ParsedDonation[]>([]);

    const remainingDays = daysLeft(state.deadline);

    async function fetchDonators() {
        const data = await getDonations(state.pId);
        setDonators(data);
    }

    useEffect(() => {
        if (contract) {
            fetchDonators();
        }
    }, [contract, address]);

    async function handleDonate() {
        setIsLoading(true);
        try {
            await donate(state.pId, amount);
            await fetchDonators();
            setAmount("");
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    }

    return (
        <div className="p-6 md:p-10 lg:p-16 bg-gray-100 min-h-screen">
            {isLoading && <Loader />}
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="flex flex-col">
                        <img src={state.image} alt="campaign" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />
                        <div className="relative w-full h-2 bg-gray-300 mt-4 rounded-full overflow-hidden">
                            <div className="absolute h-full bg-green-500" style={{ width: `${calculateBarPercentage(Number(state.target), Number(state.amountCollected))}%` }}></div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800">{state.title}</h2>
                        <p className="text-gray-600">{state.description}</p>
                        <div className="grid grid-cols-3 gap-4">
                            <CountBox title="Days Left" value={remainingDays} />
                            <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
                            <CountBox title="Total Backers" value={donators.length} />
                        </div>
                    </div>
                </div>

                <div className="mt-10 grid md:grid-cols-2 gap-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h4 className="text-lg font-semibold text-gray-800">Donators</h4>
                        <div className="mt-4 space-y-2">
                            {donators.length > 0 ? (
                                donators.map((donator, index) => (
                                    <div key={`${donator.donator}-${donator.donation}-${index}`} className="border-b pb-2">
                                        <p className="text-gray-700 font-medium">{index + 1}. {donator.donator}</p>
                                        <p className="text-sm text-gray-500">{donator.donation} ETH</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No donators yet. Be the first one.</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h4 className="text-lg font-semibold text-gray-800">Fund this Campaign</h4>
                        <p className="text-sm text-gray-600 mt-2">Support this project because it speaks to you.</p>
                        <div className="mt-4">
                            <input type="number" placeholder="ETH 0.1" step="0.01" className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-green-300" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <CustomButton btnType="button" title="Fund Campaign" styles="w-full bg-green-500 text-white mt-4 py-2 rounded-lg" handleClick={handleDonate} disabled={isLoading} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
