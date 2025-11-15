'use client';

import { useState } from 'react';

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  location: string;
  budget: string;
  message: string;
};

const DEFAULT: FormState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  location: '',
  budget: '',
  message: '',
};

/**
 * IMPORTANT:
 * Replace this with your actual Formspree endpoint.
 * Example: 'https://formspree.io/f/mayldkzb'
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqawplpq';

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(DEFAULT);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name';
    if (!form.email.trim()) return 'Please enter your email';
    if (!form.phone.trim()) return 'Please enter your phone number';
    if (!form.service.trim()) return 'Please select a service';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v as string));

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        setSuccess('Thanks! Your booking request has been sent. We will contact you soon.');
        setForm(DEFAULT);
      } else {
        const msg =
          (json?.errors && json.errors.map((err: any) => err?.message).join(', ')) ||
          json?.error ||
          'Failed to send. Please try again later.';
        setError(msg);
      }
    } catch (err: any) {
      setError(err?.message || 'Network error. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
      <h3 className="text-2xl font-semibold mb-4">Start your booking</h3>

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 text-red-700 px-4 py-3">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded border border-green-300 bg-green-50 text-green-800 px-4 py-3">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            className="mt-1 w-full px-4 py-3 rounded-lg border bg-slate-50"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            className="mt-1 w-full px-4 py-3 rounded-lg border bg-slate-50"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone *</label>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            required
            className="mt-1 w-full px-4 py-3 rounded-lg border bg-slate-50"
            placeholder="+91 98xxxx xxxx"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Service *</label>
          <select
            name="service"
            value={form.service}
            onChange={onChange}
            required
            className="mt-1 w-full px-4 py-3 rounded-lg border bg-white"
          >
            <option value="">Select service</option>
            <option>Photography - Weddings</option>
            <option>Photography - Product</option>
            <option>Photography - Fashion</option>
            <option>Videography - Event Films</option>
            <option>Videography - Wedding Films</option>
            <option>Editing - Color Grading</option>
            <option>Editing - Video Editing</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={onChange}
            className="mt-1 w-full px-4 py-3 rounded-lg border bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={onChange}
            className="mt-1 w-full px-4 py-3 rounded-lg border bg-slate-50"
            placeholder="City, State"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Budget Range</label>
          <input
            name="budget"
            value={form.budget}
            onChange={onChange}
            className="mt-1 w-full px-4 py-3 rounded-lg border bg-slate-50"
            placeholder="e.g. ₹20,000 - ₹50,000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            rows={4}
            className="mt-1 w-full px-4 py-3 rounded-lg border bg-slate-50"
            placeholder="Any details about the shoot, references, timings..."
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-white transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {loading ? 'Sending...' : 'Send Booking'}
          </button>
        </div>
      </form>
    </div>
  );
}
