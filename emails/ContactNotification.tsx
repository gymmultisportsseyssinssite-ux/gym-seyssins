import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

import { SUJET_LABEL } from '@/lib/contact-schema'

type Props = {
  prenom: string
  nom: string
  email: string
  telephone?: string
  sujet: keyof typeof SUJET_LABEL
  message: string
  siteName: string
}

export function ContactNotification({
  prenom,
  nom,
  email,
  telephone,
  sujet,
  message,
  siteName,
}: Props) {
  const sujetLabel = SUJET_LABEL[sujet]
  const fullName = `${prenom} ${nom}`.trim()

  return (
    <Html lang="fr">
      <Head />
      <Preview>
        Nouveau message de {fullName} — {sujetLabel}
      </Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Text style={brandStyle}>{siteName}</Text>
            <Text style={subtitleStyle}>Nouveau message via le formulaire de contact</Text>
          </Section>

          <Section style={cardStyle}>
            <Heading as="h1" style={titleStyle}>
              {sujetLabel}
            </Heading>
            <Text style={metaStyle}>
              De <strong>{fullName}</strong>
            </Text>

            <Hr style={hrStyle} />

            <table cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
              <tbody>
                <Row label="Prénom" value={prenom} />
                <Row label="Nom" value={nom} />
                <Row label="Email" value={email} link={`mailto:${email}`} />
                {telephone ? (
                  <Row
                    label="Téléphone"
                    value={telephone}
                    link={`tel:${telephone.replace(/\s+/g, '')}`}
                  />
                ) : null}
                <Row label="Sujet" value={sujetLabel} />
              </tbody>
            </table>

            <Hr style={hrStyle} />

            <Text style={messageLabelStyle}>Message</Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>

          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              Email envoyé automatiquement depuis le formulaire de contact du site {siteName}.
            </Text>
            <Text style={footerTextStyle}>
              Pour répondre directement à l’expéditeur, utilisez l’option « Répondre » de votre
              messagerie ({email}).
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

function Row({ label, value, link }: { label: string; value: string; link?: string }) {
  return (
    <tr>
      <td style={rowLabelStyle}>{label}</td>
      <td style={rowValueStyle}>
        {link ? (
          <a href={link} style={linkStyle}>
            {value}
          </a>
        ) : (
          value
        )}
      </td>
    </tr>
  )
}

const bodyStyle: React.CSSProperties = {
  margin: 0,
  padding: '32px 0',
  backgroundColor: '#fafaf7',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  color: '#0f1419',
}

const containerStyle: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '0 16px',
}

const headerStyle: React.CSSProperties = {
  padding: '0 8px 16px',
}

const brandStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#1e5ba8',
}

const subtitleStyle: React.CSSProperties = {
  margin: '4px 0 0',
  fontSize: '13px',
  color: '#4a5568',
}

const cardStyle: React.CSSProperties = {
  padding: '32px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e2e7ee',
}

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '22px',
  fontWeight: 600,
  color: '#0f1419',
}

const metaStyle: React.CSSProperties = {
  margin: '4px 0 0',
  fontSize: '14px',
  color: '#4a5568',
}

const hrStyle: React.CSSProperties = {
  borderColor: '#e2e7ee',
  margin: '24px 0',
}

const rowLabelStyle: React.CSSProperties = {
  padding: '6px 12px 6px 0',
  fontSize: '13px',
  color: '#4a5568',
  width: '120px',
  verticalAlign: 'top',
}

const rowValueStyle: React.CSSProperties = {
  padding: '6px 0',
  fontSize: '14px',
  color: '#0f1419',
}

const linkStyle: React.CSSProperties = {
  color: '#1e5ba8',
  textDecoration: 'underline',
}

const messageLabelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '13px',
  fontWeight: 600,
  color: '#4a5568',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
}

const messageStyle: React.CSSProperties = {
  margin: '8px 0 0',
  padding: '16px',
  backgroundColor: '#f7f9fc',
  borderRadius: '8px',
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#0f1419',
  whiteSpace: 'pre-wrap',
}

const footerStyle: React.CSSProperties = {
  padding: '24px 8px 0',
}

const footerTextStyle: React.CSSProperties = {
  margin: '4px 0',
  fontSize: '12px',
  color: '#6b7280',
}

export default ContactNotification
