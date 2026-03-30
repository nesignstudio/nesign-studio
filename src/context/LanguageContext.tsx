import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => any;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('app_lang');
        return (saved === 'en' || saved === 'ar') ? saved : 'en';
    });

    // Define t here so it's available for useEffect
    const t = (key: string) => {
        const keys = key.split('.');
        let result: any = translations[language];

        for (const k of keys) {
            if (result && result[k]) {
                result = result[k];
            } else {
                return key; // Fallback to key itself if not found
            }
        }

        return result;
    };

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    useEffect(() => {
        localStorage.setItem('app_lang', language);
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.title = t('meta.title');
    }, [language]);

    const isRTL = language === 'ar';

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

const translations: any = {
    en: {
        meta: {
            title: 'Nesign Studio | Graphic Design & Brand Identity',
            description: 'A forward-thinking design studio focused on clarity, systems, and brand direction.',
        },
        nav: {
            manifesto: 'Manifesto',
            services: 'Services',
            work: 'Work',
            process: 'Process',
            contact: 'Contact',
            startProject: 'Start Project',
        },
        hero: {
            label: 'Graphic Design & Brand Design Studio',
            subtitle: 'A forward-thinking design studio focused on clarity, systems, and brand direction.',
            description: 'Nesign Studio is a strategic design studio dedicated to guiding brands with clarity and purpose. We create bold, precise, and future-ready identities that elevate credibility and drive growth — a trusted creative partner for brands seeking innovation, direction, and long-term impact through intelligent design.',
            stats: {
                projects: 'Projects Delivered',
                clients: 'Global Clients',
                experience: 'Years Experience',
            },
            cta: 'Start a Project',
            viewWork: 'View Work',
            scroll: 'Scroll',
            est: 'EST. 2020'
        },
        manifesto: {
            label: 'Our Philosophy',
            main: 'A forward-thinking design studio focused on clarity, systems, and brand direction. We create bold, precise, and future-ready identities that elevate credibility and drive growth.',
            mission: {
                title: 'Our Mission',
                text: 'To create bold, precise, and future-ready identities that elevate credibility and drive growth for forward-thinking brands.'
            },
            vision: {
                title: 'Our Vision',
                text: 'To become a trusted creative partner for brands seeking innovation, direction, and long-term impact through intelligent design.'
            }
        },
        services: {
            label: 'What We Do',
            title: 'Services',
            days: 'Days',
            daysRef: 'Days',
            tabs: {
                identity: 'Brand Identity Design',
                design: 'Design Services'
            },
            scope: {
                title: 'Scope of Work',
                strategy: 'Brand Strategy',
                strategyItems: ['Brand positioning and direction', 'Brand personality and values', 'Target audience alignment', 'Visual direction and creative guidance'],
                visual: 'Visual Identity Design',
                visualItems: ['Primary logo design', 'Secondary and alternate logo versions', 'Color palette', 'Typography system', 'Basic logo usage guidelines', 'Logo motion design (2 short animations)'],
                application: 'Brand Application',
                applicationItems: ['Business card design', 'Social media profile visuals', 'Up to 2 branded collateral items', 'Basic brand presentation mockups'],
            },
            packages: {
                title: 'Branding Packages',
                essential: 'Essential Brand Identity',
                pro: 'Professional Brand System',
                complete: 'Complete Brand System',
                recommended: 'Recommended',
                timeline: 'Timeline',
                logo: 'Logo',
                bestFor: 'Best for',
                getStarted: 'Get Started',
                targets: {
                    starter: 'Startups & small businesses',
                    pro: 'Growing brands',
                    premium: 'Established & ambitious brands',
                },
                logoNote: {
                    essential: 'Primary & secondary versions',
                    pro: 'Complete logo system',
                    complete: 'Complete logo system',
                }
            },
            process: {
                title: 'Brand Identity Process',
                stage: 'Stage',
                discovery: 'Discovery & Direction',
                identity: 'Visual Identity Development',
                refinement: 'Refinement & Revisions',
                finalization: 'Finalization & Delivery',
                desc1: 'Understanding the brand, goals, and visual direction.',
                desc2: 'Logo concepts, visual system, and initial motion direction.',
                desc3: 'Selected direction refinement and agreed revision rounds.',
                desc4: 'Final assets preparation and delivery of approved files.',
            },
            logoPackages: {
                title: 'Logo Packages',
                comboTitle: 'Logo Combo Packages',
                basic: 'Basic Logo',
                pro: 'Pro Logo',
                combo1: 'Logo + Business Card',
                combo2: 'Logo + Social Media Starter',
                items: {
                    basic: ['1 Logo Concept', '1 Revision', 'PNG + JPG files', '1 Adobe file'],
                    pro: ['2 Logo concepts', '2 Revisions', '1 Logo animation', 'Color & Typography', 'Full Logo Files (AI, SVG, PNG, JPG)'],
                    combo1: ['Professional logo pack', 'Business card (front & back)', 'Print-ready files + mockups'],
                    combo2: ['Professional logo pack', 'Profile picture and cover', '5 post templates + 3 story templates', 'Editable files (AI, PSD)'],
                },
                days: 'days'
            },
            individual: {
                title: 'Individual Services',
                items: {
                    card: 'Business Card',
                    flyer: 'Flyer',
                    banner: 'Banner',
                    motion: 'Logo Animation',
                    post: 'Social Media Post',
                    pfp: 'Social Media PFP',
                    sticker: 'Stickers',
                    story: 'Story Design',
                }
            },
            footer: {
                custom: 'Need a custom solution? Let\'s discuss your project.',
                cta: 'Start a Conversation'
            }
        },
        work: {
            label: 'Portfolio',
            title: 'Projects',
            selectedProjects: 'Selected Projects',
            seeMore: 'See More on Behance',
            viewProject: 'View on Behance',
            more: 'and more...',
            disclaimer: {
                title: 'Portfolio Archive',
                description: 'Please note that the projects on Behance represent personal explorations and earlier works from my creative journey.',
                action: 'Continue to Behance'
            },
            items: [
                {
                    title: 'Nesign Studio',
                    category: 'Brand Identity',
                    description: 'Our own brand identity — built on clarity, systems, and forward-thinking design.',
                },
                {
                    title: 'NEET',
                    category: 'Personal Branding',
                    description: 'A personal brand system built on bold expression and dark aesthetics.',
                },
                {
                    title: 'TROBAX',
                    category: 'Personal Identity',
                    description: 'Dynamic visual identity for a gaming and esports content creator.',
                },
                {
                    title: 'LD Export',
                    category: 'Brand Identity',
                    description: 'Professional brand system for an international export and logistics company.',
                },
                {
                    title: 'Runs',
                    category: 'Logotype',
                    description: 'Modern streetwear logotype with an emphasis on geometric precision.',
                },
                {
                    title: 'Towards The Future',
                    category: 'Logotype',
                    description: 'Arabic & English tech-inspired logotype for a forward-looking creative concept.',
                }
            ],
            hud: {
                target: 'Target',
                status: 'STATUS: ANALYZING...',
                project: 'Project',
                year: 'Year',
                identity: 'Identity'
            }
        },
        process: {
            label: 'How We Work',
            title: 'Our Process',
            tabs: {
                identity: 'Brand Identity Process',
                design: 'Design Services Process'
            },
            brand: {
                main: [
                    'We begin with strategic discovery — understanding your vision, market, positioning, and competitive landscape.',
                    'From there, we define the brand foundation: purpose, personality, and direction. We translate strategy into visual systems, crafting a distinctive identity built on clarity, scalability, and precision.',
                    'The final outcome is a cohesive brand system designed to perform consistently across every touchpoint.'
                ],
                stages: [
                    { id: '01', title: 'Discovery & Direction', timeline: '2–6 days', description: 'Understanding the brand, goals, and visual direction.' },
                    { id: '02', title: 'Visual Identity Development', timeline: '7–15 days', description: 'Logo concepts, visual system, and initial motion direction.' },
                    { id: '03', title: 'Refinement & Revisions', timeline: '4–8 days', description: 'Selected direction refinement and agreed revision rounds.' },
                    { id: '04', title: 'Finalization & Delivery', timeline: '2–5 days', description: 'Final assets preparation and delivery of approved files.' },
                ],
                summary: {
                    title: 'Total Timeline',
                    value: '15–35 days',
                    note: 'Timeline varies based on selected branding package. From Essential (15–20 days) to Complete (30–35 days).'
                }
            },
            design: {
                main: [
                    'Every design project starts with clear objectives and functional requirements.',
                    'We analyze context, define structure, and develop creative concepts aligned with the brand system. Through refinement and iteration, we deliver precise, purpose-driven design solutions.',
                    'Solutions that are visually strong, technically sound, and ready for real-world application.'
                ],
                stages: [
                    { id: '01', title: 'Brief & Objectives', description: 'Understanding requirements, context, and desired outcomes.' },
                    { id: '02', title: 'Concept Development', description: 'Creating design concepts aligned with the brand system and goals.' },
                    { id: '03', title: 'Refinement & Iteration', description: 'Refining the selected direction through agreed revision rounds.' },
                    { id: '04', title: 'Final Delivery', description: 'Preparing production-ready files in all required formats.' },
                ],
                summary: {
                    title: 'Typical Timeline',
                    value: '3–10 days',
                    note: 'Individual design services range from 3 days (social media) to 10 days (logo combo packages).'
                }
            },
            visual: {
                brand: 'BRAND',
                design: 'DESIGN',
                identityLabel: 'Identity Process',
                servicesLabel: 'Services Process'
            }
        },
        entrance: {
            headline: 'TOWARDS THE FUTURE',
            button: 'ENTER',
            description: 'A strategic design partner focused on clarity, precision, and purposeful growth. We build bold, future-ready identities that elevate credibility, inspire innovation, and create lasting impact through intelligent design systems.'
        },
        cta: {
            label: 'Get in Touch',
            headline: ["Let's Build", "Something", "Remarkable"],
            button: 'Start a Project',
            whatsapp: 'WhatsApp Us',
            email: 'Email',
            cosmos: 'Cosmos',
            instagram: 'Instagram',
            behance: 'Behance',
            cosmosValue: 'nesignstudio',
            social: {
                instagram: 'Instagram',
                behance: 'Behance',
                whatsapp: 'WhatsApp'
            }
        },
        footer: {
            navigation: 'Navigation',
            social: 'Social',
            location: 'Location',
            locNote: 'Available Remotely',
            brandDesc: 'A forward-thinking design studio focused on clarity, systems, and brand direction. Creating bold, precise, and future-ready identities.',
            studioLabel: 'Graphic Design & Brand Design Studio',
            rights: 'All rights reserved.',
            backToTop: 'Back to top'
        },
        modal: {
            title: 'Start Your Project',
            subtitle: 'Let’s discuss your brand vision and strategic goals.',
            whatsapp: 'Message on WhatsApp',
            emailToggle: 'Prefer email instead?',
            form: {
                name: 'Name',
                email: 'Email',
                brief: 'Project Brief',
                submit: 'Send Inquiry'
            },
            waTemplate: 'Hi, I’d like to start a branding project. Here are some details about my business:',
            status: {
                sending: 'Sending Inquiry...',
                success: 'Inquiry Sent Successfully!',
                error: 'An error occurred. Please try again.'
            }
        }
    },
    ar: {
        meta: {
            title: 'Nesign Studio | التصميم الجرافيكي والهوية البصرية',
            description: 'ستوديو تصميم رائد يركز على الوضوح، الأنظمة، وتوجه العلامة التجارية.',
        },
        nav: {
            manifesto: 'البيان',
            services: 'الخدمات',
            work: 'أعمالنا',
            process: 'منهجيتنا',
            contact: 'اتصل بنا',
            startProject: 'ابدأ مشروعك',
        },
        hero: {
            label: 'ستوديو التصميم الجرافيكي والهوية البصرية',
            subtitle: 'ستوديو تصميم رائد يركز على الوضوح، الأنظمة، وتوجه العلامة التجارية.',
            description: 'Nesign Studio هو ستوديو تصميم استراتيجي مخصص لتوجيه العلامات التجارية بوضوح وهدف. نحن نصمم هويات قوية ودقيقة ومستقبلية تعزز المصداقية وتدفع النمو — شريك إبداعي موثوق للعلامات التي تسعى للابتكار والتوجه والتأثير طويل الأمد من خلال التصميم الذكي.',
            stats: {
                projects: 'مشروعاً تم تسليمه',
                clients: 'عملاء حول العالم',
                experience: 'سنوات من الخبرة',
            },
            cta: 'ابدأ مشروعاً',
            viewWork: 'عرض الأعمال',
            scroll: 'مرر للأسفل',
            est: 'تأسس عام 2020'
        },
        manifesto: {
            label: 'فلسفتنا',
            main: 'ستوديو تصميم رائد يركز على الوضوح، الأنظمة، وتوجه العلامة التجارية. نحن نصمم هويات قوية ودقيقة ومستقبلية تعزز المصداقية وتدفع النمو.',
            mission: {
                title: 'مهمتنا',
                text: 'تصميم هويات قوية ودقيقة ومستقبلية تعزز المصداقية وتدفع النمو للعلامات التجارية الطموحة.'
            },
            vision: {
                title: 'رؤيتنا',
                text: 'أن نصبح شريكاً إبداعياً موثوقاً للعلامات التجارية التي تسعى للابتكار والتوجه والتأثير طويل الأمد من خلال التصميم الذكي.'
            }
        },
        services: {
            label: 'ماذا نفعل',
            title: 'خدماتنا',
            days: 'أيام',
            daysRef: 'يوماً',
            tabs: {
                identity: 'تصميم الهوية البصرية',
                design: 'خدمات التصميم'
            },
            scope: {
                title: 'نطاق العمل',
                strategy: 'استراتيجية العلامة التجارية',
                strategyItems: ['تموضع وتوجه العلامة التجارية', 'شخصية وقيم العلامة التجارية', 'مواءمة الجمهور المستهدف', 'التوجه البصري والتوجيه الإبداعي'],
                visual: 'تصميم الهوية البصرية',
                visualItems: ['تصميم الشعار الأساسي', 'إصدارات الشعار الثانوية والبديلة', 'لوحة الألوان', 'نظام الطباعة (Typography)', 'دليل أساسي لاستخدام الشعار', 'تصميم حركة الشعار (انيميشن قصير عدد 2)'],
                application: 'تطبيقات العلامة التجارية',
                applicationItems: ['تصميم بطاقة العمل (Business Card)', 'تصاميم قنوات التواصل الاجتماعي', 'ما يصل إلى عنصرين من المواد الدعائية', 'نماذج أولية لعرض العلامة التجارية'],
            },
            packages: {
                title: 'باقات الهوية البصرية',
                essential: 'الهوية البصرية الأساسية',
                pro: 'نظام العلامة التجارية الاحترافي',
                complete: 'نظام العلامة التجارية المتكامل',
                recommended: 'موصى به',
                timeline: 'المدة الزمنية',
                logo: 'الشعار',
                bestFor: 'الأنسب لـ',
                getStarted: 'ابدأ الآن',
                targets: {
                    starter: 'الشركات الناشئة والمشاريع الصغيرة',
                    pro: 'العلامات التجارية المتنامية',
                    premium: 'العلامات التجارية الراسخة والطموحة',
                },
                logoNote: {
                    essential: 'الإصدارات الأساسية والثانوية',
                    pro: 'نظام شعار متكامل',
                    complete: 'نظام شعار متكامل',
                }
            },
            process: {
                title: 'مراحل عمل الهوية البصرية',
                stage: 'مرحلة',
                discovery: 'الاكتشاف والتوجه',
                identity: 'تطوير الهوية البصرية',
                refinement: 'التحسين والمراجعات',
                finalization: 'الاعتماد والتسليم',
                desc1: 'فهم العلامة التجارية والأهداف والتوجه البصري.',
                desc2: 'مفاهيم الشعار، النظام البصري، وتوجه الحركة الأولي.',
                desc3: 'تحسين التوجه المختار وجولات المراجعة المتفق عليها.',
                desc4: 'إعداد الأصول النهائية وتسليم الملفات المعتمدة.',
            },
            logoPackages: {
                title: 'باقات الشعار',
                comboTitle: 'باقات الشعار المدمجة',
                basic: 'الشعار الأساسي',
                pro: 'الشعار الاحترافي',
                combo1: 'شعار + بطاقة عمل',
                combo2: 'شعار + بداية التواصل الاجتماعي',
                items: {
                    basic: ['مفهوم واحد للشعار', 'مراجعة واحدة', 'ملفات PNG + JPG', 'ملف أدوبي واحد'],
                    pro: ['مفهومان للشعار', 'مراجعتان', 'تحريك واحد للشعار', 'الألوان والخطوط', 'ملفات الشعار كاملة (AI, SVG, PNG, JPG)'],
                    combo1: ['حزمة الشعار الاحترافية', 'بطاقة عمل (وجهين)', 'ملفات جاهزة للطباعة + نماذج عرض'],
                    combo2: ['حزمة الشعار الاحترافية', 'صورة للملف الشخصي والغلاف', '5 قوالب منشورات + 3 قوالب ستوري', 'ملفات قابلة للتعديل (AI, PSD)'],
                },
                days: 'أيام',
                daysRef: 'يوماً'
            },
            individual: {
                title: 'خدمات فردية',
                items: {
                    card: 'بطاقة عمل',
                    flyer: 'فلاير / منشور إعلاني',
                    banner: 'بانر',
                    motion: 'تحريك الشعار',
                    post: 'منشور تواصل اجتماعي',
                    pfp: 'صورة ملف شخصي',
                    sticker: 'ملصقات',
                    story: 'تصميم ستوري',
                }
            },
            footer: {
                custom: 'هل تحتاج إلى حل مخصص؟ لنناقش مشروعك.',
                cta: 'ابدأ المحادثة'
            }
        },
        work: {
            label: 'أعمالنا',
            title: 'أبرز المشاريع',
            selectedProjects: 'مشاريع مختارة',
            seeMore: 'مشاهدة المزيد على بيهانس',
            viewProject: 'عرض على بيهانس',
            more: 'والمزيد...',
            disclaimer: {
                title: 'أرشيف الأعمال',
                description: 'يرجى ملاحظة أن المشاريع الموجودة على Behance تمثل تجارب شخصية وأعمالاً سابقة من مسيرتي الإبداعية.',
                action: 'المتابعة إلى بيهانس'
            },
            items: [
                {
                    title: 'Nesign Studio',
                    category: 'الهوية البصرية',
                    description: 'هويتنا البصرية - مبنية على الوضوح، الأنظمة، والتصميم المتطور.',
                },
                {
                    title: 'NEET',
                    category: 'الهوية الشخصية',
                    description: 'نظام هوية شخصية مبني على التعبير القوي والجماليات الداكنة.',
                },
                {
                    title: 'TROBAX',
                    category: 'الهوية الشخصية',
                    description: 'هوية بصرية ديناميكية لمنشئ محتوى في الألعاب والرياضات الإلكترونية.',
                },
                {
                    title: 'LD Export',
                    category: 'الهوية البصرية',
                    description: 'نظام هوية احترافي لشركة تصدير ولوجستيات دولية.',
                },
                {
                    title: 'Runs',
                    category: 'تصميم الشعارات',
                    description: 'تصميم شعار عصري لملابس الشارع بتركيز على الدقة الهندسية.',
                },
                {
                    title: 'Towards The Future',
                    category: 'تصميم الشعارات',
                    description: 'تصميم شعار مستوحى من التكنولوجيا بالعربية والإنجليزية لمفهوم إبداعي مستقبلي.',
                }
            ],
            hud: {
                target: 'الهدف',
                status: 'الحالة: جاري التحليل...',
                project: 'المشروع',
                year: 'السنة',
                identity: 'الهوية'
            }
        },
        process: {
            label: 'كيف نعمل',
            title: 'منهجيتنا',
            tabs: {
                identity: 'مراحل الهوية البصرية',
                design: 'مراحل خدمات التصميم'
            },
            brand: {
                main: [
                    'نبدأ بالاكتشاف الاستراتيجي — فهم رؤيتك وسوقك وتموضعك والمشهد التنافسي.',
                    'من هناك، نحدد أسس العلامة التجارية: الهدف، الشخصية، والتوجه. نترجم الاستراتيجية إلى أنظمة بصرية، ونصيغ هوية مميزة مبنية على الوضوح والقابلية للتوسع والدقة.',
                    'النتيجة النهائية هي نظام علامة تجارية متماسك مصمم للأداء المتسق عبر كل نقاط التواصل.'
                ],
                stages: [
                    { id: '01', title: 'الاكتشاف والتوجه', timeline: '2–6 أيام', description: 'فهم العلامة التجارية والأهداف والتوجه البصري.' },
                    { id: '02', title: 'تطوير الهوية البصرية', timeline: '7–15 يوماً', description: 'مفاهيم الشعار، النظام البصري، وتوجه الحركة الأولي.' },
                    { id: '03', title: 'التحسين والمراجعات', timeline: '4–8 أيام', description: 'تحسين التوجه المختار وجولات المراجعة المتفق عليها.' },
                    { id: '04', title: 'الاعتماد والتسليم', timeline: '2–5 أيام', description: 'إعداد الأصول النهائية وتسليم الملفات المعتمدة.' },
                ],
                summary: {
                    title: 'إجمالي الجدول الزمني',
                    value: '15–35 يوماً',
                    note: 'تختلف المدة الزمنية بناءً على باقة الهوية المختارة. من الأساسية (15-20 يوماً) إلى المتكاملة (30-35 يوماً).'
                }
            },
            design: {
                main: [
                    'يبدأ كل مشروع تصميم بأهداف واضحة ومتطلبات وظيفية.',
                    'نحلل السياق، ونحدد الهيكلية، ونطور مفاهيم إبداعية تتماشى مع نظام العلامة التجارية. من خلال التحسين والتكرار، نقدم حلول تصميم دقيقة وهادفة.',
                    'حلول قوية بصرياً، سليمة تقنياً، وجاهزة للتطبيق في العالم الحقيقي.'
                ],
                stages: [
                    { id: '01', title: 'الموجز والأهداف', description: 'فهم المتطلبات والسياق والنتائج المرجوة.' },
                    { id: '02', title: 'تطوير المفهوم', description: 'إنشاء مفاهيم تصميم تتماشى مع نظام وأهداف العلامة التجارية.' },
                    { id: '03', title: 'التحسين والتكرار', description: 'تحسين التوجه المختار من خلال جولات مراجعة متفق عليها.' },
                    { id: '04', title: 'التسليم النهائي', description: 'إعداد ملفات جاهزة للإنتاج بجميع التنسيقات المطلوبة.' },
                ],
                summary: {
                    title: 'الجدول الزمني المعتاد',
                    value: '3–10 أيام',
                    note: 'تتراوح خدمات التصميم الفردية من 3 أيام (وسائل التواصل الاجتماعي) إلى 10 أيام (باقات الشعار المدمجة).'
                }
            },
            visual: {
                brand: 'هوِيّة',
                design: 'تصميم',
                identityLabel: 'مراحل الهوية',
                servicesLabel: 'مراحل الخدمات'
            }
        },
        entrance: {
            headline: 'نحو المستقبل',
            button: 'دخول',
            description: 'شريك تصميم استراتيجي يركز على الوضوح والدقة والنمو الهادف. نبني هويات جريئة وجاهزة للمستقبل تعزز المصداقية وتلهم الابتكار وتخلق تأثيراً دائماً من خلال أنظمة تصميم واعية.'
        },
        cta: {
            label: 'تواصل معنا',
            headline: ["لنبني", "شيئاً", "استثنائياً"],
            button: 'ابدأ مشروعاً',
            whatsapp: 'تواصل عبر واتساب',
            email: 'البريد الإلكتروني',
            cosmos: 'كوزموس',
            instagram: 'إنستغرام',
            behance: 'بيهانس',
            cosmosValue: 'nesignstudio',
            social: {
                instagram: 'إنستغرام',
                behance: 'بيهانس',
                whatsapp: 'واتساب'
            }
        },
        footer: {
            navigation: 'التنقل',
            social: 'التواصل الاجتماعي',
            location: 'الموقع',
            locNote: 'متاح للعمل عن بعد',
            brandDesc: 'ستوديو تصميم رائد يركز على الوضوح، الأنظمة، وتوجه العلامة التجارية. نصمم هويات قوية ودقيقة ومستقبلية.',
            studioLabel: 'ستوديو التصميم الجرافيكي والهوية البصرية',
            rights: 'جميع الحقوق محفوظة.',
            backToTop: 'العودة للأعلى'
        },
        modal: {
            title: 'ابدأ مشروعك',
            subtitle: 'لنناقش رؤية علامتك التجارية وأهدافك الاستراتيجية.',
            whatsapp: 'تواصل عبر واتساب',
            emailToggle: 'هل تفضل البريد الإلكتروني؟',
            form: {
                name: 'الاسم',
                email: 'البريد الإلكتروني',
                brief: 'نبذة عن المشروع',
                submit: 'إرسال الاستفسار'
            },
            waTemplate: 'مرحباً، أود البدء في مشروع هوية بصرية. إليك بعض التفاصيل عن عملي:',
            status: {
                sending: 'جاري إرسال الاستفسار...',
                success: 'تم إرسال الاستفسار بنجاح!',
                error: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.'
            }
        }
    }
};
