'use client';

import { useState, type FormEventHandler } from 'react';

type ContactFormProps = {
  endpoint?: string | null;
};

export default function ContactForm({ endpoint }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus('submitting');
    try {
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          body: formData,
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      setStatus('success');
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 p-8 shadow-sm">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-700">
          Họ và tên
          <input
            name="name"
            required
            className="rounded-xl border border-slate-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-700">
          Email
          <input
            type="email"
            name="email"
            required
            className="rounded-xl border border-slate-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-700">
          Số điện thoại
          <input
            type="tel"
            name="phone"
            className="rounded-xl border border-slate-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-700">
          Thời gian mong muốn tham quan
          <input
            type="date"
            name="visitDate"
            className="rounded-xl border border-slate-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm text-slate-700">
        Lời nhắn
        <textarea
          name="message"
          rows={4}
          className="rounded-xl border border-slate-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </label>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Đang gửi...' : 'Đăng ký tham quan'}
      </button>
      {status === 'success' && (
        <p className="text-sm text-green-600">Cảm ơn bạn! Chúng tôi sẽ liên hệ trong thời gian sớm nhất.</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600">Có lỗi xảy ra. Vui lòng thử lại sau.</p>
      )}
    </form>
  );
}
