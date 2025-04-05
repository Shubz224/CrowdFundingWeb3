import { useContext, useEffect, useState } from "react";
import { Loader } from "../components/loader";
import { StateContext } from "../contexts";


export function AdminDashboard() {
  const {
    getPendingCampaigns,
    getCampaigns,
    approveCampaign,
    rejectCampaign,
    refreshCampaigns, // Use the new refreshCampaigns function
    contract
  } = useContext(StateContext);

  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [allCampaigns, setAllCampaigns] = useState<any[]>([]);
  const [campaignCount, setCampaignCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rejectionReasons, setRejectionReasons] = useState<{ [key: string]: string }>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  

  // Modified refresh handler
  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    setLoading(true);
    setError("");
    
    try {
      console.log("Starting full refresh");
      
      // Force refresh campaigns from the contract
      await refreshCampaigns();
      
      // Update campaign count
      if (contract) {
        const count = await contract.call('numberOfCampaigns');
        console.log("Campaign count on refresh:", count.toString());
        setCampaignCount(parseInt(count.toString()));
      }
      
      // Get fresh data
      const pendingData = await getPendingCampaigns();
      console.log("Pending campaigns after refresh:", pendingData);
      setCampaigns(pendingData);
      
      const allData = await getCampaigns();
      console.log("All campaigns after refresh:", allData);
      setAllCampaigns(allData);
      
      console.log("Refresh completed successfully");
    } catch (err) {
      console.error("Error refreshing data:", err);
      setError("Failed to refresh data: " + (err as Error).message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    const loadInitialData = async () => {
      if (!contract) {
        setError("Contract not available");
        setLoading(false);
        return;
      }
      
      try {
        await handleRefresh();
      } catch (err) {
        console.error("Error loading initial data:", err);
        setError("Failed to load initial data");
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, [contract]);

  // Modified approve handler
  const handleApprove = async (id: string) => {
    try {
      setLoading(true);
      console.log("Approving campaign:", id);
      await approveCampaign(id);
      console.log("Campaign approved successfully");
      
      // Force a full refresh after approval
      await handleRefresh();
    } catch (error) {
      console.error("Approval failed:", error);
      setError("Approval failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Modified reject handler
  const handleReject = async (id: string) => {
    if (!rejectionReasons[id]?.trim()) {
      setError("Please provide a rejection reason");
      return;
    }
    
    try {
      setLoading(true);
      console.log("Rejecting campaign:", id, "with reason:", rejectionReasons[id]);
      await rejectCampaign(id, rejectionReasons[id]);
      console.log("Campaign rejected successfully");
      
      // Force a full refresh after rejection
      await handleRefresh();
    } catch (error) {
      console.error("Rejection failed:", error);
      setError("Rejection failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Show a loading indicator with status message
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader />
        <p className="mt-4">
          {isRefreshing ? "Refreshing campaign data..." : "Loading admin dashboard..."}
        </p>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-gray-600 text-lg">
          {isRefreshing ? "Refreshing campaign data..." : "Loading admin dashboard..."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-3xl font-bold text-gray-900">Campaign Moderation</h1>
          <p className="mt-2 text-gray-500">Manage campaign approvals and reviews</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`flex items-center px-5 py-3 rounded-lg transition-colors ${
            isRefreshing 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <svg 
            className={`w-5 h-5 mr-2 ${isRefreshing && "animate-spin"}`} 
            fill="none" 
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center text-red-700">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <dt className="text-sm font-medium text-gray-500">Total Campaigns</dt>
          <dd className="mt-2 text-3xl font-semibold text-gray-900">{campaignCount}</dd>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <dt className="text-sm font-medium text-gray-500">Pending Reviews</dt>
          <dd className="mt-2 text-3xl font-semibold text-blue-600">{campaigns.length}</dd>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <dt className="text-sm font-medium text-gray-500">Loaded Campaigns</dt>
          <dd className="mt-2 text-3xl font-semibold text-gray-900">{allCampaigns.length}</dd>
        </div>
      </div>

      {allCampaigns.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">All Campaigns Overview</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allCampaigns.map((campaign) => {
                  // Fix: Ensure statusCode is typed as 0, 1, or 2
                  const statusCode = parseInt(campaign.status) as 0 | 1 | 2;
                  
                  // Define statusConfig with appropriate typing
                  const statusConfig: Record<0 | 1 | 2, { text: string; color: string }> = {
                    0: { text: "Pending", color: "bg-yellow-100 text-yellow-800" },
                    1: { text: "Approved", color: "bg-green-100 text-green-800" },
                    2: { text: "Rejected", color: "bg-red-100 text-red-800" }
                  };

                  // Fallback for safety in case the status is somehow out of range
                  const status = statusConfig[statusCode] || { text: "Unknown", color: "bg-gray-100 text-gray-800" };

                  return (
                    <tr key={campaign.pId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">#{campaign.pId}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{campaign.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">{campaign.owner.substring(0, 10)}...</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {campaigns.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-xl border border-dashed border-gray-200">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No pending campaigns</h3>
          <p className="mt-2 text-sm text-gray-500">All campaigns have been reviewed and processed.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Pending Campaign Reviews ({campaigns.length})</h2>
          {campaigns.map((campaign) => (
            <div key={campaign.pId} className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{campaign.title}</h3>
                    <span className="text-sm font-mono px-2 py-1 bg-gray-100 rounded">ID: {campaign.pId}</span>
                  </div>
                  <p className="text-gray-600">{campaign.description}</p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Target: {campaign.target} ETH</span>
                    </div>
                  </div>
                </div>

                <div className="md:w-96 space-y-4">
                  <div className="space-y-2">
                    <button
                      onClick={() => handleApprove(campaign.pId)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Approve Campaign
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Rejection reason..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      value={rejectionReasons[campaign.pId] || ""}
                      onChange={(e) => setRejectionReasons(prev => ({
                        ...prev,
                        [campaign.pId]: e.target.value
                      }))}
                    />
                    <button
                      onClick={() => handleReject(campaign.pId)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject Campaign
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}