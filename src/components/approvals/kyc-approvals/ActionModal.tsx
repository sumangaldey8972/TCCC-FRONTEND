"use client";

import appClient from "@/lib/appClient";
import { useAppSelector } from "@/store/hooks/hooks";
import { KYCData } from "@/type/kyc";
import { X, Eye, Download, User, MapPin, Calendar, FileText } from "lucide-react";
import { useState } from "react";

interface ActionModalProps {
    kyc: KYCData;
    onClose: () => void;
    onActionComplete: () => void;
}

const ActionModal = ({ kyc, onClose, onActionComplete }: ActionModalProps) => {
    const [selectedAction, setSelectedAction] = useState<'approved' | 'rejected' | 'on-hold' | 'paused' | ''>('');
    const [remarks, setRemarks] = useState('');
    const [loading, setLoading] = useState(false);

    const authedUser = useAppSelector((state) => state.auth.user)

    const handleAction = async () => {
        setLoading(true);
        const payload = {
            kycId: kyc._id,
            status: selectedAction,
            remarks: remarks,
            userId: kyc.user.userId,
            adminId: authedUser?._id
        }
        console.log({ payload })
        try {
            const response = await appClient.post('/api/approvals/kyc-approvals/action', payload);
            console.log(response)
            if (response.data.status) {
                onActionComplete();
            }
        } catch (error) {
            console.error('Error taking action:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDocument = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background border border-text-primary/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-text-primary/20">
                    <div>
                        <h2 className="text-2xl font-bold text-text-primary">Review KYC Application</h2>
                        <p className="text-text-primary/70">User: {kyc.user.userName} ({kyc.user.email})</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-text-primary/10 rounded-lg transition-colors"
                    >
                        <X size={24} className="text-text-primary" />
                    </button>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                    <div className="p-6 space-y-6">
                        {/* User Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                                    <User size={20} />
                                    User Details
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-text-primary/70">Username:</span>
                                        <span className="text-text-primary font-medium">{kyc.user.userName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-primary/70">Email:</span>
                                        <span className="text-text-primary font-medium">{kyc.user.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-primary/70">User ID:</span>
                                        <span className="text-text-primary font-medium text-sm">{kyc.user.userId}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                                    <MapPin size={20} />
                                    Application Details
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-text-primary/70">Country:</span>
                                        <span className="text-text-primary font-medium">{kyc.country}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-primary/70">Submitted:</span>
                                        <span className="text-text-primary font-medium">
                                            {new Date(kyc.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-primary/70">Current Status:</span>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${kyc.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            kyc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                kyc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    kyc.status === 'on-hold' ? 'bg-orange-100 text-orange-800' :
                                                        'bg-purple-100 text-purple-800'
                                            }`}>
                                            {kyc.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Documents */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                                <FileText size={20} />
                                Submitted Documents
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {Object.entries(kyc.documents).map(([key, url]) => (
                                    key !== 'additional' && (
                                        <div key={key} className="text-center">
                                            <div className="relative group">
                                                <img
                                                    src={url}
                                                    alt={key}
                                                    className="w-full h-32 object-cover rounded-lg bg-gray-700 cursor-pointer"
                                                    onClick={() => handleViewDocument(url)}
                                                />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleViewDocument(url)}
                                                        className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <a
                                                        href={url}
                                                        download
                                                        className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                                                    >
                                                        <Download size={16} />
                                                    </a>
                                                </div>
                                            </div>
                                            <p className="text-text-primary/70 text-sm mt-2 capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </p>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>

                        {/* Action Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-text-primary">Take Action</h3>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <button
                                    onClick={() => setSelectedAction('approved')}
                                    className={`p-3 border-2 rounded-lg text-center transition-all ${selectedAction === 'approved'
                                        ? 'border-green-500 bg-green-500/10 text-green-400'
                                        : 'border-text-primary/20 hover:border-green-500 text-text-primary'
                                        }`}
                                >
                                    <div className="font-semibold">Approve</div>
                                    <div className="text-xs opacity-70">Verify User</div>
                                </button>

                                <button
                                    onClick={() => setSelectedAction('rejected')}
                                    className={`p-3 border-2 rounded-lg text-center transition-all ${selectedAction === 'rejected'
                                        ? 'border-red-500 bg-red-500/10 text-red-400'
                                        : 'border-text-primary/20 hover:border-red-500 text-text-primary'
                                        }`}
                                >
                                    <div className="font-semibold">Reject</div>
                                    <div className="text-xs opacity-70">Decline Application</div>
                                </button>

                                <button
                                    onClick={() => setSelectedAction('on-hold')}
                                    className={`p-3 border-2 rounded-lg text-center transition-all ${selectedAction === 'on-hold'
                                        ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                                        : 'border-text-primary/20 hover:border-orange-500 text-text-primary'
                                        }`}
                                >
                                    <div className="font-semibold">On Hold</div>
                                    <div className="text-xs opacity-70">Need More Info</div>
                                </button>

                                <button
                                    onClick={() => setSelectedAction('paused')}
                                    className={`p-3 border-2 rounded-lg text-center transition-all ${selectedAction === 'paused'
                                        ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                                        : 'border-text-primary/20 hover:border-purple-500 text-text-primary'
                                        }`}
                                >
                                    <div className="font-semibold">Pause</div>
                                    <div className="text-xs opacity-70">Temporary Hold</div>
                                </button>
                            </div>

                            {/* Remarks Input */}
                            {selectedAction && (
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-text-primary">
                                        Remarks {selectedAction !== 'approved' && '(Required)'}
                                    </label>
                                    <textarea
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        placeholder={`Enter remarks for ${selectedAction} action...`}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-text-primary/20 rounded-lg bg-background text-text-primary placeholder-text-primary/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        required={selectedAction !== 'approved'}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between p-6 border-t border-text-primary/20">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-text-primary/20 rounded-lg text-text-primary hover:bg-text-primary/10 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleAction}
                        disabled={!selectedAction || loading || (selectedAction !== 'approved' && !remarks.trim())}
                        className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : `Confirm ${selectedAction}`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActionModal;