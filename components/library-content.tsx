"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { fetchLibyanSongs, fetchMaloofEntries, LibyanSong, MaloofEntry } from "@/lib/data"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"

const ITEMS_PER_PAGE = 8

export default function LibraryContent() {
  const [activeTab, setActiveTab] = useState<"songs" | "maloof">("songs")
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [songsCurrentPage, setSongsCurrentPage] = useState(1)
  const [maloofCurrentPage, setMaloofCurrentPage] = useState(1)
  const [libyanSongs, setLibyanSongs] = useState<LibyanSong[]>([])
  const [maloofEntries, setMaloofEntries] = useState<MaloofEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [songSearch, setSongSearch] = useState("")
  const [selectedSingers, setSelectedSingers] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [maloofSearch, setMaloofSearch] = useState("")
  const [selectedEntryTypes, setSelectedEntryTypes] = useState<string[]>([])
  const [selectedEntryRhythms, setSelectedEntryRhythms] = useState<string[]>([])

  // Unique filter options
  const allSingers = useMemo(() => Array.from(new Set(libyanSongs.map(s => s.singer).filter(Boolean))), [libyanSongs])
  const allCategories = useMemo(() => Array.from(new Set(libyanSongs.map(s => s.category).filter(Boolean))), [libyanSongs])
  const allEntryTypes = useMemo(() => Array.from(new Set(maloofEntries.map(e => e.entryType).filter(Boolean))), [maloofEntries])
  const allEntryRhythms = useMemo(() => Array.from(new Set(maloofEntries.map(e => e.entryRhythm).filter(Boolean))), [maloofEntries])

  // Filter logic for Libyan Songs
  const filteredSongs = useMemo(() => {
    const filtered = libyanSongs.filter(song => {
      // Search any field
      const search = songSearch.toLowerCase()
      const matchesSearch =
        !search ||
        Object.values(song).some(val =>
          typeof val === "string" && val.toLowerCase().includes(search)
        )
      // Multi-select filters
      const matchesSinger =
        selectedSingers.length === 0 || selectedSingers.includes(song.singer)
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(song.category)
      return matchesSearch && matchesSinger && matchesCategory
    })
    return filtered
  }, [libyanSongs, songSearch, selectedSingers, selectedCategories])

  // Filter logic for Maloof Entries
  const filteredMaloof = useMemo(() => {
    const filtered = maloofEntries.filter(entry => {
      // Search any field
      const search = maloofSearch.toLowerCase()
      const matchesSearch =
        !search ||
        Object.values(entry).some(val =>
          typeof val === "string" && val.toLowerCase().includes(search)
        )
      // Multi-select filters
      const matchesType =
        selectedEntryTypes.length === 0 || selectedEntryTypes.includes(entry.entryType)
      const matchesRhythm =
        selectedEntryRhythms.length === 0 || selectedEntryRhythms.includes(entry.entryRhythm)
      return matchesSearch && matchesType && matchesRhythm
    })
    return filtered
  }, [maloofEntries, maloofSearch, selectedEntryTypes, selectedEntryRhythms])

  // Set singer filter from query param on mount
  useEffect(() => {
    const singerParam = searchParams.get("singer")
    if (singerParam && !selectedSingers.includes(singerParam)) {
      setSelectedSingers([singerParam])
    }
  }, [searchParams])

  // Set entryType filter from query param on mount
  useEffect(() => {
    const entryTypeParam = searchParams.get("entryType")
    if (entryTypeParam && !selectedEntryTypes.includes(entryTypeParam)) {
      setSelectedEntryTypes([entryTypeParam])
    }
  }, [searchParams])

  // Set tab from query param on mount
  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam === "maloof" && activeTab !== "maloof") {
      setActiveTab("maloof")
    }
  }, [searchParams])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only load data on the client side
    if (!mounted) return

    // Load data on component mount
    const loadData = async () => {
      try {
        const [songs, entries] = await Promise.all([
          fetchLibyanSongs(),
          fetchMaloofEntries()
        ])
        setLibyanSongs(songs)
        setMaloofEntries(entries)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [mounted])

  const handlePlay = (id: number) => {
    if (playingId === id) {
      setPlayingId(null)
    } else {
      setPlayingId(id)
    }
  }

  // Pagination logic for songs
  const totalSongs = filteredSongs.length;
  const totalSongsPages = Math.ceil(totalSongs / ITEMS_PER_PAGE);
  const songsStartIndex = (songsCurrentPage - 1) * ITEMS_PER_PAGE;
  const songsEndIndex = songsStartIndex + ITEMS_PER_PAGE;
  const currentSongs = filteredSongs.slice(songsStartIndex, songsEndIndex);

  // Pagination logic for maloof entries
  const totalMaloof = filteredMaloof.length;
  const totalMaloofPages = Math.ceil(totalMaloof / ITEMS_PER_PAGE);
  const maloofStartIndex = (maloofCurrentPage - 1) * ITEMS_PER_PAGE;
  const maloofEndIndex = maloofStartIndex + ITEMS_PER_PAGE;
  const currentMaloofEntries = filteredMaloof.slice(maloofStartIndex, maloofEndIndex);

  const renderPagination = (
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void,
    totalItems: number,
    itemType: string,
  ) => {
    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems)

    return (
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-t border-gray-700">
        <div className="hidden md:flex items-center text-sm text-gray-300">
          <span>
            Showing {startItem} to {endItem} of {totalItems} {itemType}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Previous</span>
          </Button>

          <div className="flex items-center space-x-1">
            {/* First page */}
            <Button
              onClick={() => onPageChange(1)}
              variant={currentPage === 1 ? "default" : "ghost"}
              size="sm"
              className={
                currentPage === 1
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }
            >
              1
            </Button>

            {/* Show second page if we have more than 1 page */}
            {totalPages > 1 && (
              <Button
                onClick={() => onPageChange(2)}
                variant={currentPage === 2 ? "default" : "ghost"}
                size="sm"
                className={
                  currentPage === 2
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }
              >
                2
              </Button>
            )}

            {/* Show ellipsis and last page if we have many pages */}
            {totalPages > 3 && (
              <>
                {totalPages > 4 && <span className="text-gray-400 px-2">...</span>}
                <Button
                  onClick={() => onPageChange(totalPages)}
                  variant={currentPage === totalPages ? "default" : "ghost"}
                  size="sm"
                  className={
                    currentPage === totalPages
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          <Button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="hidden md:inline">Next</span>
            <ChevronRight className="h-4 w-4 md:ml-1" />
          </Button>
        </div>
      </div>
    )
  }

  // Helper to update query params
  const updateQueryParams = (params: Record<string, any>) => {
    const current = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
        current.delete(key);
      } else if (Array.isArray(value)) {
        current.set(key, value.join(","));
      } else {
        current.set(key, value);
      }
    });
    router.replace(`?${current.toString()}`);
  };

  // On mount, initialize state from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Tab
    const tabParam = params.get("tab");
    if (tabParam === "maloof" && activeTab !== "maloof") setActiveTab("maloof");
    // Songs
    const songSearchParam = params.get("songSearch");
    if (songSearchParam !== null) setSongSearch(songSearchParam);
    const singersParam = params.get("singers");
    if (singersParam) setSelectedSingers(singersParam.split(","));
    const categoriesParam = params.get("categories");
    if (categoriesParam) setSelectedCategories(categoriesParam.split(","));
    const songsPageParam = params.get("songsPage");
    if (songsPageParam) setSongsCurrentPage(Number(songsPageParam));
    // Maloof
    const maloofSearchParam = params.get("maloofSearch");
    if (maloofSearchParam !== null) setMaloofSearch(maloofSearchParam);
    const entryTypesParam = params.get("entryTypes");
    if (entryTypesParam) setSelectedEntryTypes(entryTypesParam.split(","));
    const entryRhythmsParam = params.get("entryRhythms");
    if (entryRhythmsParam) setSelectedEntryRhythms(entryRhythmsParam.split(","));
    const maloofPageParam = params.get("maloofPage");
    if (maloofPageParam) setMaloofCurrentPage(Number(maloofPageParam));
  }, []);

  // Update URL when filters/search/tab/page change
  useEffect(() => {
    updateQueryParams({
      tab: activeTab,
      songSearch: songSearch || undefined,
      singers: selectedSingers.length > 0 ? selectedSingers : undefined,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      songsPage: songsCurrentPage !== 1 ? songsCurrentPage : undefined,
      maloofSearch: maloofSearch || undefined,
      entryTypes: selectedEntryTypes.length > 0 ? selectedEntryTypes : undefined,
      entryRhythms: selectedEntryRhythms.length > 0 ? selectedEntryRhythms : undefined,
      maloofPage: maloofCurrentPage !== 1 ? maloofCurrentPage : undefined,
    });
    // eslint-disable-next-line
  }, [activeTab, songSearch, selectedSingers, selectedCategories, songsCurrentPage, maloofSearch, selectedEntryTypes, selectedEntryRhythms, maloofCurrentPage]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Loading...
            </h1>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Loading Library...
            </h1>
            <p className="text-gray-400 text-lg">Please wait while we load the data</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover the Libyan Songs and Maloof Entries
          </h1>
          <p className="text-gray-400 text-lg">
            Explore our rich collection of traditional and contemporary Libyan music
          </p>
        </div>

        {/* Tab Buttons - Full Width */}
        <div className="mb-8">
          <div className="bg-gray-900 rounded-lg p-1 flex w-full">
            <Button
              onClick={() => setActiveTab("songs")}
              className={`flex-1 px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === "songs"
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-transparent text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              Libyan Songs ({libyanSongs.length})
            </Button>
            <Button
              onClick={() => setActiveTab("maloof")}
              className={`flex-1 px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === "maloof"
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-transparent text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              Maloof Entries ({maloofEntries.length})
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-900 rounded-lg p-6 mt-4">
          {/* Search Bar and Filter Button - inline */}
          <div className="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <div className="w-full">
              {activeTab === "songs" ? (
                <input
                  type="text"
                  placeholder="Search Libyan songs..."
                  value={songSearch}
                  onChange={e => setSongSearch(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ) : (
                <input
                  type="text"
                  placeholder="Search Maloof entries..."
                  value={maloofSearch}
                  onChange={e => setMaloofSearch(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              )}
            </div>
            <div className="flex flex-row gap-2 md:gap-4 w-full md:w-auto">
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors w-full md:w-auto"
                onClick={() => setShowFilters((prev) => !prev)}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors w-full md:w-auto"
                onClick={() => {
                  if (activeTab === "songs") {
                    setSongSearch("");
                    setSelectedSingers([]);
                    setSelectedCategories([]);
                  } else {
                    setMaloofSearch("");
                    setSelectedEntryTypes([]);
                    setSelectedEntryRhythms([]);
                  }
                }}
              >
                Clear Filter
              </Button>
            </div>
          </div>
          {activeTab === "songs" ? (
            <>
              {showFilters && (
                <>
              {/* Active Singer Filter Pill */}
              {selectedSingers.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2 items-center">
                  {selectedSingers.map(singer => (
                    <span key={singer} className="flex items-center bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {singer}
                      <button
                        className="ml-2 text-white hover:text-gray-200 focus:outline-none"
                        onClick={() => setSelectedSingers(selectedSingers.filter(s => s !== singer))}
                        aria-label={`Remove ${singer}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {/* Singer Filter */}
              <div className="mb-4">
                <div className="mb-2 text-gray-300 font-semibold">Filter by Singer:</div>
                <div className="flex flex-wrap gap-2">
                  {allSingers.map(singer => (
                    <button
                      key={singer}
                      className={`px-4 py-1 rounded-full border transition-colors text-sm font-medium ${selectedSingers.includes(singer) ? "bg-orange-500 text-white border-orange-500" : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-orange-500 hover:text-white"}`}
                          onClick={() => {
                            setSelectedSingers(sel => sel.includes(singer) ? sel.filter(s => s !== singer) : [...sel, singer]);
                            setShowFilters(false);
                          }}
                      type="button"
                    >
                      {singer}
                    </button>
                  ))}
                </div>
              </div>
              {/* Category Filter */}
              <div className="mb-4">
                <div className="mb-2 text-gray-300 font-semibold">Filter by Category:</div>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map(category => (
                    <button
                      key={category}
                      className={`px-4 py-1 rounded-full border transition-colors text-sm font-medium ${selectedCategories.includes(category) ? "bg-orange-500 text-white border-orange-500" : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-orange-500 hover:text-white"}`}
                          onClick={() => {
                            setSelectedCategories(sel => sel.includes(category) ? sel.filter(c => c !== category) : [...sel, category]);
                            setShowFilters(false);
                          }}
                      type="button"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
                </>
              )}
              {/* Table and Pagination (filteredSongs) */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Song Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Singer Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Play
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {currentSongs.map((song, index) => (
                      <tr
                        key={song.id}
                        className={`hover:bg-gray-800 transition-colors ${index % 2 === 0 ? "bg-gray-900" : "bg-gray-850"} cursor-pointer`}
                        onClick={() => router.push(`/songs/${song.id}`)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-white font-medium hover:text-orange-500 transition-colors cursor-pointer">
                            {song.songName}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-300">{song.singer}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                            {song.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button
                            onClick={e => {
                              e.stopPropagation();
                              if (song.soundcloudLink) {
                                window.open(song.soundcloudLink, '_blank', 'noopener,noreferrer');
                              }
                            }}
                            size="sm"
                            className="bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {renderPagination(songsCurrentPage, totalSongsPages, setSongsCurrentPage, totalSongs, "Songs")}
            </>
          ) : (
            <>
              {showFilters && (
                <>
              {/* Active Entry Type Filter Pill */}
              {selectedEntryTypes.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2 items-center">
                  {selectedEntryTypes.map(type => (
                    <span key={type} className="flex items-center bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {type}
                      <button
                        className="ml-2 text-white hover:text-gray-200 focus:outline-none"
                        onClick={() => setSelectedEntryTypes(selectedEntryTypes.filter(t => t !== type))}
                        aria-label={`Remove ${type}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {/* Entry Type Filter */}
              <div className="mb-4">
                <div className="mb-2 text-gray-300 font-semibold">Filter by Entry Type:</div>
                <div className="flex flex-wrap gap-2">
                  {allEntryTypes.map(type => (
                    <button
                      key={type}
                      className={`px-4 py-1 rounded-full border transition-colors text-sm font-medium ${selectedEntryTypes.includes(type) ? "bg-orange-500 text-white border-orange-500" : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-orange-500 hover:text-white"}`}
                          onClick={() => {
                            setSelectedEntryTypes(sel => sel.includes(type) ? sel.filter(t => t !== type) : [...sel, type]);
                            setShowFilters(false);
                          }}
                      type="button"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              {/* Entry Rhythm Filter */}
              <div className="mb-4">
                <div className="mb-2 text-gray-300 font-semibold">Filter by Entry Rhythm:</div>
                <div className="flex flex-wrap gap-2">
                  {allEntryRhythms.map(rhythm => (
                    <button
                      key={rhythm}
                      className={`px-4 py-1 rounded-full border transition-colors text-sm font-medium ${selectedEntryRhythms.includes(rhythm) ? "bg-orange-500 text-white border-orange-500" : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-orange-500 hover:text-white"}`}
                          onClick={() => {
                            setSelectedEntryRhythms(sel => sel.includes(rhythm) ? sel.filter(r => r !== rhythm) : [...sel, rhythm]);
                            setShowFilters(false);
                          }}
                      type="button"
                    >
                      {rhythm}
                    </button>
                  ))}
                </div>
              </div>
                </>
              )}
              {/* Table and Pagination (filteredMaloof) */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Entry Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Entry Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Entry Rhythm
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Entry Number
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {currentMaloofEntries.map((entry, index) => (
                      <tr
                        key={entry.id}
                        className={`hover:bg-gray-800 transition-colors cursor-pointer ${index % 2 === 0 ? "bg-gray-900" : "bg-gray-850"}`}
                        onClick={() => router.push(`/maloof/${entry.id}`)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-white font-medium hover:text-orange-500 transition-colors cursor-pointer">
                            {entry.entryName}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {entry.entryType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-300">{entry.entryRhythm}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-300">{entry.entryNumber}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {renderPagination(maloofCurrentPage, totalMaloofPages, setMaloofCurrentPage, totalMaloof, "Entries")}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
