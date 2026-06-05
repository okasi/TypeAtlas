export interface SystemReference {
  label: string;
  url: string;
  description: string;
}

export interface TypologyResearchNote {
  id: string;
  name: string;
  atlasRole: 'active' | 'optional' | 'reference';
  evidenceBand: string;
  atlasUse: string;
  history: string;
  theory: string;
  evidence: string;
  references: SystemReference[];
}

export const typologyResearchNotes: TypologyResearchNote[] = [
  {
    id: 'western-zodiac',
    name: 'Western Zodiac',
    atlasRole: 'active',
    evidenceBand: 'Cultural system, low empirical support',
    atlasUse: 'TypeAtlas uses sun-sign symbolism as one flavor and temperament layer, not as a clinical measure.',
    history:
      'Western astrology grew out of Mesopotamian sky-omen traditions and later became a more formal Hellenistic chart system. The modern newspaper-style horoscope is much newer: a mass-media simplification built around sun signs rather than full natal charts.',
    theory:
      'The classical model maps the ecliptic into 12 signs and interprets planets, houses, and birth timing together. In everyday culture, that complexity usually gets compressed into a single sign based on birth date.',
    evidence:
      'Controlled testing has not shown reliable personality matching or prediction from natal charts. The mainstream scientific view treats astrology as culturally persistent and psychologically meaningful to many people, but not as an evidence-based personality model.',
    references: [
      {
        label: 'National Geographic: ancient origins of zodiac signs',
        url: 'https://www.nationalgeographic.com/history/article/history-of-horoscopes',
        description: 'History of Mesopotamian, Greek, and modern horoscope traditions.',
      },
      {
        label: 'Britannica: zodiac',
        url: 'https://www.britannica.com/topic/zodiac',
        description: 'Reference overview of the zodiac as a classificatory system.',
      },
      {
        label: 'Britannica: astrology',
        url: 'https://www.britannica.com/topic/astrology',
        description: 'Concise reference entry on astrology and its relationship to science.',
      },
      {
        label: 'Carlson (1985) Nature',
        url: 'https://doi.org/10.1038/318419a0',
        description: 'Classic double-blind test often cited in scientific critiques of astrology.',
      },
    ],
  },
  {
    id: 'chinese-zodiac',
    name: 'Chinese Zodiac',
    atlasRole: 'active',
    evidenceBand: 'Cultural system with measurable social effects',
    atlasUse: 'TypeAtlas uses birth-year animal symbolism as a cultural layer in the reading, not as a biological claim.',
    history:
      'The Chinese zodiac is a 12-animal calendrical cycle embedded in Chinese folk culture and Lunar New Year traditions. It likely took shape over centuries and became part of everyday social language, storytelling, and festival symbolism.',
    theory:
      'Most everyday use classifies people by birth year into one of 12 repeating animals. More traditional practice can add further calendrical layers, but the common version is a simple year-based identity label with trait and compatibility lore.',
    evidence:
      'There is no credible evidence that a birth-year animal causes personality. There is evidence that zodiac beliefs can change behavior, though: fertility patterns in Hong Kong and related populations show Dragon-year preferences can nudge birth timing.',
    references: [
      {
        label: 'National Geographic: what is the Chinese zodiac?',
        url: 'https://www.nationalgeographic.com/history/article/what-is-the-chinese-zodiac',
        description: 'Accessible cultural history and discussion of persistence over time.',
      },
      {
        label: 'Britannica: Chinese zodiac',
        url: 'https://www.britannica.com/topic/Chinese-zodiac',
        description: 'Reference definition of the 12-animal cycle.',
      },
      {
        label: 'Yip, Lee, and Cheung (2002) PubMed',
        url: 'https://pubmed.ncbi.nlm.nih.gov/12383464/',
        description: 'Study linking zodiac belief to fertility timing in Hong Kong.',
      },
    ],
  },
  {
    id: 'abo-blood',
    name: 'ABO Blood-Type Personality',
    atlasRole: 'optional',
    evidenceBand: 'Popular folklore, scientifically unsupported',
    atlasUse: 'Optional input. If you provide it, TypeAtlas treats blood type as a light preference layer. If you skip it, the rest of the profile is reweighted.',
    history:
      'The modern Japanese blood-type personality story is usually traced to Takeji Furukawa in the 1920s and then to Masahiko Nomi\'s bestselling popularizations in the 1970s. It spread through media and everyday conversation more as a cultural script than a medical theory.',
    theory:
      'The framework sorts people into A, B, O, and AB, then assigns traits and compatibility stories to each. In practice it often works like an icebreaker label or social shorthand, especially in Japanese and Korean pop culture.',
    evidence:
      'Large-sample survey work has repeatedly failed to show a meaningful relationship between ABO type and personality traits. Social-science work still finds that the belief can matter socially through stereotyping, self-presentation, and discrimination.',
    references: [
      {
        label: 'Sato and Watanabe (1995) J-STAGE',
        url: 'https://www.jstage.jst.go.jp/article/jjpjspp/3/1/3_KJ00001287020/_article/-char/en',
        description: 'Historical analysis of Furukawa\'s original theory.',
      },
      {
        label: 'Nawata (2014) J-STAGE',
        url: 'https://www.jstage.jst.go.jp/article/jjpsy/85/2/85_85.13016/_article/-char/en',
        description: 'Large-scale survey evidence finding no relationship with personality.',
      },
      {
        label: 'Web Japan / NIPPONIA',
        url: 'https://web-japan.org/nipponia/nipponia29/en/wonders/index.html',
        description: 'Cultural overview of how blood-type talk spread in Japan.',
      },
      {
        label: 'RIETI: social construction and discrimination',
        url: 'https://www.rieti.go.jp/en/publications/summary/25020013.html',
        description: 'Policy-research framing of belief-driven discrimination effects.',
      },
    ],
  },
  {
    id: 'mbti',
    name: 'MBTI',
    atlasRole: 'active',
    evidenceBand: 'Popular instrument with mixed psychometrics',
    atlasUse: 'TypeAtlas uses MBTI-style responses as a habit and decision-style layer, not as a high-stakes assessment.',
    history:
      'The Myers-Briggs Type Indicator was developed by Katharine Cook Briggs and Isabel Briggs Myers from Carl Jung\'s ideas about psychological types. It became commercially widespread through education, coaching, and workplace development.',
    theory:
      'MBTI assigns one of 16 four-letter types using four preference pairs: Extraversion-Introversion, Sensing-iNtuition, Thinking-Feeling, and Judging-Perceiving. It presents those preferences as a stable pattern for how people take in information and make decisions.',
    evidence:
      'The main critique is psychometric: many scores behave more like continua than clean binary types, and test-retest stability can be weaker than type branding suggests. Researchers generally treat MBTI as useful for discussion and self-reflection, but not as a gold-standard personality measure.',
    references: [
      {
        label: 'APTI: history of psychological type and MBTI',
        url: 'https://www.aptinternational.org/history',
        description: 'Institutional history of Jung, Briggs, Myers, and the MBTI ecosystem.',
      },
      {
        label: 'The Myers-Briggs Company: MBTI facts',
        url: 'https://www.themyersbriggs.com/mbtifacts',
        description: 'Official publisher view of the assessment and usage claims.',
      },
      {
        label: 'McCrae and Costa (1989)',
        url: 'https://doi.org/10.1111/j.1467-6494.1989.tb00759.x',
        description: 'Classic critique arguing the MBTI does not recover true personality types.',
      },
      {
        label: 'Pittenger (2005)',
        url: 'https://doi.org/10.1037/1065-9293.57.3.210',
        description: 'Consulting-psychology critique of reliability and interpretation issues.',
      },
    ],
  },
  {
    id: 'enneagram',
    name: 'Enneagram',
    atlasRole: 'reference',
    evidenceBand: 'Reflective framework, mixed validation',
    atlasUse: 'TypeAtlas asks for a lightweight self-sort here and treats it as a reflective identity layer rather than an assessment-grade result.',
    history:
      'Modern Enneagram teaching is usually described as a 20th-century synthesis, with Oscar Ichazo credited by major Enneagram organizations as the person who assembled the system into a recognizably modern form. Ancient-origin claims exist, but the type system itself is modern.',
    theory:
      'The model classifies people into nine types organized around core motivations, fears, and defensive habits. Many schools also add wings and movement patterns under stress or growth.',
    evidence:
      'Systematic review work finds mixed reliability and validity. Some findings line up loosely with broader personality traits, but support for secondary claims such as wings and movement is thin, so the framework is usually treated as reflective rather than assessment-grade.',
    references: [
      {
        label: 'Enneagram Institute: traditional history',
        url: 'https://www.enneagraminstitute.com/the-traditional-enneagram/',
        description: 'Influential organizational account of the system\'s modern origins.',
      },
      {
        label: 'Hook et al. (2021) PubMed',
        url: 'https://pubmed.ncbi.nlm.nih.gov/33332604/',
        description: 'Systematic review abstract from the clinical literature.',
      },
      {
        label: 'Hook et al. (2021) DOI',
        url: 'https://doi.org/10.1002/jclp.23097',
        description: 'Peer-reviewed review article on evidence, limits, and future directions.',
      },
    ],
  },
  {
    id: 'hogwarts-houses',
    name: 'Hogwarts Houses',
    atlasRole: 'reference',
    evidenceBand: 'Fictional identity play with small correlational studies',
    atlasUse: 'TypeAtlas treats house as a playful self-identification layer that captures narrative values rather than measured traits.',
    history:
      'Hogwarts Houses began as a fictional sorting device in the Harry Potter universe and later became a real-world fan identity system through official online sorting experiences, merch, and fandom communities.',
    theory:
      'The house model groups people into four value clusters, roughly centered on bravery, ambition, wit, and loyalty. In practice, people often self-identify through narrative resonance and community belonging as much as through quiz scoring.',
    evidence:
      'Because it began as fiction, it was not designed as a validated personality instrument. A few studies find small and imperfect correlations with mainstream traits in fan samples, but the best interpretation is identity play rather than diagnosis.',
    references: [
      {
        label: 'Official Sorting Hat',
        url: 'https://www.harrypotter.com/sorting-hat',
        description: 'Official franchise sorting experience.',
      },
      {
        label: 'J.K. Rowling on house symbolism',
        url: 'https://www.harrypotter.com/writing-by-jk-rowling/colours',
        description: 'Official writing connecting houses to symbolic elements and colors.',
      },
      {
        label: 'Crysel et al. (2015)',
        url: 'https://doi.org/10.1016/j.paid.2015.04.016',
        description: 'Study relating house assignments to personality measures in fans.',
      },
      {
        label: 'Collabra replication/extension',
        url: 'https://doi.org/10.1525/collabra.240',
        description: 'Open-access work testing how far sorting results map onto established constructs.',
      },
      {
        label: 'PLOS ONE (2025)',
        url: 'https://doi.org/10.1371/journal.pone.0336123',
        description: 'Recent open-access study on Sorting Hat utility beyond fan-only samples.',
      },
    ],
  },
  {
    id: 'love-languages',
    name: 'Love Languages',
    atlasRole: 'reference',
    evidenceBand: 'Popular metaphor, weak typology support',
    atlasUse: 'TypeAtlas asks for the care style that feels most salient to you and frames it as a communication preference prompt, not a validated type.',
    history:
      'The Five Love Languages entered mainstream culture through Gary Chapman\'s 1992 self-help book and then spread through counseling, dating advice, church communities, and social media.',
    theory:
      'The model proposes five preferred modes of giving and receiving care: words of affirmation, quality time, gifts, acts of service, and physical touch. People are encouraged to identify a primary language and then match behavior to a partner\'s preferred language.',
    evidence:
      'Recent review work finds weak support for the strongest version of the theory, especially the claim that people naturally fall into one stable category and that category-matching is the main driver of relationship quality. Some studies still suggest that responding to a partner\'s stated preferences can help, which makes the model more useful as a communication prompt than as a validated typology.',
    references: [
      {
        label: 'Impett, Park, and Muise (2024)',
        url: 'https://doi.org/10.1177/09637214231217663',
        description: 'Major review evaluating the love-languages framework through relationship science.',
      },
      {
        label: 'Mostova et al. (2022) PLOS ONE',
        url: 'https://doi.org/10.1371/journal.pone.0269429',
        description: 'Empirical test of responsiveness to partners\' stated preferences.',
      },
      {
        label: 'Egbert and Polk (2006)',
        url: 'https://doi.org/10.1080/17464090500535822',
        description: 'Early validity-focused study of Chapman\'s framework.',
      },
      {
        label: 'Greater Good summary',
        url: 'https://greatergood.berkeley.edu/article/item/is_there_science_behind_the_five_love_languages',
        description: 'Accessible research-informed summary of the debate.',
      },
    ],
  },
  {
    id: 'chronotype',
    name: 'Chronotype',
    atlasRole: 'reference',
    evidenceBand: 'Research-backed construct; animal labels are the pop layer',
    atlasUse: 'TypeAtlas includes a quick animal-label chronotype prompt as an accessible timing signal, while noting that the science is stronger than the pop labels themselves.',
    history:
      'Chronotype research comes from sleep and circadian science, which studies stable differences in preferred sleep-wake timing. The bear-wolf-lion-dolphin labels are a later popularization associated with Michael Breus rather than a standard research taxonomy.',
    theory:
      'In science, chronotype is usually measured as a morningness-eveningness spectrum with validated questionnaires rather than four hard bins. The animal version turns that spectrum into a simpler coaching-friendly archetype system.',
    evidence:
      'Chronotype itself is well supported and repeatedly linked to sleep timing, behavior, and health outcomes. The four-animal version is better understood as an accessible interpretation layer laid on top of a more continuous biological construct.',
    references: [
      {
        label: 'Horne and Ostberg (1976) PubMed',
        url: 'https://pubmed.ncbi.nlm.nih.gov/1027738/',
        description: 'Original morningness-eveningness questionnaire paper.',
      },
      {
        label: 'Sleep Foundation: chronotypes',
        url: 'https://www.sleepfoundation.org/how-sleep-works/chronotypes',
        description: 'Evidence-informed explainer that frames chronotype as a spectrum.',
      },
      {
        label: 'Sleep Doctor: chronotype quiz',
        url: 'https://sleepdoctor.com/sleep-quizzes/chronotype-quiz',
        description: 'Primary popular source for the bear-lion-wolf-dolphin framing.',
      },
      {
        label: 'Sleep Health review (2025)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/40781036/',
        description: 'Recent systematic review linking chronotype and insomnia symptoms.',
      },
    ],
  },
  {
    id: 'birthstone',
    name: 'Birthstone Symbolism',
    atlasRole: 'reference',
    evidenceBand: 'Symbolic tradition, not a personality measure',
    atlasUse: 'TypeAtlas derives birthstone automatically from birth month and treats it as a symbolic identity marker rather than a personality measure.',
    history:
      'Birthstones draw on older gem lore often connected to the biblical breastplate tradition, but the modern US month-by-stone list was standardized in 1912 by the American National Retail Jewelers Association, now Jewelers of America.',
    theory:
      'Birthstones classify by birth month rather than by personality. Their meaning is symbolic and social: protection, luck, gifting, identity, and jewelry tradition.',
    evidence:
      'This is not a psychological measurement claim, so the evidence base is mostly historical and institutional rather than experimental. The key empirical questions are about standardization, commercial adoption, and changes to the official lists over time.',
    references: [
      {
        label: 'Jewelers of America: birthstones',
        url: 'https://www.jewelers.org/buying-jewelry/jewelry-buying-guides/birthstones',
        description: 'Official US list originator and 1912 standardization reference.',
      },
      {
        label: 'GIA: birthstones by month',
        url: 'https://www.gia.edu/birthstones',
        description: 'Gemological overview of month-by-stone associations and lore.',
      },
      {
        label: 'International Gem Society: history of birthstones',
        url: 'https://www.gemsociety.org/article/history-of-birthstones/',
        description: 'Historical explainer with context on older traditions and revisions.',
      },
      {
        label: 'JCK: tanzanite added in 2002',
        url: 'https://www.jckonline.com/editorial-article/tanzanite-becomes-a-december-birthstone/',
        description: 'Trade-journal reporting on the modern list update.',
      },
    ],
  },
];
