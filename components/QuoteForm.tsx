"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { VEHICLE_IDS } from "@/lib/data";
import { whatsappHref, PHONE_NUMBER_DISPLAY } from "@/lib/contact";

type Status = "idle" | "sending" | "success" | "error";

const FIELD =
  "w-full rounded-lg border border-white/12 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-100 outline-none transition-all duration-300 placeholder:text-neutral-600 focus:border-gold/70 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)]";

const LABEL = "mb-2 block text-[11px] uppercase tracking-[0.18em] text-neutral-500";

export default function QuoteForm({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("quote");
  const tVehicles = useTranslations("vehicles");
  const tBooking = useTranslations("booking");

  const [tripType, setTripType] = useState<"oneway" | "return">("oneway");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const fd = new FormData(form);
    const vehicleId = String(fd.get("vehicle") ?? "");

    const payload = {
      tripType: tripType === "oneway" ? t("oneWay") : t("roundTrip"),
      pickup: String(fd.get("pickup") ?? ""),
      dropoff: String(fd.get("dropoff") ?? ""),
      date: String(fd.get("date") ?? ""),
      time: String(fd.get("time") ?? ""),
      returnDate: String(fd.get("returnDate") ?? ""),
      returnTime: String(fd.get("returnTime") ?? ""),
      passengers: String(fd.get("passengers") ?? ""),
      luggage: String(fd.get("luggage") ?? ""),
      vehicle: vehicleId
        ? tVehicles(`${vehicleId}.name`)
        : t("noPreference"),
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      notes: String(fd.get("notes") ?? ""),
    };

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("send_failed");
      setStatus("success");
      form.reset();
      setTripType("oneway");
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="neon-border relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/70 to-neutral-950/90 p-6 backdrop-blur-sm sm:p-9"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

      <p className="relative mb-7 text-sm text-neutral-400">{t("intro")}</p>

      {/* Type de trajet */}
      <div className="relative mb-7 grid gap-3 sm:grid-cols-2">
        {(["oneway", "return"] as const).map((type) => {
          const selected = tripType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => setTripType(type)}
              className={`rounded-xl border p-4 text-left transition-all duration-300 ${
                selected
                  ? "border-gold/70 bg-gold/10 shadow-[0_0_30px_-10px_rgba(212,175,55,0.6)]"
                  : "border-white/10 bg-neutral-950/60 hover:border-white/25"
              }`}
            >
              <span
                className={`block text-sm font-medium ${
                  selected ? "text-gold-light" : "text-neutral-200"
                }`}
              >
                {type === "oneway" ? t("oneWay") : t("roundTrip")}
              </span>
              <span className="mt-1 block text-xs text-neutral-500">
                {type === "oneway" ? t("oneWayHint") : t("roundTripHint")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Trajet */}
      <div className="relative grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="pickup">
            {t("pickupLocation")}
          </label>
          <input
            id="pickup"
            name="pickup"
            required
            placeholder={t("pickupPlaceholder")}
            className={FIELD}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="dropoff">
            {t("dropoffLocation")}
          </label>
          <input
            id="dropoff"
            name="dropoff"
            required
            placeholder={t("dropoffPlaceholder")}
            className={FIELD}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="date">
            {t("pickupDate")}
          </label>
          <input id="date" name="date" type="date" required className={FIELD} />
        </div>
        <div>
          <label className={LABEL} htmlFor="time">
            {t("pickupTime")}
          </label>
          <input id="time" name="time" type="time" required className={FIELD} />
        </div>

        {/* Champs retour, affichés seulement en aller-retour */}
        {tripType === "return" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className={LABEL} htmlFor="returnDate">
                {t("returnDate")}
              </label>
              <input
                id="returnDate"
                name="returnDate"
                type="date"
                className={FIELD}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <label className={LABEL} htmlFor="returnTime">
                {t("returnTime")}
              </label>
              <input
                id="returnTime"
                name="returnTime"
                type="time"
                className={FIELD}
              />
            </motion.div>
          </>
        )}

        <div>
          <label className={LABEL} htmlFor="passengers">
            {t("passengers")}
          </label>
          <input
            id="passengers"
            name="passengers"
            type="number"
            min={1}
            max={7}
            defaultValue={2}
            className={FIELD}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="luggage">
            {t("luggage")}
          </label>
          <input
            id="luggage"
            name="luggage"
            type="number"
            min={0}
            max={8}
            defaultValue={2}
            className={FIELD}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="vehicle">
            {t("preferredVehicle")}
          </label>
          <select id="vehicle" name="vehicle" className={FIELD}>
            <option value="">{t("noPreference")}</option>
            {VEHICLE_IDS.map((id) => (
              <option key={id} value={id}>
                {tVehicles(`${id}.name`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="name">
            {t("fullName")}
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder={t("namePlaceholder")}
            className={FIELD}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="email">
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="name@email.com"
            className={FIELD}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="phone">
            {t("phone")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="+41 79 000 00 00"
            className={FIELD}
          />
        </div>

        {!compact && (
          <div className="sm:col-span-2">
            <label className={LABEL} htmlFor="notes">
              {t("specialRequests")}
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder={t("notesPlaceholder")}
              className={`${FIELD} resize-y`}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="relative mt-8 w-full overflow-hidden rounded-full bg-gradient-to-r from-gold-deep via-gold-soft to-gold-deep bg-[length:200%_auto] py-4 text-sm font-medium tracking-wide text-neutral-950 transition-all duration-500 hover:bg-[position:right_center] hover:shadow-[0_0_40px_-8px_rgba(212,175,55,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>

      {status === "success" && (
        <p className="relative mt-5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-center text-sm text-emerald-400">
          {t("success")}
        </p>
      )}

      {status === "error" && (
        <p className="relative mt-5 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-400">
          {t("errorText")}{" "}
          <a
            href={whatsappHref(tBooking("whatsappMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            WhatsApp
          </a>{" "}
          {t("errorOr")} {PHONE_NUMBER_DISPLAY}.
        </p>
      )}

      {status === "idle" && (
        <p className="relative mt-4 text-center text-xs text-neutral-600">
          {t("noPayment")}
        </p>
      )}
    </motion.form>
  );
}
