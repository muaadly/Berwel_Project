"use client"

import { useState, useEffect } from 'react'
import Navigation from '@/components/navigation'
import { User } from '@prisma/client'

interface UserWithStats extends User {
  stats: {
    songLikes: number
    songComments: number
    maloofLikes: number
    maloofComments: number
    totalActivity: number
  }
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserWithStats[]>([])
  const [loading, setLoading] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [filter, setFilter] = useState<'all' | 'active' | 'new'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'activity' | 'joined'>('activity')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (response.ok) {
        const usersData = await response.json()
        
        // Fetch stats for each user
        const usersWithStats = await Promise.all(
          usersData.map(async (user: User) => {
            const statsResponse = await fetch(`/api/users/${user.id}/stats`)
            const stats = statsResponse.ok ? await statsResponse.json() : {
              songLikes: 0,
              songComments: 0,
              maloofLikes: 0,
              maloofComments: 0,
              totalActivity: 0
            }
            return { ...user, stats }
          })
        )
        
        setUsers(usersWithStats)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navigation
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-xl">Loading admin panel...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8 pt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400">Manage users and view activity statistics</p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-orange-500">{users.length}</p>
            <p className="text-sm text-gray-400 mt-1">
              {users.filter(user => {
                const daysSinceJoin = Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))
                return daysSinceJoin <= 7
              }).length} new this week
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-green-500">
              {users.filter(user => user.stats.totalActivity > 0).length}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {Math.round((users.filter(user => user.stats.totalActivity > 0).length / users.length) * 100)}% engagement
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Total Likes</h3>
            <p className="text-3xl font-bold text-blue-500">
              {users.reduce((sum, user) => sum + user.stats.songLikes + user.stats.maloofLikes, 0)}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {users.length > 0 ? Math.round(users.reduce((sum, user) => sum + user.stats.songLikes + user.stats.maloofLikes, 0) / users.length) : 0} per user
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Total Comments</h3>
            <p className="text-3xl font-bold text-purple-500">
              {users.reduce((sum, user) => sum + user.stats.songComments + user.stats.maloofComments, 0)}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {users.length > 0 ? Math.round(users.reduce((sum, user) => sum + user.stats.songComments + user.stats.maloofComments, 0) / users.length) : 0} per user
            </p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-bold text-white">Registered Users</h2>
              
              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      filter === 'all' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    All ({users.length})
                  </button>
                  <button
                    onClick={() => setFilter('active')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      filter === 'active' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Active ({users.filter(u => u.stats.totalActivity > 0).length})
                  </button>
                  <button
                    onClick={() => setFilter('new')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      filter === 'new' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    New ({users.filter(u => {
                      const daysSinceJoin = Math.floor((Date.now() - new Date(u.createdAt).getTime()) / (1000 * 60 * 60 * 24))
                      return daysSinceJoin <= 7
                    }).length})
                  </button>
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'activity' | 'joined')}
                  className="px-3 py-1 rounded bg-gray-700 text-gray-300 text-sm border border-gray-600"
                >
                  <option value="activity">Sort by Activity</option>
                  <option value="name">Sort by Name</option>
                  <option value="joined">Sort by Join Date</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Song Likes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Song Comments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Maloof Likes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Maloof Comments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Total Activity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users
                  .filter(user => {
                    if (filter === 'active') return user.stats.totalActivity > 0
                    if (filter === 'new') {
                      const daysSinceJoin = Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))
                      return daysSinceJoin <= 7
                    }
                    return true
                  })
                  .sort((a, b) => {
                    if (sortBy === 'activity') return b.stats.totalActivity - a.stats.totalActivity
                    if (sortBy === 'name') return a.name.localeCompare(b.name)
                    if (sortBy === 'joined') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    return 0
                  })
                  .map((user) => (
                  <tr key={user.id} className="hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.image || '/placeholder-user.jpg'}
                          alt={user.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">
                      {user.stats.songLikes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-400">
                      {user.stats.songComments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">
                      {user.stats.maloofLikes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">
                      {user.stats.maloofComments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-500">
                      {user.stats.totalActivity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
} 