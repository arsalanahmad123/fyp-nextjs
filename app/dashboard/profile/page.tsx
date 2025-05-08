'use client';

import type React from 'react';

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
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

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
                        className="w-full p-2 border border-[var(--input)] rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-[var(--color-theme)] transition-all"
                    />
                    <div className="flex ml-2">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleSave}
                            className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20"
                        >
                            <Save className="h-4 w-4" />
                            <span className="sr-only">Save</span>
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleCancel}
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Cancel</span>
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    className="flex items-center justify-between p-2 rounded-md group-hover:bg-[var(--sidebar-accent)] transition-all cursor-pointer"
                    onClick={() => setIsEditing(true)}
                >
                    <span className="text-[var(--foreground)] font-medium">
                        {fieldValue}
                    </span>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-theme)]"
                    >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default function ProfilePage() {
    const [user, setUser] = useState({
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        joinDate: 'January 15, 2023',
        location: 'San Francisco, CA',
        company: 'Acme Inc.',
        bio: 'SEO specialist with 5+ years of experience in content optimization and digital marketing strategies.',
        avatar: '/placeholder.svg?height=128&width=128',
    });

    const handleSave = (field: string, value: string) => {
        setUser((prev) => ({ ...prev, [field]: value }));
        toast.success('Profile updated');
    };

    return (
        <div className="container mx-auto py-8 px-4 max-w-10/12">
            <h1 className="text-3xl font-bold mb-8 font-dm-sans">My Profile</h1>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Left Column - Profile Card */}
                <div className="md:col-span-1">
                    <Card className="overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-[var(--color-theme)] to-[var(--sidebar-primary)]"></div>
                        <div className="relative px-6">
                            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                                <div className="relative group">
                                    <div className="h-32 w-32 rounded-full border-4 border-card bg-card overflow-hidden">
                                        A 
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Camera className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CardHeader className="pt-20 text-center">
                            <CardTitle className="text-2xl font-dm-sans">
                                {user.name}
                            </CardTitle>
                            <CardDescription>{user.bio}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center text-sm">
                                    <Mail className="h-4 w-4 mr-2 text-[var(--color-theme)]" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <MapPin className="h-4 w-4 mr-2 text-[var(--color-theme)]" />
                                    <span>{user.location}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Building className="h-4 w-4 mr-2 text-[var(--color-theme)]" />
                                    <span>{user.company}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Calendar className="h-4 w-4 mr-2 text-[var(--color-theme)]" />
                                    <span>Joined {user.joinDate}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-center gap-2">
                            <Badge
                                variant="outline"
                                className="bg-[var(--sidebar-accent)] hover:bg-[var(--sidebar-accent)]"
                            >
                                SEO Expert
                            </Badge>
                            <Badge
                                variant="outline"
                                className="bg-[var(--sidebar-accent)] hover:bg-[var(--sidebar-accent)]"
                            >
                                Content Creator
                            </Badge>
                        </CardFooter>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="text-lg font-dm-sans">
                                Account Statistics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm">
                                    Content Generated
                                </span>
                                <Badge>142</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">
                                    Published Content
                                </span>
                                <Badge>98</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">
                                    Average SEO Score
                                </span>
                                <Badge className="bg-green-500">87%</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Account Type</span>
                                <Badge
                                    variant="outline"
                                    className="bg-[var(--color-theme)] text-white"
                                >
                                    Premium
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Tabs */}
                <div className="md:col-span-2">
                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="security">Security</TabsTrigger>
                            <TabsTrigger value="notifications">
                                Notifications
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="profile" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-dm-sans">
                                        Profile Information
                                    </CardTitle>
                                    <CardDescription>
                                        Update your profile information. Changes
                                        will be reflected across the platform.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
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
                                        icon={<MapPin className="h-4 w-4" />}
                                        onSave={(value) =>
                                            handleSave('location', value)
                                        }
                                    />

                                    <EditableField
                                        label="Company"
                                        value={user.company}
                                        icon={<Building className="h-4 w-4" />}
                                        onSave={(value) =>
                                            handleSave('company', value)
                                        }
                                    />

                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                                            <User className="h-4 w-4" />
                                            <span className="ml-2">Bio</span>
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
                                                className="w-full p-2 min-h-[100px] border border-[var(--input)] rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-[var(--color-theme)] transition-all group-hover:border-[var(--color-theme)]"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button
                                        className="bg-[var(--color-theme)] hover:bg-[var(--color-theme)]/90 text-white"
                                        onClick={() => {
                                            toast('Profile updated');
                                        }}
                                    >
                                        Save Changes
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="security" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-dm-sans">
                                        Security Settings
                                    </CardTitle>
                                    <CardDescription>
                                        Manage your account security
                                        preferences.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center">
                                                    <Key className="h-4 w-4 mr-2 text-[var(--color-theme)]" />
                                                    <Label htmlFor="password">
                                                        Change Password
                                                    </Label>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Update your password
                                                    regularly to keep your
                                                    account secure.
                                                </p>
                                            </div>
                                            <Button variant="outline">
                                                Change
                                            </Button>
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center">
                                                    <Shield className="h-4 w-4 mr-2 text-[var(--color-theme)]" />
                                                    <Label htmlFor="2fa">
                                                        Two-Factor
                                                        Authentication
                                                    </Label>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Add an extra layer of
                                                    security to your account.
                                                </p>
                                            </div>
                                            <Switch id="2fa" />
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center">
                                                    <Shield className="h-4 w-4 mr-2 text-[var(--color-theme)]" />
                                                    <Label>
                                                        Active Sessions
                                                    </Label>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Manage your active sessions
                                                    across devices.
                                                </p>
                                            </div>
                                            <Button variant="outline">
                                                Manage
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="notifications" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-dm-sans">
                                        Notification Preferences
                                    </CardTitle>
                                    <CardDescription>
                                        Control how and when you receive
                                        notifications.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center">
                                                    <Bell className="h-4 w-4 mr-2 text-[var(--color-theme)]" />
                                                    <Label htmlFor="email-notifications">
                                                        Email Notifications
                                                    </Label>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Receive notifications about
                                                    your content and account via
                                                    email.
                                                </p>
                                            </div>
                                            <Switch
                                                id="email-notifications"
                                                defaultChecked
                                            />
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center">
                                                    <Bell className="h-4 w-4 mr-2 text-[var(--color-theme)]" />
                                                    <Label htmlFor="content-updates">
                                                        Content Updates
                                                    </Label>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Get notified when your
                                                    content performance changes.
                                                </p>
                                            </div>
                                            <Switch
                                                id="content-updates"
                                                defaultChecked
                                            />
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center">
                                                    <Bell className="h-4 w-4 mr-2 text-[var(--color-theme)]" />
                                                    <Label htmlFor="marketing">
                                                        Marketing Communications
                                                    </Label>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Receive updates about new
                                                    features and promotions.
                                                </p>
                                            </div>
                                            <Switch id="marketing" />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button
                                        className="bg-[var(--color-theme)] hover:bg-[var(--color-theme)]/90 text-white"
                                        onClick={() => {
                                            toast('Notification preferences updated');
                                        }}
                                    >
                                        Save Preferences
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
