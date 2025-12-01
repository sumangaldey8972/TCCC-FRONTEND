"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { MapPin, Edit2, Save, X, Search, ChevronDown } from "lucide-react"
import mockData from "@/constant/country-cities-mock-data"
import { updateUser, User } from "@/store/slices/authSlice";
import { toastLoading, toastUpdate } from "@/app/utils/toast-message";
import appClient from "@/lib/appClient";
import { useAppDispatch } from "@/store/hooks/hooks";
import { uodateAddressInformation } from "@/lib/firebase/firebaseUserCheck";


interface AddressSectionProps {
    user: User;
}

interface Country {
    id: number;
    name: string;
    value: string;
    cities: City[];
}

interface City {
    id: number;
    name: string;
    value: string;
}

const AddressSection = ({ user }: AddressSectionProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        country: user.country || "",
        pincode: user.pincode || "",
        city: user.city || "",
        address: user.address || "",
        userId: user._id || ""
    })

    const dispatch = useAppDispatch()

    // Country selection states
    const [showCountryDropdown, setShowCountryDropdown] = useState(false)
    const [countrySearch, setCountrySearch] = useState("")
    const [countryPage, setCountryPage] = useState(1)
    const countryItemsPerPage = 20

    // City selection states
    const [showCityDropdown, setShowCityDropdown] = useState(false)
    const [citySearch, setCitySearch] = useState("")
    const [cityPage, setCityPage] = useState(1)
    const cityItemsPerPage = 20

    const countryListRef = useRef<HTMLDivElement>(null)
    const cityListRef = useRef<HTMLDivElement>(null)

    // Filter countries based on search
    const filteredCountries = useMemo(() => {
        const searchTerm = countrySearch.toLowerCase()
        return mockData.filter(country =>
            country.name.toLowerCase().includes(searchTerm) ||
            country.value.toLowerCase().includes(searchTerm)
        )
    }, [countrySearch])

    // Get current country's cities
    const currentCountryCities = useMemo(() => {
        const country = mockData.find(c => c.name === formData.country || c.value === formData.country)
        return country?.cities || []
    }, [formData.country])

    // Filter cities based on search
    const filteredCities = useMemo(() => {
        const searchTerm = citySearch.toLowerCase()
        return currentCountryCities.filter(city =>
            city.name.toLowerCase().includes(searchTerm) ||
            city.value.toLowerCase().includes(searchTerm)
        )
    }, [currentCountryCities, citySearch])

    // Paginated countries
    const paginatedCountries = useMemo(() => {
        const startIndex = 0
        const endIndex = countryPage * countryItemsPerPage
        return filteredCountries.slice(startIndex, endIndex)
    }, [filteredCountries, countryPage])

    // Paginated cities
    const paginatedCities = useMemo(() => {
        const startIndex = 0
        const endIndex = cityPage * cityItemsPerPage
        return filteredCities.slice(startIndex, endIndex)
    }, [filteredCities, cityPage])

    // Check if more countries/cities can be loaded
    const hasMoreCountries = paginatedCountries.length < filteredCountries.length
    const hasMoreCities = paginatedCities.length < filteredCities.length

    // Infinite scroll handlers
    const handleCountryScroll = () => {
        if (!countryListRef.current) return

        const { scrollTop, scrollHeight, clientHeight } = countryListRef.current
        if (scrollTop + clientHeight >= scrollHeight - 10 && hasMoreCountries) {
            setCountryPage(prev => prev + 1)
        }
    }

    const handleCityScroll = () => {
        if (!cityListRef.current) return

        const { scrollTop, scrollHeight, clientHeight } = cityListRef.current
        if (scrollTop + clientHeight >= scrollHeight - 10 && hasMoreCities) {
            setCityPage(prev => prev + 1)
        }
    }

    // Reset city when country changes
    useEffect(() => {
        if (formData.country && !currentCountryCities.some(city => city.name === formData.city || city.value === formData.city)) {
            setFormData(prev => ({ ...prev, city: "" }))
        }
    }, [formData.country, formData.city, currentCountryCities])

    const handleCountrySelect = (country: Country) => {
        setFormData(prev => ({
            ...prev,
            country: country.name,
            city: "" // Reset city when country changes
        }))
        setShowCountryDropdown(false)
        setCountrySearch("")
        setCountryPage(1)
    }

    const handleCitySelect = (city: City) => {
        setFormData(prev => ({ ...prev, city: city.name }))
        setShowCityDropdown(false)
        setCitySearch("")
        setCityPage(1)
    }


    const handleSave = async () => {
        setIsEditing(true)

        const toastId = toastLoading("Updating...", {
            description: "We are updating your details, please wait"
        })

        try {
            const response = await appClient.post("/api/auth/address-info", formData)


            if (response.data.status) {
                const user = response.data.updatedUser
                dispatch(updateUser({ user }))
                await uodateAddressInformation(user)
                toastUpdate(toastId, "success", "Success", {
                    description: response.data.message || "Personal info updated successfully"
                })
                setIsEditing(false)
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occured";
            toastUpdate(toastId, "error", "Info update error", {
                description: errorMessage || "Info update failed"
            })
            setIsEditing(false)
        }

    }


    const handleCancel = () => {
        setFormData({
            country: user.country || "",
            pincode: user.pincode || "",
            city: user.city || "",
            address: user.address || "",
            userId: user._id || ""
        })
        setIsEditing(false)
        setShowCountryDropdown(false)
        setShowCityDropdown(false)
        setCountrySearch("")
        setCitySearch("")
        setCountryPage(1)
        setCityPage(1)
    }

    const getDisplayText = (value: string, defaultText: string = "Not provided") => {
        return value || defaultText
    }

    return (
        <div className="bg-background/80 backdrop-blur-sm border border-text-primary/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sky-400" />
                    Address Information
                </h2>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sky-400 hover:text-sky-300 transition-colors duration-200 text-sm"
                    >
                        <Edit2 className="w-4 h-4" />
                        Edit
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-400 text-white rounded-lg hover:bg-emerald-500 transition-colors duration-200 text-sm"
                        >
                            <Save className="w-4 h-4" />
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-3 py-1.5 text-text-primary/70 hover:text-text-primary transition-colors duration-200 text-sm"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Country */}
                <div className="space-y-2 relative">
                    <label className="text-sm font-medium text-text-primary">Country</label>
                    {isEditing ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                className="w-full bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-sky-400 transition-colors text-sm text-left flex items-center justify-between"
                            >
                                <span className={formData.country ? "text-text-primary" : "text-text-primary/50"}>
                                    {getDisplayText(formData.country, "Select country")}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-text-primary/50 transition-transform ${showCountryDropdown ? "rotate-180" : ""}`} />
                            </button>

                            {showCountryDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-text-primary/20 rounded-lg shadow-lg z-10 max-h-60 overflow-hidden">
                                    {/* Search Input */}
                                    <div className="p-2 border-b border-text-primary/10">
                                        <div className="relative">
                                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-primary/50" />
                                            <input
                                                type="text"
                                                value={countrySearch}
                                                onChange={(e) => setCountrySearch(e.target.value)}
                                                placeholder="Search countries..."
                                                className="w-full bg-background/50 border border-text-primary/20 rounded-lg pl-8 pr-3 py-1.5 text-text-primary text-sm focus:outline-none focus:border-sky-400"
                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    {/* Country List */}
                                    <div
                                        ref={countryListRef}
                                        onScroll={handleCountryScroll}
                                        className="max-h-48 overflow-y-auto"
                                    >
                                        {paginatedCountries.length > 0 ? (
                                            paginatedCountries.map((country) => (
                                                <button
                                                    key={country.id}
                                                    type="button"
                                                    onClick={() => handleCountrySelect(country)}
                                                    className={`w-full px-3 py-2 text-left text-sm hover:bg-sky-400/10 transition-colors ${formData.country === country.name ? "bg-sky-400/20 text-sky-400" : "text-text-primary"
                                                        }`}
                                                >
                                                    {country.name}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-3 py-2 text-text-primary/50 text-sm text-center">
                                                No countries found
                                            </div>
                                        )}

                                        {/* Loading indicator */}
                                        {hasMoreCountries && (
                                            <div className="px-3 py-2 text-center">
                                                <div className="inline-block w-4 h-4 border-2 border-text-primary/30 border-t-sky-400 rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary text-sm min-h-[40px] flex items-center">
                            {getDisplayText(user.country ?? "")}
                        </div>
                    )}
                </div>

                {/* Pincode */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Pincode</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                            className="w-full bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-sky-400 transition-colors text-sm"
                            placeholder="Enter pincode"
                        />
                    ) : (
                        <div className="bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary text-sm min-h-[40px] flex items-center">
                            {getDisplayText(user.pincode ?? "")}
                        </div>
                    )}
                </div>

                {/* City */}
                <div className="space-y-2 sm:col-span-2 relative">
                    <label className="text-sm font-medium text-text-primary">City</label>
                    {isEditing ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => formData.country && setShowCityDropdown(!showCityDropdown)}
                                disabled={!formData.country}
                                className={`w-full bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-left flex items-center justify-between transition-colors text-sm ${formData.country
                                    ? "text-text-primary focus:outline-none focus:border-sky-400"
                                    : "text-text-primary/30 cursor-not-allowed"
                                    }`}
                            >
                                <span className={formData.city ? "text-text-primary" : "text-text-primary/50"}>
                                    {formData.country
                                        ? getDisplayText(formData.city, "Select city")
                                        : "Select country first"
                                    }
                                </span>
                                <ChevronDown className={`w-4 h-4 text-text-primary/50 transition-transform ${showCityDropdown ? "rotate-180" : ""}`} />
                            </button>

                            {showCityDropdown && formData.country && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-text-primary/20 rounded-lg shadow-lg z-10 max-h-60 overflow-hidden">
                                    {/* Search Input */}
                                    <div className="p-2 border-b border-text-primary/10">
                                        <div className="relative">
                                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-primary/50" />
                                            <input
                                                type="text"
                                                value={citySearch}
                                                onChange={(e) => setCitySearch(e.target.value)}
                                                placeholder="Search cities..."
                                                className="w-full bg-background/50 border border-text-primary/20 rounded-lg pl-8 pr-3 py-1.5 text-text-primary text-sm focus:outline-none focus:border-sky-400"
                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    {/* City List */}
                                    <div
                                        ref={cityListRef}
                                        onScroll={handleCityScroll}
                                        className="max-h-48 overflow-y-auto"
                                    >
                                        {paginatedCities.length > 0 ? (
                                            paginatedCities.map((city) => (
                                                <button
                                                    key={city.id}
                                                    type="button"
                                                    onClick={() => handleCitySelect(city)}
                                                    className={`w-full px-3 py-2 text-left text-sm hover:bg-sky-400/10 transition-colors ${formData.city === city.name ? "bg-sky-400/20 text-sky-400" : "text-text-primary"
                                                        }`}
                                                >
                                                    {city.name}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-3 py-2 text-text-primary/50 text-sm text-center">
                                                {currentCountryCities.length === 0 ? "No cities available" : "No cities found"}
                                            </div>
                                        )}

                                        {/* Loading indicator */}
                                        {hasMoreCities && (
                                            <div className="px-3 py-2 text-center">
                                                <div className="inline-block w-4 h-4 border-2 border-text-primary/30 border-t-sky-400 rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary text-sm min-h-[40px] flex items-center">
                            {getDisplayText(user.city ?? "")}
                        </div>
                    )}
                </div>

                {/* Address */}
                <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-text-primary">Full Address</label>
                    {isEditing ? (
                        <textarea
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            rows={3}
                            className="w-full bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-sky-400 transition-colors text-sm resize-none"
                            placeholder="Enter full address"
                        />
                    ) : (
                        <div className="bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary text-sm min-h-[80px] flex items-start">
                            {getDisplayText(user.address ?? "")}
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay to close dropdowns when clicking outside */}
            {(showCountryDropdown || showCityDropdown) && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => {
                        setShowCountryDropdown(false)
                        setShowCityDropdown(false)
                    }}
                />
            )}
        </div>
    )
}

export default AddressSection