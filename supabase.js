import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://zigowaworjamjlpcxbvr.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppZ293YXdvcmphbWpscGN4YnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDExNTEsImV4cCI6MjA5NDg3NzE1MX0.wjZThNIpp7BzJj1syKtVUMCLAZytk6qbQcePkyNELRM'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ─── BOOKINGS ────────────────────────────────────────────────────────────────
export async function saveBooking(booking) {
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      shop_id: booking.shopId,
      barber_id: booking.barberId,
      customer_name: booking.customerName,
      customer_email: booking.customerEmail,
      customer_phone: booking.customerPhone,
      booking_date: booking.date,
      booking_time: booking.slot,
      total_price: booking.totalPrice,
      notes: booking.notes,
      status: 'confirmed',
      payment_status: 'pending',
    })
    .select()
    .single()
  if (error) console.error('Booking error:', error)
  return { data, error }
}

// ─── APPLICATIONS ─────────────────────────────────────────────────────────────
export async function saveApplication(form) {
  const { data, error } = await supabase
    .from('applications')
    .insert({
      shop_name: form.shopName,
      owner_name: form.ownerName,
      email: form.email,
      phone: form.phone,
      website: form.website,
      address: form.address,
      area: form.area,
      about: form.about,
      opening_hours: form.openingHours,
      barbers: form.barbers,
      services: form.services,
      calendar_system: form.calendarSystem,
      calendly_url: form.calendlyUrl,
      resurva_url: form.resurvaUrl,
      ical_url: form.icalUrl,
      open_days: form.openDays,
      open_from: form.openFrom,
      open_to: form.openTo,
      agree_terms: form.agreeTerms,
      status: 'pending',
    })
    .select()
    .single()
  if (error) console.error('Application error:', error)
  return { data, error }
}

// ─── MARK SLOT AS BOOKED ─────────────────────────────────────────────────────
export async function markSlotBooked(barberId, date, time) {
  const { error } = await supabase
    .from('slots')
    .update({ is_booked: true })
    .eq('barber_id', barberId)
    .eq('slot_date', date)
    .eq('slot_time', time)
  if (error) console.error('Slot error:', error)
  return { error }
}
