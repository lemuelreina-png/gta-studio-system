'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

type FormState = {
  clientName: string;
  phone: string;
  email: string;
  instagram: string;
  designSummary: string;
  placement: string;
  sizeEstimate: string;
  appointmentDate: string;
  appointmentTime: string;
  depositStatus: 'Not Paid' | 'Paid' | 'Partial';
  depositAmount: string;
  notes: string;
  referenceImagePath: string;
};

const initialState: FormState = {
  clientName: '',
  phone: '',
  email: '',
  instagram: '',
  designSummary: '',
  placement: '',
  sizeEstimate: '',
  appointmentDate: '',
  appointmentTime: '',
  depositStatus: 'Not Paid',
  depositAmount: '',
  notes: '',
  referenceImagePath: '',
};

export default function IntakeFormPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatus('Uploading reference image...');

    try {
      const payload = new FormData();
      payload.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setForm((prev) => ({ ...prev, referenceImagePath: data.path }));
      setStatus('Reference image uploaded.');
    } catch {
      setStatus('Image upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('Submitting intake...');

    try {
      const response = await fetch('/api/intakes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Save failed');

      setForm(initialState);
      setStatus('Intake submitted successfully.');
    } catch {
      setStatus('Unable to submit intake.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Client Intake Form</h1>
        <a href="/admin" className="text-sm font-medium text-blue-700 hover:underline">
          View Admin Dashboard
        </a>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-xl bg-white p-6 shadow">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="clientName">Client name *</label>
            <input id="clientName" name="clientName" value={form.clientName} onChange={onFieldChange} required />
          </div>
          <div className="space-y-1">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" value={form.phone} onChange={onFieldChange} />
          </div>
          <div className="space-y-1">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={onFieldChange} />
          </div>
          <div className="space-y-1">
            <label htmlFor="instagram">Instagram</label>
            <input id="instagram" name="instagram" value={form.instagram} onChange={onFieldChange} />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="designSummary">Design summary *</label>
          <textarea id="designSummary" name="designSummary" value={form.designSummary} onChange={onFieldChange} required rows={4} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="placement">Placement *</label>
            <input id="placement" name="placement" value={form.placement} onChange={onFieldChange} required />
          </div>
          <div className="space-y-1">
            <label htmlFor="sizeEstimate">Size estimate</label>
            <input id="sizeEstimate" name="sizeEstimate" value={form.sizeEstimate} onChange={onFieldChange} />
          </div>
          <div className="space-y-1">
            <label htmlFor="appointmentDate">Appointment date</label>
            <input id="appointmentDate" name="appointmentDate" type="date" value={form.appointmentDate} onChange={onFieldChange} />
          </div>
          <div className="space-y-1">
            <label htmlFor="appointmentTime">Appointment time</label>
            <input id="appointmentTime" name="appointmentTime" type="time" value={form.appointmentTime} onChange={onFieldChange} />
          </div>
          <div className="space-y-1">
            <label htmlFor="depositStatus">Deposit status</label>
            <select id="depositStatus" name="depositStatus" value={form.depositStatus} onChange={onFieldChange}>
              <option>Not Paid</option>
              <option>Paid</option>
              <option>Partial</option>
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="depositAmount">Deposit amount</label>
            <input id="depositAmount" name="depositAmount" type="number" step="0.01" value={form.depositAmount} onChange={onFieldChange} />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="notes">Notes</label>
          <textarea id="notes" name="notes" value={form.notes} onChange={onFieldChange} rows={3} />
        </div>

        <div className="space-y-2">
          <label htmlFor="referenceImage">Reference image</label>
          <input id="referenceImage" type="file" accept="image/*" onChange={onUpload} />
          {form.referenceImagePath ? (
            <p className="text-sm text-green-700">Uploaded: {form.referenceImagePath}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isSubmitting ? 'Saving...' : 'Submit Intake'}
        </button>

        {status ? <p className="text-sm text-slate-700">{status}</p> : null}
      </form>
    </main>
  );
}
