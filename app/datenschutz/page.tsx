"use client";
import { SubpageLayout } from "@/components/SubpageLayout";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const px = "clamp(22px, 5vw, 90px)";
const sectionPad = "clamp(80px, 11vh, 140px)";

export default function DatenschutzPage() {
  const { lang } = useLanguage();
  const t = translations[lang].datenschutz;

  const bodyStyle: React.CSSProperties = {
    color: "var(--muted)",
    fontWeight: 300,
    lineHeight: 1.7,
    fontSize: 15,
    maxWidth: "66ch",
    marginBottom: 0,
  };

  const h2Style: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    textTransform: "uppercase",
    fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)",
    letterSpacing: "0.01em",
    color: "var(--ink)",
    marginBottom: 12,
    marginTop: 40,
  };

  return (
    <SubpageLayout>
      <section style={{ padding: `${sectionPad} ${px}` }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 20,
          }}
        >
          / {t.h1}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            textTransform: "uppercase",
            fontSize: "clamp(3rem, 7vw, 7rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
            marginBottom: 48,
          }}
        >
          {t.h1}
        </h1>

        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 36, maxWidth: 760 }}>
          <h2 style={h2Style}>1. Datenschutz auf einen Blick</h2>
          <h3 style={{ ...h2Style, fontSize: "clamp(1rem, 1.3vw, 1.2rem)", marginTop: 24 }}>Allgemeine Hinweise</h3>
          <p style={bodyStyle}>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
          </p>

          <h3 style={{ ...h2Style, fontSize: "clamp(1rem, 1.3vw, 1.2rem)", marginTop: 24 }}>Datenerfassung auf dieser Website</h3>
          <p style={bodyStyle}>
            <strong style={{ color: "var(--ink)" }}>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </p>
          <p style={{ ...bodyStyle, marginTop: 16 }}>
            <strong style={{ color: "var(--ink)" }}>Wie erfassen wir Ihre Daten?</strong><br />
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
          </p>
          <p style={{ ...bodyStyle, marginTop: 16 }}>
            <strong style={{ color: "var(--ink)" }}>Wofür nutzen wir Ihre Daten?</strong><br />
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Daten, die Sie über das Kontaktformular übermitteln, werden ausschließlich zur Bearbeitung Ihrer Anfrage genutzt.
          </p>
          <p style={{ ...bodyStyle, marginTop: 16 }}>
            <strong style={{ color: "var(--ink)" }}>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          </p>

          <h2 style={h2Style}>2. Hosting</h2>
          <p style={bodyStyle}>
            Diese Website wird bei Vercel Inc., 340 Pine Street Suite 701, San Francisco, California 94104, USA gehostet. Vercel ist ein Dienst, auf dem wir unsere Website betreiben. Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adressen. Details entnehmen Sie der Datenschutzerklärung von Vercel: <span style={{ color: "var(--accent)" }}>https://vercel.com/legal/privacy-policy</span>.
          </p>
          <p style={{ ...bodyStyle, marginTop: 16 }}>
            Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG.
          </p>

          <h2 style={h2Style}>3. Allgemeine Hinweise und Pflichtinformationen</h2>
          <h3 style={{ ...h2Style, fontSize: "clamp(1rem, 1.3vw, 1.2rem)", marginTop: 24 }}>Datenschutz</h3>
          <p style={bodyStyle}>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können.
          </p>

          <h3 style={{ ...h2Style, fontSize: "clamp(1rem, 1.3vw, 1.2rem)", marginTop: 24 }}>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
          <p style={bodyStyle}>
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
          </p>

          <h3 style={{ ...h2Style, fontSize: "clamp(1rem, 1.3vw, 1.2rem)", marginTop: 24 }}>Recht auf Datenübertragbarkeit</h3>
          <p style={bodyStyle}>
            Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
          </p>

          <h3 style={{ ...h2Style, fontSize: "clamp(1rem, 1.3vw, 1.2rem)", marginTop: 24 }}>Recht auf Auskunft, Berichtigung und Löschung</h3>
          <p style={bodyStyle}>
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
          </p>

          <h2 style={h2Style}>4. Datenerfassung auf dieser Website</h2>
          <h3 style={{ ...h2Style, fontSize: "clamp(1rem, 1.3vw, 1.2rem)", marginTop: 24 }}>Kontaktformular</h3>
          <p style={bodyStyle}>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Das Kontaktformular wird über den Dienst Formspree (Formspree, Inc., 2261 Market Street #4756, San Francisco, CA 94114, USA) verarbeitet. Details entnehmen Sie der Datenschutzerklärung von Formspree: <span style={{ color: "var(--accent)" }}>https://formspree.io/legal/privacy-policy</span>.
          </p>
          <p style={{ ...bodyStyle, marginTop: 16 }}>
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
          </p>
          <p style={{ ...bodyStyle, marginTop: 16 }}>
            Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen — insbesondere Aufbewahrungsfristen — bleiben unberührt.
          </p>

          <h2 style={h2Style}>5. Google Maps</h2>
          <p style={bodyStyle}>
            Diese Website bindet auf der Kontaktseite Google Maps ein (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Die Einbettung erfolgt ausschließlich nach Ihrer ausdrücklichen Einwilligung über unseren Cookie-Banner (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG). Vor Erteilung der Einwilligung wird kein Inhalt von Google geladen.
          </p>
          <p style={{ ...bodyStyle, marginTop: 16 }}>
            Beim Laden der Karte können Daten (u.a. Ihre IP-Adresse) an Server von Google in den USA übertragen werden. Google LLC hat sich den EU-US Data Privacy Framework Prinzipien unterworfen. Weitere Informationen zum Datenschutz bei Google finden Sie unter: <span style={{ color: "var(--accent)" }}>https://policies.google.com/privacy</span>
          </p>

          <h2 style={h2Style}>6. Cookies und Einwilligungsspeicherung</h2>
          <p style={bodyStyle}>
            Diese Website verwendet keine Tracking- oder Analyse-Cookies. Ihre Einwilligung zur Einbettung von Google Maps wird ausschließlich lokal in Ihrem Browser (localStorage-Eintrag <span style={{ color: "var(--ink)", fontFamily: "var(--font-mono)", fontSize: 13 }}>&quot;cadagalaxy-consent&quot;</span>) gespeichert — kein serverseitiges Tracking. Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie die Browser-Daten (Websitedaten/localStorage) löschen.
          </p>
        </div>
      </section>
    </SubpageLayout>
  );
}
