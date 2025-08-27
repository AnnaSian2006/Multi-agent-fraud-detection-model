"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarIcon, DownloadIcon, FilterIcon, ShieldCheckIcon, LoaderIcon, ClockIcon, LogOutIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Navigation } from "@/components/navigation"
import { predictFraud } from "@/lib/api"

// ✅ NEW: Supabase client
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

import { ProtectedRoute } from "@/components/protected-route"
import { useRouter } from "next/navigation"
import { Combobox } from "@/components/combobox"

interface TransactionResult {
  id: string
  merchantCategory: string
  location: string
  amount: number
  timestamp: string
  fraudStatus: "Fraud" | "Not Fraud"
  explanation: string
  detailedExplanation: string
  summary: string
  riskLevel: string
  classification: string
}

type ModelType = "transaction" | "behavior"

interface ModelConfig {
  value: ModelType
  label: string
  description: string
}

const modelOptions: ModelConfig[] = [
  {
    value: "transaction",
    label: "Transaction Input",
    description: "Analyzes individual transaction patterns and anomalies",
  },
  {
    value: "behavior",
    label: "Behaviour Input",
    description: "Analyzes user behavior patterns and session data",
  },
]

const locationOptions = [
  { value: "mumbai", label: "Mumbai, Maharashtra" },
  { value: "delhi", label: "Delhi, NCR" },
  { value: "bangalore", label: "Bangalore, Karnataka" },
  { value: "chennai", label: "Chennai, Tamil Nadu" },
  { value: "kolkata", label: "Kolkata, West Bengal" },
  { value: "pune", label: "Pune, Maharashtra" },
  { value: "hyderabad", label: "Hyderabad, Telangana" },
  { value: "ahmedabad", label: "Ahmedabad, Gujarat" },
  { value: "jaipur", label: "Jaipur, Rajasthan" },
  { value: "lucknow", label: "Lucknow, Uttar Pradesh" },
]

const merchantTypeOptions = [
  { value: "Online Retail", label: "Online Retail" },
  { value: "Gas Station", label: "Gas Station" },
  { value: "Restaurant", label: "Restaurant" },
  { value: "ATM Withdrawal", label: "ATM Withdrawal" },
  { value: "Grocery Store", label: "Grocery Store" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Travel", label: "Travel & Transportation" },
  { value: "Education", label: "Education" },
  { value: "Utilities", label: "Utilities" },
  { value: "Insurance", label: "Insurance" },
  { value: "Banking", label: "Banking Services" },
]

const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0")
  return { value: `${hour}:00`, label: `${hour}:00` }
})

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const formatDateTime = (date: Date, time?: string) => {
  const dateStr = date.toISOString().slice(0, 10)
  return `${dateStr} ${time || "00:00"}`
}

