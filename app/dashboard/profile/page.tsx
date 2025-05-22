'use client';

import React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
    User,
    Mail,
    Calendar,
    MapPin,
    Building,
    Edit2,
    Save,
    X,
    Camera,
    Shield,
    Bell,
    Key,
} from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

interface EditableFieldProps {
    value: string;
    label: string;
    icon: React.ReactNode;
    onSave: (value: string) => void;
}

const EditableField = ({ value, label, icon, onSave }: EditableFieldProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [fieldValue, setFieldValue] = useState(value);
    const [originalValue, setOriginalValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        setFieldValue(value);
        setOriginalValue(value);
    }, [value]);

    const handleSave = () => {
        onSave(fieldValue);
        setIsEditing(false);
        setOriginalValue(fieldValue);
    };

    const handleCancel = () => {
        setFieldValue(originalValue);
        setIsEditing(false);
    };

    return (
        <div className="group relative mb-4">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
                {icon}
                <span className="ml-2">{label}</span>
            </div>

            {isEditing ? (
                <div className="flex items-center">
                    <input
                        ref={inputRef}
                        type="text"
                        value={fieldValue}
                        onChange={(e) => setFieldValue(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <div className="flex ml-2">
                        <button
                            onClick={handleSave}
                            className="h-8 w-8 flex items-center justify-center text-green-500 hover:text-green-600 hover:bg-green-100 rounded-full transition-colors"
                        >
                            <Save className="h-4 w-4" />
                            <span className="sr-only">Save</span>
                        </button>
                        <button
                            onClick={handleCancel}
                            className="h-8 w-8 flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors ml-1"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Cancel</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    className="flex items-center justify-between p-2 rounded-md group-hover:bg-gray-100 transition-all cursor-pointer"
                    onClick={() => setIsEditing(true)}
                >
                    <span className="text-gray-800 font-medium">
                        {fieldValue}
                    </span>
                    <button className="h-8 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default function ProfilePage() {
    // Simulating the session object
    const {data: session} = useSession();

    const [user, setUser] = useState({
        name: session?.user?.name || 'Alex Johnson',
        email: session?.user?.email || 'alex.johnson@example.com',
        joinDate: 'January 15, 2023',
        location: 'San Francisco, CA',
        company: 'Acme Inc.',
        bio: 'SEO specialist with 5+ years of experience in content optimization and digital marketing strategies.',
        avatar: session?.user?.image || '/placeholder.svg?height=128&width=128',
    });

    const handleSave = (field: string, value: string) => {
        setUser((prev) => ({ ...prev, [field]: value }));
        // Simulate toast notification
        console.log('Profile updated');
    };

    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-8 px-4 max-w-6xl">
                <h1 className="text-3xl font-bold mb-8">My Profile</h1>

                <div className="grid gap-8 md:grid-cols-3">
                    {/* Left Column - Profile Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="h-32 bg-gradient-to-r from-theme to-theme2"></div>
                            <div className="relative px-6">
                                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                                    <div className="relative group">
                                        <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden">
                                            {user.avatar ? (
                                                <Image
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="h-full w-full object-cover"
                                                    width={150}
                                                    height={150}
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-500 text-4xl font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <Camera className="h-8 w-8 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-20 text-center px-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {user.name}
                                </h2>
                                <p className="text-gray-600 mt-1">{user.bio}</p>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center text-sm">
                                        <Mail className="h-4 w-4 mr-2 text-blue-500" />
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                                        <span>{user.location}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Building className="h-4 w-4 mr-2 text-blue-500" />
                                        <span>{user.company}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                                        <span>Joined {user.joinDate}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 pb-6 flex flex-wrap gap-2 justify-center">
                                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                                    SEO Expert
                                </span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                                    Content Creator
                                </span>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md mt-6 p-6">
                            <h3 className="text-lg font-bold mb-4">
                                Account Statistics
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        Content Generated
                                    </span>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                        142
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        Published Content
                                    </span>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                        98
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        Average SEO Score
                                    </span>
                                    <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                                        87%
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        Account Type
                                    </span>
                                    <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                                        Premium
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Tabs */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="border-b">
                                <div className="flex">
                                    {[
                                        'profile',
                                        'security',
                                        'notifications',
                                    ].map((tab) => (
                                        <button
                                            key={tab}
                                            className={`px-6 py-3 text-sm font-medium ${
                                                activeTab === tab
                                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                                    : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab.charAt(0).toUpperCase() +
                                                tab.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {activeTab === 'profile' && (
                                <div className="p-6">
                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold text-gray-800">
                                            Profile Information
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Update your profile information.
                                            Changes will be reflected across the
                                            platform.
                                        </p>
                                    </div>
                                    <div className="space-y-6">
                                        <EditableField
                                            label="Full Name"
                                            value={user.name}
                                            icon={<User className="h-4 w-4" />}
                                            onSave={(value) =>
                                                handleSave('name', value)
                                            }
                                        />

                                        <EditableField
                                            label="Email"
                                            value={user.email}
                                            icon={<Mail className="h-4 w-4" />}
                                            onSave={(value) =>
                                                handleSave('email', value)
                                            }
                                        />

                                        <EditableField
                                            label="Location"
                                            value={user.location}
                                            icon={
                                                <MapPin className="h-4 w-4" />
                                            }
                                            onSave={(value) =>
                                                handleSave('location', value)
                                            }
                                        />

                                        <EditableField
                                            label="Company"
                                            value={user.company}
                                            icon={
                                                <Building className="h-4 w-4" />
                                            }
                                            onSave={(value) =>
                                                handleSave('company', value)
                                            }
                                        />

                                        <div className="space-y-2">
                                            <div className="flex items-center text-sm text-gray-500 mb-1">
                                                <User className="h-4 w-4" />
                                                <span className="ml-2">
                                                    Bio
                                                </span>
                                            </div>
                                            <div className="group relative">
                                                <textarea
                                                    value={user.bio}
                                                    onChange={(e) =>
                                                        setUser({
                                                            ...user,
                                                            bio: e.target.value,
                                                        })
                                                    }
                                                    className="w-full p-2 min-h-[100px] border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all group-hover:border-blue-300"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <Button
                                            className="px-4 py-2 text-white rounded-md transition-colors"
                                            onClick={() => {
                                                console.log('Profile updated');
                                            }}
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="p-6">
                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold text-gray-800">
                                            Security Settings
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Manage your account security
                                            preferences.
                                        </p>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="flex items-center">
                                                    <Key className="h-4 w-4 mr-2 text-blue-500" />
                                                    <label className="text-sm font-medium">
                                                        Change Password
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Update your password
                                                    regularly to keep your
                                                    account secure.
                                                </p>
                                            </div>
                                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                                                Change
                                            </button>
                                        </div>

                                        <hr className="border-gray-200" />

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="flex items-center">
                                                    <Shield className="h-4 w-4 mr-2 text-blue-500" />
                                                    <label className="text-sm font-medium">
                                                        Two-Factor
                                                        Authentication
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Add an extra layer of
                                                    security to your account.
                                                </p>
                                            </div>
                                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                <input
                                                    type="checkbox"
                                                    id="2fa"
                                                    className="sr-only"
                                                />
                                                <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                                                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                                            </div>
                                        </div>

                                        <hr className="border-gray-200" />

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="flex items-center">
                                                    <Shield className="h-4 w-4 mr-2 text-blue-500" />
                                                    <label className="text-sm font-medium">
                                                        Active Sessions
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Manage your active sessions
                                                    across devices.
                                                </p>
                                            </div>
                                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                                                Manage
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="p-6">
                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold text-gray-800">
                                            Notification Preferences
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Control how and when you receive
                                            notifications.
                                        </p>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="flex items-center">
                                                    <Bell className="h-4 w-4 mr-2 text-blue-500" />
                                                    <label className="text-sm font-medium">
                                                        Email Notifications
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Receive notifications about
                                                    your content and account via
                                                    email.
                                                </p>
                                            </div>
                                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                <input
                                                    type="checkbox"
                                                    id="email-notifications"
                                                    className="sr-only"
                                                    defaultChecked
                                                />
                                                <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                                                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                                            </div>
                                        </div>

                                        <hr className="border-gray-200" />

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="flex items-center">
                                                    <Bell className="h-4 w-4 mr-2 text-blue-500" />
                                                    <label className="text-sm font-medium">
                                                        Content Updates
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Get notified when your
                                                    content performance changes.
                                                </p>
                                            </div>
                                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                <input
                                                    type="checkbox"
                                                    id="content-updates"
                                                    className="sr-only"
                                                    defaultChecked
                                                />
                                                <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                                                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                                            </div>
                                        </div>

                                        <hr className="border-gray-200" />

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="flex items-center">
                                                    <Bell className="h-4 w-4 mr-2 text-blue-500" />
                                                    <label className="text-sm font-medium">
                                                        Marketing Communications
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Receive updates about new
                                                    features and promotions.
                                                </p>
                                            </div>
                                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                <input
                                                    type="checkbox"
                                                    id="marketing"
                                                    className="sr-only"
                                                />
                                                <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                                                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <button
                                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                                            onClick={() => {
                                                console.log(
                                                    'Notification preferences updated'
                                                );
                                            }}
                                        >
                                            Save Preferences
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
