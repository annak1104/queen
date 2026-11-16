"use client";

import type { MouseEvent } from "react";
import { Camera, MapPin, Music2 } from "lucide-react";

const iconMap = {
  instagram: Camera,
  mapPin: MapPin,
  tiktok: Music2,
} as const;

type ContactButtonProps = {
  href: string;
  icon: keyof typeof iconMap;
  label: string;
  description: string;
  tone?: "burgundy" | "ivory";
  useInAppBrowserFallback?: boolean;
};

export function ContactButton({
  href,
  icon,
  label,
  description,
  tone = "ivory",
  useInAppBrowserFallback = false,
}: ContactButtonProps) {
  const Icon = iconMap[icon];

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!useInAppBrowserFallback) return;
    event.preventDefault();
    const popup = window.open("", "_blank");
    if (popup) {
      popup.opener = null;
      popup.location.href = href;
    } else {
      window.location.href = href;
    }
  }

  return (
    <a
      aria-label={`${label}. ${description}`}
      className={`contact-button ${tone === "burgundy" ? "contact-button--burgundy" : ""}`}
      href={href}
      onClick={useInAppBrowserFallback ? handleClick : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      target={href.startsWith("http") ? "_blank" : undefined}
    >
      <span className="contact-button__icon" aria-hidden="true">
        <Icon size={20} strokeWidth={1.8} />
      </span>
      <span className="contact-button__copy">
        <span className="contact-button__label">{label}</span>
        <span className="contact-button__description">{description}</span>
      </span>
      <span aria-hidden="true" className="contact-button__arrow">↗</span>
    </a>
  );
}
