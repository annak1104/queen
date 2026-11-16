"use client";

import { Check, Copy, Phone } from "lucide-react";
import { useState } from "react";
import type { StorePhone } from "@/config/store";

type PhoneContactsProps = {
  phones: readonly StorePhone[];
};

type CopyState = "success" | "error";

function fallbackCopy(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  textArea.setSelectionRange(0, textArea.value.length);
  const copied = document.execCommand("copy");
  document.body.removeChild(textArea);

  if (!copied) throw new Error("Copy command was not available");
}

export function PhoneContacts({ phones }: PhoneContactsProps) {
  const [copyState, setCopyState] = useState<Record<string, CopyState>>({});

  if (!phones.length) return null;

  async function copyPhone(phone: string) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(phone);
      } else {
        fallbackCopy(phone);
      }
      setCopyState((current) => ({ ...current, [phone]: "success" }));
      window.setTimeout(() => {
        setCopyState((current) => {
          const next = { ...current };
          delete next[phone];
          return next;
        });
      }, 2400);
    } catch {
      setCopyState((current) => ({ ...current, [phone]: "error" }));
    }
  }

  return (
    <section aria-labelledby="phone-contacts-title" className="phone-contacts">
      <div className="phone-contacts__heading">
        <p className="phone-contacts__eyebrow">Зв’язок з QUEEN</p>
        <h2 id="phone-contacts-title">Будемо раді вам</h2>
        <p className="phone-contacts__intro">
          Зателефонуйте або скопіюйте номер, щоб зберегти його у контактах.
        </p>
      </div>

      <div className="phone-contacts__list">
        {phones.map((phone) => {
          const status = copyState[phone.number];

          return (
            <article className="phone-row" key={phone.number}>
              <div className="phone-row__number">
                <span className="phone-row__eyebrow">Телефон магазину</span>
                <a href={`tel:${phone.number}`}>{phone.display}</a>
              </div>

              <div className="phone-row__actions" aria-label={`Дії для номера ${phone.display}`}>
                <a
                  aria-label={`Зателефонувати на номер ${phone.display}`}
                  className="phone-action phone-action--call"
                  href={`tel:${phone.number}`}
                >
                  <Phone aria-hidden="true" size={16} />
                  <span>Зателефонувати</span>
                </a>

                <button
                  aria-label={`Скопіювати номер ${phone.display}`}
                  className="phone-action phone-action--copy"
                  onClick={() => copyPhone(phone.number)}
                  type="button"
                >
                  {status === "success" ? (
                    <Check aria-hidden="true" size={16} />
                  ) : (
                    <Copy aria-hidden="true" size={16} />
                  )}
                  <span>{status === "success" ? "Скопійовано" : "Копіювати"}</span>
                </button>
              </div>

              {status ? (
                <p aria-live="polite" className={`phone-row__status phone-row__status--${status}`}>
                  {status === "success"
                    ? "Номер скопійовано"
                    : "Не вдалося скопіювати. Спробуйте виділити номер вручну."}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
