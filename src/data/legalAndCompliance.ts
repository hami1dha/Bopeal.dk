export type LegalSectionKey = 
  | 'how-it-works' 
  | 'subscription' 
  | 'faq' 
  | 'about' 
  | 'contact' 
  | 'terms' 
  | 'privacy' 
  | 'withdrawal' 
  | 'cancel';

export const COMPLIANCE_DATA = {
  da: {
    navLinks: [
      { key: 'how-it-works' as LegalSectionKey, label: 'Sådan fungerer det' },
      { key: 'subscription' as LegalSectionKey, label: 'Abonnement' },
      { key: 'faq' as LegalSectionKey, label: 'FAQ' },
      { key: 'about' as LegalSectionKey, label: 'Om os' },
      { key: 'contact' as LegalSectionKey, label: 'Kontakt' },
      { key: 'terms' as LegalSectionKey, label: 'Handelsbetingelser' },
      { key: 'privacy' as LegalSectionKey, label: 'Privatliv' },
      { key: 'withdrawal' as LegalSectionKey, label: 'Fortrydelsesret' },
      { key: 'cancel' as LegalSectionKey, label: 'Opsig abonnement' },
    ],
    howItWorks: {
      title: 'Sådan fungerer det',
      subtitle: 'Enkel, transparent og sikker adgang til Danmarks boligmarked på 4 trin:',
      steps: [
        {
          step: '1️⃣',
          title: 'Opret medlemskab',
          desc: 'Tilmeld dig for 7 kr. pr. måned.',
        },
        {
          step: '2️⃣',
          title: 'Få adgang',
          desc: 'Efter betaling får du adgang til medlemsområdet.',
        },
        {
          step: '3️⃣',
          title: 'Find boligkilder',
          desc: 'Brug vores oversigt til at finde relevante boligportaler, boligorganisationer, kollegier og udlejere.',
        },
        {
          step: '4️⃣',
          title: 'Søg direkte hos udbyderen',
          desc: 'Når du finder en relevant boligmulighed, bliver du sendt videre til den pågældende udbyders hjemmeside.',
        },
      ],
    },
    subscription: {
      badge: 'Gennemskuelige vilkår',
      title: 'Abonnement',
      items: [
        { label: 'Pris', value: '7 kr. pr. måned inkl. moms' },
        { label: 'Binding', value: 'Ingen bindingsperiode' },
        { label: 'Fornyelse', value: 'Abonnementet fornyes automatisk hver måned.' },
        { label: 'Opsigelse', value: 'Du kan opsige dit abonnement når som helst.' },
        { label: 'Betaling', value: 'Betalingen håndteres sikkert via Stripe.' },
      ],
    },
    faq: {
      title: 'Ofte stillede spørgsmål',
      subtitle: 'Få svar på de vigtigste spørgsmål om bopæl.dk og vores boligguide:',
      items: [
        {
          q: 'Er bopæl.dk selv en boligudlejer?',
          a: 'Nej. bopæl.dk fungerer som en boligguide, der samler relevante boligkilder, oplysninger og links.',
        },
        {
          q: 'Kan I garantere, at jeg finder en bolig?',
          a: 'Nej. Vi kan ikke garantere, at du finder eller får tilbudt en bolig. Ledige boliger, ventelister og udvælgelse håndteres af de enkelte boligudbydere.',
        },
        {
          q: 'Er alle boliger gratis at søge?',
          a: 'Det afhænger af den enkelte boligudbyder. Eventuelle gebyrer eller krav fremgår af den enkelte udbyders egne vilkår.',
        },
        {
          q: 'Kan jeg opsige mit medlemskab?',
          a: 'Ja. Der er ingen bindingsperiode, og abonnementet kan opsiges når som helst.',
        },
        {
          q: 'Hvor meget koster medlemskabet?',
          a: 'Medlemskabet koster 7 kr. pr. måned inkl. moms.',
        },
        {
          q: 'Hvem håndterer min betaling?',
          a: 'Betalingen håndteres via Stripe.',
        },
      ],
    },
    terms: {
      title: 'Handelsbetingelser',
      content: [
        'Ved køb af medlemskab accepterer du bopæl.dk\'s handelsbetingelser.',
        'Medlemskabet er et løbende abonnement på 7 kr. pr. måned inkl. moms.',
        'Abonnementet fornyes automatisk hver måned, indtil det opsiges.',
        'Der er ingen bindingsperiode.',
        'Du kan opsige abonnementet efter de opsigelsesmuligheder, der fremgår af din konto eller vores hjemmeside.',
      ],
    },
    withdrawal: {
      title: 'Fortrydelsesret',
      content: [
        'Som forbruger har du som udgangspunkt 14 dages fortrydelsesret ved online køb, med forbehold for de regler og undtagelser, der gælder for den konkrete digitale tjeneste.',
        'Hvis du ønsker, at adgangen til medlemsområdet skal begynde med det samme, skal dette håndteres i overensstemmelse med reglerne om levering af digitale tjenester og fortrydelsesretten.',
      ],
    },
    privacy: {
      title: 'Privatliv',
      content: [
        'Vi behandler personoplysninger i overensstemmelse med vores privatlivspolitik.',
        'Vi anbefaler, at du læser vores Privatlivspolitik, før du opretter et medlemskab.',
        'Vi indsamler udelukkende nødvendige kontaktoplysninger i forbindelse med oprettelse og Stripe-betalingshåndtering. Vi sælger aldrig dine data til tredjepart, og dine betalingskortoplysninger behandles udelukkende krypteret hos Stripe (PCI-DSS niveau 1).',
      ],
    },
    contact: {
      title: 'Kontakt',
      brand: 'bopæl.dk',
      email: 'E-mail: bopaeldk@gmail.com',
      note: 'Har du spørgsmål til medlemskab, brug for hjælp eller ønsker du hjælp til opsigelse? Skriv til os, så vender vi hurtigt tilbage.',
    },
    about: {
      title: 'Om os',
      brand: 'bopæl.dk – Danmarks boligguide',
      paragraphs: [
        'bopæl.dk fungerer som en uafhængig boligguide, der samler og verificerer relevante boligkilder, almene boligselskaber, studieboliger, kollegier, pensionskasser og udlejere i hele Danmark.',
        'Vi er ikke selv boligudlejer, men hjælper boligsøgende med at navigere sikkert udenom svindel og finde direkte frem til de officielle udbydere, hvor boligerne rent faktisk kan søges.',
        'Vores mission er at gøre boligmarkedet gennemskueligt, trygt og tilgængeligt for alle til en symbolsk medlemspris på 7 kr./måned uden binding.',
      ],
    },
    cancel: {
      title: 'Opsig abonnement',
      subtitle: 'Ingen binding – du kan opsige dit abonnement når som helst.',
      instructions: [
        '1. Direkte via din Stripe-kvittering: I enhver e-mailkvittering fra Stripe findes der et direkte link til administration og opsigelse med et enkelt klik.',
        '2. Via e-mail support: Send blot en mail til bopaeldk@gmail.com med den e-mail, du tilmeldte dig med, så standser vi dit abonnement med det samme.',
        'Når abonnementet er opsagt, trækkes der ikke flere betalinger, og du har adgang til periodens udløb.',
      ],
    },
    footer: {
      tagline: 'bopæl.dk – Danmarks boligguide',
      links: [
        { key: 'about' as LegalSectionKey, label: 'Om os' },
        { key: 'contact' as LegalSectionKey, label: 'Kontakt' },
        { key: 'terms' as LegalSectionKey, label: 'Handelsbetingelser' },
        { key: 'privacy' as LegalSectionKey, label: 'Privatlivspolitik' },
        { key: 'withdrawal' as LegalSectionKey, label: 'Fortrydelsesret' },
        { key: 'cancel' as LegalSectionKey, label: 'Opsig abonnement' },
      ],
    },
  },
  en: {
    navLinks: [
      { key: 'how-it-works' as LegalSectionKey, label: 'How it works' },
      { key: 'subscription' as LegalSectionKey, label: 'Subscription' },
      { key: 'faq' as LegalSectionKey, label: 'FAQ' },
      { key: 'about' as LegalSectionKey, label: 'About us' },
      { key: 'contact' as LegalSectionKey, label: 'Contact' },
      { key: 'terms' as LegalSectionKey, label: 'Terms' },
      { key: 'privacy' as LegalSectionKey, label: 'Privacy' },
      { key: 'withdrawal' as LegalSectionKey, label: 'Withdrawal' },
      { key: 'cancel' as LegalSectionKey, label: 'Cancel' },
    ],
    howItWorks: {
      title: 'How it works',
      subtitle: 'Simple, transparent, and secure access to the Danish housing market in 4 steps:',
      steps: [
        {
          step: '1️⃣',
          title: 'Sign up for membership',
          desc: 'Subscribe for 7 DKK per month.',
        },
        {
          step: '2️⃣',
          title: 'Get instant access',
          desc: 'After payment, you immediately get access to the member area.',
        },
        {
          step: '3️⃣',
          title: 'Find housing sources',
          desc: 'Use our overview to discover relevant housing portals, public associations, dorms, and landlords.',
        },
        {
          step: '4️⃣',
          title: 'Apply directly at the provider',
          desc: 'When you find a relevant opportunity, you are redirected straight to the provider\'s official website.',
        },
      ],
    },
    subscription: {
      badge: 'Transparent Terms',
      title: 'Subscription',
      items: [
        { label: 'Price', value: '7 DKK per month incl. VAT' },
        { label: 'Commitment', value: 'No lock-in period' },
        { label: 'Renewal', value: 'Subcription renews automatically every month.' },
        { label: 'Cancellation', value: 'You can cancel your subscription at any time.' },
        { label: 'Payment', value: 'Payments are handled securely via Stripe.' },
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      subtitle: 'Get answers to essential questions regarding bopæl.dk and our guide:',
      items: [
        {
          q: 'Is bopæl.dk a landlord itself?',
          a: 'No. bopæl.dk acts as a housing guide gathering relevant housing sources, information, and links.',
        },
        {
          q: 'Can you guarantee that I will find a home?',
          a: 'No. We cannot guarantee that you find or receive an offer for a home. Vacant homes, waiting lists, and tenant selection are managed by individual providers.',
        },
        {
          q: 'Are all homes free to apply for?',
          a: 'That depends on the individual housing provider. Any potential fees or requirements are stated in their own terms.',
        },
        {
          q: 'Can I cancel my membership?',
          a: 'Yes. There is no lock-in period, and you can cancel anytime.',
        },
        {
          q: 'How much does the membership cost?',
          a: 'The membership costs 7 DKK per month incl. VAT.',
        },
        {
          q: 'Who processes my payment?',
          a: 'Payment is securely processed by Stripe.',
        },
      ],
    },
    terms: {
      title: 'Terms of Service',
      content: [
        'By purchasing a membership, you accept bopæl.dk\'s terms and conditions.',
        'The membership is an ongoing subscription of 7 DKK per month incl. VAT.',
        'The subscription automatically renews each month until cancelled.',
        'There is no binding lock-in period.',
        'You can cancel the subscription at any time using the options shown in your account or website.',
      ],
    },
    withdrawal: {
      title: 'Right of Withdrawal',
      content: [
        'As a consumer, you generally have a 14-day right of withdrawal for online purchases, subject to statutory rules and exceptions applicable to specific digital services.',
        'If you wish for access to the member area to begin immediately, this is handled in accordance with the regulations for digital services delivery and waiver of withdrawal upon instant performance.',
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      content: [
        'We process personal data in accordance with our privacy policy.',
        'We recommend reading our Privacy Policy before signing up for membership.',
        'We only collect necessary information for account creation and Stripe payment processing. We never sell your data, and your card information is processed securely with PCI-DSS compliant encryption by Stripe.',
      ],
    },
    contact: {
      title: 'Contact',
      brand: 'bopæl.dk',
      email: 'Email: bopaeldk@gmail.com',
      note: 'Questions regarding membership, billing, or cancellation? Send us an email and we will get back to you promptly.',
    },
    about: {
      title: 'About Us',
      brand: 'bopæl.dk – Denmark\'s Housing Guide',
      paragraphs: [
        'bopæl.dk is an independent Danish housing guide that gathers and verifies portals, public associations, dorms, pension funds, and landlords.',
        'We are not a landlord ourselves; our goal is to help you search securely without scam risks and reach the official portals directly.',
        'Our service is offered as a low-cost 7 DKK/month subscription without commitment.',
      ],
    },
    cancel: {
      title: 'Cancel Subscription',
      subtitle: 'No lock-in – cancel anytime.',
      instructions: [
        '1. Directly via your Stripe receipt: Every email receipt from Stripe contains a 1-click customer portal link to cancel.',
        '2. Via email support: Simply write to bopaeldk@gmail.com with your registered email, and we will cancel your billing immediately.',
        'Once cancelled, no further charges occur and you retain access until the end of the paid period.',
      ],
    },
    footer: {
      tagline: 'bopæl.dk – Danmarks boligguide',
      links: [
        { key: 'about' as LegalSectionKey, label: 'About us' },
        { key: 'contact' as LegalSectionKey, label: 'Contact' },
        { key: 'terms' as LegalSectionKey, label: 'Terms' },
        { key: 'privacy' as LegalSectionKey, label: 'Privacy Policy' },
        { key: 'withdrawal' as LegalSectionKey, label: 'Right of Withdrawal' },
        { key: 'cancel' as LegalSectionKey, label: 'Cancel Subscription' },
      ],
    },
  },
};
