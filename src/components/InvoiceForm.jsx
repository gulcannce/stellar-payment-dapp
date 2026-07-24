import { useState } from "react";

export function InvoiceForm({ disabled, submitting, onCreate }) {
  const [payer, setPayer] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!payer || !amount || !dueDate) return;
    const dueDateUnix = Math.floor(new Date(dueDate).getTime() / 1000);
    try {
      await onCreate(payer, amount, dueDateUnix, memo);
      setPayer("");
      setAmount("");
      setDueDate("");
      setMemo("");
    } catch {
      // Hata zaten StatusBanner üzerinden gösteriliyor.
    }
  };

  return (
    <form className="invoice-form" onSubmit={handleSubmit}>
      <label>
        Ödeyecek Kişinin Adresi
        <input
          type="text"
          placeholder="G..."
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
          required
          disabled={disabled}
        />
      </label>
      <label>
        Tutar (XLM)
        <input
          type="number"
          step="0.0000001"
          min="0.0000001"
          placeholder="100"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          disabled={disabled}
        />
      </label>
      <label>
        Son Ödeme Tarihi
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          disabled={disabled}
        />
      </label>
      <label>
        Açıklama (opsiyonel)
        <input
          type="text"
          placeholder="Web sitesi tasarımı"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          disabled={disabled}
        />
      </label>
      <button className="btn primary" type="submit" disabled={disabled || submitting}>
        {submitting ? "Fatura oluşturuluyor..." : "🧾 Fatura Oluştur"}
      </button>
    </form>
  );
}
