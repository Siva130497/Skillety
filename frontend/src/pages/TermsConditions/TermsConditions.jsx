import React, { useContext, useState } from "react";
import { useEffect } from "react";
import "./TermsConditions.css";
import "./TermsConditions-responsive.css";
import Layout from "../../components/Layout";
import { Footer } from "../../components/Footer";

const TermsConditions = () => {
    useEffect(() => { }, []);

    return (
        <div>
            <Layout />
            <div className="cli--tal-pro-search-section">
                <div className="container-fluid">
                    <div className="container-fluid container-section">
                        <div className="custom--container tal--pro-search">
                            <div className="breadcrumb--area-dark" data-aos="fade-down">
                                <div className="breadcrumb--item-dark">
                                    <a href="/">Home</a>
                                </div>
                                <div className="breadcrumb--item-dark">
                                    <p>Terms And Conditions</p>
                                </div>
                            </div>

                            <div className="terms-con-section">
                                <div className="terms-con-area">
                                    <div className="terms-con-title"><span>Terms</span> & <span>Conditions</span></div>

                                    <div className="terms-con-note-area m-t-35">
                                        <div className="terms-con-sub-title">
                                            TERMS OF USE OF WEBSITE
                                        </div>
                                        <div className="terms-con-updated mt-4">
                                            Date Of Last Revision&nbsp;:&nbsp;<span>01-04-2022</span>
                                        </div>
                                        <div className="terms-con-note mt-4">
                                            * Please read these terms and conditions carefully. by
                                            using this website you agree to be bound by all of these
                                            terms and conditions.
                                        </div>
                                    </div>

                                    <div className="terms-con-group m-t-35 mt-sm-5">
                                        <div className="terms-con-head">01. Introduction</div>
                                        <p className="terms-con-content">
                                            These Terms and Conditions ("Terms of Use") govern your
                                            use of www.skillety.com (the "Website") owned by M/s.
                                            Skillety Technologies Private Limited (the "Owner"). These
                                            Terms of Use include and incorporate the references,
                                            policies and guidelines. Owner reserves the right to
                                            change or revise the Terms of Use at any time by posting
                                            any changes or revised Terms of Use on this website. The
                                            changed or revised Terms of Use shall be effective from
                                            the moment it is posted on the Website. Your use of the
                                            website following the posting any such changes or of a
                                            revised Terms of Use shall constitute your acceptance of
                                            any such changes or revisions. The Owner encourages you to
                                            review these Terms of Use whenever you visit the Website
                                            to make sure that you understand the terms and conditions
                                            governing this website. These Terms of Use do not alter in
                                            any way the terms and conditions of any other written
                                            agreement you may have with the Owner for other products
                                            or services. If you do not agree to these Terms of Use
                                            (including any referenced policies or guidelines), please
                                            immediately terminate your use of the Website.
                                        </p>
                                        <p className="terms-con-content">
                                            For the purpose of these Terms of Use, wherever the
                                            context so requires "You" or "User" shall mean any natural
                                            or legal person who has agreed to use this Website by
                                            providing registration data while registering on the
                                            Website as a registered user. A user may surf this Website
                                            without registering on the Website but they might not have
                                            full access of the Website.
                                        </p>
                                    </div>

                                    <div className="terms-con-group">
                                        <div className="terms-con-head">
                                            02. Membership Eligibility
                                        </div>
                                        <p className="terms-con-content">
                                            You affirm that you are either more than 18 years of age,
                                            or an emancipated minor, or possess legal parental or
                                            guardian consent, and are fully able and competent to
                                            enter into the terms, conditions, obligations,
                                            affirmations, representations, and warranties set forth in
                                            these Terms of Use, and to abide by and comply with these
                                            Terms of Use.
                                        </p>
                                        <p className="terms-con-content">
                                            You agree that you have provided true, accurate, current
                                            and complete information to the Owner in connection with
                                            any use or access of the Service.
                                        </p>
                                    </div>

                                    <div className="terms-con-group">
                                        <div className="terms-con-head">
                                            03. Account and Registration Obligations
                                        </div>
                                        <p className="terms-con-content">
                                            If you use this Website, you shall be responsible for
                                            maintaining the confidentiality of your Account, including
                                            but not limited to password and you shall be responsible
                                            for all activities that occur from your account. You agree
                                            that if you provide any information that is untrue,
                                            inaccurate, not current or incomplete or Website has
                                            reasonable grounds to suspect that such information is
                                            untrue, inaccurate, not current or incomplete, or not in
                                            accordance with these Terms of Use, Website shall have the
                                            right to indefinitely suspend or terminate or block access
                                            of your membership on the Website and refuse to provide
                                            you with access to the Website.
                                        </p>
                                    </div>

                                    <div className="terms-con-group">
                                        <div className="terms-con-head">
                                            04. Third Party Information on the Website
                                        </div>
                                        <p className="terms-con-content">
                                            As some information appearing on this Website is provided
                                            by third parties, the Owner will have no liability in
                                            respect of any loss or damage arising from third party
                                            information which appears on the Website including the
                                            manner in which the information is displayed or
                                            information which may be -
                                        </p>

                                        <div className="terms-con-list-area">
                                            <ul>
                                                <li className="terms-con-list-item">Out of date.</li>
                                                <li className="terms-con-list-item">Inaccurate.</li>
                                                <li className="terms-con-list-item">Duplicate.</li>
                                                <li className="terms-con-list-item">
                                                    Impersonation by a person to be another person.
                                                </li>
                                            </ul>
                                        </div>

                                        <p className="terms-con-content">
                                            The Owner is not an agent for any of the Merchants listed
                                            on Website and the Owner has no responsibility for and no
                                            liability whatsoever in respect of the conduct of a
                                            Merchant or quality of service provided by a Merchant.
                                        </p>
                                    </div>

                                    <div className="terms-con-group">
                                        <div className="terms-con-head">
                                            05. Links to Other Sites
                                        </div>
                                        <p className="terms-con-content">
                                            The Website may include links to other websites. Some of
                                            these websites may contain materials that are
                                            objectionable, unlawful, or inaccurate. These links are
                                            provided for convenience only and Website does not endorse
                                            these websites or products and services they provide.
                                        </p>
                                    </div>

                                    <div className="terms-con-group">
                                        <div className="terms-con-head">
                                            06. Restrictions on use
                                        </div>
                                        <p className="terms-con-content">
                                            In addition to these Terms of Use, user shall not -
                                        </p>

                                        <div className="terms-con-list-area">
                                            <ul>
                                                <li className="terms-con-list-item">
                                                    Use the third party links to sites without agreeing to
                                                    their website terms and conditions.
                                                </li>

                                                <li className="terms-con-list-item">
                                                    Post links to third party websites or use their logo,
                                                    company name etc. without their prior written
                                                    permission.
                                                </li>

                                                <li className="terms-con-list-item">
                                                    Use the services for spamming and other illegal
                                                    purposes.
                                                </li>

                                                <li className="terms-con-list-item">
                                                    Impersonate any person or entity, falsely claim or
                                                    otherwise misrepresent an affiliation with any person
                                                    or entity, or access the accounts of others without
                                                    their permission, forge another persons' digital
                                                    signature, misrepresent the source, identity, or
                                                    access the accounts of others without permission,
                                                    forge another persons' digital signature, misrepresent
                                                    the source, identity, or content of information
                                                    transmitted via the services, perform any other
                                                    similar fraudulent activity or otherwise purchase
                                                    product or service which we reasonably believe to be
                                                    potentially fraudulent.
                                                </li>

                                                <li className="terms-con-list-item">
                                                    Infringe our or any third party's Intellectual
                                                    Property rights, rights of publicity or privacy.
                                                </li>

                                                <li className="terms-con-list-item">
                                                    Use the service if you are below the age of 18 without
                                                    an adult supervision or in any event use the services
                                                    if you are under the age of 13 even with an adult
                                                    supervision and in accordance with applicable law.
                                                </li>

                                                <li className="terms-con-list-item">
                                                    Post or transmit any message, data, image or program
                                                    which is grossly harmful, harassing, blasphemous,
                                                    defamatory, obscene, pornographic, pedophilic,
                                                    invasive of another's privacy, hateful, or racially,
                                                    ethnically objectionable, disparaging, relating or
                                                    encouraging money laundering or gambling, or otherwise
                                                    unlawful in any manner whatever, or unlawfully
                                                    threatening or unlawful harassing including but not
                                                    limited to "Indecent Representation of Women" within
                                                    the meaning of the Indecent Representation of Women
                                                    (Prohibition) Act, 1986.
                                                </li>

                                                <li className="terms-con-list-item">
                                                    Refuse to cooperate in any investigation or provide
                                                    confirmation of identity or any other information as
                                                    asked by the Owner.
                                                </li>

                                                <li className="terms-con-list-item">
                                                    Remove, circumvent, disable, damage or otherwise
                                                    interfere with security-related features of the
                                                    service and the Website or features that enforce
                                                    limitations in the use of the services.
                                                </li>

                                                <li className="terms-con-list-item">
                                                    Use the service in any manner that could damage,
                                                    disable, overburden, or impair it, including without
                                                    limitation, using the services in an automated manner;
                                                </li>

                                                <li className="terms-con-list-item">
                                                    Use any robot, spider, other automatic device, or
                                                    manual process to monitor or copy the Website without
                                                    prior written permission;
                                                </li>

                                                <li className="terms-con-list-item">
                                                    Interfere or disrupt this Website or networks
                                                    connected to this Website;
                                                </li>

                                                <li className="terms-con-list-item">
                                                    Forge headers or manipulate identifiers or other data
                                                    in order to disguise the origin of any content
                                                    transmitted through our Website or to manipulate your
                                                    presence on your Website;
                                                </li>

                                                <li className="terms-con-list-item">
                                                    Use Website to collect or obtain personal information,
                                                    including but not limited to financial information,
                                                    about other users of the Website.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="terms-con-group">
                                        <div className="terms-con-head">
                                            07. Intellectual Property Rights
                                        </div>
                                        <p className="terms-con-content">
                                            The services and Website are owned and operated by M/s.
                                            Skillety Technologies Private Limited. The visual
                                            interfaces, graphics, design, compilation, information,
                                            computer code (including source code and object code),
                                            products, software, services, and all other elements of
                                            the services and the Website provided by the Owner
                                            ("Materials") are protected by Indian Copyright, trade
                                            dress, Patent and Trademark laws, international
                                            conventions and all other Intellectual Property and
                                            proprietary rights and applicable laws. As between you and
                                            the Owner, all Materials, Trademarks, service marks, and
                                            trade names contained on the Website are the Property of
                                            the Owner and/or third party licensors or suppliers.
                                        </p>
                                        <p className="terms-con-content">
                                            You agree not to remove, obscure, or alter the Owner's or
                                            any third party's Copyright, Patent, Trademark, or other
                                            proprietary right notices affixed to or contained within
                                            or accessed in conjunction with or through the services.
                                            Except as expressly authorized by the Owner, you agree not
                                            to sell, license, distribute, copy, modify, publicly
                                            perform or display, transmit, publish, edit, adapt, create
                                            derivative works from, or otherwise make unauthorized use
                                            of the Materials. The Owner reserves all rights not
                                            expressly granted in these Terms of Use.
                                        </p>
                                    </div>

                                    <div className="terms-con-group">
                                        <div className="terms-con-head">
                                            08. Disclaimer of Warranties & Liability
                                        </div>
                                        <p className="terms-con-content">
                                            The Website, services, content, user content and any third
                                            party content are provided by the Owner on an "As is"
                                            basis without warranty of any kind, express, implied,
                                            statutory or otherwise, including the implied warranties
                                            of title, non-infringement, Merchantability or fitness for
                                            a particular purpose, without limiting the foregoing, the
                                            Owner makes no warranty that -
                                        </p>

                                        <div className="terms-con-list-area">
                                            <ul>
                                                <li className="terms-con-list-item">
                                                    The Website or the services will meet your
                                                    requirements or your use of the Website or the
                                                    services will be uninterrupted, timely, secure or
                                                    error-free.
                                                </li>

                                                <li className="terms-con-list-item">
                                                    The results that may be obtained from the use of the
                                                    Website or services will be effective accurate or
                                                    reliable.
                                                </li>

                                                <li className="terms-con-list-item">
                                                    The quality of the Website or services will meet your
                                                    expectations; or
                                                </li>

                                                <li className="terms-con-list-item">
                                                    Any errors or defects in the Website through the
                                                    Website/Content or from use of the services shall
                                                    create any warranty not expressly stated in these
                                                    Terms of Use.
                                                </li>
                                            </ul>
                                        </div>

                                        <p className="terms-con-content">
                                            To the maximum extent permitted by applicable law, the
                                            Owner will have no liability related to user content
                                            and/or third party content arising under Intellectual
                                            Property Rights, libel, privacy, publicity, obscenity or
                                            other laws, the Owner disclaims all liability with respect
                                            to the misuse, loss, modification or unavailability of any
                                            user content and/or third party content.
                                        </p>

                                        <p className="terms-con-content">
                                            You expressly understand and agree that, to the maximum
                                            extent permitted by applicable law the Owner will not be
                                            liable for any loss that you may incur as a consequence of
                                            unauthorized use of your account or account information in
                                            connection with the Website or any services, either with
                                            or without your knowledge, the Owner has endeavoured to
                                            ensure that all the information on the Website is correct,
                                            but the Owner neither warrants nor makes any
                                            representations regarding the quality, accuracy or
                                            completeness of any data, information, software, products,
                                            functionalities, services and related graphics obtained
                                            through the Website, or otherwise arising out of the use
                                            of this Website, whether based on contract, tort,
                                            negligence, strict liability or otherwise, further, the
                                            Owner shall not be held responsible for non-availability
                                            of the Website during periodic maintenance operations or
                                            any unplanned suspension of access to the Website that may
                                            occur due to technical reasons or any other reasons beyond
                                            the Owner's control. The user understands and agrees that
                                            any material or data downloaded or otherwise obtained
                                            through the Website is done entirely at their own
                                            discretion and risk and they will be solely responsible
                                            for any damage to their computer systems or loss of data
                                            that results from the download of such material or data.
                                            The Owner accepts no liability for any errors or
                                            omissions, with respect to any information provided to you
                                            whether on behalf of itself or third parties.
                                        </p>
                                    </div>

                                    <div className="terms-con-group">
                                        <div className="terms-con-head">
                                            09. Indemnification and Limitation of Liability
                                        </div>
                                        <p className="terms-con-content">
                                            You agree to indemnify, defend and hold harmless the
                                            Owner, its subsidiaries, affiliates, vendors, agents and
                                            their respective directors, officers, employees,
                                            contractors and agents (herein after individually and
                                            collectively referred to as "indemnified parties") from
                                            and against any and all losses, liabilities, claims,
                                            suits, proceedings, penalties, interests, damages,
                                            demands, costs and expenses (including legal and other
                                            statutory fees and disbursements in connection therewith
                                            and interest chargeable thereon) asserted against or
                                            incurred by the indemnified parties that arise out of,
                                            result from, or in connection with (i) Your breach of the
                                            Agreement(s); or (ii) any claims made by any third party
                                            due to, or arising out of, or in connection with, Your use
                                            of the Website; or (iii) any claim that any Third Party
                                            Content, content, information or materials provided by You
                                            caused damage to a third party; or (iv) Your violation of
                                            any rights of another, including any Intellectual Property
                                            rights.
                                        </p>

                                        <p className="terms-con-content">
                                            The Owner may notify you of any claims which you shall be
                                            liable to indemnify against. You will then be required to
                                            consult with the Owner regarding the course of action to
                                            be undertaken in defending such a claim. Further, you
                                            shall not compromise or settle any claim or admit any
                                            liability or wrongdoing on the part of the Owner without
                                            the express prior written consent of the Owner which can
                                            be withheld or denied or conditioned by the Owner in its
                                            sole discretion.
                                        </p>

                                        <p className="terms-con-content">
                                            Notwithstanding anything to contrary in the agreement(s),
                                            M/s. Skillety Technologies Private Limited's entire and
                                            aggregate liability to you under and in relation to these
                                            Terms of Use or otherwise shall not exceed the greater of
                                            Indian Rupees One Hundred (INR 100) or the amount of fees,
                                            if any, paid by you to the Owner under the relevant order
                                            to which the cause of action for the liability relates.
                                        </p>

                                        <p className="terms-con-content">
                                            Notwithstanding anything to contrary in the agreement(s),
                                            in no event shall the Owner, its subsidiaries or
                                            affiliates and their respective officers, directors,
                                            employees, partners or suppliers be liable to You for any
                                            special, incidental, indirect, consequential, exemplary or
                                            punitive damages whatsoever, including those resulting
                                            from loss of use, data or profits, whether or not
                                            foreseeable or whether or not the Owner has been advised
                                            of the possibility of such damages, or based on any theory
                                            of liability, including breach of contract or warranty,
                                            negligence or other tortious action, or any other claim
                                            arising out of or in connection with Your use of or access
                                            to the Website, services or content.
                                        </p>
                                    </div>

                                    <div className="terms-con-group">
                                        <div className="terms-con-head">
                                            10. Governing Law and Jurisdiction
                                        </div>
                                        <p className="terms-con-content">
                                            These Terms of Use and all transactions entered into on or
                                            through the Website and the relationship between you and
                                            the Owner shall be governed in accordance with the laws of
                                            India without reference to conflict of laws principles.
                                        </p>

                                        <p className="terms-con-content">
                                            You agree that all claims, differences and disputes
                                            arising under or in connection with or in relation hereto
                                            the Website, these Terms of Use, the agreement(s) or any
                                            transactions entered into on or through the Website or the
                                            relationship between you and the Owner shall be subject to
                                            the exclusive jurisdiction of the Courts at Secunderabad,
                                            Telangana and you hereby accede to and accept the
                                            jurisdiction of such Courts. Each party hereby irrevocably
                                            waives any objection which such party may now or hereafter
                                            have to the laying of improper venue or forum non
                                            convenient. Each party agrees that a judgment in any such
                                            action or proceeding may be enforced in other
                                            jurisdictions by suit on the judgment or in any manner
                                            provided by law. Any and all service of process and any
                                            other notice in any such suit, action or proceeding with
                                            respect to this agreement shall be effective against a
                                            party if given as provided herein.
                                        </p>
                                    </div>

                                    <div className="terms-con-group">
                                        <div className="terms-con-head">11. General Provisions</div>
                                        <p className="terms-con-content">
                                            Notice - All notices with respect to these Terms of Use
                                            from the Owner will be served to you by email or by
                                            general notification on the Website. Any notice provided
                                            to the Owner pursuant to these Terms of Use should be sent
                                            to Grievance Officer at Plot No. 45, Sarvasukhi Colony,
                                            West Marredpally, Secunderabad,, Hyderabad, Telangana,
                                            500026.
                                        </p>

                                        <p className="terms-con-content">
                                            Assignment - You cannot assign or otherwise transfer the
                                            agreements, or any rights granted hereunder or any
                                            obligations, to any third party and any such assignment or
                                            transfer or purported assignment or transfer shall be void
                                            ab initio. M/s. Skillety Technologies Private Limited's
                                            rights and/or obligations under the Terms of Use are
                                            freely assignable or otherwise transferable by the Owner
                                            to any third parties without the requirement of seeking
                                            your prior consent. The Owner may inform you of such
                                            assignment or transfer in accordance with the notice
                                            requirements under the agreement. The Owner shall have
                                            right to transfer your Account and Account Information to
                                            a third party who purchases M/s. Skillety Technologies
                                            Private Limited's business as conducted under the Website.
                                        </p>

                                        <p className="terms-con-content">
                                            Severability - If, for any reason, a Court of competent
                                            jurisdiction finds any provision of these Terms of Use, or
                                            portion thereof, to be unenforceable, that provision shall
                                            be enforced to the maximum extent permissible so as to
                                            give effect to the intent of the parties as reflected by
                                            that provision, and the remainder of the Terms of Use
                                            shall continue in full force and effect. The Owner may
                                            amend in a reasonable manner such provision to make it
                                            enforceable and such amendment will be given effect in
                                            accordance with the amendment terms of these Terms of Use.
                                        </p>

                                        <p className="terms-con-content">
                                            Waiver - Any failure or delay by a party to enforce or
                                            exercise any provision of the Terms of Use, or any related
                                            right, shall not constitute a waiver by such party of that
                                            provision or right. The exercise of one or more of a
                                            party's rights hereunder shall not be a waiver of, or
                                            preclude the exercise of, any rights or remedies available
                                            to such party under these Terms of Use or in law or at
                                            equity. Any waiver by a party shall only be made in
                                            writing and executed by a duly authorized officer of such
                                            party.
                                        </p>

                                        <p className="terms-con-content">
                                            Principal to Principal Relationship - You and the Owner
                                            are independent contractors, and nothing in these Terms of
                                            Use will be construed to create a partnership, joint
                                            venture, association of persons, agency (disclosed or
                                            undisclosed), franchise, sales representative, or
                                            employment relationship between you and the Owner. As an
                                            abundant caution, it is clarified that the Owner shall not
                                            have any right to conclude any contract for sale or
                                            purchase of Products for and / or on your behalf and both
                                            you and the Owner have entered this agreement on principal
                                            to principal basis.
                                        </p>

                                        <p className="terms-con-content">
                                            Force Majeure - If performance of any service or
                                            obligation under these Terms of Use or other agreement by
                                            M/s. Skillety Technologies Private Limited is, or other
                                            third parties in fulfillment of any purchase or sale
                                            transaction (for eg: logistics service provider,
                                            fulfillment center, payment gateways etc.) are, prevented,
                                            restricted, delayed or interfered with by reason of labor
                                            disputes, strikes, acts of God, floods, lightning, severe
                                            weather, shortages of materials, rationing, utility or
                                            communication failures, earthquakes, war, revolution, acts
                                            of terrorism, civil commotion, acts of public enemies,
                                            blockade, embargo or any law, order, proclamation,
                                            regulation, ordinance, demand or requirement having legal
                                            effect of any government or any judicial authority or
                                            representative of any such government, or any other act
                                            whatsoever, whether similar or dissimilar to those
                                            referred to in this clause, which are beyond the
                                            reasonable control of the Owner or its third parties
                                            performing such services as sub-contractor to the Owner
                                            and could not have been prevented by reasonable
                                            precautions (each, a "Force Majeure Event"), then the
                                            Owner shall be excused from such performance to the extent
                                            of and during the period of such Force Majeure Event. The
                                            Owner shall exercise all reasonable commercial efforts to
                                            continue to perform its obligations hereunder.
                                        </p>

                                        <p className="terms-con-content">
                                            Grievance Officer - In compliance with Information
                                            Technology Act, 2000 and the rules made thereunder, the
                                            Grievance Officer of M/s. Skillety Technologies Private
                                            Limited for the purpose of these Terms of Use shall be
                                        </p>
                                    </div>

                                    <div className="terms-con-note-area mt-5">
                                        <div className="terms-con-updated mt-0">
                                            Name&nbsp;:&nbsp;<span>Mrs. Amrita Raj</span>
                                        </div>
                                        <div className="terms-con-updated">
                                            Email Address&nbsp;:&nbsp;<span>amrita@skillety.com</span>
                                        </div>
                                        <div className="terms-con-updated">
                                            Address&nbsp;:&nbsp;<span>Plot No. 45, Sarvasukhi Colony, West Marredpally, Secunderabad, Hyderabad, Telangana, 500026.</span>
                                        </div>
                                        <div className="terms-con-updated">
                                            Contact Number&nbsp;:&nbsp;<span>+91-7331101225</span>
                                        </div>
                                        <div className="terms-con-note mt-5">
                                            * The Owner may change the aforesaid details from time to time.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default TermsConditions;
