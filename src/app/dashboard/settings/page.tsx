'use client'

import { motion } from 'framer-motion'
import {
  Settings,
  User,
  Bell,
  Lock,
  Moon,
  Mail,
  Phone,
  MapPin,
  Save,
  LogOut,
  Eye,
  EyeOff,
  Smartphone,
  Monitor,
  Sun
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

export default function SettingsPage() {
  const [profileName, setProfileName] = useState('Sarah Johnson')
  const [profileEmail, setProfileEmail] = useState('sarah.j@careplatform.com')
  const [profilePhone, setProfilePhone] = useState('+44 7700 900123')
  const [profileLocation, setProfileLocation] = useState('North London')
  const [showPassword, setShowPassword] = useState(false)
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState({
    visitReminders: true,
    careLogUpdates: true,
    incidentAlerts: true,
    teamMessages: true,
    weeklyReport: true,
    systemUpdates: false
  })

  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSaveProfile = () => {
    console.log('Profile saved')
  }

  const handleChangePassword = () => {
    console.log('Password change initiated')
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-4xl"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure your account, notification preferences, and system settings</p>
        </div>
      </motion.div>

      {/* Profile Section */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 pb-6 border-b">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-2xl flex-shrink-0">
                {profileName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{profileName}</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <Input
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <Input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <Input
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  placeholder="Enter phone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location/Department</label>
                <Input
                  value={profileLocation}
                  onChange={(e) => setProfileLocation(e.target.value)}
                  placeholder="Enter location"
                />
              </div>
            </div>

            <Button
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-blue-600 to-purple-600 w-full"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security Section */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security & Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter current password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <Input
                type="password"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <Input
                type="password"
                placeholder="Confirm new password"
              />
            </div>

            <Button
              onClick={handleChangePassword}
              className="bg-gradient-to-r from-blue-600 to-purple-600 w-full"
            >
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>

            <div className="pt-4 border-t">
              <h4 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
              <Badge variant="outline" className="bg-gray-50">
                Not Enabled
              </Badge>
              <Button variant="outline" className="mt-3 w-full">
                <Smartphone className="mr-2 h-4 w-4" />
                Enable 2FA
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications Section */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {([
              { key: 'visitReminders' as const, label: 'Visit Reminders', description: 'Get notified about upcoming visits' },
              { key: 'careLogUpdates' as const, label: 'Care Log Updates', description: 'Receive updates on submitted care logs' },
              { key: 'incidentAlerts' as const, label: 'Incident Alerts', description: 'Be notified of reported incidents' },
              { key: 'teamMessages' as const, label: 'Team Messages', description: 'Receive messages from team members' },
              { key: 'weeklyReport' as const, label: 'Weekly Report', description: 'Get weekly performance summaries' },
              { key: 'systemUpdates' as const, label: 'System Updates', description: 'Notifications about system maintenance' }
            ] as const).map((notif) => (
              <div key={notif.key} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-all">
                <div>
                  <p className="font-medium text-gray-900">{notif.label}</p>
                  <p className="text-sm text-gray-600">{notif.description}</p>
                </div>
                <button
                  onClick={() => handleToggleNotification(notif.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    notifications[notif.key]
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {notifications[notif.key] ? 'On' : 'Off'}
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Appearance Section */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Appearance & Theme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">Choose your preferred theme for the application</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'light', label: 'Light', icon: <Sun className="h-6 w-6" /> },
                { id: 'dark', label: 'Dark', icon: <Moon className="h-6 w-6" /> },
                { id: 'auto', label: 'Auto', icon: <Monitor className="h-6 w-6" /> }
              ].map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => setTheme(themeOption.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    theme === themeOption.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`mx-auto mb-2 ${theme === themeOption.id ? 'text-blue-600' : 'text-gray-600'}`}>
                    {themeOption.icon}
                  </div>
                  <p className="font-medium text-gray-900">{themeOption.label}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Sign Out</h4>
              <p className="text-sm text-gray-600 mb-3">Sign out of your account on this device</p>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>

            <div className="pt-4 border-t border-red-200">
              <h4 className="font-semibold text-gray-900 mb-2">Delete Account</h4>
              <p className="text-sm text-gray-600 mb-3">Permanently delete your account and all associated data</p>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
