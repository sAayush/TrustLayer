import {
  TypographyH1,
  TypographyH2,
  TypographyP,
  TypographyList,
} from "@/components/ui/typography";

export function Cookies() {
  return (
    <div className="container mx-auto py-10 max-w-4xl space-y-8">
      <div className="space-y-4">
        <TypographyH1>Cookie Policy</TypographyH1>
        <TypographyP>Last updated: December 26, 2025</TypographyP>
        <TypographyP>
          This Cookie Policy explains what cookies are and how we use them. You
          should read this policy so You can understand what type of cookies we
          use, or the information we collect using cookies and how that
          information is used.
        </TypographyP>
      </div>

      <div className="space-y-4">
        <TypographyH2>Interpretation and Definitions</TypographyH2>
        <TypographyP>
          Cookies are small files that are placed on Your computer, mobile
          device or any other device by a website, containing the details of
          Your browsing history on that website among its many uses.
        </TypographyP>
      </div>

      <div className="space-y-4">
        <TypographyH2>The Types of Cookies We Use</TypographyH2>
        <TypographyP>
          Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies
          remain on your personal computer or mobile device when You go offline,
          while Session Cookies are deleted as soon as You close your web
          browser.
        </TypographyP>

        <TypographyH2>Necessary / Essential Cookies</TypographyH2>
        <TypographyP>
          Type: Session Cookies. Administered by: Us. Purpose: These Cookies are
          essential to provide You with services available through the Website
          and to enable You to use some of its features. They help to
          authenticate users and prevent fraudulent use of user accounts.
          Without these Cookies, the services that You have asked for cannot be
          provided, and We only use these Cookies to provide You with those
          services.
        </TypographyP>

        <TypographyH2>Functionality Cookies</TypographyH2>
        <TypographyP>
          Type: Persistent Cookies. Administered by: Us. Purpose: These Cookies
          allow us to remember choices You make when You use the Website, such
          as remembering your login details or language preference. The purpose
          of these Cookies is to provide You with a more personal experience and
          to avoid You having to re-enter your preferences every time You use
          the Website.
        </TypographyP>
      </div>

      <div className="space-y-4">
        <TypographyH2>Contact Us</TypographyH2>
        <TypographyP>
          If you have any questions about this Cookie Policy, You can contact
          us:
        </TypographyP>
        <TypographyList>
          <li>By email: support@trustlayer.com</li>
        </TypographyList>
      </div>
    </div>
  );
}
