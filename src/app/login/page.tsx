'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Heart, Mail, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/auth-store'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (role: 'admin' | 'care-worker' | 'supervisor' | 'client') => {
    setIsLoading(true)

    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockUser = {
      id: '1',
      name: role === 'admin' ? 'Admin User' : role === 'care-worker' ? 'Care Worker' : role === 'supervisor' ? 'Supervisor' : 'Client User',
      email: email || `${role}@caringhands.com`,
      role: role,
      avatar: undefined,
    }

    login(mockUser)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block space-y-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Caring Hands</h1>
              <p className="text-lg text-gray-600">Care Worker Management</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Professional Care Management Platform
            </h2>
            <p className="text-lg text-gray-600">
              Streamline your care operations with our comprehensive platform designed
              for care providers, workers, and administrators.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Care Workers', value: '500+' },
              { label: 'Clients Served', value: '2,000+' },
              { label: 'Visits Logged', value: '50K+' },
              { label: 'Satisfaction', value: '98%' },
            ].map((stat) => (
              <div key={stat.label} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center md:hidden mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
              <CardDescription className="text-center">
                Sign in to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <p className="text-sm text-center text-gray-600 font-medium">Demo Login As:</p>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  size="lg"
                  onClick={() => handleLogin('admin')}
                  disabled={isLoading}
                >
                  Admin Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  size="lg"
                  onClick={() => handleLogin('care-worker')}
                  disabled={isLoading}
                >
                  Care Worker App
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  size="lg"
                  onClick={() => handleLogin('supervisor')}
                  disabled={isLoading}
                >
                  Supervisor Portal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800"
                  size="lg"
                  onClick={() => handleLogin('client')}
                  disabled={isLoading}
                >
                  Client Portal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="text-center text-sm text-gray-600 pt-4">
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot your password?
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
