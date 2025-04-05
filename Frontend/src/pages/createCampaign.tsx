import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormField } from "../components/formField"
import { CustomButton } from "../components/customButton"
import { ethers } from "ethers"
import { checkIfImage } from "../utils"
import { toast } from "sonner"
import { StateContext } from "../contexts"
import { Loader } from "../components/loader"

export function CreateCampaign() {
    const { createCampaign } = useContext(StateContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: ''
    })

    const handleFormFieldChange = (fieldName: string, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        checkIfImage(form.image, async (exists) => {
            if (exists) {
                setIsLoading(true)
                await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) })
                setIsLoading(false)
                navigate('/admin')
            } else {
                toast.error("Provide valid image URL")
                setForm({ ...form, image: '' })
            }
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {isLoading && <Loader />}
                
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Launch New Campaign
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Create your crowdfunding campaign in few simple steps
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Top Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField
                                labelName="Your Name"
                                placeholder="John Doe"
                                inputType="text"
                                value={form.name}
                                handleChange={(e) => handleFormFieldChange('name', e)}
                            />
                            <FormField
                                labelName="Campaign Title"
                                placeholder="Amazing Project"
                                inputType="text"
                                value={form.title}
                                handleChange={(e) => handleFormFieldChange('title', e)}
                            />
                        </div>

                        {/* Description */}
                        <FormField
                            labelName="Campaign Story"
                            placeholder="Tell us about your project..."
                            isTextArea
                            value={form.description}
                            handleChange={(e) => handleFormFieldChange('description', e)}
                        />

                        {/* Middle Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField
                                labelName="Funding Goal (ETH)"
                                placeholder="0.00"
                                inputType="number"
                                value={form.target}
                                handleChange={(e) => handleFormFieldChange('target', e)}
                            />
                            <FormField
                                labelName="Campaign Deadline"
                                placeholder=""
                                inputType="date"
                                value={form.deadline}
                                handleChange={(e) => handleFormFieldChange('deadline', e)}
                            />
                        </div>

                        {/* Image URL */}
                        <FormField
                            labelName="Featured Image URL"
                            placeholder="https://example.com/image.jpg"
                            inputType="url"
                            value={form.image}
                            handleChange={(e) => handleFormFieldChange('image', e)}
                        />

                        {/* Image Preview */}
                        {form.image && (
                            <div className="mt-6 border rounded-lg p-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Image Preview</h3>
                                <img 
                                    src={form.image} 
                                    alt="Campaign preview" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="mt-10">
                            <CustomButton
                                btnType="submit"
                                title={
                                    <div className="flex items-center justify-center gap-3">
                                        <svg 
                                            className="w-5 h-5" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                        Launch Campaign
                                    </div>
                                }
                                styles="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}