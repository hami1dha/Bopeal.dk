import { HousingCategory } from '../types';

export const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/fZu5kC3Q0bHG92Z3gMg7e00';

export const housingCategories: HousingCategory[] = [
  {
    "id": "landsdaekkende-portaler",
    "categoryNumber": 1,
    "title": {
      "da": "1. Landsdækkende Boligportaler",
      "en": "1. Nationwide Rental Portals"
    },
    "description": {
      "da": "De 15 største landsdækkende portaler til lejeboliger, mægleroversigter og ferieboliger.",
      "en": "The 15 largest nationwide portals for rentals, property listings, and holiday homes."
    },
    "iconName": "Globe",
    "items": [
      {
        "id": "boligportal",
        "name": "BoligPortal.dk",
        "url": "https://www.boligportal.dk",
        "desc": {
          "da": "Danmarks største udlejningsportal for lejligheder, værelser og huse i hele landet.",
          "en": "Denmark's largest rental portal for apartments, rooms, and houses nationwide."
        },
        "location": "Hele Danmark",
        "tags": [
          "privat",
          "akut"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Danmarks Største",
          "en": "Largest Portal"
        },
        "tip": {
          "da": "Opret en gratis BoligAgent for at modtage besked sekunder efter nye boliger slås op.",
          "en": "Set up a free search agent to receive instant notifications when new properties match."
        }
      },
      {
        "id": "boligzonen",
        "name": "BoligZonen.dk",
        "url": "https://www.boligzonen.dk",
        "desc": {
          "da": "Udlejning i hele Danmark med direkte og tryg kontakt mellem lejer og udlejer.",
          "en": "Rental listings across Denmark with direct connection between tenant and landlord."
        },
        "location": "Hele Danmark",
        "tags": [
          "privat"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Udlejning i hele DK",
          "en": "Nationwide Rentals"
        }
      },
      {
        "id": "boligbasen",
        "name": "BoligBasen.dk",
        "url": "https://www.boligbasen.dk",
        "desc": {
          "da": "Populær lejeboligportal med tusindvis af opdaterede lejeboliger fra private og professionelle.",
          "en": "Popular rental portal featuring thousands of verified rental homes across Denmark."
        },
        "location": "Hele Danmark",
        "tags": [
          "privat"
        ],
        "isVerified": true
      },
      {
        "id": "boligsiden",
        "name": "Boligsiden.dk",
        "url": "https://www.boligsiden.dk",
        "desc": {
          "da": "Officiel boligportal for ejendomsmæglere med det samlede overblik over ejerboliger til salg.",
          "en": "Official property portal owned by the Association of Danish Estate Agents."
        },
        "location": "Hele Danmark",
        "tags": [
          "salg",
          "data"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Officiel Mæglerportal",
          "en": "Official Broker Portal"
        }
      },
      {
        "id": "boliga",
        "name": "Boliga.dk",
        "url": "https://www.boliga.dk",
        "desc": {
          "da": "Boligstatistik, prisudvikling, liggetider, nylige salgspriser og uafhængig boligformidling.",
          "en": "Comprehensive property statistics, price trends, days on market, and real estate search."
        },
        "location": "Hele Danmark",
        "tags": [
          "salg",
          "data"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Data & Statistik",
          "en": "Data & Statistics"
        }
      },
      {
        "id": "lejebolig-dk",
        "name": "Lejebolig.dk",
        "url": "https://www.lejebolig.dk",
        "desc": {
          "da": "Specialiseret i lejeboliger med daglige opdateringer på ledige huse, lejligheder og værelser.",
          "en": "Specialized rental portal with daily updates on available houses, apartments, and rooms."
        },
        "location": "Hele Danmark",
        "tags": [
          "privat"
        ],
        "isVerified": true
      },
      {
        "id": "akutbolig",
        "name": "Akutbolig.dk",
        "url": "https://www.akutbolig.dk",
        "desc": {
          "da": "Hurtig boligsøgning med automatisk boligagent, der straks giver besked om nye matchende boliger.",
          "en": "Fast housing alerts and auto-matching tools notifying tenants the instant listings appear."
        },
        "location": "Hele Danmark",
        "tags": [
          "privat",
          "akut"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Hurtig boligsøgning",
          "en": "Instant Alerts"
        }
      },
      {
        "id": "findbolig-nu",
        "name": "Findbolig.nu",
        "url": "https://www.findbolig.nu",
        "desc": {
          "da": "Portal til lejeboliger og nybyggeri fra pensionskasser, almene selskaber og administratorer.",
          "en": "Official portal for modern rentals directly from pension funds and institutional landlords."
        },
        "location": "Hele Danmark",
        "tags": [
          "privat",
          "almen",
          "pension"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Pensionskasser & Nybyg",
          "en": "Pension Funds & New Build"
        }
      },
      {
        "id": "boligsurf",
        "name": "Boligsurf.dk",
        "url": "https://www.boligsurf.dk",
        "desc": {
          "da": "Samlet overblik over ledige lejeboliger og fremlejemål på tværs af de danske byer.",
          "en": "Unified overview of available rental apartments and sublets across Danish cities."
        },
        "location": "Hele Danmark",
        "tags": [
          "privat"
        ],
        "isVerified": true
      },
      {
        "id": "findboliger-dk",
        "name": "Findboliger.dk",
        "url": "https://www.findboliger.dk",
        "desc": {
          "da": "Søgning i hele landet efter lejligheder, rækkehuse og værelser fra verificerede udlejere.",
          "en": "Nationwide search engine for apartments, terraced houses, and rooms from verified landlords."
        },
        "location": "Hele Danmark",
        "tags": [
          "privat"
        ],
        "isVerified": true
      },
      {
        "id": "boligninja",
        "name": "Boligninja.dk",
        "url": "https://www.boligninja.dk",
        "desc": {
          "da": "Boligportal med direkte kontakt til udlejer og øjeblikkelige notifikationer ved nye opslag.",
          "en": "Fast rental search portal providing direct landlord messaging and instant notifications."
        },
        "location": "Hele Danmark",
        "tags": [
          "privat",
          "akut"
        ],
        "isVerified": true
      },
      {
        "id": "minlejebolig",
        "name": "Minlejebolig.dk",
        "url": "https://minlejebolig.dk",
        "desc": {
          "da": "Lejeboliger samlet ét sted med brugervenlig søgning i ledige lejemål over hele landet.",
          "en": "Rental properties aggregated in one user-friendly directory across Denmark."
        },
        "location": "Hele Danmark",
        "tags": [
          "privat"
        ],
        "isVerified": true
      },
      {
        "id": "rentola",
        "name": "Rentola.dk",
        "url": "https://www.rentola.dk",
        "desc": {
          "da": "International boligportal der samler lejemål i Danmark for både danske og internationale lejere.",
          "en": "International rental search engine gathering listings across Danish cities for local and expat seekers."
        },
        "location": "Hele Danmark",
        "tags": [
          "privat"
        ],
        "isVerified": true
      },
      {
        "id": "cofman",
        "name": "Cofman.com",
        "url": "https://www.cofman.com",
        "desc": {
          "da": "Formidling af sommerhusudlejning i Danmark i tæt samarbejde med de bedste feriehusbureauer.",
          "en": "Holiday home aggregator connecting travelers to verified summer cottages across Denmark."
        },
        "location": "Hele Danmark",
        "tags": [
          "ferie"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Sommerhuse",
          "en": "Holiday Homes"
        }
      },
      {
        "id": "feriehusguide",
        "name": "Feriehusguide.dk",
        "url": "https://www.feriehusguide.dk",
        "desc": {
          "da": "Oversigt over ferieboligudlejere, sommerhusområder og destinationer i hele Danmark.",
          "en": "Directory of vacation home agencies, coastal rental destinations, and cottages in Denmark."
        },
        "location": "Hele Danmark",
        "tags": [
          "ferie"
        ],
        "isVerified": true
      }
    ]
  },
  {
    "id": "ejendomsmaeglere",
    "categoryNumber": 2,
    "title": {
      "da": "2. Ejendomsmæglere – landsdækkende kæder",
      "en": "2. Real Estate Agencies – Nationwide Chains"
    },
    "description": {
      "da": "De 11 førende mæglerkæder og udlejningsbureauer med afdelinger i hele landet.",
      "en": "The 11 premier real estate agency chains and leasing bureaus with branches nationwide."
    },
    "iconName": "Building",
    "items": [
      {
        "id": "edc",
        "name": "EDC.dk",
        "url": "https://www.edc.dk",
        "desc": {
          "da": "Danmarks største mæglerkæde med over 230 butikker og landsdækkende boligudbud.",
          "en": "Denmark's largest estate agent chain with 230+ offices and comprehensive national coverage."
        },
        "location": "Hele Danmark",
        "tags": [
          "salg"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Danmarks Største Kæde",
          "en": "Largest Agency Network"
        }
      },
      {
        "id": "home",
        "name": "Home.dk",
        "url": "https://home.dk",
        "desc": {
          "da": "Kendt mæglerkæde med ~180 butikker, tilknyttet Realkredit Danmark og Danske Bank.",
          "en": "Well-known agency chain with ~180 local branches affiliated with Realkredit Danmark."
        },
        "location": "Hele Danmark",
        "tags": [
          "salg"
        ],
        "isVerified": true
      },
      {
        "id": "nybolig",
        "name": "Nybolig.dk",
        "url": "https://www.nybolig.dk",
        "desc": {
          "da": "Landsomfattende mæglerkæde i tæt samarbejde med Nykredit og Totalkredit.",
          "en": "Nationwide real estate chain working closely with Nykredit and Totalkredit."
        },
        "location": "Hele Danmark",
        "tags": [
          "salg"
        ],
        "isVerified": true
      },
      {
        "id": "danbolig",
        "name": "DanBolig.dk",
        "url": "https://www.danbolig.dk",
        "desc": {
          "da": "Landsomfattende mæglerkæde med stærk lokal forankring, tilknyttet Nordea.",
          "en": "Nationwide broker chain with strong local roots, affiliated with Nordea."
        },
        "location": "Hele Danmark",
        "tags": [
          "salg"
        ],
        "isVerified": true
      },
      {
        "id": "realmaeglerne",
        "name": "RealMæglerne.dk",
        "url": "https://www.realmaeglerne.dk",
        "desc": {
          "da": "Kæde af uafhængige ejendomsmæglere med personlig service og dybdegående lokalkendskab.",
          "en": "Chain of independent real estate brokers committed to personal service and local insight."
        },
        "location": "Hele Danmark",
        "tags": [
          "salg"
        ],
        "isVerified": true
      },
      {
        "id": "lokalbolig",
        "name": "Lokalbolig.dk",
        "url": "https://www.lokalbolig.dk",
        "desc": {
          "da": "Lokal forankret mæglerkæde med passion for professionelt boligsalg og rådgivning.",
          "en": "Locally rooted broker agency focused on high-touch client advisory and property marketing."
        },
        "location": "Hele Danmark",
        "tags": [
          "salg"
        ],
        "isVerified": true
      },
      {
        "id": "estate",
        "name": "Estate.dk",
        "url": "https://www.estate.dk",
        "desc": {
          "da": "Landsomfattende mæglerkæde med erfarne ejendomsmæglere og moderne boligpræsentationer.",
          "en": "Nationwide agency with experienced real estate agents and tailored property presentations."
        },
        "location": "Hele Danmark",
        "tags": [
          "salg"
        ],
        "isVerified": true
      },
      {
        "id": "maeglerne",
        "name": "Mæglerne.dk",
        "url": "https://www.maeglerne.dk",
        "desc": {
          "da": "Mæglerkæde med speciale i boligsalg, vurdering og personlig opfølgning.",
          "en": "Regional real estate network specialized in property sales, valuations, and client advisory."
        },
        "location": "Hele Danmark",
        "tags": [
          "salg"
        ],
        "isVerified": true
      },
      {
        "id": "estaldo",
        "name": "Estaldo.dk",
        "url": "https://www.estaldo.com",
        "desc": {
          "da": "Digital mæglerkæde med fast lavt salær og fuld online håndtering af bolighandlen.",
          "en": "Digital real estate agency offering a low fixed fee and modern online transaction management."
        },
        "location": "Hele Danmark",
        "tags": [
          "salg"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Digital mægler",
          "en": "Digital Broker"
        }
      },
      {
        "id": "robinhus",
        "name": "Robinhus.dk",
        "url": "https://www.robinhus.dk",
        "desc": {
          "da": "Mæglerkæde med medsalg og fast lavt salær, hvor sælger selv fremviser boligen.",
          "en": "Hybrid estate agency where sellers show their home, saving substantial commission fees."
        },
        "location": "Hele Danmark",
        "tags": [
          "salg"
        ],
        "isVerified": true
      },
      {
        "id": "nordichousing",
        "name": "NordicHousing.dk",
        "url": "https://www.nordichousing.dk",
        "desc": {
          "da": "Udlejningsbureau med boliger til expats, familier og virksomheder i hele Danmark.",
          "en": "High-end rental and corporate relocation agency managing premium housing across Denmark."
        },
        "location": "Hele Danmark",
        "tags": [
          "privat"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Udlejningsbureau",
          "en": "Relocation Bureau"
        }
      }
    ]
  },
  {
    "id": "almene-boligorganisationer",
    "categoryNumber": 3,
    "title": {
      "da": "3. Almene boligorganisationer",
      "en": "3. Public Housing Associations"
    },
    "description": {
      "da": "De 23 største almene boligselskaber og administrationsorganisationer med over 500.000 betalbare boliger.",
      "en": "The 23 largest non-profit housing associations managing over 500,000 affordable rental homes."
    },
    "iconName": "Building2",
    "items": [
      {
        "id": "kab",
        "name": "KAB-bolig.dk",
        "url": "https://www.kab-bolig.dk",
        "desc": {
          "da": "Københavns Almindelige Boligselskab – administrerer over 60.000 almene boliger i Hovedstaden.",
          "en": "Largest social housing association in Greater Copenhagen managing 60,000+ rental apartments."
        },
        "location": "Hovedstaden",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "60.000+ Boliger",
          "en": "60,000+ Homes"
        }
      },
      {
        "id": "aab",
        "name": "AAB.dk",
        "url": "https://aab.dk",
        "desc": {
          "da": "Arbejdernes Andels-Boligforening – Danmarks ældste almene boligforening med ca. 20.000 boliger.",
          "en": "Denmark's oldest social housing association managing approximately 20,000 apartments."
        },
        "location": "Hovedstaden & Sjælland",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true
      },
      {
        "id": "fsb",
        "name": "fsb.dk",
        "url": "https://www.fsb.dk",
        "desc": {
          "da": "Foreningen Socialt Boligbyggeri – over 13.000 almene boliger i Københavns Kommune.",
          "en": "Major non-profit housing provider in Copenhagen municipality managing 13,000+ flats."
        },
        "location": "København",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true
      },
      {
        "id": "treb",
        "name": "3B.dk",
        "url": "https://www.3b.dk",
        "desc": {
          "da": "Boligforeningen 3B – almen boligorganisation med 12.000+ boliger i Hovedstadsområdet.",
          "en": "Prominent social housing provider managing 12,000+ apartments in Greater Copenhagen."
        },
        "location": "Hovedstaden",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true
      },
      {
        "id": "bo-vest",
        "name": "Bo-Vest.dk",
        "url": "https://bo-vest.dk",
        "desc": {
          "da": "Administrationsorganisation for Albertslund Boligselskab, Bo-Vita, Tranemosegård og Vridsløselille Andelsboligforening.",
          "en": "Housing management group managing 15,000+ social flats across Western Copenhagen."
        },
        "location": "Vestegnen",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true
      },
      {
        "id": "vibo",
        "name": "VIBO.dk",
        "url": "https://www.vibo.dk",
        "desc": {
          "da": "Boligforeningen VIBO – alsidige almene familie-, ungdoms- og seniorboliger i København og Nordsjælland.",
          "en": "Social housing association offering diverse family and youth flats in Copenhagen and North Zealand."
        },
        "location": "Hovedstaden & Nordsjælland",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true
      },
      {
        "id": "domea",
        "name": "Domea.dk",
        "url": "https://www.domea.dk",
        "desc": {
          "da": "Administrationsorganisation med over 80.000 boliger fordelt over mere end 100 boligselskaber i Danmark.",
          "en": "Nationwide housing management organization servicing 80,000+ homes across Denmark."
        },
        "location": "Hele Danmark",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "80.000+ Boliger",
          "en": "80,000+ Homes"
        }
      },
      {
        "id": "dab",
        "name": "DABbolig.dk",
        "url": "https://www.dabbolig.dk",
        "desc": {
          "da": "Dansk Almennyttigt Boligselskab – administrerer boliger for mere end 30 almene boligselskaber og kommuner.",
          "en": "Large Danish non-profit housing association managing properties for 30+ affiliated housing funds."
        },
        "location": "Hele Danmark",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true
      },
      {
        "id": "lejerbo",
        "name": "Lejerbo.dk",
        "url": "https://www.lejerbo.dk",
        "desc": {
          "da": "Landsomfattende boligorganisation med ca. 38.000 almene boliger i hele Danmark.",
          "en": "Nationwide non-profit housing association overseeing 38,000+ apartments from coast to coast."
        },
        "location": "Hele Danmark",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true
      },
      {
        "id": "bosj",
        "name": "Bosj.dk",
        "url": "https://www.bosj.dk",
        "desc": {
          "da": "Boligselskabet Sjælland – administrerer over 12.500 almene boliger på Sjælland.",
          "en": "Large regional housing association managing 12,500+ affordable homes throughout Zealand."
        },
        "location": "Sjælland",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true
      },
      {
        "id": "aarhusbolig",
        "name": "Aarhusbolig.dk",
        "url": "https://www.aarhusbolig.dk",
        "desc": {
          "da": "Fælles venteliste for samtlige almene boligorganisationer i Aarhus (over 45.000 boliger).",
          "en": "Unified central waitlist portal covering all public housing associations in Aarhus (45,000+ flats)."
        },
        "location": "Aarhus & Midtjylland",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Fællesliste Aarhus",
          "en": "Unified Aarhus List"
        }
      },
      {
        "id": "brabrand",
        "name": "Brabrand-boligforening.dk",
        "url": "https://www.bbbo.dk",
        "desc": {
          "da": "Brabrand Boligforening – stor almen boligorganisation i det vestlige Aarhus med over 5.000 boliger.",
          "en": "Major public housing association in Western Aarhus offering diverse family and youth flats."
        },
        "location": "Aarhus",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true
      },
      {
        "id": "fabbo",
        "name": "Fabbo.dk",
        "url": "https://fabbo.dk",
        "desc": {
          "da": "Fyns Almennyttige Boligselskab – over 9.000 attraktive lejeboliger fordelt over hele Fyn.",
          "en": "Funen's premier public housing association managing 9,000+ rental properties."
        },
        "location": "Fyn",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true
      },
      {
        "id": "alabu",
        "name": "Alabubolig.dk",
        "url": "https://alabubolig.dk",
        "desc": {
          "da": "Alabu Bolig – almen boligorganisation i Aalborg og omegn med over 6.000 lejemål.",
          "en": "Public housing association in Aalborg and surrounding municipalities with 6,000+ units."
        },
        "location": "Nordjylland",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true
      },
      {
        "id": "plusbolig",
        "name": "Plusbolig.dk",
        "url": "https://plusbolig.dk",
        "desc": {
          "da": "Plus Bolig – almen boligorganisation med moderne familie- og ungdomsboliger i Aalborg.",
          "en": "Modern public housing society in Aalborg managing thousands of affordable family apartments."
        },
        "location": "Nordjylland",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true
      },
      {
        "id": "dades",
        "name": "Dades.dk",
        "url": "https://www.dades.dk",
        "desc": {
          "da": "DADES – et af Danmarks største private ejendomsinvesteringsselskaber med boliger og erhverv.",
          "en": "One of Denmark's largest real estate investment companies owning extensive residential portfolios."
        },
        "location": "Hele Danmark",
        "tags": [
          "privat"
        ],
        "isVerified": true
      },
      {
        "id": "fa2009",
        "name": "Fa2009.dk",
        "url": "https://fa2009.dk",
        "desc": {
          "da": "Fællesadministrationen af 2009 – administration af almene boligforeninger i Hovedstadsområdet.",
          "en": "Shared administration group servicing social housing cooperatives in the capital region."
        },
        "location": "Hovedstaden",
        "tags": [
          "almen"
        ],
        "isVerified": true
      },
      {
        "id": "bl-danmark",
        "name": "Bl.dk",
        "url": "https://bl.dk",
        "desc": {
          "da": "BL Danmarks Almene Boliger – interesse- og brancheorganisation for Danmarks almene boligsektor.",
          "en": "The national federation of non-profit housing providers in Denmark."
        },
        "location": "Hele Danmark",
        "tags": [
          "almen",
          "radgivning"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Brancheorganisation",
          "en": "National Federation"
        }
      },
      {
        "id": "almenbo",
        "name": "Almenbo.dk",
        "url": "https://almenbo.dk",
        "desc": {
          "da": "Almenbo – boligselskab med moderne almene boliger i Måløv, Ballerup og Københavns omegn.",
          "en": "Social housing association offering modern homes across western suburban Copenhagen."
        },
        "location": "Hovedstaden",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true
      },
      {
        "id": "ubsbolig",
        "name": "Ubsbolig.dk",
        "url": "https://ubsbolig.dk",
        "desc": {
          "da": "De Unges Almene Boligselskab – specialiseret i opførelse og drift af ungdomsboliger.",
          "en": "Specialized public youth housing association providing student flats and dorms."
        },
        "location": "Hele Danmark",
        "tags": [
          "almen",
          "studie"
        ],
        "isVerified": true
      },
      {
        "id": "domibus",
        "name": "Domibus.dk",
        "url": "https://domibus.dk",
        "desc": {
          "da": "DOMIBUS – administrationsselskab for almene boligorganisationer og ejendomsselskaber.",
          "en": "Management society providing professional property administration for housing funds."
        },
        "location": "Hele Danmark",
        "tags": [
          "almen"
        ],
        "isVerified": true
      },
      {
        "id": "kristiansdal",
        "name": "Kristiansdal.dk",
        "url": "https://kristiansdal.dk",
        "desc": {
          "da": "Boligforeningen Kristiansdal – almen boligforening i Odense med over 4.000 lejemål.",
          "en": "Prominent non-profit housing association in Odense managing 4,000+ flats and homes."
        },
        "location": "Fyn",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true
      },
      {
        "id": "civica",
        "name": "Civica.dk",
        "url": "https://civica.dk",
        "desc": {
          "da": "CIVICA – Fyns største almene boligselskab med over 12.000 boliger i Odense og omegn.",
          "en": "Funen's largest public housing society with 12,000+ homes and student residences in Odense."
        },
        "location": "Fyn",
        "tags": [
          "almen",
          "venteliste"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Fyns Største",
          "en": "Funen's Largest"
        }
      }
    ]
  },
  {
    "id": "kollegier-ungdomsboliger",
    "categoryNumber": 4,
    "title": {
      "da": "4. Kollegier & ungdomsboliger",
      "en": "4. Dorms & Student Housing"
    },
    "description": {
      "da": "De 15 vigtigste kollegier, centrale studieboligportaler og gratis ungdomsboliganvisninger i Danmark.",
      "en": "The 15 key student halls, central youth housing portals, and dorm directories in Denmark."
    },
    "iconName": "GraduationCap",
    "items": [
      {
        "id": "kkik",
        "name": "Kollegierneskontor.dk",
        "url": "https://kollegierneskontor.dk",
        "desc": {
          "da": "KKIK Kollegiernes Kontor i København – officiel central anvisning til kollegier og ungdomsboliger.",
          "en": "Central student accommodation agency managing admissions to major Copenhagen dorms."
        },
        "location": "København & Hovedstaden",
        "tags": [
          "studie",
          "gratis-opskrivning"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Central anvisning",
          "en": "Central Anvisning"
        }
      },
      {
        "id": "ungdomsboliger-dk",
        "name": "Ungdomsboliger.dk",
        "url": "https://ungdomsboliger.dk",
        "desc": {
          "da": "Ungdomsboliger i Danmark – landsdækkende portal og guide til SU-venlige boliger for unge.",
          "en": "Danish youth housing directory listing affordable student rooms and studio flats nationwide."
        },
        "location": "Hele Danmark",
        "tags": [
          "studie"
        ],
        "isVerified": true
      },
      {
        "id": "findkollegie",
        "name": "Findkollegie.dk",
        "url": "https://findkollegie.dk",
        "desc": {
          "da": "Find kollegier – søgemaskine til kollegieværelser og kollegier i København, Aarhus, Odense og Aalborg.",
          "en": "Search engine indexing student dormitories and room openings in all major Danish university cities."
        },
        "location": "Hele Danmark",
        "tags": [
          "studie"
        ],
        "isVerified": true
      },
      {
        "id": "kbh-kollegier",
        "name": "Kbh-kollegier.dk",
        "url": "https://kbh-kollegier.dk",
        "desc": {
          "da": "Kollegier i København – grundigt overblik over samtlige kollegier, optagelseskrav og ansøgningsfrister.",
          "en": "Comprehensive directory of student dorms in Copenhagen detailing eligibility rules and deadlines."
        },
        "location": "København",
        "tags": [
          "studie"
        ],
        "isVerified": true
      },
      {
        "id": "s-dk",
        "name": "S.dk",
        "url": "https://s.dk",
        "desc": {
          "da": "Studieboliger og kollegieværelser i Hovedstadsregionen med fælles gratis digital ansøgning.",
          "en": "Coordinated centralized portal for youth residences and student dorms across Greater Copenhagen."
        },
        "location": "Hovedstaden",
        "tags": [
          "studie",
          "gratis-opskrivning"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Gratis Opskrivning",
          "en": "Free Registration"
        }
      },
      {
        "id": "kollegiekontoret-aarhus",
        "name": "Kollegiekontoret.dk",
        "url": "https://kollegiekontoret.dk",
        "desc": {
          "da": "Kollegiekontoret i Aarhus – formidling af tusindvis af kollegieværelser tæt på Aarhus Universitet.",
          "en": "Central housing bureau managing non-profit student dorms across Aarhus."
        },
        "location": "Aarhus",
        "tags": [
          "studie",
          "gratis-opskrivning"
        ],
        "isVerified": true
      },
      {
        "id": "ungdomsboligaarhus",
        "name": "Ungdomsboligaarhus.dk",
        "url": "https://ungdomsboligaarhus.dk",
        "desc": {
          "da": "Ungdomsbolig Aarhus – fælles gratis anvisning af alle studie- og ungdomsboliger i Aarhus Kommune.",
          "en": "Unified municipal assignment service for all student and apprentice housing in Aarhus."
        },
        "location": "Aarhus",
        "tags": [
          "studie",
          "gratis-opskrivning"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "100% Gratis",
          "en": "100% Free"
        }
      },
      {
        "id": "studiebolig-odense",
        "name": "Studiebolig-odense.dk",
        "url": "https://studiebolig-odense.dk",
        "desc": {
          "da": "Studiebolig Odense – samlet gratis anvisningsportal for samtlige ungdomsboliger og kollegier på Fyn.",
          "en": "Centralized non-profit portal for every student residence and dorm in Odense. Entirely free."
        },
        "location": "Fyn & Odense",
        "tags": [
          "studie",
          "gratis-opskrivning"
        ],
        "isVerified": true
      },
      {
        "id": "aku-aalborg",
        "name": "Aku-aalborg.dk",
        "url": "https://aku-aalborg.dk",
        "desc": {
          "da": "AKU-Aalborg – Anvisning af kollegie- og ungdomsboliger for studerende i Aalborg og Nordjylland.",
          "en": "Central allocation agency for student residences and youth housing in Aalborg."
        },
        "location": "Aalborg & Nordjylland",
        "tags": [
          "studie",
          "gratis-opskrivning"
        ],
        "isVerified": true
      },
      {
        "id": "kollegieboligselskabet",
        "name": "Kollegieboligselskabet.dk",
        "url": "https://kollegieboligselskabet.dk",
        "desc": {
          "da": "Kollegieboligselskabet – administration og anvisning af almene kollegieboliger.",
          "en": "Management association overseeing non-profit student housing facilities."
        },
        "location": "Hele Danmark",
        "tags": [
          "studie"
        ],
        "isVerified": true
      },
      {
        "id": "vartovkollegiet",
        "name": "Vartovkollegiet.dk",
        "url": "https://vartovkollegiet.dk",
        "desc": {
          "da": "Vartovkollegiet – traditionsrigt kollegium centralt beliggende ved Rådhuspladsen i København.",
          "en": "Historic and esteemed collegiate dorm situated right by City Hall Square in central Copenhagen."
        },
        "location": "København C",
        "tags": [
          "studie"
        ],
        "isVerified": true
      },
      {
        "id": "borchs-kollegium",
        "name": "Borchs-kollegium.dk",
        "url": "https://www.borchen.dk",
        "desc": {
          "da": "Borchs Kollegium – et af Danmarks ældste kollegier i Store Kannikestræde, grundlagt i 1691.",
          "en": "One of Denmark's oldest collegiate residences, founded in 1691 in the Latin Quarter."
        },
        "location": "København C",
        "tags": [
          "studie"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Grundlagt 1691",
          "en": "Est. 1691"
        }
      },
      {
        "id": "valkendorfs-kollegiet",
        "name": "Valkendorfs-kollegiet.dk",
        "url": "https://valkendorf.dk",
        "desc": {
          "da": "Valkendorfs Kollegium – Danmarks og Nordens ældste kollegium, grundlagt i 1588 i København.",
          "en": "The oldest student hall of residence in the Nordic countries, founded in 1588."
        },
        "location": "København C",
        "tags": [
          "studie"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Nordens Ældste",
          "en": "Nordic Oldest"
        }
      },
      {
        "id": "tietgenkollegiet",
        "name": "Tietgenkollegiet.dk",
        "url": "https://tietgenkollegiet.dk",
        "desc": {
          "da": "Tietgen Kollegiet – verdenskendt cirkulært kollegium i Ørestad med unikt studiefællesskab.",
          "en": "World-renowned circular student residence in Ørestad renowned for community living."
        },
        "location": "København S",
        "tags": [
          "studie"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Ikonisk Arkitektur",
          "en": "Iconic Design"
        }
      },
      {
        "id": "studentergaarden",
        "name": "Studentergaarden.dk",
        "url": "https://studentergaarden.dk",
        "desc": {
          "da": "Studentergården – historisk kollegium på Tagensvej på Nørrebro for universitetsstuderende.",
          "en": "Historic academic residence hall on Nørrebro serving university students since 1923."
        },
        "location": "København N",
        "tags": [
          "studie"
        ],
        "isVerified": true
      }
    ]
  },
  {
    "id": "ferieboliger-sommerhuse",
    "categoryNumber": 5,
    "title": {
      "da": "5. Ferieboliger & sommerhuse",
      "en": "5. Holiday Homes & Cottages"
    },
    "description": {
      "da": "De 10 førende ferieboligudlejere, sommerhusportaler og ferieparker i Danmark.",
      "en": "The 10 premier holiday home rental agencies, vacation cottage portals, and holiday parks in Denmark."
    },
    "iconName": "Home",
    "items": [
      {
        "id": "novasol",
        "name": "Novasol.dk",
        "url": "https://www.novasol.dk",
        "desc": {
          "da": "Stor feriehusudlejer med tusindvis af sommerhuse i alle Danmarks populære ferieregioner.",
          "en": "Leading European vacation rental agency with thousands of holiday cottages across Denmark."
        },
        "location": "Hele Danmark",
        "tags": [
          "ferie"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Danmarks Største",
          "en": "Largest Selection"
        }
      },
      {
        "id": "dancenter",
        "name": "Dancenter.dk",
        "url": "https://www.dancenter.dk",
        "desc": {
          "da": "Feriehusudlejning i hele Danmark med Danland feriecentre og kystnære sommerhuse.",
          "en": "Holiday home rentals across Danish coasts and popular seaside Danland vacation resorts."
        },
        "location": "Hele Danmark",
        "tags": [
          "ferie"
        ],
        "isVerified": true
      },
      {
        "id": "sologstrand",
        "name": "Sologstrand.dk",
        "url": "https://www.sologstrand.dk",
        "desc": {
          "da": "Sol og Strand Feriehusudlejning – fondsejet dansk udlejer af kvalitetssommerhuse.",
          "en": "Foundation-owned Danish holiday home rental company supporting charitable causes."
        },
        "location": "Hele Danmark",
        "tags": [
          "ferie"
        ],
        "isVerified": true
      },
      {
        "id": "feriepartner",
        "name": "Feriepartner.dk",
        "url": "https://www.feriepartner.dk",
        "desc": {
          "da": "Feriepartner – Danmarks største kæde af lokale, selvstændige feriehusbureauer.",
          "en": "Denmark's largest chain of locally rooted, independent holiday home agencies."
        },
        "location": "Hele Danmark",
        "tags": [
          "ferie"
        ],
        "isVerified": true
      },
      {
        "id": "landal",
        "name": "Landal.dk",
        "url": "https://www.landal.dk",
        "desc": {
          "da": "Landal GreenParks – ferieparker med moderne ferieboliger og indendørs vandlande i Danmark.",
          "en": "Family holiday parks in Danish nature equipped with holiday homes and water attractions."
        },
        "location": "Hele Danmark",
        "tags": [
          "ferie"
        ],
        "isVerified": true
      },
      {
        "id": "ferieboligsiden",
        "name": "Ferieboligsiden.dk",
        "url": "https://ferieboligsiden.dk",
        "desc": {
          "da": "Ferieboligsiden – privat udlejning og formidling af sommerhuse og ferielejligheder.",
          "en": "Holiday portal showcasing private summer cottages and vacation flats in Denmark."
        },
        "location": "Hele Danmark",
        "tags": [
          "ferie"
        ],
        "isVerified": true
      },
      {
        "id": "ferieboligweb",
        "name": "Ferieboligweb.dk",
        "url": "https://www.ferieboligweb.dk",
        "desc": {
          "da": "Ferieboligweb – direkte kontakt mellem lejer og sommerhusejer uden fordyrende mellemled.",
          "en": "Direct communication between holiday home owners and vacationers with no middlemen."
        },
        "location": "Hele Danmark",
        "tags": [
          "ferie"
        ],
        "isVerified": true
      },
      {
        "id": "teambornholm",
        "name": "Teambornholm.dk",
        "url": "https://teambornholm.dk",
        "desc": {
          "da": "Team Bornholm – specialiseret i ferielejligheder, sommerhuse og pakkerejser på solskinsøen Bornholm.",
          "en": "Bornholm specialist offering curated holiday flats, seaside cottages, and ferry packages."
        },
        "location": "Bornholm",
        "tags": [
          "ferie"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Bornholm Specialist",
          "en": "Bornholm Specialist"
        }
      },
      {
        "id": "dronningensferieby",
        "name": "Dronningensferieby.dk",
        "url": "https://dronningensferieby.dk",
        "desc": {
          "da": "Dronningens Ferieby – fuldt tilgængelige ferieboliger i naturskønne omgivelser ved Grenaa Strand.",
          "en": "Fully accessible holiday village in Grenaa designed for guests of all physical abilities."
        },
        "location": "Østjylland",
        "tags": [
          "ferie"
        ],
        "isVerified": true
      },
      {
        "id": "dsr-fritidsboliger",
        "name": "Dsr-fritidsboliger.dk",
        "url": "https://dsr-fritidsboliger.dk",
        "desc": {
          "da": "DSR Fritidsboliger – ferieboliger og sommerhuse ejet af Dansk Sygeplejeråd.",
          "en": "Holiday homes and vacation cottages owned and managed by the Danish Nurses Organization."
        },
        "location": "Hele Danmark",
        "tags": [
          "ferie"
        ],
        "isVerified": true
      }
    ]
  },
  {
    "id": "erhvervslejemaal",
    "categoryNumber": 6,
    "title": {
      "da": "6. Erhvervslejemål",
      "en": "6. Commercial Properties"
    },
    "description": {
      "da": "De 8 førende portaler og mæglere til kontor, butik, lager og erhvervsejendomme.",
      "en": "The 8 premier portals and commercial brokers for office space, retail, warehouses, and investments."
    },
    "iconName": "Briefcase",
    "items": [
      {
        "id": "lokalebasen",
        "name": "Lokalebasen.dk",
        "url": "https://www.lokalebasen.dk",
        "desc": {
          "da": "Erhvervslejemål, kontorhoteller, lagre og butikslokaler i alle danske byer.",
          "en": "Extensive commercial rental portal indexing offices, coworking spaces, and retail shops."
        },
        "location": "Hele Danmark",
        "tags": [
          "erhverv"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Kontor & Erhverv",
          "en": "Offices & Commercial"
        }
      },
      {
        "id": "ejendomstorvet",
        "name": "Ejendomstorvet.dk",
        "url": "https://www.ejendomstorvet.dk",
        "desc": {
          "da": "Erhvervsejendomme og lokaler til leje og salg samlet fra landets førende erhvervsmæglere.",
          "en": "Denmark's official commercial real estate portal gathering listings from accredited brokers."
        },
        "location": "Hele Danmark",
        "tags": [
          "erhverv"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Erhvervsportal",
          "en": "Commercial Portal"
        }
      },
      {
        "id": "colliers",
        "name": "Colliers.dk",
        "url": "https://www.colliers.com/da-dk",
        "desc": {
          "da": "Erhvervsmægler med global rækkevidde og rådgivning om investeringsejendomme og udlejning.",
          "en": "Leading commercial real estate advisory firm specializing in property investments and leasing."
        },
        "location": "Hele Danmark",
        "tags": [
          "erhverv"
        ],
        "isVerified": true
      },
      {
        "id": "cbre",
        "name": "CBRE.dk",
        "url": "https://www.cbre.dk",
        "desc": {
          "da": "Erhvervsmægler og rådgiver om erhvervsejendomme, projektudvikling og erhvervslejemål.",
          "en": "Global commercial real estate services firm providing comprehensive Danish advisory."
        },
        "location": "Hele Danmark",
        "tags": [
          "erhverv"
        ],
        "isVerified": true
      },
      {
        "id": "deaserhverv",
        "name": "DEASerhverv.dk",
        "url": "https://deaserhverv.dk",
        "desc": {
          "da": "DEAS Erhverv – administration og udlejning af erhvervslokaler for institutionelle investorer.",
          "en": "DEAS commercial leasing and property management for institutional and private investors."
        },
        "location": "Hele Danmark",
        "tags": [
          "erhverv"
        ],
        "isVerified": true
      },
      {
        "id": "dn-erhverv",
        "name": "Dn-erhverv.dk",
        "url": "https://dn-erhverv.dk",
        "desc": {
          "da": "DN Erhverv – uafhængig erhvervsmægler med speciale i salg, udlejning og investeringsejendomme.",
          "en": "Independent commercial real estate agency specializing in sales, leasing, and valuations."
        },
        "location": "Hele Danmark",
        "tags": [
          "erhverv"
        ],
        "isVerified": true
      },
      {
        "id": "dal",
        "name": "Dal.dk",
        "url": "https://dal.dk",
        "desc": {
          "da": "DAL Erhvervsmægler – speciale i salg, udlejning og vurdering af erhvervsejendomme i Storkøbenhavn.",
          "en": "DAL commercial agency specialized in sales, leases, and appraisals across Copenhagen."
        },
        "location": "København & Sjælland",
        "tags": [
          "erhverv"
        ],
        "isVerified": true
      },
      {
        "id": "homeerhverv",
        "name": "Homeerhverv.dk",
        "url": "https://homeerhverv.dk",
        "desc": {
          "da": "Home Erhvervscenter – landsdækkende erhvervsmæglere med fokus på butik, lager og kontorer.",
          "en": "Commercial arm of Home agency offering specialized guidance on business properties nationwide."
        },
        "location": "Hele Danmark",
        "tags": [
          "erhverv"
        ],
        "isVerified": true
      }
    ]
  },
  {
    "id": "raadgivning-jura",
    "categoryNumber": 7,
    "title": {
      "da": "7. Rådgivning, jura & interesseorganisationer",
      "en": "7. Legal Advisory & Tenant Rights"
    },
    "description": {
      "da": "De 8 centrale organisationer til lejeretlig hjælp, huslejenedsættelse og boligrådgivning.",
      "en": "The 8 central organizations for tenant legal assistance, rent reductions, and housing guidance."
    },
    "iconName": "Scale",
    "items": [
      {
        "id": "bolius",
        "name": "Bolius.dk",
        "url": "https://www.bolius.dk",
        "desc": {
          "da": "Boligejernes Videncenter – uvildig rådgivning om bolig, lejelov, indeklima og boligøkonomi.",
          "en": "Denmark's non-profit knowledge center for homeowners and tenants with impartial advice."
        },
        "location": "Hele Danmark",
        "tags": [
          "radgivning"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Videncenter",
          "en": "Knowledge Center"
        }
      },
      {
        "id": "digura",
        "name": "Digura.dk",
        "url": "https://digura.dk",
        "desc": {
          "da": "Juridisk rådgivning og digital sagsbehandling om lejeret, tilbagebetaling af depositum og huslejetjek.",
          "en": "Digital legal assistance helping tenants challenge unfair rent rates and deposit withholding."
        },
        "location": "Hele Danmark",
        "tags": [
          "radgivning"
        ],
        "isVerified": true
      },
      {
        "id": "lejeblog",
        "name": "Lejeblog.dk",
        "url": "https://lejeblog.dk",
        "desc": {
          "da": "Blog og juridisk vidensbase om lejekontrakter, varsling af huslejestigninger og opsigelser.",
          "en": "Educational portal and blog exploring Danish tenancy legislation and tenant obligations."
        },
        "location": "Hele Danmark",
        "tags": [
          "radgivning"
        ],
        "isVerified": true
      },
      {
        "id": "ejendomsforeningen",
        "name": "Ejendomsforeningen.dk",
        "url": "https://ejendomdanmark.dk",
        "desc": {
          "da": "EjendomDanmark (tidl. Ejendomsforeningen Danmark) – erhvervsorganisationen for ejendomsbranchen.",
          "en": "EjendomDanmark – professional trade organization representing landlords and property firms."
        },
        "location": "Hele Danmark",
        "tags": [
          "radgivning"
        ],
        "isVerified": true
      },
      {
        "id": "llo",
        "name": "Llo.dk",
        "url": "https://llo.dk",
        "desc": {
          "da": "Lejernes LO – Danmarks største lejerorganisation for lejeres rettigheder og juridisk bistand.",
          "en": "Denmark's premier tenant union protecting tenant rights and offering legal representation."
        },
        "location": "Hele Danmark",
        "tags": [
          "radgivning"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Lejerorganisation",
          "en": "Tenant Union"
        }
      },
      {
        "id": "danskeudlejere",
        "name": "Danskeudlejere.dk",
        "url": "https://danskeudlejere.dk",
        "desc": {
          "da": "Danske Udlejere – brancheforening for private udlejere af bolig- og erhvervsejendomme.",
          "en": "Danish association for private residential and commercial landlords."
        },
        "location": "Hele Danmark",
        "tags": [
          "radgivning"
        ],
        "isVerified": true
      },
      {
        "id": "dklf",
        "name": "Dklf.dk",
        "url": "https://dklf.dk",
        "desc": {
          "da": "Danmarks Lejerforeninger – rådgivning og bistand til lejere i tvister med udlejere.",
          "en": "Tenant federation providing counseling and case support during landlord disputes."
        },
        "location": "Hele Danmark",
        "tags": [
          "radgivning"
        ],
        "isVerified": true
      },
      {
        "id": "advokatsamfundet",
        "name": "Advokatsamfundet.dk",
        "url": "https://www.advokatsamfundet.dk",
        "desc": {
          "da": "Advokatsamfundet – find autoriserede advokater med speciale i lejeret og fast ejendom.",
          "en": "Official Danish Bar and Law Society directory to find certified property law specialists."
        },
        "location": "Hele Danmark",
        "tags": [
          "radgivning"
        ],
        "isVerified": true
      }
    ]
  },
  {
    "id": "offentlige-myndigheder",
    "categoryNumber": 8,
    "title": {
      "da": "8. Offentlige myndigheder",
      "en": "8. Public Authorities"
    },
    "description": {
      "da": "De 5 centrale offentlige myndigheder og institutioner for boligstøtte, byggeri og planlægning.",
      "en": "The 5 central public authorities and governmental bodies for housing subsidies and planning."
    },
    "iconName": "FileText",
    "items": [
      {
        "id": "borger-dk",
        "name": "Borger.dk",
        "url": "https://www.borger.dk/bolig-og-flytning",
        "desc": {
          "da": "Offentlig borgerportal – alt om boligstøtte, flyttemeddelelse, folkeregister og boliglån.",
          "en": "Official public portal providing guidance on housing subsidies, moving notices, and civil registration."
        },
        "location": "Hele Danmark",
        "tags": [
          "myndighed"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Officiel Borgerportal",
          "en": "Official Portal"
        }
      },
      {
        "id": "udbetalingdanmark",
        "name": "Udbetalingdanmark.dk",
        "url": "https://www.atp.dk/udbetaling-danmark",
        "desc": {
          "da": "Udbetaling Danmark – udbetaler og administrerer boligstøtte til lejere i hele landet.",
          "en": "Public authority administering and paying monthly housing benefits (boligstøtte) to tenants."
        },
        "location": "Hele Danmark",
        "tags": [
          "myndighed"
        ],
        "highlightBadge": {
          "da": "Boligstøtte",
          "en": "Housing Subsidies"
        }
      },
      {
        "id": "bygst",
        "name": "Bygst.dk",
        "url": "https://bygst.dk",
        "desc": {
          "da": "Bygningsstyrelsen – statens ejendomsvirksomhed og bygherre for universiteter og statslige institutioner.",
          "en": "The Danish Building and Property Agency managing state real estate and university facilities."
        },
        "location": "Hele Danmark",
        "tags": [
          "myndighed"
        ],
        "isVerified": true
      },
      {
        "id": "bpst",
        "name": "Bpst.dk",
        "url": "https://bpst.dk",
        "desc": {
          "da": "Bolig- og Planstyrelsen – statslig myndighed for byggeri, lejelovgivning og fysisk planlægning.",
          "en": "Danish Agency for Housing and Planning governing tenancy laws and urban developments."
        },
        "location": "Hele Danmark",
        "tags": [
          "myndighed"
        ],
        "isVerified": true
      },
      {
        "id": "gi",
        "name": "Gi.dk",
        "url": "https://gi.dk",
        "desc": {
          "da": "Grundejernes Investeringsfond – finansiering, byfornyelse og vedligeholdelse af private udlejningsejendomme.",
          "en": "Property Owners Investment Fund financing maintenance and renovation in private rental housing."
        },
        "location": "Hele Danmark",
        "tags": [
          "myndighed"
        ],
        "isVerified": true
      }
    ]
  },
  {
    "id": "andelsboliger",
    "categoryNumber": 9,
    "title": {
      "da": "9. Andelsboliger",
      "en": "9. Cooperative Housing (Andelsboliger)"
    },
    "description": {
      "da": "De 2 centrale organisationer og markedspladser for andelsboliger i Danmark.",
      "en": "The 2 main organizations and marketplace portals for cooperative housing in Denmark."
    },
    "iconName": "Repeat",
    "items": [
      {
        "id": "abf",
        "name": "Abf-rep.dk",
        "url": "https://www.abf-rep.dk",
        "desc": {
          "da": "Andelsboligforeningernes Fællesrepræsentation – landsforening og rådgivning for andelshavere.",
          "en": "Federation of Danish Housing Cooperatives providing legal counsel and association guidelines."
        },
        "location": "Hele Danmark",
        "tags": [
          "andel",
          "radgivning"
        ],
        "isVerified": true,
        "highlightBadge": {
          "da": "Andelsforening",
          "en": "Co-op Federation"
        }
      },
      {
        "id": "andelsboligforeninger-dk",
        "name": "Andelsboligforeninger.dk",
        "url": "https://andelsboligforeninger.dk",
        "desc": {
          "da": "Portalen for Danmarks andelsboligforeninger med råd, vejledning og overblik over andelsmarkedet.",
          "en": "Portal for Danish housing co-operatives offering guidance and market insights."
        },
        "location": "Hele Danmark",
        "tags": [
          "andel"
        ],
        "isVerified": true
      }
    ]
  }
];
