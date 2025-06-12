"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Copy, Download, Globe, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FormData {
  senderName: string;
  senderDivision: string;
  organizationName: string;
  eventName: string;
  eventDateLocation: string;
  eventPurpose: string;
  targetCompany: string;
  recipientName: string;
  recipientPosition: string;
  senderContact: string;
  meetingDate: string;
  meetingTime: string;
  meetingLocation: string;
}

type Language = "id" | "en";

const translations = {
  id: {
    title: "Generator Email Sponsorship",
    subtitle:
      "Buat surat permohonan sponsorship profesional untuk Smart IT Festival dengan mudah dan cepat",
    orgBadge: "Emailkomp Sekolah Vokasi UNS",
    formTitle: "Form Input Data",
    formSubtitle:
      "Lengkapi informasi yang diperlukan untuk menghasilkan email sponsorship",
    resultTitle: "Hasil Email Sponsorship",
    resultSubtitle: "Email yang dihasilkan siap untuk dikirim",
    requiredSection: "Informasi Wajib",
    optionalSection: "Informasi Opsional",
    meetingSection: "Rencana Pertemuan",
    lockedSection: "Informasi Default",
    locked: "Terkunci",
    senderName: "Nama Pengirim",
    targetCompany: "Nama Perusahaan Tujuan",
    recipientName: "Nama Penerima",
    recipientPosition: "Jabatan Penerima",
    meetingDate: "Tanggal Pertemuan",
    meetingTime: "Waktu Pertemuan",
    meetingLocation: "Lokasi Pertemuan",
    senderDivision: "Divisi Pengirim",
    organizationName: "Nama Organisasi",
    eventName: "Nama Kegiatan",
    eventDateLocation: "Tanggal & Tempat Kegiatan",
    eventPurpose: "Tujuan Kegiatan",
    senderContact: "Kontak Pengirim",
    generateBtn: "Generate Email Sponsorship",
    copyBtn: "Salin Email",
    downloadBtn: "Unduh .txt",
    noEmailTitle: "Belum Ada Email",
    noEmailDesc:
      'Lengkapi form di sebelah kiri dan klik "Generate Email" untuk melihat hasil',
    noEmailHint: "Hanya perlu mengisi nama pengirim dan perusahaan tujuan",
    readyToSend: "Siap Kirim",
    successCopy: "Email telah disalin ke clipboard",
    successDownload: "Email telah diunduh sebagai file .txt",
    errorCopy: "Gagal menyalin email",
    dateError: "Tanggal tidak boleh kurang dari hari ini",
    placeholders: {
      senderName: "Masukkan nama lengkap Anda",
      targetCompany: "Nama perusahaan yang akan diminta sponsorship",
      recipientName: "Nama penerima email (opsional)",
      recipientPosition: "Contoh: Manager Marketing (opsional)",
      meetingTime: "Contoh: 10:00 WIB",
      meetingLocation: "Contoh: Kantor perusahaan atau online",
    },
    defaultValues: {
      senderDivision: "Devisi Sponsorship",
      organizationName: "Emailkomp Sekolah Vokasi Universitas Sebelas Maret",
      eventName: "Smart IT Festival",
      eventDateLocation: "29 Agustus 2024 di Balaikota Surakarta",
      eventPurpose:
        "mengembangkan minat dan bakat mahasiswa di bidang teknologi informasi, memberikan wadah untuk berkreasi dan berinovasi, serta memperkenalkan perkembangan teknologi terkini kepada masyarakat luas",
      senderContact: "smartitfestanjaymabar@gmail.com",
    },
  },
  en: {
    title: "Sponsorship Email Generator",
    subtitle:
      "Create professional sponsorship request letters for Smart IT Festival easily and quickly",
    orgBadge: "Emailkomp Vocational School Sebelas Maret University",
    formTitle: "Data Input Form",
    formSubtitle:
      "Complete the required information to generate sponsorship email",
    resultTitle: "Sponsorship Email Result",
    resultSubtitle: "Generated email ready to send",
    requiredSection: "Required Information",
    optionalSection: "Optional Information",
    meetingSection: "Meeting Plan",
    lockedSection: "Default Information",
    locked: "Locked",
    senderName: "Sender Name",
    targetCompany: "Target Company Name",
    recipientName: "Recipient Name",
    recipientPosition: "Recipient Position",
    meetingDate: "Meeting Date",
    meetingTime: "Meeting Time",
    meetingLocation: "Meeting Location",
    senderDivision: "Sender Division",
    organizationName: "Organization Name",
    eventName: "Event Name",
    eventDateLocation: "Event Date & Location",
    eventPurpose: "Event Purpose",
    senderContact: "Sender Contact",
    generateBtn: "Generate Sponsorship Email",
    copyBtn: "Copy Email",
    downloadBtn: "Download .txt",
    noEmailTitle: "No Email Yet",
    noEmailDesc:
      'Complete the form on the left and click "Generate Email" to see results',
    noEmailHint: "Only need to fill sender name and target company",
    readyToSend: "Ready to Send",
    successCopy: "Email copied to clipboard",
    successDownload: "Email has been downloaded as .txt file",
    errorCopy: "Failed to copy email",
    dateError: "Date cannot be earlier than today",
    placeholders: {
      senderName: "Enter your full name",
      targetCompany: "Company name to request sponsorship from",
      recipientName: "Recipient email name (optional)",
      recipientPosition: "Example: Marketing Manager (optional)",
      meetingTime: "Example: 10:00 AM",
      meetingLocation: "Example: Company office or online",
    },
    defaultValues: {
      senderDivision: "Sponsorship Division",
      organizationName: "Emailkomp Vocational School Sebelas Maret University",
      eventName: "Smart IT Festival",
      eventDateLocation: "August 29, 2024 at Surakarta City Hall",
      eventPurpose:
        "to develop students' interests and talents in information technology, provide a platform for creativity and innovation, and introduce the latest technological developments to the wider community",
      senderContact: "smartitfestanjaymabar@gmail.com",
    },
  },
};

