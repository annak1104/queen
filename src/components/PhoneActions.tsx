"use client";

import { Check, Copy, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type PhoneNumber = {
  number: string;
  display: string;
};

type PhoneActionsProps = {
  phones: readonly PhoneNumber[];
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

export function PhoneActions({ phones }: PhoneActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copyState, setCopyState] = useState<Record<string, CopyState>>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  function closePanel() {
    setIsOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        window.setTimeout(() => triggerRef.current?.focus(), 0);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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
    <>
      <button
        aria-controls="queen-phone-panel"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="call-trigger"
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
        type="button"
      >
        <span className="call-trigger__icon" aria-hidden="true">
          <Phone size={19} strokeWidth={1.8} />
        </span>
        <span className="call-trigger__copy">
          <span className="call-trigger__label">Зателефонувати</span>
          <span className="call-trigger__description">Оберіть зручний номер</span>
        </span>
        <span aria-hidden="true" className="contact-button__arrow">↗</span>
      </button>

      {isOpen ? (
        <div className="phone-panel__backdrop" onMouseDown={(event) => event.target === event.currentTarget && closePanel()}>
          <section
            aria-labelledby="queen-phone-panel-title"
            aria-modal="true"
            className="phone-panel"
            id="queen-phone-panel"
            role="dialog"
          >
            <div className="phone-panel__header">
              <div>
                <p className="phone-panel__eyebrow">Зв’язатися з QUEEN</p>
                <h2 id="queen-phone-panel-title">Оберіть номер</h2>
              </div>
              <button aria-label="Закрити список номерів" className="phone-panel__close" onClick={closePanel} ref={closeButtonRef} type="button">
                <X aria-hidden="true" size={20} />
              </button>
            </div>

            <p className="phone-panel__intro">Ми з радістю відповімо на ваші запитання.</p>

            <div className="phone-panel__list">
              {phones.map(({ number, display }) => {
                const status = copyState[number];
                return (
                  <div className="phone-row" key={number}>
                    <div className="phone-row__number">
                      <span className="phone-row__eyebrow">Телефон</span>
                      <span>{display}</span>
                    </div>
                    <div className="phone-row__actions">
                      <a aria-label={`Зателефонувати на номер ${display}`} className="phone-row__call" href={`tel:${number}`}>
                        <Phone aria-hidden="true" size={17} />
                        <span>Дзвонити</span>
                      </a>
                      <button aria-label={`Скопіювати номер ${display}`} className="phone-row__copy" onClick={() => copyPhone(number)} type="button">
                        {status === "success" ? <Check aria-hidden="true" size={17} /> : <Copy aria-hidden="true" size={17} />}
                        <span>{status === "success" ? "Готово" : "Копіювати"}</span>
                      </button>
                    </div>
                    {status ? (
                      <p aria-live="polite" className={`phone-row__status phone-row__status--${status}`}>
                        {status === "success" ? "Номер скопійовано" : "Не вдалося скопіювати. Спробуйте виділити номер вручну."}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
