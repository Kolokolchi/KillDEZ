"use client";

import { useEffect, useState } from "react";

const storageKey = "sanitex_leads";
const statuses = {
  new: "🟡 Новая",
  in_progress: "🔵 В работе",
  done: "🟢 Завершена",
  rejected: "🔴 Отклонена",
};

function LeadRow({ lead, updateStatus, deleteLead }) {
  const phone = (lead.phone || "").replace(/\D/g, "");
  const date = lead.createdAt || lead.received_at;
  return (
    <tr>
      <td
        style={{ whiteSpace: "nowrap", fontSize: "12px", color: "var(--mute)" }}
      >
        {date ? new Date(date).toLocaleString("ru-RU") : "-"}
      </td>
      <td style={{ fontWeight: 700 }}>{lead.name || "-"}</td>
      <td>
        <div className="phone-cell">
          <a
            href={`tel:${lead.phone}`}
            style={{
              color: "var(--ink)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {lead.phone || "-"}
          </a>
          {phone && (
            <a
              href={`https://wa.me/${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-link"
              title="Открыть в WhatsApp"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.35 5L2 22l5.14-1.33A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.05-.44-4.32-1.2l-.31-.18-3.04.79.81-2.96-.2-.32C4.16 14.88 3.7 13.5 3.7 12c0-4.58 3.72-8.3 8.3-8.3 4.58 0 8.3 3.72 8.3 8.3 0 4.58-3.72 8.3-8.3 8.3z" />
              </svg>
            </a>
          )}
        </div>
      </td>
      <td>
        <strong style={{ color: "var(--green-dark)" }}>
          {lead.service || "-"}
        </strong>
      </td>
      <td>
        {lead.object || "-"}
        {lead.area ? ` (${lead.area} м²)` : ""}
      </td>
      <td>{lead.city || "Алматы"}</td>
      <td
        style={{ maxWidth: "240px", fontSize: "12.5px", color: "var(--mute)" }}
      >
        {lead.comment || "-"}
      </td>
      <td>
        <select
          className="status-select"
          aria-label={`Статус заявки ${lead.name || ""}`}
          value={lead.status || "new"}
          onChange={(event) => updateStatus(lead.id, event.target.value)}
        >
          {Object.entries(statuses).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </td>
      <td>
        <button
          onClick={() => deleteLead(lead.id)}
          style={{
            background: "none",
            border: "none",
            color: "var(--danger)",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "12px",
          }}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
}

export default function AdminPanel() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      let items = [];
      try {
        const response = await fetch("/api/leads", {
          signal: controller.signal,
        });
        if (response.ok) items = await response.json();
      } catch {
        /* Preserve the existing local fallback. */
      }
      if (!Array.isArray(items) || !items.length) {
        try {
          items = JSON.parse(localStorage.getItem(storageKey) || "[]");
        } catch {
          items = [];
        }
      }
      if (!controller.signal.aborted)
        setLeads(Array.isArray(items) ? items : []);
    }
    load();
    return () => controller.abort();
  }, []);

  function save(items) {
    setLeads(items);
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      /* Storage may be disabled. */
    }
  }
  function updateStatus(id, status) {
    save(leads.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
  }
  function deleteLead(id) {
    if (confirm("Удалить эту заявку?"))
      save(leads.filter((lead) => lead.id !== id));
  }
  function clearAllLeads() {
    if (confirm("Вы уверены, что хотите удалить ВСЕ заявки?")) save([]);
  }
  function exportCSV() {
    if (!leads.length) return alert("Нет заявок для экспорта");
    const headers = [
      "ID",
      "Дата",
      "Имя",
      "Телефон",
      "Город",
      "Объект",
      "Услуга",
      "Площадь",
      "Комментарий",
      "Статус",
    ];
    const quote = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const rows = leads.map((lead) =>
      [
        lead.id,
        lead.createdAt || lead.received_at,
        lead.name,
        lead.phone,
        lead.city,
        lead.object,
        lead.service,
        lead.area,
        lead.comment,
        lead.status || "new",
      ]
        .map(quote)
        .join(";"),
    );
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + [headers.join(";"), ...rows].join("\n")], {
        type: "text/csv;charset=utf-8;",
      }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `leads_${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const counts = { total: leads.length, new: 0, in_progress: 0, done: 0 };
  leads.forEach((lead) => {
    const status = lead.status || "new";
    if (status in counts && status !== "total") counts[status]++;
  });
  const search = query.toLowerCase().trim();
  const visible = leads.filter(
    (lead) =>
      (filter === "all" || (lead.status || "new") === filter) &&
      (!search ||
        `${lead.name} ${lead.phone} ${lead.service} ${lead.object} ${lead.city} ${lead.comment}`
          .toLowerCase()
          .includes(search)),
  );

  // The accepted admin markup is below; rows and controls now use React state.
  return (
    <>
      {"\n  "}
      <div className={"container rebrand-admin"}>
        {"\n    "}
        <header>
          {"\n      "}
          <a href={"/"} className={"brand"}>
            {"\n        "}
            <img
              className={"brand-logo"}
              src={"/images/brand/wordmark.webp"}
              alt={"KILL DEZ"}
              width={"2056"}
              height={"765"}
            />
            {"\n        "}
            <div>
              {"\n          "}
              <h1>
                <span className={"badge-admin"}>{"Панель заявок"}</span>
              </h1>
              {"\n\n        "}
            </div>
            {"\n      "}
          </a>
          {"\n      "}
          <div className={"header-actions"}>
            {"\n        "}
            <a href={"/"} className={"btn"}>
              {"\n          "}
              <svg
                width={"16"}
                height={"16"}
                viewBox={"0 0 24 24"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"2"}
              >
                <path d={"M19 12H5M12 19l-7-7 7-7"}></path>
              </svg>
              {"\n          На сайт\n        "}
            </a>
            {"\n        "}
            <button className={"btn btn-green"} onClick={exportCSV}>
              {"\n          "}
              <svg
                width={"16"}
                height={"16"}
                viewBox={"0 0 24 24"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"2"}
              >
                <path
                  d={
                    "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                  }
                ></path>
              </svg>
              {"\n          Экспорт CSV\n        "}
            </button>
            {"\n        "}
            <button className={"btn btn-danger"} onClick={clearAllLeads}>
              {"Очистить базу"}
            </button>
            {"\n      "}
          </div>
          {"\n    "}
        </header>
        {"\n\n    "}
        <div className={"stats-grid"}>
          {"\n      "}
          <div className={"stat-card"}>
            {"\n        "}
            <div className={"stat-title"}>{"Всего заявок"}</div>
            {"\n        "}
            <div className={"stat-val"} id={"statTotal"}>
              {counts.total}
            </div>
            {"\n      "}
          </div>
          {"\n      "}
          <div className={"stat-card"}>
            {"\n        "}
            <div className={"stat-title"}>{"Новые заявки"}</div>
            {"\n        "}
            <div
              className={"stat-val"}
              style={{ color: "var(--warning)" }}
              id={"statNew"}
            >
              {counts.new}
            </div>
            {"\n      "}
          </div>
          {"\n      "}
          <div className={"stat-card"}>
            {"\n        "}
            <div className={"stat-title"}>{"В работе"}</div>
            {"\n        "}
            <div
              className={"stat-val"}
              style={{ color: "#0284c7" }}
              id={"statProgress"}
            >
              {counts.in_progress}
            </div>
            {"\n      "}
          </div>
          {"\n      "}
          <div className={"stat-card"}>
            {"\n        "}
            <div className={"stat-title"}>{"Завершенные"}</div>
            {"\n        "}
            <div
              className={"stat-val"}
              style={{ color: "var(--green)" }}
              id={"statDone"}
            >
              {counts.done}
            </div>
            {"\n      "}
          </div>
          {"\n    "}
        </div>
        {"\n\n    "}
        <div className={"filter-bar"}>
          {"\n      "}
          <div className={"search-box"}>
            {"\n        "}
            <input
              type={"text"}
              id={"searchInput"}
              placeholder={"Поиск по имени, телефону, услуге..."}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {"\n      "}
          </div>
          {"\n      "}
          <div className={"status-filters"}>
            {"\n        "}
            <button
              className={filter === "all" ? "filter-btn active" : "filter-btn"}
              data-filter={"all"}
              onClick={() => setFilter("all")}
            >
              {"Все"}
            </button>
            {"\n        "}
            <button
              className={filter === "new" ? "filter-btn active" : "filter-btn"}
              data-filter={"new"}
              onClick={() => setFilter("new")}
            >
              {"Новые"}
            </button>
            {"\n        "}
            <button
              className={
                filter === "in_progress" ? "filter-btn active" : "filter-btn"
              }
              data-filter={"in_progress"}
              onClick={() => setFilter("in_progress")}
            >
              {"В работе"}
            </button>
            {"\n        "}
            <button
              className={filter === "done" ? "filter-btn active" : "filter-btn"}
              data-filter={"done"}
              onClick={() => setFilter("done")}
            >
              {"Завершенные"}
            </button>
            {"\n      "}
          </div>
          {"\n    "}
        </div>
        {"\n\n    "}
        <div className={"table-card"}>
          {"\n      "}
          <div className={"table-wrap"}>
            {"\n        "}
            <table>
              {"\n          "}
              <thead>
                {"\n            "}
                <tr>
                  {"\n              "}
                  <th>{"Дата / Время"}</th>
                  {"\n              "}
                  <th>{"Имя клиента"}</th>
                  {"\n              "}
                  <th>{"Телефон"}</th>
                  {"\n              "}
                  <th>{"Услуга"}</th>
                  {"\n              "}
                  <th>{"Объект / Площадь"}</th>
                  {"\n              "}
                  <th>{"Город"}</th>
                  {"\n              "}
                  <th>{"Комментарий"}</th>
                  {"\n              "}
                  <th>{"Статус"}</th>
                  {"\n              "}
                  <th>{"Действие"}</th>
                  {"\n            "}
                </tr>
                {"\n          "}
              </thead>
              {"\n          "}
              <tbody id={"leadsTableBody"}>
                {visible.map((lead) => (
                  <LeadRow
                    key={lead.id}
                    lead={lead}
                    updateStatus={updateStatus}
                    deleteLead={deleteLead}
                  />
                ))}
              </tbody>
              {"\n        "}
            </table>
            {"\n      "}
          </div>
          {"\n      "}
          <div
            id={"emptyState"}
            className={"empty-state"}
            style={{ display: visible.length ? "none" : "block" }}
          >
            {"\n        "}
            <svg viewBox={"0 0 24 24"} fill={"none"} strokeWidth={"1.5"}>
              <rect x={"3"} y={"4"} width={"18"} height={"16"} rx={"2"}></rect>
              <path d={"M7 8h10M7 12h10M7 16h6"}></path>
            </svg>
            {"\n        "}
            <p>
              {
                "Заявок пока нет. Отправьте тестовую заявку через форму на сайте!"
              }
            </p>
            {"\n      "}
          </div>
          {"\n    "}
        </div>
        {"\n  "}
      </div>
      {"\n\n  "}
      {"\n"}
    </>
  );
}
