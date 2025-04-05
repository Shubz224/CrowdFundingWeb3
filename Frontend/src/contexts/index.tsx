import { SmartContract, useAddress, useConnect, useContract, useContractWrite, useDisconnect } from "@thirdweb-dev/react";
import { BaseContract, BigNumber, ethers } from "ethers";
import { ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
// Define campaign status enum to match contract
enum CampaignStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2
}


type ParsedCampaign = {
    owner: string
    title: string
    description: string
    target: string
    deadline: number
    amountCollected: string
    image: string
    pId: string
    status: string
    rejectionReason?: string
}

type ParsedDonation = {
    donator: string
    donation: string
}

export type StateContextType = {
    address: string | undefined
    contract: SmartContract<BaseContract> | undefined
    connect: any
    disconnect: () => Promise<void>
    createCampaign: (form: CampaignForm) => Promise<void>
    getCampaigns: () => Promise<ParsedCampaign[]>
    getApprovedCampaigns: () => Promise<ParsedCampaign[]>
    getUserCampaigns: () => Promise<ParsedCampaign[]>
    donate: (pId: string, amount: string) => Promise<any>
    getDonations: (pId: string) => Promise<ParsedDonation[]>
    searchCampaign: string
    setSearchCampaign: (search: SetStateAction<string>) => void
    isAdmin: boolean
    getPendingCampaigns: () => Promise<ParsedCampaign[]>
    approveCampaign: (id: string) => Promise<void>
    rejectCampaign: (id: string, reason: string) => Promise<void>
    refreshCampaigns: () => Promise<void> // Added this function
}

export const StateContext = createContext({} as StateContextType)

type StateContextProviderProps = {
    children: ReactNode
}

type CampaignForm = {
    name: string
    title: string
    description: string
    target: BigNumber
    deadline: string
    image: string
}

