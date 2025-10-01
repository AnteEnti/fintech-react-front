import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { updateMetaTags } from '../utils/seo';

interface StaticPageProps {
  pageKey: 'about' | 'contact' | 'faq' | 'legal';
}

const staticContent = {
  about: {
    title: { en: 'About Us', te: 'మా గురించి' },
    description: { en: 'Learn about the mission and vision of the Telugu Finance Platform. Our goal is to make financial literacy accessible to everyone.', te: 'తెలుగు ఫైనాన్స్ ప్లాట్‌ఫారమ్ యొక్క లక్ష్యం మరియు దృష్టి గురించి తెలుసుకోండి. ఆర్థిక అక్షరాస్యతను అందరికీ అందుబాటులోకి తీసుకురావడమే మా లక్ష్యం.' },
    content: {
      en: 'Welcome to Telugu Finance Platform, your trusted partner in demystifying the world of finance. Our mission is to empower individuals with the knowledge and tools needed to make informed financial decisions. We believe that financial literacy is not a luxury, but a necessity for a secure and prosperous future.\n\nFounded on the principle of "Finance for All," we strive to break down complex financial concepts into simple, accessible, and actionable insights. Whether you are a student starting your financial journey, a professional looking to grow your wealth, or a retiree planning for a peaceful life, our platform is designed for you. We provide content in both English and Telugu to ensure language is never a barrier to financial education.\n\nOur platform features a wide range of resources, including easy-to-use calculators, in-depth articles on investing, budgeting, insurance, and taxes, and practical tips to improve your financial well-being.',
      te: 'తెలుగు ఫైనాన్స్ ప్లాట్‌ఫారమ్‌కు స్వాగతం, ఆర్థిక ప్రపంచాన్ని సులభతరం చేయడంలో మీ విశ్వసనీయ భాగస్వామి. సమాచారంతో కూడిన ఆర్థిక నిర్ణయాలు తీసుకోవడానికి అవసరమైన జ్ఞానం మరియు సాధనాలతో వ్యక్తులను శక్తివంతం చేయడమే మా లక్ష్యం. ఆర్థిక అక్షరాస్యత ఒక విలాసం కాదు, సురక్షితమైన మరియు సంపన్నమైన భవిష్యత్తుకు అవసరం అని మేము నమ్ముతున్నాము.\n\n"అందరి కోసం ఫైనాన్స్" అనే సూత్రంపై స్థాపించబడిన మేము, సంక్లిష్ట ఆర్థిక భావనలను సరళమైన, ప్రాప్యత చేయగల మరియు కార్యాచరణ అంతర్దృష్టులుగా విభజించడానికి ప్రయత్నిస్తాము. మీరు మీ ఆర్థిక ప్రయాణాన్ని ప్రారంభించే విద్యార్థి అయినా, మీ సంపదను పెంచుకోవాలని చూస్తున్న ప్రొఫెషనల్ అయినా, లేదా శాంతియుత జీవితం కోసం ప్రణాళిక వేసుకుంటున్న రిటైర్డ్ అయినా, మా ప్లాట్‌ఫారమ్ మీ కోసం రూపొందించబడింది. ఆర్థిక విద్యకు భాష ఎప్పుడూ అడ్డంకి కాదని నిర్ధారించడానికి మేము ఇంగ్లీష్ మరియు తెలుగు రెండింటిలోనూ కంటెంట్‌ను అందిస్తాము.\n\nమా ప్లాట్‌ఫారమ్ ఉపయోగించడానికి సులభమైన కాలిక్యులేటర్లు, పెట్టుబడి, బడ్జెట్, భీమా మరియు పన్నులపై లోతైన కథనాలు మరియు మీ ఆర్థిక శ్రేయస్సును మెరుగుపరచడానికి ఆచరణాత్మక చిట్కాలతో సహా విస్తృతమైన వనరులను కలిగి ఉంది.',
    },
  },
  contact: {
    title: { en: 'Contact Us', te: 'మమ్మల్ని సంప్రదించండి' },
    description: { en: 'Get in touch with the Telugu Finance Platform team for inquiries, feedback, or partnership opportunities. We are here to help.', te: 'విచారణలు, అభిప్రాయం లేదా భాగస్వామ్య అవకాశాల కోసం తెలుగు ఫైనాన్స్ ప్లాట్‌ఫారమ్ బృందంతో సంప్రదించండి. మేము సహాయం చేయడానికి ఇక్కడ ఉన్నాము.' },
    content: {
      en: 'We value your feedback and are here to help with any questions you may have.\n\nFor general inquiries, feedback, or content suggestions, please email us at:\nsupport@telugufinance.com\n\nFor partnership or media opportunities, please contact:\npartnerships@telugufinance.com\n\nWe strive to respond to all inquiries within 2-3 business days. Your input helps us grow and better serve our community!',
      te: 'మేము మీ అభిప్రాయానికి విలువ ఇస్తాము మరియు మీకు ఏవైనా ప్రశ్నలు ఉంటే సహాయం చేయడానికి ఇక్కడ ఉన్నాము.\n\nసాధారణ విచారణలు, అభిప్రాయం లేదా కంటెంట్ సూచనల కోసం, దయచేసి మాకు ఇక్కడ ఇమెయిల్ చేయండి:\nsupport@telugufinance.com\n\nభాగస్వామ్యం లేదా మీడియా అవకాశాల కోసం, దయచేసి సంప్రదించండి:\npartnerships@telugufinance.com\n\nమేము అన్ని విచారణలకు 2-3 పని దినాలలో స్పందించడానికి ప్రయత్నిస్తాము. మీ ఇన్‌పుట్ మాకు ఎదగడానికి మరియు మా సంఘానికి మెరుగైన సేవలందించడానికి సహాయపడుతుంది!',
    },
  },
  faq: {
    title: { en: 'Frequently Asked Questions', te: 'తరచుగా అడిగే ప్రశ్నలు' },
    description: { en: 'Find answers to common questions about our platform, the accuracy of our tools, and our stance on financial advice.', te: 'మా ప్లాట్‌ఫారమ్, మా సాధనాల ఖచ్చితత్వం మరియు ఆర్థిక సలహాపై మా వైఖరి గురించి సాధారణ ప్రశ్నలకు సమాధానాలను కనుగొనండి.' },
    content: {
      en: 'Q1: Is the content on this website financial advice?\nA: No. All content, tools, and resources provided on the Telugu Finance Platform are for educational and informational purposes only. They are not intended to be, and should not be construed as, financial, investment, tax, or legal advice. Always consult with a qualified professional before making any financial decisions.\n\nQ2: Are the calculators accurate?\nA: Our calculators are designed to provide estimates based on the inputs you provide and standard financial formulas. While we strive for accuracy, the results should be considered as illustrative and not a guarantee of future performance or exact figures. They are meant to be used as tools to understand financial concepts.\n\nQ3: Is my data safe?\nA: Yes, we take your privacy seriously. We do not store any personal financial data entered into our calculators. For more details, please review our Privacy Policy.',
      te: 'ప్ర1: ఈ వెబ్‌సైట్‌లోని కంటెంట్ ఆర్థిక సలహానా?\nజ: కాదు. తెలుగు ఫైనాన్స్ ప్లాట్‌ఫారమ్‌లో అందించబడిన మొత్తం కంటెంట్, సాధనాలు మరియు వనరులు విద్యా మరియు సమాచార ప్రయోజనాల కోసం మాత్రమే. అవి ఆర్థిక, పెట్టుబడి, పన్ను లేదా చట్టపరమైన సలహాగా పరిగణించబడవు మరియు పరిగణించకూడదు. ఏదైనా ఆర్థిక నిర్ణయాలు తీసుకునే ముందు ఎల్లప్పుడూ అర్హతగల నిపుణుడిని సంప్రదించండి.\n\nప్ర2: కాలిక్యులేటర్లు ఖచ్చితమైనవా?\nజ: మా కాలిక్యులేటర్లు మీరు అందించిన ఇన్‌పుట్‌లు మరియు ప్రామాణిక ఆర్థిక సూత్రాల ఆధారంగా అంచనాలను అందించడానికి రూపొందించబడ్డాయి. మేము ఖచ్చితత్వం కోసం ప్రయత్నిస్తున్నప్పటికీ, ఫలితాలు ఉదాహరణగా పరిగణించబడాలి మరియు భవిష్యత్ పనితీరు లేదా ఖచ్చితమైన గణాంకాలకు హామీ కాదు. అవి ఆర్థిక భావనలను అర్థం చేసుకోవడానికి సాధనాలుగా ఉపయోగపడతాయి.\n\nప్ర3: నా డేటా సురక్షితమేనా?\nజ: అవును, మేము మీ గోప్యతను తీవ్రంగా పరిగణిస్తాము. మేము మా కాలిక్యులేటర్లలో నమోదు చేసిన ఏ వ్యక్తిగత ఆర్థిక డేటాను నిల్వ చేయము. మరిన్ని వివరాల కోసం, దయచేసి మా గోప్యతా విధానాన్ని సమీక్షించండి.',
    },
  },
  legal: {
    'privacy-policy': {
        title: { en: 'Privacy Policy', te: 'గోప్యతా విధానం' },
        description: { en: 'Read our Privacy Policy to understand how we handle data. We prioritize user privacy and do not collect personal financial information.', te: 'మేము డేటాను ఎలా నిర్వహిస్తామో అర్థం చేసుకోవడానికి మా గోప్యతా విధానాన్ని చదవండి. మేము వినియోగదారు గోప్యతకు ప్రాధాన్యత ఇస్తాము మరియు వ్యక్తిగత ఆర్థిక సమాచారాన్ని సేకరించము.' },
        content: { en: 'This Privacy Policy describes how Telugu Finance Platform ("we", "us", or "our") collects, uses, and discloses your information. We do not collect personally identifiable information from users of our financial calculators. We may collect non-personal information, such as browser type and usage data, to improve our services. We do not sell, trade, or otherwise transfer your information to outside parties.', te: 'ఈ గోప్యతా విధానం తెలుగు ఫైనాన్స్ ప్లాట్‌ఫారమ్ ("మేము", "మాకు", లేదా "మా") మీ సమాచారాన్ని ఎలా సేకరిస్తుంది, ఉపయోగిస్తుంది మరియు బహిర్గతం చేస్తుందో వివరిస్తుంది. మేము మా ఆర్థిక కాలిక్యులేటర్ల వినియోగదారుల నుండి వ్యక్తిగతంగా గుర్తించదగిన సమాచారాన్ని సేకరించము. మా సేవలను మెరుగుపరచడానికి బ్రౌజర్ రకం మరియు వినియోగ డేటా వంటి వ్యక్తిగతేతర సమాచారాన్ని మేము సేకరించవచ్చు. మేము మీ సమాచారాన్ని బయటి పార్టీలకు అమ్మడం, వ్యాపారం చేయడం లేదా ఇతరత్రా బదిలీ చేయడం లేదు.'}
    },
    'terms-of-use': {
        title: { en: 'Terms of Use', te: 'వాడుక నిబంధనలు' },
        description: { en: 'Review the Terms of Use for the Telugu Finance Platform. Understand the conditions for using our educational content and tools.', te: 'తెలుగు ఫైనాన్స్ ప్లాట్‌ఫారమ్ కోసం వాడుక నిబంధనలను సమీక్షించండి. మా విద్యా కంటెంట్ మరియు సాధనాలను ఉపయోగించడం కోసం షరతులను అర్థం చేసుకోండి.' },
        content: { en: 'By accessing and using the Telugu Finance Platform, you agree to comply with and be bound by these Terms of Use. The content and tools provided are for informational purposes only. You agree not to hold us liable for any decisions you make based on the information provided on our website. The content is our intellectual property and may not be reproduced without our explicit consent.', te: 'తెలుగు ఫైనాన్స్ ప్లాట్‌ఫారమ్‌ను యాక్సెస్ చేయడం మరియు ఉపయోగించడం ద్వారా, మీరు ఈ వాడుక నిబంధనలకు కట్టుబడి ఉండటానికి అంగీకరిస్తున్నారు. అందించిన కంటెంట్ మరియు సాధనాలు సమాచార ప్రయోజనాల కోసం మాత్రమే. మా వెబ్‌సైట్‌లో అందించిన సమాచారం ఆధారంగా మీరు తీసుకునే ఏ నిర్ణయాలకు మమ్మల్ని బాధ్యులుగా చేయబోమని మీరు అంగీకరిస్తున్నారు. కంటెంట్ మా మేధో సంపత్తి మరియు మా స్పష్టమైన అనుమతి లేకుండా పునరుత్పత్తి చేయబడదు.'}
    },
     'disclaimer': {
        title: { en: 'Disclaimer', te: 'నిరాకరణ' },
        description: { en: 'Official disclaimer for the Telugu Finance Platform. All content is for educational purposes only and is not financial advice.', te: 'తెలుగు ఫైనాన్స్ ప్లాట్‌ఫారమ్ కోసం అధికారిక నిరాకరణ. మొత్తం కంటెంట్ విద్యా ప్రయోజనాల కోసం మాత్రమే మరియు ఆర్థిక సలహా కాదు.' },
        content: { en: 'The information and tools on the Telugu Finance Platform are provided for general educational purposes only and do not constitute financial, investment, or professional advice. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information. Any reliance you place on such information is strictly at your own risk. We are not a registered investment advisor.', te: 'తెలుగు ఫైనాన్స్ ప్లాట్‌ఫారమ్‌లోని సమాచారం మరియు సాధనాలు సాధారణ విద్యా ప్రయోజనాల కోసం మాత్రమే అందించబడ్డాయి మరియు ఆర్థిక, పెట్టుబడి లేదా వృత్తిపరమైన సలహా కాదు. సమాచారం యొక్క సంపూర్ణత, ఖచ్చితత్వం, విశ్వసనీయత లేదా అనుకూలత గురించి మేము ఏ రకమైన, ప్రత్యక్ష లేదా పరోక్ష ప్రాతినిధ్యాలు లేదా హామీలు ఇవ్వము. అటువంటి సమాచారంపై మీరు ఉంచే ఏదైనా ఆధారపడటం ఖచ్చితంగా మీ స్వంత పూచీతో ఉంటుంది. మేము రిజిస్టర్డ్ ఇన్వెస్ట్‌మెంట్ అడ్వైజర్ కాదు.'}
    }
  },
};

const StaticPage: React.FC<StaticPageProps> = ({ pageKey }) => {
  const { language } = useLanguage();
  const params = useParams();
  
  let pageData;

  if (pageKey === 'legal') {
    const topic = params.topic || 'disclaimer';
    pageData = staticContent.legal[topic as keyof typeof staticContent.legal];
  } else {
    pageData = staticContent[pageKey];
  }

  useEffect(() => {
    if (pageData) {
        updateMetaTags(
            `${pageData.title[language]} | Telugu Finance Platform`,
            pageData.description[language]
        );
    }
  }, [pageData, language]);
  
  if (!pageData) {
      return <div>Content not found.</div>
  }

  return (
    <div className="bg-white dark:bg-dark p-6 sm:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-blue-300 mb-6">
        {pageData.title[language]}
      </h1>
      <div className="prose max-w-none whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>{pageData.content[language]}</p>
      </div>
    </div>
  );
};

export default StaticPage;