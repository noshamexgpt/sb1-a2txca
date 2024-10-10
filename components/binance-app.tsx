"use client"

import { useState } from "react"
import Link from "next/link"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts"
import { ArrowDownIcon, ArrowUpIcon, CandlestickChart, Clock, Coins, DollarSign, Home, Menu, PieChart, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Dummy data for charts
const portfolioData = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 1800 },
  { name: "Mar", total: 2200 },
  { name: "Apr", total: 2600 },
  { name: "May", total: 3200 },
  { name: "Jun", total: 3800 },
]

const cryptoData = [
  { name: "BTC", achat: 30000, actuel: 35000, benefice: 5000 },
  { name: "ETH", achat: 2000, actuel: 2200, benefice: 200 },
  { name: "ADA", achat: 1.2, actuel: 1.1, benefice: -0.1 },
  { name: "DOT", achat: 15, actuel: 18, benefice: 3 },
  { name: "XRP", achat: 0.8, actuel: 0.9, benefice: 0.1 },
]

export default function BinanceApp() {
  const [activePage, setActivePage] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-card transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between bg-primary px-4">
            <Link className="flex items-center gap-2 font-bold text-primary-foreground" href="#">
              <Coins className="h-6 w-6" />
              <span>Binance App</span>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <Menu className="h-6 w-6 text-primary-foreground" />
            </Button>
          </div>
          <nav className="flex-1 space-y-2 overflow-auto py-4">
            <Button
              variant={activePage === "dashboard" ? "secondary" : "ghost"}
              className="w-full justify-start px-4 py-2"
              onClick={() => setActivePage("dashboard")}
            >
              <Home className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
            <Button
              variant={activePage === "portfolio" ? "secondary" : "ghost"}
              className="w-full justify-start px-4 py-2"
              onClick={() => setActivePage("portfolio")}
            >
              <Wallet className="mr-2 h-5 w-5" />
              Portfolio
            </Button>
            <Button
              variant={activePage === "history" ? "secondary" : "ghost"}
              className="w-full justify-start px-4 py-2"
              onClick={() => setActivePage("history")}
            >
              <Clock className="mr-2 h-5 w-5" />
              History
            </Button>
          </nav>
          <div className="border-t border-border p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CandlestickChart className="mr-2 h-5 w-5" />
                  My Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="container mx-auto">
          <Button variant="ghost" size="icon" className="mb-4 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          {activePage === "dashboard" && (
            <>
              <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$7,123.57</div>
                    <p className="text-xs text-muted-foreground">+18.7% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Best Performer</CardTitle>
                    <ArrowUpIcon className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">BTC +15.3%</div>
                    <p className="text-xs text-muted-foreground">Since last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Worst Performer</CardTitle>
                    <ArrowDownIcon className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">ADA -2.5%</div>
                    <p className="text-xs text-muted-foreground">Since last month</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Portfolio Evolution</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <ChartContainer
                      config={{
                        total: {
                          label: "Total",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[200px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={portfolioData}>
                          <Line type="monotone" dataKey="total" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Portfolio Distribution</CardTitle>
                    <CardDescription>
                      Asset distribution in your portfolio
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        actuel: {
                          label: "Current Value",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-[200px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={cryptoData}>
                          <Bar dataKey="actuel" fill="hsl(var(--chart-2))" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
          {activePage === "portfolio" && (
            <>
              <h1 className="mb-6 text-3xl font-bold">Portfolio</h1>
              <Card>
                <CardHeader>
                  <CardTitle>My Cryptocurrencies</CardTitle>
                  <CardDescription>
                    Detailed overview of your cryptocurrency investments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 text-left">Crypto</th>
                          <th className="pb-2 text-right">Purchase Value</th>
                          <th className="pb-2 text-right">Current Value</th>
                          <th className="pb-2 text-right">Profit/Loss</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cryptoData.map((crypto) => (
                          <tr key={crypto.name} className="border-b">
                            <td className="py-2">{crypto.name}</td>
                            <td className="text-right">${crypto.achat.toFixed(2)}</td>
                            <td className="text-right">${crypto.actuel.toFixed(2)}</td>
                            <td className={`text-right ${crypto.benefice >= 0 ? "text-green-500" : "text-red-500"}`}>
                              ${Math.abs(crypto.benefice).toFixed(2)} {crypto.benefice >= 0 ? "+" : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </>
          )}
          {activePage === "history" && (
            <>
              <h1 className="mb-6 text-3xl font-bold">Transaction History</h1>
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="buy">Buy</TabsTrigger>
                  <TabsTrigger value="sell">Sell</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <Card>
                    <CardHeader>
                      <CardTitle>All Transactions</CardTitle>
                      <CardDescription>
                        Complete history of your transactions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px]">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="pb-2 text-left">Date</th>
                              <th className="pb-2 text-left">Type</th>
                              <th className="pb-2 text-left">Crypto</th>
                              <th className="pb-2 text-right">Amount</th>
                              <th className="pb-2 text-right">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2">2023-06-15</td>
                              <td className="text-green-500">Buy</td>
                              <td>BTC</td>
                              <td className="text-right">0.1</td>
                              <td className="text-right">$3,000</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">2023-06-14</td>
                              <td className="text-red-500">Sell</td>
                              <td>ETH</td>
                              <td className="text-right">2</td>
                              <td className="text-right">$4,400</td>
                            </tr>
                            {/* Add more rows here for the complete history */}
                          </tbody>
                        </table>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="buy">
                  {/* Similar content for buy transactions */}
                </TabsContent>
                <TabsContent value="sell">
                  {/* Similar content for sell transactions */}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
    </div>
  )
}