export function StateContextProvider({ children }: StateContextProviderProps) {
    const { contract } = useContract("0x019f55905515e0c9cc4b34ab926028d881c1a31a")


    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign')

    const [isAdmin, setIsAdmin] = useState(false);
    const address = useAddress()
    const connect = useConnect()
    const disconnect = useDisconnect()
    
    // Add state to store campaigns and refresh timestamp
    const [allCampaignsCache, setAllCampaignsCache] = useState<ParsedCampaign[]>([]);
    const [lastRefresh, setLastRefresh] = useState(0);

    // Admin features
    useEffect(() => {
        const checkAdminStatus = async () => {
          if (contract && address) {
            const adminRole = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ADMIN_ROLE"));
            const hasRole = await contract.call("hasRole", [adminRole, address]);
            setIsAdmin(hasRole);
          }
        };
        checkAdminStatus();
    }, [address, contract]);

    // Helper function to parse campaign status 
    const getCampaignStatusString = (statusCode: number): string => {
        switch(statusCode) {
            case CampaignStatus.Pending: return "Pending";
            case CampaignStatus.Approved: return "Approved";
            case CampaignStatus.Rejected: return "Rejected";
            default: return "Unknown";
        }
    };

    const refreshCampaigns = async () => {
        if (!contract) return [];
        try {
            const rawCampaigns = await contract.call('getCampaigns');
            const parsedCampaigns = rawCampaigns.map((campaign: any[], id: number) => ({
                owner: campaign[0],
                title: campaign[1],
                description: campaign[2],
                target: ethers.utils.formatEther(campaign[3].toString()),
                deadline: Number(campaign[4]),
                amountCollected: ethers.utils.formatEther(campaign[5].toString()),
                image: campaign[6],
                status: campaign[9].toString(),
                rejectionReason: campaign[10] || "",
                pId: id.toString()
            }));
            setAllCampaignsCache(parsedCampaigns);
            setLastRefresh(Date.now());
            return parsedCampaigns;
        } catch (err) {
            console.error("Error refreshing campaigns:", err);
            return [];
        }
    };

    const getPendingCampaigns = async () => {
        try {
            // First refresh the campaigns or use cached ones
            let campaigns;
            if (Date.now() - lastRefresh > 5000) { // Refresh if older than 5 seconds
                campaigns = await refreshCampaigns();
            } else {
                campaigns = allCampaignsCache;
                if (campaigns.length === 0) {
                    campaigns = await refreshCampaigns();
                }
            }
            
            // Filter pending campaigns - make sure to compare as numbers
            const pendingCampaigns = campaigns.filter((c: ParsedCampaign) => Number(c.status) === CampaignStatus.Pending);
            console.log("Filtered pending campaigns:", pendingCampaigns);
            return pendingCampaigns;
        } catch (err) {
            console.error("Error fetching pending campaigns:", err);
            return [];
        }
    };
    
    const getApprovedCampaigns = async () => {
        try {
            // First refresh the campaigns or use cached ones
            let campaigns;
            if (Date.now() - lastRefresh > 5000) { // Refresh if older than 5 seconds
                campaigns = await refreshCampaigns();
            } else {
                campaigns = allCampaignsCache;
                if (campaigns.length === 0) {
                    campaigns = await refreshCampaigns();
                }
            }
            
            // Filter approved campaigns - make sure to compare as numbers
            const approvedCampaigns = campaigns.filter((c: ParsedCampaign) => Number(c.status) === CampaignStatus.Approved);
            console.log("Filtered approved campaigns:", approvedCampaigns);
            return approvedCampaigns;
        } catch (err) {
            console.error("Error fetching approved campaigns:", err);
            return [];
        }
    };
    
    const approveCampaign = async (id: string) => {
        try {
            console.log("Approving campaign ID:", id);
            const txn = await contract?.call("approveCampaign", [id], {
                gasLimit: 500000 // Adding explicit gas limit
            });
            
            // Wait for transaction confirmation
            await txn.receipt;
            console.log("Campaign approved successfully:", txn);
            
            // Force refresh campaigns after approval
            await refreshCampaigns();
            
            return txn;
        } catch (error) {
            console.error("Error approving campaign:", error);
            throw error;
        }
    };

    const rejectCampaign = async (id: string, reason: string) => {
        try {
            console.log("Rejecting campaign ID:", id, "Reason:", reason);
            const txn = await contract?.call("rejectCampaign", [id, reason], {
                gasLimit: 500000 // Adding explicit gas limit
            });
            
            // Wait for transaction confirmation
            await txn.receipt;
            console.log("Campaign rejected successfully:", txn);
            
            // Force refresh campaigns after rejection
            await refreshCampaigns();
            
            return txn;
        } catch (error) {
            console.error("Error rejecting campaign:", error);
            throw error;
        }
    };

    const publishCampaign = async (form: CampaignForm): Promise<void> => {
        try {
            // Ensure target is properly formatted as BigNumber
            console.log("Target value:", form.target.toString());
            console.log("Target type:", typeof form.target);
            
            // Convert deadline properly
            const deadlineTimestamp = Math.floor(new Date(form.deadline).getTime() / 1000);
            console.log("Deadline string:", form.deadline);
            console.log("Deadline timestamp:", deadlineTimestamp);
            
            // Log all parameters being sent
            console.log("Creating campaign with params:", {
                owner: address,
                title: form.title,
                description: form.description,
                target: form.target.toString(),
                deadline: deadlineTimestamp,
                image: form.image
            });
            
            const tx = await createCampaign({
                args: [
                    address,
                    form.title,
                    form.description,
                    form.target,  // This should be a BigNumber already
                    deadlineTimestamp,
                    form.image
                ],
                overrides: {
                    gasLimit: 800000  // Increase gas limit for Arbitrum
                }
            });
    
            console.log("Transaction sent:", tx);
            const receipt = await tx.receipt;
            console.log("Receipt:", receipt);
            
            await refreshCampaigns();
        } catch (err) {
            console.error("Transaction error details:", err);
            throw err;
        }
    };
    

    const getCampaigns = async () => {
        try {
            // Use cached campaigns if available and recent
            if (allCampaignsCache.length > 0 && Date.now() - lastRefresh < 5000) {
                return allCampaignsCache;
            }
            
            return await refreshCampaigns();
        } catch (err) {
            console.error("Error fetching campaigns:", err);
            return [];
        }
    };
    
    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();
        const filteredCampaigns = allCampaigns.filter((campaign: ParsedCampaign) => campaign.owner === address);
        return filteredCampaigns;
    }

    const donate = async (pId: string, amount: string) => {
        try {
            console.log(`Donating ${amount} ETH to campaign ${pId}`);
            const txn = await contract?.call('donateToCampaign', [pId], {
                value: ethers.utils.parseEther(amount),
                gasLimit: 500000 // Adding explicit gas limit
            });
            
            // Wait for confirmation
            await txn.receipt;
            console.log("Donation successful:", txn);
            
            // Force refresh campaigns after donation
            await refreshCampaigns();
            
            return txn;
        } catch (error) {
            console.error("Error donating to campaign:", error);
            throw error;
        }
    }

    const getDonations = async (pId: string) => {
        try {
            // Call getDonators which returns [donators[], donations[]]
            const [donators, donations] = await contract?.call('getDonators', [pId]) || [[], []];
            
            // Safely map the arrays
            const parsedDonations = donators.map((donator: string, i: number) => ({
                donator,
                donation: ethers.utils.formatEther(donations[i]?.toString() || '0')
            }));
            
            return parsedDonations;
        } catch (error) {
            console.error("Error getting donations:", error);
            return [];
        }
    }

    const [searchCampaign, setSearchCampaign] = useState('');

    // Initial campaign load
    useEffect(() => {
        if (contract) {
            refreshCampaigns();
        }
    }, [contract]);

    return (
        <StateContext.Provider value={{
            address,
            contract,
            connect,
            disconnect,
            createCampaign: publishCampaign,
            getCampaigns,
            getApprovedCampaigns,
            getUserCampaigns,
            donate,
            getDonations,
            searchCampaign,
            setSearchCampaign,
            isAdmin,
            getPendingCampaigns,
            approveCampaign,
            rejectCampaign,
            refreshCampaigns // Export the refresh function
        }}>
            {children}
        </StateContext.Provider>
    )
}