export default function SponsorshipEmailGenerator() {
  const [language, setLanguage] = useState<Language>("id");
  const [formData, setFormData] = useState<FormData>({
    senderName: "",
    senderDivision: translations[language].defaultValues.senderDivision,
    organizationName: translations[language].defaultValues.organizationName,
    eventName: translations[language].defaultValues.eventName,
    eventDateLocation: translations[language].defaultValues.eventDateLocation,
    eventPurpose: translations[language].defaultValues.eventPurpose,
    targetCompany: "",
    recipientName: "",
    recipientPosition: "",
    senderContact: translations[language].defaultValues.senderContact,
    meetingDate: "",
    meetingTime: "",
    meetingLocation: "",
  });

  const [generatedEmail, setGeneratedEmail] = useState("");
  const [dateError, setDateError] = useState("");

  const t = translations[language];

  const toggleLanguage = () => {
    const newLang = language === "id" ? "en" : "id";
    setLanguage(newLang);

    // Update default values when language changes
    setFormData((prev) => ({
      ...prev,
      senderDivision: translations[newLang].defaultValues.senderDivision,
      organizationName: translations[newLang].defaultValues.organizationName,
      eventName: translations[newLang].defaultValues.eventName,
      eventDateLocation: translations[newLang].defaultValues.eventDateLocation,
      eventPurpose: translations[newLang].defaultValues.eventPurpose,
      senderContact: translations[newLang].defaultValues.senderContact,
    }));
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Validate date input
    if (field === "meetingDate") {
      const today = new Date();
      const selectedDate = new Date(value);
      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        setDateError(t.dateError);
      } else {
        setDateError("");
      }
    }
  };

  const generateEmail = () => {
    const meetingSection = formData.meetingDate
      ? language === "id"
        ? `\n\nUntuk membahas lebih lanjut, kami mengusulkan pertemuan pada:\n• Tanggal: ${
            formData.meetingDate
          }\n• Waktu: ${
            formData.meetingTime || "Sesuai kesepakatan"
          }\n• Lokasi: ${formData.meetingLocation || "Sesuai kesepakatan"}`
        : `\n\nTo discuss further, we propose a meeting on:\n• Date: ${
            formData.meetingDate
          }\n• Time: ${formData.meetingTime || "As agreed"}\n• Location: ${
            formData.meetingLocation || "As agreed"
          }`
      : "";

    const emailTemplate =
      language === "id"
        ? `Subject: Permohonan Sponsorship - ${formData.eventName}

Kepada Yth.
${formData.recipientName || "[Nama Penerima]"}
${formData.recipientPosition || "[Jabatan]"}
${formData.targetCompany}

Dengan hormat,

Perkenalkan, saya yang bertanda tangan di bawah ini:

Nama       : ${formData.senderName}
Divisi     : ${formData.senderDivision}
Organisasi : ${formData.organizationName}
Email      : ${formData.senderContact}

Dengan ini mengajukan permohonan kerjasama sponsorship untuk acara "${
            formData.eventName
          }" yang akan diselenggarakan pada ${formData.eventDateLocation}.

Acara ini bertujuan ${
            formData.eventPurpose
          } dan diharapkan dapat memberikan manfaat bagi kedua belah pihak.

Manfaat Yang Akan Diperoleh ${formData.targetCompany}:
• Penempatan logo perusahaan di seluruh materi promosi
• Penyebutan nama perusahaan selama acara berlangsung
• Kesempatan untuk mempromosikan produk/layanan
• Penyediaan booth/stand khusus untuk perusahaan
• Dokumentasi lengkap dan laporan kegiatan

Terlampir proposal lengkap yang berisi detail paket sponsorship dan manfaat yang dapat diperoleh.${meetingSection}

Demikian permohonan kerjasama ini kami sampaikan. Kami sangat berharap dapat menjalin kerjasama yang baik dengan ${
            formData.targetCompany
          }.

Untuk informasi lebih lanjut, silakan hubungi kami di ${formData.senderContact}.

Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.

Hormat kami,


${formData.senderName}
${formData.senderDivision}
${formData.organizationName}

---
File terlampir: Proposal Sponsorship ${formData.eventName}.pdf`
        : `Subject: Sponsorship Request - ${formData.eventName}

Dear ${formData.recipientName || "[Recipient Name]"},
${formData.recipientPosition || "[Position]"}
${formData.targetCompany}

Greetings,

Allow me to introduce myself:

Name         : ${formData.senderName}
Division     : ${formData.senderDivision}
Organization : ${formData.organizationName}
Email        : ${formData.senderContact}

I hereby submit a sponsorship cooperation request for "${
            formData.eventName
          }" to be held on ${formData.eventDateLocation}.

This event aims ${
            formData.eventPurpose
          } and is expected to benefit both parties.

Benefits for ${formData.targetCompany}:
• Company logo placement on all promotional materials
• Company name mention throughout the event
• Opportunities to promote products/services
• Exclusive booth/stand for the company
• Complete documentation and event reports

Attached is the complete proposal containing sponsorship package details and benefits.${meetingSection}

We hereby submit this cooperation request. We sincerely hope to establish good cooperation with ${
            formData.targetCompany
          }.

For further information, please contact us at ${formData.senderContact}.

Thank you for your attention and cooperation.

Sincerely,


${formData.senderName}
${formData.senderDivision}
${formData.organizationName}

---
Attached file: ${formData.eventName} Sponsorship Proposal.pdf`;

    setGeneratedEmail(emailTemplate);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail);
      toast.success(t.successCopy);
    } catch {
      toast.error(t.errorCopy);
    }
  };

  const downloadAsText = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedEmail], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `sponsorship-email-${formData.eventName
      .replace(/\s+/g, "-")
      .toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast.success(t.successDownload);
  };

  const isFormValid =
    formData.senderName.trim() !== "" &&
    formData.targetCompany.trim() !== "" &&
    !dateError;

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full shadow-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white bg-white"
            >
              <Globe className="h-4 w-4" />
              {language === "id" ? "EN" : "ID"}
            </Button>
          </div>
          <h1 className="text-5xl font-bold text-black mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            {t.orgBadge}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="shadow-xl border-2 border-gray-300 bg-white">
            <CardHeader className="bg-black mx-3 -mt-2 rounded-md px-6 py-4 text-white">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                {t.formTitle}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {t.formSubtitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6 bg-white">
              {/* Required Fields Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-black rounded-full"></div>
                  <h3 className="font-semibold text-black">
                    {t.requiredSection}
                  </h3>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="senderName"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t.senderName} <span className="text-black">*</span>
                  </Label>
                  <Input
                    id="senderName"
                    placeholder={t.placeholders.senderName}
                    value={formData.senderName}
                    onChange={(e) =>
                      handleInputChange("senderName", e.target.value)
                    }
                    className="border-2 border-gray-300 bg-white text-black placeholder-gray-400 focus:border-black"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="targetCompany"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t.targetCompany} <span className="text-black">*</span>
                  </Label>
                  <Input
                    id="targetCompany"
                    placeholder={t.placeholders.targetCompany}
                    value={formData.targetCompany}
                    onChange={(e) =>
                      handleInputChange("targetCompany", e.target.value)
                    }
                    className="border-2 border-gray-300 bg-white text-black placeholder-gray-400 focus:border-black"
                  />
                </div>
              </div>

              {/* Optional Fields Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gray-500 rounded-full"></div>
                  <h3 className="font-semibold text-black">
                    {t.optionalSection}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="recipientName"
                      className="text-sm font-medium text-gray-700"
                    >
                      {t.recipientName}
                    </Label>
                    <Input
                      id="recipientName"
                      placeholder={t.placeholders.recipientName}
                      value={formData.recipientName}
                      onChange={(e) =>
                        handleInputChange("recipientName", e.target.value)
                      }
                      className="border-2 border-gray-300 bg-white text-black placeholder-gray-400 focus:border-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="recipientPosition"
                      className="text-sm font-medium text-gray-700"
                    >
                      {t.recipientPosition}
                    </Label>
                    <Input
                      id="recipientPosition"
                      placeholder={t.placeholders.recipientPosition}
                      value={formData.recipientPosition}
                      onChange={(e) =>
                        handleInputChange("recipientPosition", e.target.value)
                      }
                      className="border-2 border-gray-300 bg-white text-black placeholder-gray-400 focus:border-gray-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="meetingTime"
                      className="text-sm font-medium text-gray-700"
                    >
                      {t.meetingTime}
                    </Label>
                    <Input
                      id="meetingTime"
                      placeholder={t.placeholders.meetingTime}
                      value={formData.meetingTime}
                      onChange={(e) =>
                        handleInputChange("meetingTime", e.target.value)
                      }
                      className="border-2 border-gray-300 bg-white text-black placeholder-gray-400 focus:border-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="meetingLocation"
                      className="text-sm font-medium text-gray-700"
                    >
                      {t.meetingLocation}
                    </Label>
                    <Input
                      id="meetingLocation"
                      placeholder={t.placeholders.meetingLocation}
                      value={formData.meetingLocation}
                      onChange={(e) =>
                        handleInputChange("meetingLocation", e.target.value)
                      }
                      className="border-2 border-gray-300 bg-white text-black placeholder-gray-400 focus:border-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Meeting Planning Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gray-600 rounded-full"></div>
                  <h3 className="font-semibold text-black flex items-center gap-2">
                    {t.meetingSection}
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </h3>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="meetingDate"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t.meetingDate}
                  </Label>
                  <Input
                    id="meetingDate"
                    type="date"
                    min={today}
                    value={formData.meetingDate}
                    onChange={(e) =>
                      handleInputChange("meetingDate", e.target.value)
                    }
                    className={`border-2 bg-white text-black focus:border-gray-600 ${
                      dateError ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {dateError && (
                    <p className="text-red-500 text-xs mt-1">{dateError}</p>
                  )}
                </div>
              </div>

              {/* Locked Default Values Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
                  <h3 className="font-semibold text-black flex items-center gap-2">
                    {t.lockedSection}
                    <Lock className="h-4 w-4 text-gray-400" />
                  </h3>
                  <span className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
                    {t.locked}
                  </span>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="senderDivision"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    {t.senderDivision}
                    <Lock className="h-3 w-3 text-gray-400" />
                  </Label>
                  <Input
                    id="senderDivision"
                    value={formData.senderDivision}
                    disabled
                    className="border-2 border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="organizationName"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    {t.organizationName}
                    <Lock className="h-3 w-3 text-gray-400" />
                  </Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    disabled
                    className="border-2 border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="eventName"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    {t.eventName}
                    <Lock className="h-3 w-3 text-gray-400" />
                  </Label>
                  <Input
                    id="eventName"
                    value={formData.eventName}
                    disabled
                    className="border-2 border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="eventDateLocation"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    {t.eventDateLocation}
                    <Lock className="h-3 w-3 text-gray-400" />
                  </Label>
                  <Input
                    id="eventDateLocation"
                    value={formData.eventDateLocation}
                    disabled
                    className="border-2 border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="eventPurpose"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    {t.eventPurpose}
                    <Lock className="h-3 w-3 text-gray-400" />
                  </Label>
                  <Textarea
                    id="eventPurpose"
                    value={formData.eventPurpose}
                    disabled
                    rows={4}
                    className="border-2 border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="senderContact"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    {t.senderContact}
                    <Lock className="h-3 w-3 text-gray-400" />
                  </Label>
                  <Input
                    id="senderContact"
                    value={formData.senderContact}
                    disabled
                    className="border-2 border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>

              <Button
                onClick={generateEmail}
                className="w-full h-12 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isFormValid}
              >
                <Mail className="mr-2 h-5 w-5" />
                {t.generateBtn}
              </Button>
            </CardContent>
          </Card>

          {/* Result Section */}
          <Card className="shadow-xl border-2 border-gray-300 bg-white">
            <CardHeader className="bg-black mx-3 -mt-2 rounded-lg px-6 py-4 text-white">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <Copy className="h-5 w-5" />
                </div>
                {t.resultTitle}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {t.resultSubtitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              {generatedEmail ? (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 border-2 border-gray-600 text-gray-700 hover:bg-gray-600 hover:text-white bg-white"
                    >
                      <Copy className="h-4 w-4" />
                      {t.copyBtn}
                    </Button>
                    <Button
                      onClick={downloadAsText}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 border-2 border-black text-black hover:bg-black hover:text-white bg-white"
                    >
                      <Download className="h-4 w-4" />
                      {t.downloadBtn}
                    </Button>
                  </div>
                  <div className="relative">
                    <pre className="bg-gray-50 p-6 rounded-xl text-sm overflow-auto max-h-96 whitespace-pre-wrap border-2 border-gray-300 font-mono leading-relaxed text-black">
                      {generatedEmail}
                    </pre>
                    <div className="absolute top-2 right-2">
                      <div className="bg-black text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                        {t.readyToSend}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-gray-500">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-6">
                    <Mail className="h-10 w-10 opacity-50" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                    {t.noEmailTitle}
                  </h3>
                  <p className="text-sm">{t.noEmailDesc}</p>
                  <div className="mt-4 text-xs text-gray-400">
                    {t.noEmailHint}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-gray-300">
          <p className="text-gray-600 text-sm">
            © 2024 Emailkomp Sekolah Vokasi Universitas Sebelas Maret - Smart IT
            Festival
          </p>
        </div>
      </div>
    </div>
  );
}
