import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PartnersAndWhySection } from './components/PartnersAndWhySection';
import { ExploreDiagnosticCards } from './components/ExploreDiagnosticCards';
import { UnifiedTestSearchBar, UnifiedCatalogItem } from './components/UnifiedTestSearchBar';
import { RadiologyAndPackagesShowcase } from './components/RadiologyAndPackagesShowcase';
import { AiKodanBanner } from './components/AiKodanBanner';
import { CallBackModal } from './components/CallBackModal';
import { BookingModal } from './components/BookingModal';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { BookingTrackerModal } from './components/BookingTrackerModal';
import { PrescriptionModal } from './components/PrescriptionModal';
import { AiKodanWidget } from './components/AiKodanWidget';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AllPackagesPdfModal } from './components/AllPackagesPdfModal';
import { EducationalGuidesModal } from './components/EducationalGuidesModal';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AiReportExplainer } from './components/AiReportExplainer';
import { RadiologySection } from './components/RadiologySection';
import { DoctorConsultationSection } from './components/DoctorConsultationSection';
import { MedicinesSection } from './components/MedicinesSection';
import { VipMembershipSection } from './components/VipMembershipSection';
import { HealthRemindersSection } from './components/HealthRemindersSection';
import { PackagesSection } from './components/PackagesSection';
import { HyderabadCoverage } from './components/HyderabadCoverage';
import { ProcessSection } from './components/ProcessSection';
import { HEALTH_PACKAGES } from './data/testsData';
import {
  CartItem,
  HealthPackage,
  RadiologyService,
  DoctorProfile,
  MembershipPlan,
  BookingSubmission,
  HyderabadHub,
} from './types';

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState<string>('home');

  // Active items for direct booking modal
  const [bookingItems, setBookingItems] = useState<CartItem[]>([
    {
      id: 'default-pkg-platinum',
      itemType: 'package',
      referenceId: HEALTH_PACKAGES[1].id,
      name: HEALTH_PACKAGES[1].name,
      price: HEALTH_PACKAGES[1].price,
      parametersCount: HEALTH_PACKAGES[1].totalParameters,
      fastingRequirement: HEALTH_PACKAGES[1].fastingRequirement,
    },
  ]);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCallBackOpen, setIsCallBackOpen] = useState(false);
  const [callBackTestName, setCallBackTestName] = useState('Diagnostic Test Inquiry');
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isAiKodanOpen, setIsAiKodanOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isEducationalGuidesOpen, setIsEducationalGuidesOpen] = useState(false);
  const [educationalGuideTopic, setEducationalGuideTopic] = useState<'kidney' | 'liver' | 'cardiac' | 'diabetes'>('kidney');

  // Search filter triggered from 10 organ cards
  const [searchCategoryFilter, setSearchCategoryFilter] = useState<string | null>(null);

  const [activeTrackingId, setActiveTrackingId] = useState<string>('KODON-HYD-8421');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingSubmission | null>(null);

  const [recentBookings, setRecentBookings] = useState<BookingSubmission[]>([
    {
      bookingId: 'KODON-HYD-8421',
      patientName: 'K. Sravan Reddy',
      age: '34',
      gender: 'Male',
      phone: '8333821121',
      address: 'Flat 504, Tower B, My Home Bhooja, Silpa Gram Craft Village',
      locality: 'Hitec City / Madhapur',
      pincode: '500081',
      date: new Date().toISOString().split('T')[0],
      timeSlot: '07:00 AM - 08:00 AM (Recommended for Fasting)',
      paymentMethod: 'pay_on_collection',
      items: [
        {
          id: 'prev-1',
          itemType: 'package',
          referenceId: 'pkg-platinum',
          name: 'KoDon Platinum Full Body',
          price: 1499,
          parametersCount: 84,
          fastingRequirement: '10-12 hrs Fasting Required',
        },
      ],
      totalAmount: 1499,
      createdAt: new Date().toISOString(),
      status: 'technician_assigned',
    },
  ]);

  const [selectedLocality, setSelectedLocality] = useState<string>('Hitec City / Madhapur');

  // Scroll helper to Search Bar
  const scrollToSearch = () => {
    setActiveNavTab('home');
    setIsDashboardOpen(false);
    setTimeout(() => {
      const el = document.getElementById('search-catalog-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Direct Book Now handler from Unified Search Item
  const handleBookUnifiedItem = (item: UnifiedCatalogItem) => {
    const cartItem: CartItem = {
      id: `book-${item.id}-${Date.now()}`,
      itemType: item.type === 'package' ? 'package' : item.type === 'radiology' ? 'radiology' : 'test',
      referenceId: item.id,
      name: item.name,
      price: item.price,
      parametersCount: 1,
      fastingRequirement: item.requirement,
    };
    setBookingItems([cartItem]);
    setIsBookingOpen(true);
  };

  // Direct Book Now handler from HealthPackage
  const handleBookPackage = (pkg: HealthPackage) => {
    const cartItem: CartItem = {
      id: `pkg-${pkg.id}-${Date.now()}`,
      itemType: 'package',
      referenceId: pkg.id,
      name: pkg.name,
      price: pkg.price,
      parametersCount: pkg.totalParameters,
      fastingRequirement: pkg.fastingRequirement,
    };
    setBookingItems([cartItem]);
    setIsBookingOpen(true);
  };

  // Direct Book Now handler from RadiologyService
  const handleBookRadiology = (service: RadiologyService) => {
    const cartItem: CartItem = {
      id: `rad-${service.id}-${Date.now()}`,
      itemType: 'radiology',
      referenceId: service.id,
      name: `${service.name} (${service.provider})`,
      price: service.verifiedPrice,
      parametersCount: 1,
      fastingRequirement: service.preparation,
    };
    setBookingItems([cartItem]);
    setIsBookingOpen(true);
  };

  // Direct Book Now handler from Doctor
  const handleBookConsultation = (doc: DoctorProfile, mode: 'teleconsult' | 'in_person') => {
    const fee = mode === 'teleconsult' ? doc.teleconsultationFee : doc.inPersonFee;
    const label = mode === 'teleconsult' ? 'Video Teleconsult' : 'In-Person Clinic Visit';
    const cartItem: CartItem = {
      id: `doc-${doc.id}-${Date.now()}`,
      itemType: 'consultation',
      referenceId: doc.id,
      name: `${doc.name} - ${label}`,
      price: fee,
      parametersCount: 1,
      fastingRequirement: 'Have recent lab reports ready if available',
    };
    setBookingItems([cartItem]);
    setIsBookingOpen(true);
  };

  // Direct Book Now handler from Membership
  const handleSelectPlan = (plan: MembershipPlan, billingCycle: 'monthly' | 'annual') => {
    const fee = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
    const cartItem: CartItem = {
      id: `mem-${plan.id}-${Date.now()}`,
      itemType: 'membership',
      referenceId: plan.id,
      name: `${plan.name} (${billingCycle === 'annual' ? 'Annual Plan' : 'Monthly Plan'})`,
      price: fee,
      parametersCount: 0,
      fastingRequirement: 'Immediate VIP Activation',
    };
    setBookingItems([cartItem]);
    setIsBookingOpen(true);
  };

  // Open Call Back modal with prefilled test name
  const handleOpenCallBack = (testName?: string) => {
    setCallBackTestName(testName || 'General Healthcare Inquiry');
    setIsCallBackOpen(true);
  };

  // Handle category selected from 10 organ cards
  const handleSelectOrganCategory = (catId: string) => {
    setSearchCategoryFilter(catId);
    scrollToSearch();
  };

  const handleBookingConfirmed = (booking: BookingSubmission) => {
    setRecentBookings((prev) => [booking, ...prev]);
    setConfirmedBooking(booking);
    setIsBookingOpen(false);
  };

  const handleTrackBooking = (bookingId: string) => {
    setActiveTrackingId(bookingId);
    setIsTrackerOpen(true);
  };

  const handleLocalitySelected = (hub: HyderabadHub) => {
    setSelectedLocality(hub.name);
    setIsBookingOpen(true);
  };

  const handleAskAi = (prompt: string) => {
    setIsAiKodanOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FB] text-slate-800 font-sans selection:bg-[#087F8C] selection:text-white">
      
      {/* Top Navbar matching reference image */}
      <Navbar
        cart={bookingItems}
        onOpenPrescription={() => setIsPrescriptionOpen(true)}
        onOpenTracker={() => {
          setActiveTrackingId(recentBookings[0]?.bookingId || 'KODON-HYD-8421');
          setIsTrackerOpen(true);
        }}
        onOpenAiKodan={() => setIsAiKodanOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
        activeNavTab={activeNavTab}
        onSelectNavTab={(tab) => {
          setIsDashboardOpen(false);
          setActiveNavTab(tab);
          if (tab === 'tests') {
            scrollToSearch();
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      <main className="flex-1">
        {/* Customer Dashboard View (when triggered by Login / Register) */}
        {isDashboardOpen ? (
          <CustomerDashboard
            recentBookings={recentBookings}
            onOpenBooking={() => setIsBookingOpen(true)}
            onNavigateTab={(tab) => {
              setIsDashboardOpen(false);
              setActiveNavTab(tab);
            }}
          />
        ) : (
          <>
            {/* View Switching based on activeNavTab */}
            {activeNavTab === 'home' && (
              <>
                {/* 1. HERO SECTION (3-Column Layout strictly matching reference image) */}
                <Hero
                  onExplorePackages={() => setActiveNavTab('packages')}
                  onOpenPdfModal={() => setIsPdfModalOpen(true)}
                  onOpenReportTrends={() => setActiveNavTab('report-explainer')}
                  onAskAi={handleAskAi}
                  onOpenBooking={() => setIsBookingOpen(true)}
                  onSelectServiceTab={(tab) => setActiveNavTab(tab)}
                  onScrollToSearch={scrollToSearch}
                />

                {/* 2. OUR TRUSTED DIAGNOSTIC PARTNERS + WHY CHOOSE KODON + GET IN TOUCH */}
                <PartnersAndWhySection
                  onOpenBooking={() => setIsBookingOpen(true)}
                  onAskAi={handleAskAi}
                />

                {/* 3. EXPLORE OUR DIAGNOSTIC TESTS (10 Visual Organ/Test Cards) */}
                <ExploreDiagnosticCards
                  onSelectCategory={handleSelectOrganCategory}
                />

                {/* 4. HIGHLIGHTED UNIFIED PATHOLOGY & RADIOLOGY TEST SEARCH BAR */}
                <UnifiedTestSearchBar
                  onBookNow={handleBookUnifiedItem}
                  onGetCallBack={handleOpenCallBack}
                  externalCategoryFilter={searchCategoryFilter}
                  onClearExternalFilter={() => setSearchCategoryFilter(null)}
                />

                {/* 5. RADIOLOGY & IMAGING + SPECIAL HEALTH PACKAGES */}
                <RadiologyAndPackagesShowcase
                  onBookRadiology={handleBookRadiology}
                  onBookPackage={handleBookPackage}
                  onGetCallBack={handleOpenCallBack}
                  onViewAllRadiology={() => setActiveNavTab('radiology')}
                />

                {/* 6. AI KODAN BOTTOM FEATURE BANNER */}
                <AiKodanBanner
                  onStartChat={() => setIsAiKodanOpen(true)}
                  onOpenBooking={() => setIsBookingOpen(true)}
                  onSelectServiceTab={(tab) => setActiveNavTab(tab)}
                />

                {/* Hyderabad Phlebotomist Doorstep Coverage Section */}
                <HyderabadCoverage onSelectLocalityForBooking={handleLocalitySelected} />
              </>
            )}

            {/* Dedicated Packages Page */}
            {activeNavTab === 'packages' && (
              <>
                <PackagesSection
                  onAddToCart={handleBookPackage}
                  onOpenPdfModal={() => setIsPdfModalOpen(true)}
                />
                <ProcessSection />
              </>
            )}

            {/* Dedicated Tests Search Catalog */}
            {activeNavTab === 'tests' && (
              <UnifiedTestSearchBar
                onBookNow={handleBookUnifiedItem}
                onGetCallBack={handleOpenCallBack}
                externalCategoryFilter={searchCategoryFilter}
                onClearExternalFilter={() => setSearchCategoryFilter(null)}
              />
            )}

            {/* Dedicated Radiology Scans Page */}
            {activeNavTab === 'radiology' && (
              <RadiologySection onBookRadiology={handleBookRadiology} />
            )}

            {/* Dedicated AI Report Explainer & Trends Page */}
            {activeNavTab === 'report-explainer' && (
              <AiReportExplainer
                onScheduleTest={(testName) => {
                  setActiveNavTab('packages');
                }}
                onConsultDoctor={() => {
                  setActiveNavTab('doctors');
                }}
              />
            )}

            {/* Dedicated Doctors & Teleconsultations Page */}
            {activeNavTab === 'doctors' && (
              <DoctorConsultationSection onBookConsultation={handleBookConsultation} />
            )}

            {/* Dedicated Pharmacy Medicines Page */}
            {activeNavTab === 'medicines' && (
              <MedicinesSection onOpenPrescriptionModal={() => setIsPrescriptionOpen(true)} />
            )}

            {/* Dedicated VIP & Premium Memberships Page */}
            {activeNavTab === 'vip' && (
              <VipMembershipSection onSelectPlan={handleSelectPlan} />
            )}

            {/* Dedicated Monthly Health Reminders */}
            {activeNavTab === 'reminders' && (
              <HealthRemindersSection />
            )}
          </>
        )}
      </main>

      {/* Footer matching reference image */}
      <Footer
        onSelectNavTab={(tab) => {
          setIsDashboardOpen(false);
          setActiveNavTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating AI KODAN Assistant Widget */}
      <AiKodanWidget
        isOpen={isAiKodanOpen}
        onToggle={() => setIsAiKodanOpen(!isAiKodanOpen)}
        onNavigateTab={(tab) => {
          setIsAiKodanOpen(false);
          setIsDashboardOpen(false);
          setActiveNavTab(tab);
        }}
        onOpenBooking={() => {
          setIsAiKodanOpen(false);
          setIsBookingOpen(true);
        }}
      />

      {/* Floating Direct WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Fast 15-Minute Instant Coordinator Call Back Modal */}
      <CallBackModal
        isOpen={isCallBackOpen}
        onClose={() => setIsCallBackOpen(false)}
        defaultTestName={callBackTestName}
        defaultLocality={selectedLocality}
      />

      {/* Direct Booking Modal (Opens immediately on Book Now with selected test/package) */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        cart={bookingItems}
        defaultLocality={selectedLocality}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* Booking Confirmed Receipt Modal */}
      <BookingSuccessModal
        booking={confirmedBooking}
        onClose={() => setConfirmedBooking(null)}
        onTrackBooking={handleTrackBooking}
      />

      {/* Live Phlebotomist & Cold-Chain Tracker */}
      <BookingTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        initialBookingId={activeTrackingId}
        recentBookings={recentBookings}
      />

      {/* Doctor Prescription Upload Modal */}
      <PrescriptionModal
        isOpen={isPrescriptionOpen}
        onClose={() => setIsPrescriptionOpen(false)}
      />

      {/* Educational Clinical Guides Modal */}
      <EducationalGuidesModal
        isOpen={isEducationalGuidesOpen}
        onClose={() => setIsEducationalGuidesOpen(false)}
        initialTopic={educationalGuideTopic}
        onNavigateTest={(topic) => {
          setIsEducationalGuidesOpen(false);
          setActiveNavTab('tests');
        }}
      />

      {/* All Packages in One PDF Viewer Modal */}
      <AllPackagesPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        onSelectPackageForBooking={handleBookPackage}
      />
    </div>
  );
}
