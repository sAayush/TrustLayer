import { TypographyH1, TypographyH2, TypographyP, TypographyList } from '@/components/ui/typography'

export function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-10 max-w-4xl space-y-8">
      <div className="space-y-4">
        <TypographyH1>Privacy Policy</TypographyH1>
        <TypographyP>Last updated: December 26, 2025</TypographyP>
        <TypographyP>
          This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your
          information when You use the Service and tells You about Your privacy rights and how the law protects You.
        </TypographyP>
      </div>

      <div className="space-y-4">
        <TypographyH2>Collecting and Using Your Personal Data</TypographyH2>
        <TypographyP>
          We use Your Personal data to provide and improve the Service. By using the Service, You agree to the
          collection and use of information in accordance with this Privacy Policy.
        </TypographyP>

        <TypographyH2>Types of Data Collected</TypographyH2>

        <TypographyH2>Personal Data</TypographyH2>
        <TypographyP>
          While using Our Service, We may ask You to provide Us with certain personally identifiable information that
          can be used to contact or identify You. Personally identifiable information may include, but is not limited
          to:
        </TypographyP>
        <TypographyList>
          <TypographyList>Email address</TypographyList>
          <TypographyList>First name and last name</TypographyList>
          <TypographyList>Usage Data</TypographyList>
        </TypographyList>

        <TypographyH2>Usage Data</TypographyH2>
        <TypographyP>Usage Data is collected automatically when using the Service.</TypographyP>
        <TypographyP>
          Usage Data may include information such as Your Device&apos;s Internet Protocol address (e.g. IP address),
          browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the
          time spent on those pages, unique device identifiers and other diagnostic data.
        </TypographyP>
      </div>

      <div className="space-y-4">
        <TypographyH2>Contact Us</TypographyH2>
        <TypographyP>If you have any questions about this Privacy Policy, You can contact us:</TypographyP>
        <TypographyList>
          <TypographyList>By email: support@trustlayer.com</TypographyList>
        </TypographyList>
      </div>
    </div>
  )
}
