import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ShieldCheckIcon,
  BarChart3Icon,
  TrendingUpIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Squares } from "@/components/ui/squares-background"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0">
        <Squares
          direction="diagonal"
          speed={0.3}
          squareSize={20}
          borderColor="rgba(37, 99, 235, 0.3)"
          hoverFillColor="rgba(37, 99, 235, 0.15)"
        />
      </div>

      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 px-6 py-20 animate-fade-in">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <ShieldCheckIcon className="h-20 w-20 text-primary animate-scale-in" />
            </div>
            <h1 className="mb-4 text-5xl font-bold text-foreground md:text-6xl animate-slide-up font-serif">
              FraudGuard
            </h1>
            <p className="mb-2 text-xl text-primary font-semibold animate-slide-up">
              Advanced AI-Powered Fraud Detection
            </p>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto animate-slide-up">
              Protect your financial transactions with cutting-edge machine learning algorithms that identify suspicious
              activities in real-time and provide comprehensive risk assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href="/auth/login">
                <Button size="lg" className="px-8 py-3 text-lg">
                  Try Now <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <section id="how-it-works" className="px-6 py-20 bg-muted/30">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4 font-serif">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our fraud detection system follows a simple yet powerful workflow to analyze and protect your
                transactions
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-serif">Input Transaction Data</h3>
                <p className="text-muted-foreground">
                  Enter transaction details including user ID, location, amount, date, and merchant type through our
                  intuitive interface
                </p>
              </div>

              <div className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-serif">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our advanced machine learning algorithms analyze patterns, anomalies, and risk factors in real-time
                </p>
              </div>

              <div className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-serif">Get Results</h3>
                <p className="text-muted-foreground">
                  Receive detailed fraud assessment with explanations, risk scores, and actionable insights for each
                  transaction
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4 font-serif">Key Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive fraud detection capabilities designed for modern financial security needs
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <BarChart3Icon className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="font-serif">Real-time Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Analyze transactions instantly with advanced machine learning algorithms to detect fraudulent
                    patterns and anomalies as they happen.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <TrendingUpIcon className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="font-serif">Cumulative Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Build comprehensive fraud detection reports with cumulative analysis results that persist and grow
                    across multiple sessions.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <AlertTriangleIcon className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="font-serif">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get detailed explanations for each fraud detection decision with comprehensive risk assessment and
                    actionable insights.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <CheckCircleIcon className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="font-serif">Export & Filter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Advanced filtering options and CSV export functionality to manage and analyze your fraud detection
                    results efficiently.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <ShieldCheckIcon className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="font-serif">Secure Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Enterprise-grade security ensures your transaction data is processed safely with complete privacy
                    protection.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <BarChart3Icon className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="font-serif">Interactive Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Professional spreadsheet-style interface with responsive design for seamless fraud analysis on any
                    device.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="px-6 py-20 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4 font-serif">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Get answers to common questions about our fraud detection system
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">How accurate is the fraud detection system?</AccordionTrigger>
                <AccordionContent>
                  Our AI-powered system achieves over 95% accuracy in fraud detection by analyzing multiple data points
                  including transaction patterns, location anomalies, amount variations, and merchant categories. The
                  system continuously learns and improves its detection capabilities.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">What data do I need to provide for analysis?</AccordionTrigger>
                <AccordionContent>
                  You need to provide basic transaction information: User ID, transaction location, amount (in ₹),
                  date/time of payment, and merchant type. Our system analyzes these data points to determine fraud
                  probability and provide detailed explanations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">Is my transaction data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we use enterprise-grade security measures to protect your data. All information is encrypted
                  during transmission and processing. We follow strict privacy protocols and do not store sensitive
                  financial information permanently.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">Can I export the analysis results?</AccordionTrigger>
                <AccordionContent>
                  You can export all analysis results to CSV format for further analysis or record-keeping. The export
                  includes all transaction details, fraud status, risk scores, and explanations provided by our system.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">How fast is the analysis process?</AccordionTrigger>
                <AccordionContent>
                  Our system provides real-time analysis with results typically available within 2-3 seconds. The
                  analysis includes comprehensive risk assessment, pattern detection, and detailed explanations for each
                  transaction.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4 font-serif">What Our Users Say</h2>
              <p className="text-lg text-muted-foreground">
                Trusted by financial professionals and security experts worldwide
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-4 w-4 fill-primary text-primary group-hover:scale-110 transition-transform duration-300"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "FraudGuard has revolutionized our transaction monitoring. The accuracy and speed of detection have
                  significantly reduced our fraud losses."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold text-primary">RS</span>
                  </div>
                  <div>
                    <p className="font-semibold">Rajesh Sharma</p>
                    <p className="text-sm text-muted-foreground">Risk Manager, FinTech Corp</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-4 w-4 fill-primary text-primary group-hover:scale-110 transition-transform duration-300"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The detailed explanations and cumulative analysis features make it easy to understand and track fraud
                  patterns over time."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold text-primary">PK</span>
                  </div>
                  <div>
                    <p className="font-semibold">Priya Krishnan</p>
                    <p className="text-sm text-muted-foreground">Security Analyst, Digital Bank</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-4 w-4 fill-primary text-primary group-hover:scale-110 transition-transform duration-300"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "User-friendly interface with powerful analytics. The export feature helps us maintain comprehensive
                  fraud reports for compliance."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold text-primary">AM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Arjun Mehta</p>
                    <p className="text-sm text-muted-foreground">Compliance Officer, Payment Gateway</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground font-serif">Ready to Secure Your Transactions?</h2>
            <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of financial professionals who trust FraudGuard to protect their transactions and detect
              fraud in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/login">
                <Button size="lg" className="px-8 py-3 text-lg">
                  Get Started Now <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg bg-transparent">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-background border-t px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <ShieldCheckIcon className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg font-serif">FraudGuard</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Advanced AI-powered fraud detection system protecting financial transactions worldwide.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4 font-serif">Product</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <Link href="#features" className="hover:text-primary transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-primary transition-colors">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="#how-it-works" className="hover:text-primary transition-colors">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/login" className="hover:text-primary transition-colors">
                      Try Now
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 font-serif">Legal</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <Link href="/privacy" className="hover:text-primary transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-primary transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/security" className="hover:text-primary transition-colors">
                      Security
                    </Link>
                  </li>
                  <li>
                    <Link href="/compliance" className="hover:text-primary transition-colors">
                      Compliance
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 font-serif">Contact</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <MailIcon className="h-4 w-4 mr-2" />
                    support@fraudguard.com
                  </li>
                  <li className="flex items-center">
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    +91 98765 43210
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="h-4 w-4 mr-2 mt-1" />
                    <span>
                      Tech Park, Sector 5<br />
                      Bangalore, Karnataka 560001
                      <br />
                      India
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
              <p>&copy; 2025 FraudGuard. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
