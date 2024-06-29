import React from "react";
import { TermsConditionsHero } from "../terms-conditions-hero/terms-conditions-hero";
import { Mail } from "lucide-react";

export default function TermsConditionsPage() {
  return (
    <>
      <TermsConditionsHero />
      <main className="w-full p-2 mt-12">
        <div className="w-full bg-black bg-opacity-40 rounded-md p-8 pl-10 flex flex-col gap-8 mt-4 text-justify">
          {/* Introduction */}
          <div className="grid gap-4">
            <h1 className="text-2xl font-semibold">Introduction</h1>
            <p className="font-normal text-sm text-muted-foreground">
              Welcome to Intellient, an enterprise AI assistant developed by
              Quadra. By accessing or using Intellient, you agree to comply with
              and be bound by the following terms and conditions. Please read
              them carefully.
            </p>
          </div>
          <hr className="border-white" />

          {/* Fair Use */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">1. Fair Use</h1>

            <h2 className="text-base">1.2. Permitted use:</h2>
            <p className="font-normal text-sm text-muted-foreground">
              Intellient is designed for enterprise use to assist with tasks
              such as data analysis, customer service, and decision support.
              Users are permitted to utilize the AI assistant within the scope
              of their professional duties.
            </p>

            <h2 className="text-base">1.3. Prohibited Use:</h2>
            <p className="font-normal text-sm text-muted-foreground">
              Users may not use Intellient for any illegal or unauthorized
              purposes, including but not limited to:
            </p>
            <ul className="pl-8 list-disc list-inside text-sm text-muted-foreground">
              <li>Engaging in fraudulent activities.</li>
              <li>Violating any applicable laws or regulations.</li>
              <li>Distributing harmful or malicious content.</li>
            </ul>

            <h2 className="text-base">1.4. User Responsibilities:</h2>
            <p className="font-normal text-sm text-muted-foreground">
              Users are responsible for ensuring that their use of Intellient is
              ethical and compliant with their organization's policies.
            </p>
          </div>
          <hr className="border-white" />

          {/* Accuracy and Bias */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">2. Accuracy and Bias</h1>

            <h2 className="text-base">2.1. Accuracy:</h2>
            <p className="font-normal text-sm text-muted-foreground">
              While Intellient is built on state-of-the-art LLMs, it may not
              always provide accurate or complete information. Users should
              verify critical information and not rely solely on Intellient for
              decision-making.
            </p>

            <h2 className="text-base ">2.2. Bias:</h2>
            <p className="font-normal text-sm text-muted-foreground">
              Intellient is trained on diverse datasets, but it may still
              reflect inherent biases present in the data. Users should be aware
              of potential biases and make efforts to mitigate their impact in
              their use of the AI assistant.
            </p>

            <h2 className="text-base ">2.3. Feedback Mechanism:</h2>
            <p className="font-normal text-sm text-muted-foreground">
              Users are encouraged to provide feedback on inaccuracies or biases
              encountered while using Intellient to help improve its performance
              and reliability.
            </p>
          </div>
          <hr className="border-white" />

          {/* Usage Policies */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">3. Usage Policies</h1>

            <h2 className="text-base">3.1. Accountability:</h2>
            <p className="font-normal text-sm text-muted-foreground">
              Users are accountable for all activities conducted through their
              access to Intellient. Unauthorized access or sharing of user
              credentials is strictly prohibited.
            </p>

            <h2 className="text-base ">3.2. Data Privacy:</h2>
            <p className="font-normal text-sm text-muted-foreground">
              Quadra is committed to protecting user data. All data processed by
              Intellient is handled in accordance with our Privacy Policy, which
              outlines how data is collected, used, and protected.
            </p>

            <h2 className="text-base ">3.3. Content Guidelines:</h2>
            <p className="font-normal text-sm text-muted-foreground">
              Users must adhere to content guidelines that prohibit the
              generation or dissemination of harmful, offensive, or
              inappropriate content through Intellient.
            </p>
          </div>
          <hr className="border-white" />

          {/* Intellectual Property */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">4. Intellectual Property</h1>

            <h2 className="text-base ">4.1. Ownership:</h2>
            <p className="font-normal text-sm text-muted-foreground">
              All intellectual property rights in Intellient and its underlying
              technology are owned by Quadra. Users are granted a limited,
              non-exclusive license to use Intellient for its intended purposes.
            </p>

            <h2 className="text-base ">4.2. Restrictions:</h2>
            <p className="font-normal text-sm text-muted-foreground">
              Users may not modify, reverse engineer, decompile, or create
              derivative works based on Intellient without express written
              permission from Quadra.
            </p>
          </div>
          <hr className="border-white" />

          {/* Limitation of Liability */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">
              5. Limitation of Liability
            </h1>

            <h2 className="text-base ">5.1. No Warranty:</h2>
            <p className="font-normal text-sm text-muted-foreground">
              Intellient is provided "as is" without any warranties, express or
              implied. Quadra does not warrant that Intellient will be
              uninterrupted, error-free, or free from harmful components.
            </p>

            <h2 className="text-base ">5.2. Liability Limitation:</h2>
            <p className="font-normal text-sm text-muted-foreground">
              Quadra shall not be liable for any direct, indirect, incidental,
              special, or consequential damages arising out of the use or
              inability to use Intellient.
            </p>
          </div>
          <hr className="border-white" />

          {/* Changes to Terms */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">6. Changes to Terms</h1>
            <p className="font-normal text-sm text-muted-foreground">
              Quadra reserves the right to modify these Terms of Use at any
              time. Changes will be effective immediately upon posting on the
              Quadra website. Continued use of Intellient after any such changes
              constitutes acceptance of the new terms.
            </p>
          </div>
          <hr className="border-white" />

          {/* Governing Law */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">7. Governing Law</h1>
            <p className="font-normal text-sm text-muted-foreground">
              These Terms of Use are governed by and construed in accordance
              with the laws of India. Any disputes arising from or relating to
              these terms shall be resolved in the courts of Courts of
              Coimbatore, India.
            </p>
          </div>
          <hr className="border-white" />

          {/* Contact Information */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">8. Contact Information</h1>
            <p className="font-normal text-sm text-muted-foreground">
              For any questions or concerns regarding these Terms of Use, please
              contact Quadra at:
            </p>
            <p className="font-normal text-sm text-muted-foreground">
              Quadrasystems.net India Private Limited
              <br />
              <a
                href="mailto:intellient@quadrasystems.net"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-primary"
              >
                intellient@quadrasystems.net
              </a>
            </p>
            <p className="font-normal text-sm text-muted-foreground">
              By using Intellient, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Use.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
