"use client"

import type React from "react"

import { useState } from "react"
import { Bell, CreditCard, Key, Lock, Mail, Info, Check, X, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [emailChanged, setEmailChanged] = useState(false)
  const [profileChanged, setProfileChanged] = useState(false)
  const [preferencesChanged, setPreferencesChanged] = useState(false)
  const [notificationSettingsChanged, setNotificationSettingsChanged] = useState(false)
  const [showEmailVerification, setShowEmailVerification] = useState(false)
  const [showRecoveryEmailVerification, setShowRecoveryEmailVerification] = useState(false)

  // Password validation states
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordUpdated, setPasswordUpdated] = useState(false)
  const [securitySettingsSaved, setSecuritySettingsSaved] = useState(false)
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false)
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null)
  const [showAllInvoices, setShowAllInvoices] = useState(false)

  // Password validation rules
  const hasUpperCase = /[A-Z]/.test(newPassword)
  const hasMinLength = newPassword.length >= 8
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
  const passwordsMatch = newPassword === confirmPassword && newPassword !== ""

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailChanged(true)
    setShowEmailVerification(true)
  }

  const handleProfileSave = () => {
    if (profileChanged) {
      toast({
        title: "Changes Saved",
        description: "Your profile information has been updated.",
        duration: 3000,
      })
      setProfileChanged(false)
      setEmailChanged(false)
      setShowEmailVerification(false)
    }
  }

  const handlePreferencesSave = () => {
    if (preferencesChanged) {
      toast({
        title: "Preferences Saved",
        description: "Your company preferences have been updated.",
        duration: 3000,
      })
      setPreferencesChanged(false)
    }
  }

  const handleNotificationSettingsSave = () => {
    if (notificationSettingsChanged) {
      toast({
        title: "Notification Settings Saved",
        description: "Your notification preferences have been updated.",
        duration: 3000,
      })
      setNotificationSettingsChanged(false)
    }
  }

  const handlePasswordUpdate = () => {
    if (passwordsMatch && hasUpperCase && hasMinLength && hasSpecialChar) {
      setPasswordUpdated(true)
    }
  }

  const handleSecuritySettingsSave = () => {
    setSecuritySettingsSaved(true)
    setShowRecoveryEmailVerification(true)
    toast({
      title: "Security Settings Saved",
      description: "Your security settings have been updated.",
      duration: 3000,
    })
  }

  const handleViewInvoice = (invoiceId: string) => {
    setSelectedInvoice(invoiceId)
    setShowInvoiceDialog(true)
  }

  const handleViewAllInvoices = () => {
    setShowAllInvoices(true)
  }

  // Sample invoices data
  const invoices = [
    { id: "INV-2025-042", date: "April 1, 2025", amount: 49.99 },
    { id: "INV-2025-031", date: "March 1, 2025", amount: 49.99 },
    { id: "INV-2025-022", date: "February 1, 2025", amount: 49.99 },
    { id: "INV-2025-011", date: "January 1, 2025", amount: 49.99 },
    { id: "INV-2024-122", date: "December 1, 2024", amount: 49.99 },
    { id: "INV-2024-111", date: "November 1, 2024", amount: 49.99 },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your account settings and preferences." />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-muted/20 border">
          <TabsTrigger value="general" className="data-[state=active]:bg-[#950101] data-[state=active]:text-white">
            General
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#950101] data-[state=active]:text-white"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#950101] data-[state=active]:text-white">
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-[#950101] data-[state=active]:text-white">
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="border-[#3D0000]">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showEmailVerification && (
                <Alert className="bg-green-50 border-green-500 text-green-700 mb-4">
                  <AlertDescription>Verification link has been sent to your email.</AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    defaultValue="John Doe"
                    onChange={() => setProfileChanged(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    defaultValue="john@example.com"
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="Acme Inc."
                    defaultValue="Acme Inc."
                    onChange={() => setProfileChanged(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="finance-manager" onValueChange={() => setProfileChanged(true)}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance-manager">Finance Manager</SelectItem>
                      <SelectItem value="accountant">Accountant</SelectItem>
                      <SelectItem value="bookkeeper">Bookkeeper</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#950101] hover:bg-[#FF0000]" onClick={handleProfileSave}>
                {profileChanged ? "Save Changes" : "Saved"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-[#3D0000]">
            <CardHeader>
              <CardTitle>Company Settings</CardTitle>
              <CardDescription>Configure your company preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Default Timezone</Label>
                <Select defaultValue="utc-5" onValueChange={() => setPreferencesChanged(true)}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                    <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                    <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="utc-0">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <RadioGroup
                  defaultValue="mm-dd-yyyy"
                  id="date-format"
                  className="flex flex-col space-y-1"
                  onValueChange={() => setPreferencesChanged(true)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mm-dd-yyyy" id="mm-dd-yyyy" />
                    <Label htmlFor="mm-dd-yyyy">MM/DD/YYYY</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dd-mm-yyyy" id="dd-mm-yyyy" />
                    <Label htmlFor="dd-mm-yyyy">DD/MM/YYYY</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yyyy-mm-dd" id="yyyy-mm-dd" />
                    <Label htmlFor="yyyy-mm-dd">YYYY/MM/DD</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fiscal-year">Fiscal Year Start</Label>
                <Select defaultValue="january" onValueChange={() => setPreferencesChanged(true)}>
                  <SelectTrigger id="fiscal-year">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="february">February</SelectItem>
                    <SelectItem value="march">March</SelectItem>
                    <SelectItem value="april">April</SelectItem>
                    <SelectItem value="may">May</SelectItem>
                    <SelectItem value="june">June</SelectItem>
                    <SelectItem value="july">July</SelectItem>
                    <SelectItem value="august">August</SelectItem>
                    <SelectItem value="september">September</SelectItem>
                    <SelectItem value="october">October</SelectItem>
                    <SelectItem value="november">November</SelectItem>
                    <SelectItem value="december">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#950101] hover:bg-[#FF0000]" onClick={handlePreferencesSave}>
                {preferencesChanged ? "Save Preferences" : "Preferences Saved"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="border-[#3D0000]">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-[#950101]" />
                    <Label htmlFor="email-notifications" className="flex-1">
                      Email Notifications
                    </Label>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={(checked) => {
                      setEmailNotifications(checked)
                      setNotificationSettingsChanged(true)
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-[#950101]" />
                    <Label htmlFor="push-notifications" className="flex-1">
                      Push Notifications
                    </Label>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={pushNotifications}
                    onCheckedChange={(checked) => {
                      setPushNotifications(checked)
                      setNotificationSettingsChanged(true)
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notification Events</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="notify-reconciliation-complete"
                      defaultChecked
                      onCheckedChange={() => setNotificationSettingsChanged(true)}
                    />
                    <Label htmlFor="notify-reconciliation-complete">Reconciliation Complete</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="notify-unmatched-transactions"
                      defaultChecked
                      onCheckedChange={() => setNotificationSettingsChanged(true)}
                    />
                    <Label htmlFor="notify-unmatched-transactions">Unmatched Transactions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="notify-system-updates"
                      defaultChecked
                      onCheckedChange={() => setNotificationSettingsChanged(true)}
                    />
                    <Label htmlFor="notify-system-updates">System Updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="notify-report-generation"
                      defaultChecked
                      onCheckedChange={() => setNotificationSettingsChanged(true)}
                    />
                    <Label htmlFor="notify-report-generation">Report Generation</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#950101] hover:bg-[#FF0000]" onClick={handleNotificationSettingsSave}>
                {notificationSettingsChanged ? "Save Notification Settings" : "Settings Saved"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="border-[#3D0000]">
            <CardHeader>
              <CardTitle>Password Settings</CardTitle>
              <CardDescription>Update your password and security preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {passwordUpdated && (
                <Alert className="bg-green-50 border-green-500 text-green-700 mb-4">
                  <AlertDescription>Password updated successfully.</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    {hasUpperCase ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                    <span>One uppercase letter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasMinLength ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                    <span>Minimum 8 characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasSpecialChar ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                    <span>One special character (e.g., @, #, $)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword && !passwordsMatch && (
                  <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-[#950101] hover:bg-[#FF0000]"
                onClick={handlePasswordUpdate}
                disabled={!passwordsMatch || !hasUpperCase || !hasMinLength || !hasSpecialChar}
              >
                Update Password
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-[#3D0000]">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showRecoveryEmailVerification && (
                <Alert className="bg-green-50 border-green-500 text-green-700 mb-4">
                  <AlertDescription>Verification link sent to email.</AlertDescription>
                </Alert>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-[#950101]" />
                  <Label htmlFor="two-factor" className="flex-1">
                    Enable Two-Factor Authentication
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-[#950101]" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Two-factor authentication adds an extra layer of security to your account by requiring a
                          second verification step when logging in, typically through a code sent to your mobile device.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch id="two-factor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recovery-email">Recovery Email</Label>
                <Input
                  id="recovery-email"
                  type="email"
                  placeholder="backup@example.com"
                  onChange={() => setSecuritySettingsSaved(false)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#950101] hover:bg-[#FF0000]" onClick={handleSecuritySettingsSave}>
                {securitySettingsSaved ? "Settings Saved" : "Save Security Settings"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-[#3D0000]">
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys for integrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Key className="h-4 w-4 text-[#950101]" />
                  <div>
                    <p className="font-medium">Primary API Key</p>
                    <p className="text-sm text-muted-foreground">Created on April 12, 2025</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Regenerate
                </Button>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  <Key className="mr-2 h-4 w-4" />
                  Generate New API Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card className="border-[#3D0000]">
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription and billing details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Professional Plan</p>
                    <p className="text-sm text-muted-foreground">$49.99/month</p>
                    <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                      <li>• Unlimited reconciliations</li>
                      <li>• Advanced reporting</li>
                      <li>• API access</li>
                      <li>• Priority support</li>
                    </ul>
                  </div>
                  <Button variant="outline">Upgrade</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#3D0000]">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Update your payment information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-[#950101]" />
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 04/2026</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowPaymentMethodDialog(true)}>
                  Edit
                </Button>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full" onClick={() => setShowPaymentMethodDialog(true)}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#3D0000]">
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your recent invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.slice(0, 3).map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                      <Button variant="outline" size="sm" onClick={() => handleViewInvoice(invoice.id)}>
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={handleViewAllInvoices}>
                View All Invoices
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Method Dialog */}
      <Dialog open={showPaymentMethodDialog} onOpenChange={setShowPaymentMethodDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Payment Method</DialogTitle>
            <DialogDescription>Enter your payment details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="4242 4242 4242 4242" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name-on-card">Name on Card</Label>
              <Input id="name-on-card" placeholder="John Doe" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="bg-[#950101] hover:bg-[#FF0000]"
                onClick={() => {
                  toast({
                    title: "Payment Method Updated",
                    description: "Your payment method has been successfully updated.",
                    duration: 3000,
                  })
                }}
              >
                Save Payment Method
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Dialog */}
      <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Invoice {selectedInvoice}</DialogTitle>
            <DialogDescription>Invoice details for your records.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-lg">BankReconcile</h3>
                  <p className="text-sm text-muted-foreground">123 Finance Street</p>
                  <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-lg">Invoice #{selectedInvoice}</h3>
                  <p className="text-sm text-muted-foreground">
                    Date: {invoices.find((i) => i.id === selectedInvoice)?.date}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b pb-4 mb-4">
              <h4 className="font-medium mb-2">Billed To:</h4>
              <p>John Doe</p>
              <p>Acme Inc.</p>
              <p>456 Business Ave</p>
              <p>San Francisco, CA 94107</p>
            </div>

            <div className="mb-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Professional Plan - Monthly Subscription</TableCell>
                    <TableCell className="text-right">$49.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">$49.99</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Payment processed on {invoices.find((i) => i.id === selectedInvoice)?.date}</p>
              <p>Thank you for your business!</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <DialogClose asChild>
              <Button className="bg-[#950101] hover:bg-[#FF0000]">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* All Invoices Dialog */}
      <Dialog open={showAllInvoices} onOpenChange={setShowAllInvoices}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>All Invoices</DialogTitle>
            <DialogDescription>Complete history of your billing invoices.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setShowAllInvoices(false)
                          setSelectedInvoice(invoice.id)
                          setShowInvoiceDialog(true)
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download All
            </Button>
            <DialogClose asChild>
              <Button className="bg-[#950101] hover:bg-[#FF0000]">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
