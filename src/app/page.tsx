import { MapPin, Sparkles, Volume2 } from "lucide-react";
import { ContactButton } from "@/components/ContactButton";
import { CrownMark } from "@/components/CrownMark";
import { PhoneContacts } from "@/components/PhoneContacts";
import { store } from "@/config/store";

export default function Home() {
  const { links } = store;
  const hasSocials = Boolean(links.instagram || links.tiktok);

  return (
    <main className="page-shell">
      <div aria-hidden="true" className="ambient ambient--top" />
      <div aria-hidden="true" className="ambient ambient--bottom" />

      <section className="profile-card" aria-labelledby="brand-name">
        <div className="profile-card__topline">
          <span className="profile-card__season">{store.eyebrow}</span>
          <span className="profile-card__mark" aria-hidden="true">
            <Sparkles size={13} strokeWidth={1.6} />
            <span>ОБРАНЕ QUEEN</span>
          </span>
        </div>

        <div className="brand-lockup">
          <div className="brand-lockup__crown" aria-hidden="true">
            <CrownMark className="h-16 w-16" />
          </div>
          <p className="brand-lockup__eyebrow">{store.eyebrow}</p>
          <h1 className="brand-lockup__name" id="brand-name">{store.name}</h1>
          <p className="brand-lockup__subtitle">{store.subtitle}</p>
        </div>

        <div className="profile-card__divider" aria-hidden="true">
          <span />
          <CrownMark className="h-7 w-7" />
          <span />
        </div>

        <p className="profile-card__welcome">{store.welcome}</p>
        <p className="profile-card__categories">{store.description}</p>

        <section aria-labelledby="location-title" className="location-card">
          <div className="location-card__body">
            <span aria-hidden="true" className="location-card__icon">
              <MapPin size={18} strokeWidth={1.8} />
            </span>
            <div>
              <p className="location-card__eyebrow">Ми у Луцьку</p>
              <h2 id="location-title">{store.address}</h2>
            </div>
          </div>
          <ContactButton
            description="Відкрити Google Maps"
            href={store.mapsUrl}
            icon="mapPin"
            label="Як нас знайти"
          />
        </section>

        <div className="link-stack" aria-label="Посилання та контакти">
          {links.instagram ? (
            <ContactButton
              description="Нова колекція та натхнення"
              href={links.instagram}
              icon="instagram"
              label="Instagram"
              tone="burgundy"
            />
          ) : null}

          {links.tiktok ? (
            <ContactButton
              description="Дивіться нас у TikTok"
              href={links.tiktok}
              icon="tiktok"
              label="TikTok"
              useInAppBrowserFallback
            />
          ) : null}

          <PhoneContacts phones={store.phones} />
        </div>

        {!hasSocials && !store.phones.length ? (
          <div className="quiet-contact" role="note">
            <Volume2 aria-hidden="true" size={17} strokeWidth={1.6} />
            <span>Будемо раді познайомитися з вами</span>
          </div>
        ) : null}

        <footer className="profile-card__footer">
          <span>З любов’ю, QUEEN</span>
          <span aria-hidden="true">✦</span>
        </footer>
      </section>
    </main>
  );
}
