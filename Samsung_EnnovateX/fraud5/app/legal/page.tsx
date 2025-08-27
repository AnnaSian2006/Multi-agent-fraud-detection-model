import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  ShieldCheckIcon,
  LockIcon,
  FileTextIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4 font-serif">Legal Information</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive legal documentation for FraudGuard services, covering privacy, terms, security, and
            compliance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <ShieldCheckIcon className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                How we collect, use, and protect your personal information.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <FileTextIcon className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Terms of Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Legal terms and conditions for using FraudGuard services.</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <LockIcon className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Our security measures and data protection protocols.</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CheckCircleIcon className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Regulatory compliance and industry standards we follow.</p>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Policy Section */}
        <section id="privacy" className="mb-16">
          <div className="flex items-center mb-6">
            <ShieldCheckIcon className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-3xl font-bold font-serif">Privacy Policy</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground mb-6">
              <strong>Last updated:</strong> January 2025
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Information We Collect</h3>
                <p className="text-muted-foreground mb-4">
                  We collect information you provide directly to us, such as when you create an account, use our fraud
                  detection services, or contact us for support.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Account information (name, email address, password)</li>
                  <li>Transaction data for fraud analysis (user ID, location, amount, date, merchant type)</li>
                  <li>Usage data and analytics to improve our services</li>
                  <li>Communication records when you contact our support team</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">How We Use Your Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide and maintain our fraud detection services</li>
                  <li>Process and analyze transaction data for fraud detection</li>
                  <li>Communicate with you about your account and our services</li>
                  <li>Improve and develop new features for our platform</li>
                  <li>Comply with legal obligations and prevent fraudulent activities</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Data Security</h3>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit
                  and at rest using industry-standard encryption protocols.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Data Retention</h3>
                <p className="text-muted-foreground">
                  We retain your personal information only for as long as necessary to provide our services and comply
                  with legal obligations. Transaction data used for fraud analysis is anonymized and may be retained for
                  improving our machine learning models.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Terms of Service Section */}
        <section id="terms" className="mb-16">
          <div className="flex items-center mb-6">
            <FileTextIcon className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-3xl font-bold font-serif">Terms of Service</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground mb-6">
              <strong>Last updated:</strong> January 2025
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Acceptance of Terms</h3>
                <p className="text-muted-foreground">
                  By accessing and using FraudGuard services, you accept and agree to be bound by the terms and
                  provision of this agreement. If you do not agree to abide by the above, please do not use this
                  service.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Service Description</h3>
                <p className="text-muted-foreground mb-4">
                  FraudGuard provides AI-powered fraud detection services that analyze transaction data to identify
                  potentially fraudulent activities. Our services include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Real-time transaction analysis and fraud detection</li>
                  <li>Risk assessment and scoring algorithms</li>
                  <li>Detailed reporting and analytics dashboard</li>
                  <li>Data export and filtering capabilities</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">User Responsibilities</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide accurate and complete information when using our services</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Use the service only for lawful purposes and in accordance with these terms</li>
                  <li>Not attempt to interfere with or disrupt the service or servers</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Limitation of Liability</h3>
                <p className="text-muted-foreground">
                  FraudGuard provides fraud detection services as a tool to assist in identifying potentially fraudulent
                  transactions. While we strive for high accuracy, no fraud detection system is 100% accurate. Users are
                  responsible for making final decisions based on our analysis and their own judgment.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Service Availability</h3>
                <p className="text-muted-foreground">
                  We aim to provide continuous service availability but cannot guarantee uninterrupted access. We
                  reserve the right to modify, suspend, or discontinue the service with reasonable notice to users.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Security Section */}
        <section id="security" className="mb-16">
          <div className="flex items-center mb-6">
            <LockIcon className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-3xl font-bold font-serif">Security</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Data Encryption</h3>
                <p className="text-muted-foreground mb-4">
                  All data transmitted to and from FraudGuard is encrypted using industry-standard TLS 1.3 encryption.
                  Data at rest is encrypted using AES-256 encryption to ensure maximum security.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Infrastructure Security</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Hosted on secure, SOC 2 Type II certified cloud infrastructure</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Multi-factor authentication for administrative access</li>
                  <li>Automated security monitoring and incident response</li>
                  <li>Regular security updates and patch management</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Access Controls</h3>
                <p className="text-muted-foreground mb-4">
                  We implement strict access controls to ensure that only authorized personnel can access sensitive
                  data:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Role-based access control (RBAC) for all system components</li>
                  <li>Principle of least privilege for data access</li>
                  <li>Regular access reviews and deprovisioning procedures</li>
                  <li>Comprehensive audit logging of all data access</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Incident Response</h3>
                <p className="text-muted-foreground">
                  We maintain a comprehensive incident response plan to quickly identify, contain, and resolve security
                  incidents. In the event of a data breach, we will notify affected users within 72 hours as required by
                  applicable regulations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Compliance Section */}
        <section id="compliance" className="mb-16">
          <div className="flex items-center mb-6">
            <CheckCircleIcon className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-3xl font-bold font-serif">Compliance</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Regulatory Compliance</h3>
                <p className="text-muted-foreground mb-4">
                  FraudGuard is designed to help organizations comply with various financial regulations and data
                  protection laws:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    <strong>GDPR:</strong> General Data Protection Regulation compliance for EU users
                  </li>
                  <li>
                    <strong>PCI DSS:</strong> Payment Card Industry Data Security Standard adherence
                  </li>
                  <li>
                    <strong>SOX:</strong> Sarbanes-Oxley Act compliance for financial reporting
                  </li>
                  <li>
                    <strong>RBI Guidelines:</strong> Reserve Bank of India regulations for financial services
                  </li>
                  <li>
                    <strong>ISO 27001:</strong> Information security management system standards
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Data Processing</h3>
                <p className="text-muted-foreground mb-4">
                  Our data processing practices are designed to meet the highest compliance standards:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Data minimization - we only collect data necessary for fraud detection</li>
                  <li>Purpose limitation - data is used only for stated fraud detection purposes</li>
                  <li>Data accuracy - we maintain accurate and up-to-date information</li>
                  <li>Storage limitation - data is retained only as long as necessary</li>
                  <li>Accountability - we maintain records of all data processing activities</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Audit and Monitoring</h3>
                <p className="text-muted-foreground">
                  We maintain comprehensive audit trails and monitoring systems to ensure ongoing compliance with all
                  applicable regulations. Regular compliance assessments are conducted by independent third parties to
                  verify our adherence to industry standards.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">User Rights</h3>
                <p className="text-muted-foreground mb-4">
                  Under applicable data protection laws, users have the following rights:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Right to access your personal data</li>
                  <li>Right to rectification of inaccurate data</li>
                  <li>Right to erasure (right to be forgotten)</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="font-serif">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these legal terms or need to exercise your rights under applicable data
              protection laws, please contact us:
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <MailIcon className="h-4 w-4 mr-2" />
                <span>legal@fraudguard.com</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <PhoneIcon className="h-4 w-4 mr-2" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