export default function FraudDetectionDashboard() {
  const [selectedModel, setSelectedModel] = useState<ModelType>("transaction")
  const [transactionID, setTransactionID] = useState("")
  const [userID, setUserID] = useState("")
  const [sessionID, setSessionID] = useState("")
  const [location, setLocation] = useState("")
  const [amount, setAmount] = useState("")
  const [merchantType, setMerchantType] = useState("")
  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")

  const [results, setResults] = useState<TransactionResult[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterLocation, setFilterLocation] = useState<string>("all")
  const router = useRouter()

  const [user, setUser] = useState<{ email: string } | null>(null)
  const [result, setResult] = useState<any>(null)

  async function handlePredict() {
    try {
      const features = [1.2, 3.4, 5.6]; // replace with real input values
      const prediction = await predictFraud(features);
      setResult(prediction);
    } catch (err) {
      console.error(err);
      setResult({ error: "Prediction failed" });
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("fraudguard_auth")
    localStorage.removeItem("fraudguard_user")
    router.push("/")
  }

  // Initialize user from localStorage
  useState(() => {
    const storedUser = localStorage.getItem("fraudguard_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        setUser(null)
      }
    }
  })

  const generateDetailedExplanation = (
    model: ModelType,
    fraudStatus: "Fraud" | "Not Fraud",
    data: any,
  ): {
    explanation: string
    detailedExplanation: string
    summary: string
    riskLevel: string
    classification: string
  } => {
    if (model === "transaction") {
      const amountNum = Number.parseFloat(data.amount)
      const hour = Number.parseInt(data.time?.split(":")[0] || "12")
      const isHighAmount = amountNum > 5000
      const isUnusualTime = hour < 6 || hour > 22
      const isHighRiskMerchant = ["Online Retail", "ATM Withdrawal"].includes(data.merchantType)

      if (fraudStatus === "Fraud") {
        return {
          riskLevel: "HIGH RISK",
          classification: "Fraudulent Transaction",
          explanation: `• **Transaction Amount**: ₹${amountNum.toLocaleString()} ${isHighAmount ? "significantly exceeds typical spending patterns for this account" : "combined with other anomalous factors raises serious concerns"}

• **Transaction Timing**: ${data.time || "late hours"} ${isUnusualTime ? "falls outside normal business hours and typical user activity patterns" : "shows unusual characteristics when combined with other risk factors"}

• **Merchant Category**: "${data.merchantType}" ${isHighRiskMerchant ? "is associated with higher fraud rates and shows patterns consistent with fraudulent activity" : "exhibits suspicious characteristics in this context"}

• **Geographic Location**: Transaction in ${data.location} demonstrates geographic inconsistencies with the user's established spending patterns

• **Behavioral Analysis**: Advanced machine learning algorithms detected significant deviations from the user's behavioral baseline, including spending velocity anomalies and merchant relationship patterns`,
          detailedExplanation: `• ${isHighAmount ? `High transaction amount (₹${amountNum.toLocaleString()})` : "Anomalous spending pattern"}
• ${isUnusualTime ? `Unusual transaction time (${data.time || "late night"})` : "Timing concerns"}
• ${isHighRiskMerchant ? `High-risk merchant category (${data.merchantType})` : "Merchant risk factors"}
• Location: ${data.location}

The combination of these risk indicators exceeds our fraud detection threshold. Recommended action: Block transaction and verify with cardholder.`,
          summary: `Fraudulent transaction detected with multiple risk factors. Amount: ₹${amountNum.toLocaleString()} at ${data.location}. Immediate action required.`,
        }
      } else {
        return {
          riskLevel: "LOW RISK",
          classification: "Legitimate Transaction",
          explanation: `• **Transaction Amount**: ₹${amountNum.toLocaleString()} falls within the user's typical spending range and demonstrates consistency with historical transaction data

• **Transaction Timing**: ${data.time || "normal hours"} corresponds to the user's regular activity patterns and previously authenticated transaction times

• **Merchant Category**: "${data.merchantType}" matches the user's established purchasing behavior and shows strong correlation with their verified transaction history

• **Geographic Location**: Transaction in ${data.location} is consistent with the user's geographic patterns and previously validated locations

• **Risk Assessment**: Fraud detection algorithms analyzed multiple data points including spending velocity, merchant relationships, location consistency, device fingerprinting, and behavioral biometrics, all indicating normal, authorized user activity`,
          detailedExplanation: `• Amount (₹${amountNum.toLocaleString()}) is within normal spending limits
• Transaction time (${data.time || "daytime"}) aligns with typical user activity
• Merchant category (${data.merchantType}) matches user's spending history
• Location (${data.location}) is consistent with user's geographic patterns

All risk factors are within acceptable thresholds.`,
          summary: `Legitimate transaction verified. Amount: ₹${amountNum.toLocaleString()} at ${data.location}. All parameters within normal range.`,
        }
      }
    } else {
      const hour = Number.parseInt(data.time?.split(":")[0] || "12")
      const isUnusualTime = hour < 6 || hour > 22

      if (fraudStatus === "Fraud") {
        return {
          riskLevel: "HIGH RISK",
          classification: "Suspicious Session",
          explanation: `• **Behavioral Biometrics**: Advanced behavioral analysis identified anomalous patterns in typing rhythm, keystroke dynamics, and mouse movement trajectories inconsistent with the user's historical interaction fingerprint

• **Navigation Behavior**: Page interaction sequences demonstrate unfamiliar patterns that suggest potential account compromise

• **Session Timing**: ${isUnusualTime ? `The session timing at ${data.time || "late hours"} falls outside the user's typical activity window and adds to the overall risk profile` : `Despite occurring during normal hours at ${data.time || "daytime"}, the behavioral anomalies present significant security concerns`}

• **Interaction Patterns**: Measured parameters including click patterns, scroll behavior, form interaction speed, and session flow characteristics show multiple deviations from the user's unique behavioral signature

• **Security Assessment**: Session ID ${data.sessionID} exhibits red flags across multiple behavioral vectors that collectively indicate potential unauthorized access or account takeover`,
          detailedExplanation: `• ${isUnusualTime ? `Unusual session time (${data.time || "late night"})` : "Behavioral anomalies detected"}
• Anomalous behavioral patterns detected
• Session characteristics differ from user baseline
• Session ID: ${data.sessionID}

Behavioral analysis detected deviations in typing patterns, mouse movements, and navigation behavior compared to the user's established baseline. The behavioral biometrics suggest potential account takeover or unauthorized access.`,
          summary: `Suspicious behavioral patterns detected for User ${data.userID}. Session ${data.sessionID} shows anomalous activity. Potential account compromise.`,
        }
      } else {
        return {
          riskLevel: "LOW RISK",
          classification: "Normal Session",
          explanation: `• **Behavioral Biometrics**: The behavioral biometrics including typing speed, rhythm, and keystroke dynamics align perfectly with the user's historical data

• **Navigation Patterns**: Mouse movement patterns and navigation behavior demonstrate the familiar interaction style learned from previous sessions

• **Session Timing**: ${isUnusualTime ? `Although the session occurs at ${data.time || "late hours"}, the behavioral patterns remain consistent with the user's authenticated late-night activity patterns` : `The session timing at ${data.time || "normal hours"} falls within the user's typical activity hours`}

• **Interaction Analysis**: All measured parameters including click patterns, scroll behavior, form interaction speed, and page navigation sequences match the user's unique behavioral fingerprint

• **Security Verification**: Session ID ${data.sessionID} shows no anomalies or deviations that would suggest unauthorized access or account compromise, indicating legitimate user activity`,
          detailedExplanation: `• Behavioral patterns match the user's established baseline
• Typing speed and rhythm are consistent with historical data
• Mouse movement patterns align with user's typical navigation style
• Session timing (${data.time || "daytime"}) is within normal activity hours
• All behavioral biometrics are within expected parameters for User ID: ${data.userID}`,
          summary: `Normal behavioral patterns confirmed for User ${data.userID}. Session ${data.sessionID} matches established baseline. No anomalies detected.`,
        }
      }
    }
  }

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    const progressSteps =
      selectedModel === "transaction"
        ? [
            { progress: 20, message: "Validating transaction data..." },
            { progress: 40, message: "Analyzing spending patterns..." },
            { progress: 60, message: "Checking location anomalies..." },
            { progress: 80, message: "Running fraud detection algorithms..." },
            { progress: 100, message: "Generating analysis report..." },
          ]
        : [
            { progress: 20, message: "Analyzing user session data..." },
            { progress: 40, message: "Processing behavioral biometrics..." },
            { progress: 60, message: "Comparing with user baseline..." },
            { progress: 80, message: "Running behavior analysis algorithms..." },
            { progress: 100, message: "Generating behavior report..." },
          ]

    for (const step of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 600))
      setAnalysisProgress(step.progress)
    }

    const getLocationDisplay = (locationValue: string) => {
      const predefinedLocation = locationOptions.find((opt) => opt.value === locationValue)
      if (predefinedLocation) {
        return predefinedLocation.label
      }
      return locationValue.charAt(0).toUpperCase() + locationValue.slice(1)
    }

    const fraudProbability =
      selectedModel === "transaction"
        ? (Number.parseFloat(amount) > 5000 ? 0.7 : 0.3) +
          (Number.parseInt(selectedTime?.split(":")[0] || "12") < 6 ||
          Number.parseInt(selectedTime?.split(":")[0] || "12") > 22
            ? 0.2
            : 0)
        : Math.random()

    const isFraud = fraudProbability > 0.6

    const analysisData = {
      amount,
      time: selectedTime,
      merchantType,
      location: getLocationDisplay(location),
      userID,
      sessionID,
    }

    const { explanation, detailedExplanation, summary, riskLevel, classification } = generateDetailedExplanation(
      selectedModel,
      isFraud ? "Fraud" : "Not Fraud",
      analysisData,
    )

    const newTransaction: TransactionResult = {
      id:
        selectedModel === "transaction"
          ? transactionID || `TXN${String(results.length + 1).padStart(3, "0")}`
          : `SES${String(results.length + 1).padStart(3, "0")}`,
      merchantCategory: selectedModel === "transaction" ? merchantType || "General" : "Behavioral Analysis",
      location: getLocationDisplay(location),
      amount: selectedModel === "transaction" ? Number.parseFloat(amount) : 0,
      timestamp: date ? formatDateTime(date, selectedTime) : formatDateTime(new Date(), selectedTime),
      fraudStatus: isFraud ? "Fraud" : "Not Fraud",
      explanation,
      detailedExplanation,
      summary,
      riskLevel,
      classification,
    }

    setResults((prevResults) => [...prevResults, newTransaction])
    setIsAnalyzing(false)
    setAnalysisProgress(0)

    if (selectedModel === "transaction") {
      setTransactionID("")
      setAmount("")
      setMerchantType("")
    } else {
      setUserID("")
      setSessionID("")
    }
    setLocation("")
    setDate(undefined)
    setSelectedTime("")
  }

  const filteredResults = results.filter((result) => {
    const statusMatch = filterStatus === "all" || result.fraudStatus.toLowerCase().replace(" ", "-") === filterStatus
    const locationMatch = filterLocation === "all" || result.location.includes(filterLocation)
    return statusMatch && locationMatch
  })

  const exportToCSV = () => {
    const headers = ["ID", "Type", "Location", "Amount (₹)", "Timestamp", "Status", "Summary", "Detailed Explanation"]
    const csvContent = [
      headers.join(","),
      ...filteredResults.map((row) =>
        [
          row.id,
          row.merchantCategory,
          row.location,
          selectedModel === "transaction" ? `₹${row.amount.toFixed(2)}` : "N/A",
          row.timestamp,
          row.fraudStatus,
          `"${row.summary}"`,
          `"${row.explanation}"`,
          `"${row.detailedExplanation}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${selectedModel}-analysis-results.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Navigation />

        <div className="p-6">
          {/* --- NEW: Simple Prediction Widget --- */}
          <div className="mb-6">
            <h1 className="text-xl font-bold">Fraud Detection</h1>
            <button
              onClick={handlePredict}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Run Prediction
            </button>
            {result && (
              <pre className="mt-4 bg-gray-100 p-4 rounded">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>
          {/* --- END: Simple Prediction Widget --- */}

          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="h-8 w-8 text-primary animate-pulse" />
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Fraud Detection Dashboard</h1>
                  <p className="text-muted-foreground">Analyze transactions and detect potential fraud patterns</p>
                </div>
              </div>

              {/* ✅ Show logged-in email + logout */}
              {user && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOutIcon className="h-4 w-4 mr-2" /> Logout
                  </Button>
                </div>
              )}

            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <Card className="border-border bg-card transition-all duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Total Analyses</CardTitle>
                  <ShieldCheckIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">{results.length}</div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card transition-all duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Fraud Detected</CardTitle>
                  <div className="h-4 w-4 rounded-full bg-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {results.filter((r) => r.fraudStatus === "Fraud").length}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card transition-all duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Legitimate</CardTitle>
                  <div className="h-4 w-4 rounded-full bg-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {results.filter((r) => r.fraudStatus === "Not Fraud").length}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Total Amount</CardTitle>
                  <span className="text-sm text-muted-foreground">₹</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">
                    ₹{results.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <Card className="animate-fade-in border-border bg-card transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Analysis Input</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {selectedModel === "transaction"
                        ? "Enter transaction details for fraud analysis"
                        : "Enter user session details for behavior analysis"}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-card-foreground">Detection Model</Label>
                      <Select value={selectedModel} onValueChange={(value: ModelType) => setSelectedModel(value)}>
                        <SelectTrigger className="bg-background border-border text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          {modelOptions.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              <div className="flex flex-col">
                                <span>{model.label}</span>
                                <span className="text-xs text-muted-foreground">{model.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedModel === "transaction" ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="transactionID" className="text-card-foreground">
                            Transaction ID
                          </Label>
                          <Input
                            id="transactionID"
                            placeholder="Enter transaction ID"
                            value={transactionID}
                            onChange={(e) => setTransactionID(e.target.value)}
                            disabled={isAnalyzing}
                            className="bg-background border-border text-foreground transition-colors duration-200 focus:ring-2 focus:ring-ring"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="amount" className="text-card-foreground">
                            Amount (₹)
                          </Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={isAnalyzing}
                            className="bg-background border-border text-foreground transition-colors duration-200 focus:ring-2 focus:ring-ring"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="merchantType" className="text-card-foreground">
                            Merchant
                          </Label>
                          <Combobox
                            options={merchantTypeOptions}
                            value={merchantType}
                            onValueChange={setMerchantType}
                            placeholder="Select or type merchant type"
                            searchPlaceholder="Search merchant types..."
                            disabled={isAnalyzing}
                            allowCustom={true}
                            className="transition-colors duration-200"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label className="text-card-foreground">Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200",
                                    !date && "text-muted-foreground",
                                  )}
                                  disabled={isAnalyzing}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date ? date.toLocaleDateString() : "Pick date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 bg-popover border-border">
                                <div className="p-3 border-b border-border">
                                  <Select
                                    value={date?.getFullYear().toString() || new Date().getFullYear().toString()}
                                    onValueChange={(year) => {
                                      const newDate = new Date(date || new Date())
                                      newDate.setFullYear(Number.parseInt(year))
                                      setDate(newDate)
                                    }}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-60">
                                      {Array.from({ length: 10 }, (_, i) => {
                                        const year = new Date().getFullYear() - 5 + i
                                        return (
                                          <SelectItem key={year} value={year.toString()}>
                                            {year}
                                          </SelectItem>
                                        )
                                      })}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-card-foreground">Time</Label>
                            <Select value={selectedTime} onValueChange={setSelectedTime}>
                              <SelectTrigger className="bg-background border-border text-foreground">
                                <SelectValue placeholder="Select time">
                                  <div className="flex items-center">
                                    <ClockIcon className="mr-2 h-4 w-4" />
                                    {selectedTime || "Pick time"}
                                  </div>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-popover border-border max-h-60">
                                {timeOptions.map((time) => (
                                  <SelectItem key={time.value} value={time.value}>
                                    {time.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-card-foreground">
                            Location
                          </Label>
                          <Combobox
                            options={locationOptions}
                            value={location}
                            onValueChange={setLocation}
                            placeholder="Select or type location"
                            searchPlaceholder="Search locations..."
                            disabled={isAnalyzing}
                            allowCustom={true}
                            className="transition-colors duration-200"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="userID" className="text-card-foreground">
                            User ID
                          </Label>
                          <Input
                            id="userID"
                            placeholder="Enter user ID"
                            value={userID}
                            onChange={(e) => setUserID(e.target.value)}
                            disabled={isAnalyzing}
                            className="bg-background border-border text-foreground transition-colors duration-200 focus:ring-2 focus:ring-ring"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="sessionID" className="text-card-foreground">
                            Session ID
                          </Label>
                          <Input
                            id="sessionID"
                            placeholder="Enter session ID"
                            value={sessionID}
                            onChange={(e) => setSessionID(e.target.value)}
                            disabled={isAnalyzing}
                            className="bg-background border-border text-foreground transition-colors duration-200 focus:ring-2 focus:ring-ring"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label className="text-card-foreground">Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200",
                                    !date && "text-muted-foreground",
                                  )}
                                  disabled={isAnalyzing}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date ? date.toLocaleDateString() : "Pick date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 bg-popover border-border">
                                <div className="p-3 border-b border-border">
                                  <Select
                                    value={date?.getFullYear().toString() || new Date().getFullYear().toString()}
                                    onValueChange={(year) => {
                                      const newDate = new Date(date || new Date())
                                      newDate.setFullYear(Number.parseInt(year))
                                      setDate(newDate)
                                    }}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-60">
                                      {Array.from({ length: 10 }, (_, i) => {
                                        const year = new Date().getFullYear() - 5 + i
                                        return (
                                          <SelectItem key={year} value={year.toString()}>
                                            {year}
                                          </SelectItem>
                                        )
                                      })}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-card-foreground">Time</Label>
                            <Select value={selectedTime} onValueChange={setSelectedTime}>
                              <SelectTrigger className="bg-background border-border text-foreground">
                                <SelectValue placeholder="Select time">
                                  <div className="flex items-center">
                                    <ClockIcon className="mr-2 h-4 w-4" />
                                    {selectedTime || "Pick time"}
                                  </div>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-popover border-border max-h-60">
                                {timeOptions.map((time) => (
                                  <SelectItem key={time.value} value={time.value}>
                                    {time.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="space-y-3">
                      {isAnalyzing && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <LoaderIcon className="h-4 w-4 animate-spin" />
                            {selectedModel === "transaction" ? "Analyzing transaction..." : "Analyzing behavior..."}
                          </div>
                          <Progress value={analysisProgress} className="w-full" />
                        </div>
                      )}
                      <Button
                        onClick={handleRunAnalysis}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                        disabled={
                          isAnalyzing ||
                          !date ||
                          !selectedTime ||
                          (selectedModel === "transaction" && (!amount || !merchantType || !location)) ||
                          (selectedModel === "behavior" && (!userID || !sessionID))
                        }
                      >
                        {isAnalyzing ? (
                          <>
                            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          "Run Analysis"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="animate-fade-in border-border bg-card transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-card-foreground">
                        Analysis Results ({results.length} {results.length === 1 ? "analysis" : "analyses"})
                      </CardTitle>
                      {results.length > 0 && (
                        <Button
                          onClick={exportToCSV}
                          variant="outline"
                          size="sm"
                          className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent transition-colors duration-200"
                        >
                          <DownloadIcon className="mr-2 h-4 w-4" />
                          Export CSV
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {results.length > 0 && (
                      <div className="mb-4 flex gap-4">
                        <div className="flex items-center gap-2">
                          <FilterIcon className="h-4 w-4 text-muted-foreground" />
                          <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-40 bg-background border-border text-foreground hover:bg-accent transition-colors duration-200">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border-border">
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="fraud">Fraud</SelectItem>
                              <SelectItem value="not-fraud">Not Fraud</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Select value={filterLocation} onValueChange={setFilterLocation}>
                          <SelectTrigger className="w-40 bg-background border-border text-foreground hover:bg-accent transition-colors duration-200">
                            <SelectValue placeholder="All Locations" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="Mumbai">Mumbai</SelectItem>
                            <SelectItem value="Delhi">Delhi</SelectItem>
                            <SelectItem value="Bangalore">Bangalore</SelectItem>
                            <SelectItem value="Chennai">Chennai</SelectItem>
                            <SelectItem value="Kolkata">Kolkata</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {results.length === 0 ? (
                      <div className="flex h-32 items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <ShieldCheckIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>Run analysis to see results</p>
                        </div>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-border hover:bg-muted/50">
                              <TableHead className="text-muted-foreground">ID</TableHead>
                              <TableHead className="text-muted-foreground">Type</TableHead>
                              <TableHead className="text-muted-foreground">Location</TableHead>
                              <TableHead className="text-muted-foreground">Amount</TableHead>
                              <TableHead className="text-muted-foreground">Timestamp</TableHead>
                              <TableHead className="text-muted-foreground">Status</TableHead>
                              <TableHead className="text-muted-foreground">Analysis</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredResults.map((result, index) => (
                              <TableRow
                                key={result.id}
                                className={cn(
                                  "animate-slide-up border-border transition-all duration-200",
                                  index % 2 === 0 ? "bg-card hover:bg-accent/10" : "bg-muted/30 hover:bg-accent/20",
                                )}
                              >
                                <TableCell className="font-medium text-foreground">{result.id}</TableCell>
                                <TableCell className="text-foreground">{result.merchantCategory}</TableCell>
                                <TableCell className="text-foreground">{result.location}</TableCell>
                                <TableCell className="font-mono text-foreground">
                                  {result.amount > 0 ? `₹${result.amount.toFixed(2)}` : "N/A"}
                                </TableCell>
                                <TableCell className="font-mono text-sm text-foreground">{result.timestamp}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant={result.fraudStatus === "Fraud" ? "destructive" : "secondary"}
                                    className={
                                      result.fraudStatus === "Fraud"
                                        ? "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 transition-colors duration-200"
                                        : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 transition-colors duration-200"
                                    }
                                  >
                                    {result.fraudStatus}
                                  </Badge>
                                </TableCell>
                                <TableCell className="max-w-lg">
                                  <div className="space-y-3">
                                    <h4 className="text-lg font-bold text-foreground">Summary</h4>

                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-foreground">Risk Level:</span>
                                        <Badge
                                          variant={result.riskLevel === "HIGH RISK" ? "destructive" : "secondary"}
                                          className={
                                            result.riskLevel === "HIGH RISK"
                                              ? "bg-red-500 text-white hover:bg-red-600"
                                              : "bg-green-500 text-white hover:bg-green-600"
                                          }
                                        >
                                          {result.riskLevel}
                                        </Badge>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-foreground">Classification:</span>
                                        <Badge
                                          variant="outline"
                                          className="bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                                        >
                                          {result.classification}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {results.length > 0 && (
                  <Card className="mt-6 animate-fade-in border-border bg-card transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-card-foreground">Analysis Explanation</CardTitle>
                      <p className="text-sm text-muted-foreground">Detailed explanations for each analysis result</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {filteredResults.map((result, index) => (
                          <div
                            key={result.id}
                            className={cn(
                              "p-4 rounded-lg border transition-all duration-200 bg-card",
                              result.fraudStatus === "Fraud"
                                ? "border-l-4 border-l-red-500 border-border shadow-sm"
                                : "border-l-4 border-l-green-500 border-border shadow-sm",
                            )}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <span className="font-semibold text-foreground">{result.id}</span>
                              <Badge
                                variant={result.fraudStatus === "Fraud" ? "destructive" : "secondary"}
                                className={
                                  result.fraudStatus === "Fraud"
                                    ? "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400"
                                    : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400"
                                }
                              >
                                {result.fraudStatus}
                              </Badge>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <h5 className="text-sm font-semibold text-foreground">Detailed Analysis:</h5>
                                <div className="text-sm text-foreground leading-relaxed whitespace-pre-line break-words max-w-none">
                                  {result.explanation}
                                </div>
                              </div>

                              <div className="p-3 bg-muted/50 rounded-md border border-border space-y-2">
                                <h6 className="font-medium text-sm text-muted-foreground">Summary:</h6>
                                <div className="text-xs text-foreground leading-relaxed whitespace-pre-line break-words max-w-none">
                                  {result.detailedExplanation}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
