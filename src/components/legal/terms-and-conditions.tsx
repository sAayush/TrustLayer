
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
  TypographyList,
} from "@/components/ui/typography"

export function TermsAndConditions() {
  return (
    <div className="container mx-auto py-10 max-w-4xl space-y-8">
      <div className="space-y-4">
        <TypographyH1>Terms and Conditions</TypographyH1>
        <TypographyP>Last updated: December 26, 2025</TypographyP>
        <TypographyP>
          Please read these terms and conditions carefully before using Our Service.
        </TypographyP>
      </div>

      <div className="space-y-4">
        <TypographyH2>Interpretation and Definitions</TypographyH2>
        <TypographyP>
           The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
        </TypographyP>
        
        <TypographyH2>Acknowledgment</TypographyH2>
        <TypographyP>
            These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
        </TypographyP>
        <TypographyP>
             Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
        </TypographyP>
      </div>

      <div className="space-y-4">
         <TypographyH2>Termination</TypographyH2>
         <TypographyP>
            We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
         </TypographyP>
         <TypographyP>
            Upon termination, Your right to use the Service will cease immediately.
         </TypographyP>
      </div>
      
       <div className="space-y-4">
          <TypographyH2>Contact Us</TypographyH2>
          <TypographyP>If you have any questions about these Terms and Conditions, You can contact us:</TypographyP>
          <TypographyList>
              <li>By email: support@trustlayer.com</li>
          </TypographyList>
      </div>
    </div>
  )
}
