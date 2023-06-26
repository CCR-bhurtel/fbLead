const templates = [
    {
        name: 'escursenjoy',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}},',
                example: {
                    header_text: ['Giovanni'],
                },
            },
            {
                type: 'BODY',
                text: 'Siamo lieti di darvi il benvenuto nella splendida *isola di Ischia* 🏖\n\nPer rendere il vostro soggiorno ancora più emozionante, abbiamo preparato una serie di proposte per escursioni che potete trovare cliccando il link sottostante, disponibili a *prezzi speciali* dedicati esclusivamente ai nostri ospiti.\n\nPotete prenotare direttamente con *Lesya*, la nostra assistente di *Enjoy Ischia*, tramite *WhatsApp al numero 3791115858*.\n\nLesya sarà a vostra disposizione per assistervi nelle prenotazioni delle escursioni dalle 09:00 alle 13:00 e dalle 15:00 alle 19:00.\n\nIn caso di emergenze, sarà reperibile 24 ore su 24.\n\nNon esitate a contattarla per qualsiasi necessità o richiesta durante il vostro soggiorno a Ischia.\n\nVi auguriamo una meravigliosa esperienza sulla nostra incantevole isola ☀️',
            },
            {
                type: 'FOOTER',
                text: 'Staff Enjoy Ischia',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: 'Guarda Pacchetti',
                        url: 'https://www.ischiaenjoy.it/',
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiama Lesya',
                        phone_number: '+393791115858',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'IN_APPEAL',
        category: 'MARKETING',
        id: '813779796798285',
    },
    {
        name: 'enjoypartenze',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}}',
                example: {
                    header_text: ['Marco'],
                },
            },
            {
                type: 'BODY',
                text: "Per assistenza o richieste, i nostri numeri di contatto sono a vostra completa disposizione:\n\n✅ Dal lunedì al sabato: disponibili dalle 09:00 alle 21:00 al numero 08119751066.\nLa domenica: disponibili dalle 11:00 alle 19:00 allo stesso numero.\n\n✅ Per coloro che viaggiano la domenica, offriamo un servizio assistenza speciale, disponibile dalle 07:30 alle 11:00. Potete raggiungerci al numero di cellulare 3791115858.\n\nDesideriamo farvi notare che non è possibile modificare i biglietti per l'aliscafo, il traghetto, il treno, l'aereo o gli orari di prelievo dalle strutture. In caso di bisogno di variazioni, si consiglia di contattare direttamente le biglietterie delle rispettive compagnie di trasporto.\n\nSiamo qui per te per qualsiasi domanda o informazione, quindi non esitare a contattarci.",
            },
            {
                type: 'FOOTER',
                text: 'Staff Enjoy Ischia',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+3908119751066',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '637950974903228',
    },
    {
        name: 'escursioniassistenza',
        components: [
            {
                type: 'HEADER',
                format: 'VIDEO',
                example: {
                    header_handle: [
                        'https://scontent.whatsapp.net/v/t61.29466-34/315809145_291766833294240_2223091244202706588_n.mp4?ccb=1-7&_nc_sid=57045b&_nc_ohc=AoXWrlnH5pUAX9fQT7C&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_AdQ0kqcRHNClhlLSoUYOXb3x1qOXf9aHfdJnlDMlQvEH_g&oe=64ACF664',
                    ],
                },
            },
            {
                type: 'BODY',
                text: 'Gentile *{{1}}*,\n\nSiamo lieti di darvi il benvenuto nella splendida *isola di Ischia* 🏖\n\nPer rendere il vostro soggiorno ancora più emozionante, abbiamo preparato una serie di proposte per escursioni che potete trovare cliccando il link sottostante, disponibili a *prezzi speciali* dedicati esclusivamente ai nostri ospiti.\n\nPotete prenotare direttamente con *Lesya*, la nostra assistente di *Enjoy Ischia*, tramite *WhatsApp al numero 3791115858*.\n\nLesya sarà a vostra disposizione per assistervi nelle prenotazioni delle escursioni dalle 09:00 alle 13:00 e dalle 15:00 alle 19:00.\n\nIn caso di emergenze, sarà reperibile 24 ore su 24.\n\nNon esitate a contattarla per qualsiasi necessità o richiesta durante il vostro soggiorno a Ischia.\n\nVi auguriamo una meravigliosa esperienza sulla nostra incantevole isola ☀️',
                example: {
                    body_text: [['Marco']],
                },
            },
            {
                type: 'FOOTER',
                text: 'Staff Enjoy Ischia',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: 'Guarda Pacchetti',
                        url: 'https://www.ischiaenjoy.it/',
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiama Lesya',
                        phone_number: '+393791115858',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '291766829960907',
    },
    {
        name: 'enjoyarrivi',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}}',
                example: {
                    header_text: ['Marco'],
                },
            },
            {
                type: 'BODY',
                text: "Ischia è pronta ad accoglierti 🏖\n\nCi auguriamo che il vostro soggiorno sia rilassante e piacevole. In caso abbiate bisogno di assistenza, il nostro team del *servizio assistenza turistica Enjoy Ischia* è pronto a supportarvi.\n\n*I nostri orari di servizio sono:*\n\n✅ Dal lunedì al sabato: dalle 09:00 alle 21:00\nLa domenica: dalle 11:00 alle 19:00\nPotete contattarci al seguente numero di telefono: 08119751066.\n\n✅ Per coloro che *viaggiano di domenica*, è disponibile un servizio speciale di *assistenza dalle 07:30 alle 11:00 al numero di cellulare: 3791115858*.\n\nSi prega di notare che non è possibile modificare i biglietti per l'aliscafo, il traghetto, il treno, l'aereo o gli orari di prelievo dalle strutture. In caso di necessità, consigliamo di verificare direttamente presso le biglietterie delle rispettive compagnie.",
            },
            {
                type: 'FOOTER',
                text: 'Staff Enjoy Ischia',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+3908119751066',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '624269809420764',
    },
    {
        name: 'prenotazioniviagginfiniti',
        components: [
            {
                type: 'BODY',
                text: "Gentile  {{1}}\nSiamo lieti di informarla che la Sua prenotazione è stata presa in carico con successo. Desideriamo confermarle che abbiamo ricevuto tutti i dettagli necessari per il suo soggiorno presso  {{2}}.\n\nNelle prossime ore, la struttura La contatterà per fornirle ulteriori informazioni riguardanti la caparra richiesta per confermare definitivamente la Sua prenotazione. \n\nRestiamo a disposizione per qualsiasi ulteriore informazione o assistenza di cui possa aver bisogno. Il nostro obiettivo principale è garantire un servizio efficiente e soddisfacente per tutti i nostri clienti.\n\nGrazie per aver scelto la nostra agenzia per la prenotazione del suo soggiorno. Siamo sicuri che avrà un'esperienza piacevole presso  {{3}}.",
                example: {
                    body_text: [['Valeria', 'Eden Park', 'Eden Park']],
                },
            },
            {
                type: 'FOOTER',
                text: 'Cordiali Saluti',
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '6627351417331075',
    },
    {
        name: 'confermavolo',
        components: [
            {
                type: 'HEADER',
                format: 'DOCUMENT',
                example: {
                    header_handle: [
                        'https://scontent.whatsapp.net/v/t61.29466-34/343960559_683723803478555_7395074478450987449_n.pdf?ccb=1-7&_nc_sid=57045b&_nc_ohc=F58auxxAhXQAX9Vcu1U&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_AdR-eRndHxZ93w8dayhWVXgMi9HJNJg56nXzG38VjooypQ&oe=64AD130B',
                    ],
                },
            },
            {
                type: 'BODY',
                text: 'Gentile {{1}},\ndi seguito le informazioni relative al Suo volo. \nLa preghiamo di verificare che tutti i dettagli siano corretti e di segnalarci eventuali discrepanze entro 2 ore dalla ricezione di questo messaggio. \n\nTrascorso tale termine *non sarà più possibile effettuare modifiche*. \n\nLa informiamo inoltre che è consentito portare a bordo due bagagli a mano, con dimensioni massime uno di 40 cm x 20 cm x 25 cm e l’altro di 55 cm x40 cm x 20cm  del peso massimo di 10kg.\n\nLa invitiamo a contattarci un {{2}} giorni prima della partenza per effettuare il check-in online. \n\nLe ricordiamo che l’assegnazione dei posti avverrà in maniera casuale e gratuita.\n\nPer qualsiasi ulteriore informazione, non esiti a contattarci.',
                example: {
                    body_text: [['MArco', 'tre']],
                },
            },
            {
                type: 'FOOTER',
                text: 'Cordiali saluti',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+3908119751066',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '683723800145222',
    },
    {
        name: 'modulibuoni1',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}}, un caro saluto da Ischia.',
                example: {
                    header_text: ['Bruna'],
                },
            },
            {
                type: 'BODY',
                text: 'di seguito il preventivo da te richiesto:\n\nDate del viaggio: {{1}}\nCittà di partenza: {{2}}\nTipologia della camera: {{3}}\nHotel: {{4}}\n\n*✅ Totale tutto incluso: € {{5}}*\n\n_Per vedere maggiori dettagli sull\'hotel e pacchetto a te riservato puoi cliccare sul tasto sottostante "Guarda l\'offerta"_\n\nIn caso di ulteriori informazioni o personalizzazioni, non esitare a contattarci.\nSiamo a tua disposizione per creare la soluzione perfetta per te.\n\n⏬⏬⏬⏬⏬',
                example: {
                    body_text: [
                        ['dal 20 al 27 dicembre', 'Milano con volo', 'doppia 2 persone', 'Hotel Eedn PArk', '570,00'],
                    ],
                },
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: "Guarda l'offerta",
                        url: 'https://preventivi.ischiatour.it/preventivi/{{1}}',
                        example: ['https://preventivi.ischiatour.it/preventivi/eden/FB/5838'],
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+390810118098',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '890625446037580',
    },
    {
        name: 'valutazioneinfoischiamoduli',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}} un caro saluto da Ischia',
                example: {
                    header_text: ['Msrco'],
                },
            },
            {
                type: 'BODY',
                text: "Vogliamo assicurarci di rispondere al meglio alle tue esigenze e perciò siamo a tua completa disposizione per rispondere a qualsiasi domanda tu possa avere o per fornirti ulteriori dettagli riguardanti il nostro servizio. \n\nTi ricordiamo che il preventivo che ti abbiamo inviato è valido per un limitato periodo di tempo, pertanto, ti invitiamo a confermare al più presto possibile per garantirti la disponibilità.\n\nGrazie ancora per aver considerato la nostra offerta per il tuo soggiorno. Aspettiamo la tua risposta.\n\nSe la proposta iniziale non ti ha convinto, saremo più che felici di *aiutarti a cercare un'altra offerta*.\n\nTi invitiamo anche a visitare la nostra pagina ✅ *https://ischiatour.it/hotel-ischia/* dove troverai altre offerte con il viaggio incluso.",
            },
            {
                type: 'FOOTER',
                text: 'Restiamo a tua disposizione, staff infoischia.com',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: 'Guarda altre offerte',
                        url: 'https://ischiatour.it/hotel-ischia/',
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+390810118098',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '561004179539455',
    },
    {
        name: 'riscrivimorgana',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}}, un caro saluto da Ischia',
                example: {
                    header_text: ['Marco'],
                },
            },
            {
                type: 'BODY',
                text: "Vogliamo assicurarci di rispondere al meglio alle tue esigenze e perciò siamo a tua completa disposizione per rispondere a qualsiasi domanda tu possa avere o per fornirti ulteriori dettagli riguardanti il nostro servizio. \n\nTi ricordiamo che il preventivo che ti abbiamo inviato è valido per un limitato periodo di tempo, pertanto, ti invitiamo a confermare al più presto possibile per garantirti la disponibilità.\n\nGrazie ancora per aver considerato la nostra offerta per il tuo soggiorno. Aspettiamo la tua risposta.\n\nSe la proposta iniziale non ti ha convinto, saremo più che felici di *aiutarti a cercare un'altra offerta*.\n\nTi invitiamo anche a visitare la nostra pagina ✅ *https://www.info-ischia.it/promozioni-speciali/* dove troverai altre offerte.",
            },
            {
                type: 'FOOTER',
                text: 'Cordiali Saluto Staff Infoischia.com',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: 'Guarda altre offerte',
                        url: 'https://www.info-ischia.it/promozioni-speciali/',
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+393711503720',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '803846020837345',
    },
    {
        name: 'ischiapreventivi',
        components: [
            {
                type: 'BODY',
                text: "Gentile {{1}}, un caro saluto da Ischia\n\nci fa piacere inviarti il preventivo richiesto per:\n\n✅ {{2}}\n\nPer visualizzarlo, non devi fare altro che cliccare sul pulsante sottostante e scoprire l'offerta che abbiamo preparato per te!\n\n_In caso di ulteriori informazioni o personalizzazioni, non esitare a contattarci._\nSiamo a tua disposizione per creare la soluzione perfetta per te.\n\nTi invitiamo a non perdere tempo e a cliccare ora sul pulsante qui sotto per scoprire la nostra offerta.",
                example: {
                    body_text: [['Anna', 'Hotel Terme Royal Palm']],
                },
            },
            {
                type: 'FOOTER',
                text: 'Restiamo a tua disposizione, staff infoischia.com',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: "Guarda l'Offerta",
                        url: 'https://www.hoescape.com/{{1}}',
                        example: ['https://www.hoescape.com/p/pm.php?ktm=1679393702641983a632f14'],
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+3908119758555',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '1336732633854265',
    },
    {
        name: 'valutaizonepreventivo1',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}}',
                example: {
                    header_text: ['Marco'],
                },
            },
            {
                type: 'BODY',
                text: 'Vogliamo assicurarci di rispondere al meglio alle *tue esigenze* e perciò siamo a tua completa disposizione per rispondere a qualsiasi domanda tu possa avere o per fornirti ulteriori dettagli. \n\nTi ricordiamo che il preventivo che ti abbiamo inviato _è valido per un limitato periodo di tempo_, pertanto, ti invitiamo a confermare al più presto possibile per garantirti la disponibilità.\n\nGrazie ancora per aver considerato la nostra offerta per il tuo soggiorno.\nAspettiamo la tua risposta.',
            },
            {
                type: 'FOOTER',
                text: 'Cordiali saluti, staff infoischia.com',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: 'Guarda altre offerte',
                        url: 'https://www.info-ischia.it/promozioni-speciali/',
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiama',
                        phone_number: '+393711503720',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '975469883604798',
    },
    {
        name: 'prevmod1',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}}, un caro saluto da Ischia.',
                example: {
                    header_text: ['Gennaro'],
                },
            },
            {
                type: 'BODY',
                text: "ci fa piacere inviarti il preventivo richiesto per Ischia:\n\n➖*partenza da {{1}}.*\n➖*periodo del soggiorno {{2}}.*\n\nPer visualizzarlo puoi cliccare sul pulsante sottostante e scoprire l'offerta che abbiamo preparato per te!\n\n_In caso di ulteriori informazioni o personalizzazioni, non esitare a contattarci._\nSiamo a tua disposizione per creare la soluzione perfetta per te.\n\nTi invitiamo a non perdere tempo e a cliccare ora sul pulsante qui sotto per scoprire la nostra offerta.\n⏬⏬⏬⏬⏬",
                example: {
                    body_text: [['Milano (treno alta velocità)', 'dal 20 al 27 agosto mezza pensione']],
                },
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: 'Guarda il preventivo',
                        url: 'https://preventivi.ischiatour.it/preventivi/{{1}}',
                        example: ['https://preventivi.ischiatour.it/preventivi/colella/FB/4040'],
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+390810118098',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '1324215211497584',
    },
    {
        name: 'colellacompleto',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}}, un caro saluto da Ischia.',
                example: {
                    header_text: ['Marco'],
                },
            },
            {
                type: 'BODY',
                text: "Di seguito il preventivo da te richiesto:\n\n{{1}} trattamento di mezza pensione.\n\n✅ Sistemazione camera {{2}} totale del soggiorno euro {{3}} con viaggio da {{4}} incluso di passaggi marittimi e trasferimenti fino all'hotel.\n\n*Disponibilità limitata*\n\nHotel Terme Colella - 3 stelle 500 mt. dal centro di Forio d'Ischia\n\nLa quota inoltre include:\n- Accesso alla piscina termale interna\n- Accesso alla piscina termale esterna\n- Terrazza solarium attrezzata con sdraio lettini ed ombrelloni\n- Parcheggio libero non custodito fino ad esaurimento posti\n- Wi-Fi nella hall",
                example: {
                    body_text: [
                        ['21 – 25 maggio 4 notti euro 245 per persona', 'Doppia', '574,00', 'Bologna Centrale'],
                    ],
                },
            },
            {
                type: 'FOOTER',
                text: 'Restiamo a tua disposizione, staff infoischia.com',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: "Guarda l'Hotel",
                        url: 'https://www.infoischia.com/hotel-terme-colella-ischia/',
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+3908119758551',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '6065720956856014',
    },
    {
        name: 'preventivimoduli',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}}, un caro saluto da Ischia',
                example: {
                    header_text: ['Marco'],
                },
            },
            {
                type: 'BODY',
                text: "ci fa piacere inviarti il preventivo richiesto per Ischia:\n\n➖*partenza da {{1}}.*\n\nPer visualizzarlo, non devi fare altro che cliccare sul pulsante sottostante e scoprire l'offerta che abbiamo preparato per te!\n\n_In caso di ulteriori informazioni o personalizzazioni, non esitare a contattarci._\nSiamo a tua disposizione per creare la soluzione perfetta per te.\n\nTi invitiamo a non perdere tempo e a cliccare ora sul pulsante qui sotto per scoprire la nostra offerta.\n⏬⏬⏬⏬⏬",
                example: {
                    body_text: [['Milano']],
                },
            },
            {
                type: 'FOOTER',
                text: 'Cordiali saluti staff infoischia.com',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: "Guarda l'Offerta",
                        url: 'https://preventivi.ischiatour.it/preventivi/{{1}}',
                        example: ['https://preventivi.ischiatour.it/preventivi/modulocolella2023/PR/500'],
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+390810118098',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '6034717213293994',
    },
    {
        name: 'confermaprenotazionesupernew',
        previous_category: 'MARKETING',
        components: [
            {
                type: 'HEADER',
                format: 'DOCUMENT',
                example: {
                    header_handle: [
                        'https://scontent.whatsapp.net/v/t61.29466-34/328751973_629041955728655_544034072210575611_n.pdf?ccb=1-7&_nc_sid=57045b&_nc_ohc=3xslSaKVRxUAX9Kkct7&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_AdTYh89YbCT37mIqml-leSWTNJEVqj_gbB5ROhwYqJLkpw&oe=64AD14EF',
                    ],
                },
            },
            {
                type: 'BODY',
                text: 'Salve {{1}}\n\nSiamo lieti di confermare la prenotazione per:\n\n{{2}}\n\nAbbiamo allegato il PDF della conferma alla presente chat, con un tasto per scaricarlo direttamente sul suo dispositivo.\n\nSe avesse bisogno di assistenza o informazioni aggiuntive, non esiti a contattarci.\nCordiali saluti.',
                example: {
                    body_text: [['Luca', 'hotel principe']],
                },
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+393711503720',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'UTILITY',
        id: '629041952395322',
    },
    {
        name: 'genericocatalogo',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}} un caro saluto da Ischia',
                example: {
                    header_text: ['Marco'],
                },
            },
            {
                type: 'BODY',
                text: 'Di seguito i pacchetti disponibili.',
            },
            {
                type: 'FOOTER',
                text: 'Restiamo a vostra disposizione',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'MPM',
                        text: 'View items',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '279045067795741',
    },
    {
        name: 'lavillabuono',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}} un caro saluto da Ischia',
                example: {
                    header_text: ['Marco'],
                },
            },
            {
                type: 'BODY',
                text: "di seguito il preventivo da te richiesto:\n\n{{1}} trattamento di pensione completa bevande incluse + spiaggia inclusa\n\n✅ Totale soggiorno camera {{2}} euro {{3}} con viaggio incluso da {{4}}\n\n*Disponibilità limitata*\n\n*La Villa Resort & Spa - Forio d'Ischia, 50 mt. dalla spiaggia della Chiaia*\n\n✅ La quota include:\n- Viaggio andata e ritorno con trasferimenti e passaggi marittimi fino all'hotel\n- Trattamento di pensione completa completa\n- Bevande ai pasti nella misura di 1/4 di vino e 1/2 minerale per persona per pasto\n- Servizio spiaggia con 2 sdraio + 1 ombrellone per camera (escluso la domenica)\n- Accesso alla piccola piscina termale coperta\n- Bagno turco ai vapori termali\n- Vasca idromassaggio\n- 2 piscine scoperte di acqua dolce temperatura ambiante (una piccola l'altra di medie dimensioni)\n- Solarium attrezzato con ombrelloni e comodi lettini di rattan. \n- Terme esterne convenzionate Asl con servizio navetta gratuito",
                example: {
                    body_text: [['dal 20 al 27 agosto - 7 notti', 'doppia', '1400', 'Milano centrale (alta velocità)']],
                },
            },
            {
                type: 'FOOTER',
                text: 'Restiamo a vostra disposizione - Staff Infoischia.com',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: "Vedi l'Hotel",
                        url: 'https://www.infoischia.com/park-hotel-la-villa/',
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+3908119758551',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '742060977325165',
    },
    {
        name: 'carlomagno',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}} un caro saluto da Ischia',
                example: {
                    header_text: ['Giuseppe'],
                },
            },
            {
                type: 'BODY',
                text: "di seguito il preventivo da te richiesto:\n\nperiodo del soggiorno: {{1}}.\n\n✅ Totale soggiorno camera {{2}} euro {{3}} con viaggio incluso da {{4}}\n\n*Disponibilità limitata*\n\n*Park Hotel Carlo Magno - Forio d'Ischia, ottima cucina, panoramico con spiaggia inclusa*\n\n✅ La quota include:\n- Viaggio andata e ritorno con trasferimenti e passaggi marittimi fino all'hotel\n- Accesso alle 3 piscine esterne\n- Zona relax con lettini ed ombrelloni\n- Servizio navetta da/per la spiaggia ad orari stabiliti\n- Servizio navetta da/per il centro ad orari stabiliti\n- Servizio Spiaggia con 2 lettini ed 1 ombrellone (dalla 3° fila) per camera indipendentemente dagli occupanti della stessa.",
                example: {
                    body_text: [
                        [
                            'dal 20 al 27 luglio - 7 notti trattamento mezza pensione',
                            'doppia',
                            '900',
                            'Milano centrale (treno)',
                        ],
                    ],
                },
            },
            {
                type: 'FOOTER',
                text: 'Restiamo a vostra disposizione, staff infoischia.com',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: "Guarda l'hotel",
                        url: 'https://www.infoischia.com/hotel-carlo-magno-ischia/',
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+3908119758551',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '6264594423624335',
    },
    {
        name: 'genericoinfo',
        components: [
            {
                type: 'BODY',
                text: 'Gentile {{1}}\nUn saluto da InfoIschia\n\n{{2}}\n\nRestiamo a vostra disposizione.',
                example: {
                    body_text: [['Marco', 'marco']],
                },
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '207261991907616',
    },
    {
        name: 'moduliwa',
        components: [
            {
                type: 'BODY',
                text: "Ciao {{1}}! 🌞\n\nGrazie per aver compilato il modulo su Facebook riguardo al tuo interesse per una vacanza. \n\nSiamo felici di aiutarti a pianificare il tuo soggiorno sulla nostra *meravigliosa isola*.\n\nPer ricevere un'offerta personalizzata {{2}}.",
                example: {
                    body_text: [
                        ['Marco', 'ti chiediamo di indicarci il periodo del soggiorno e il numero delle persone'],
                    ],
                },
            },
            {
                type: 'FOOTER',
                text: 'Restiamo a tua disposizione.',
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '210713445042657',
    },
    {
        name: 'edenpark',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}}',
                example: {
                    header_text: ['Marco'],
                },
            },
            {
                type: 'BODY',
                text: "di seguito il preventivo da te richiesto:\n\n{{1}} trattamento di pensione completa bevande incluse\n\n✅ Totale soggiorno camera {{2}} euro {{3}} con viaggio incluso da {{4}}\n\n*Disponibilità limitata*\n\n*Hotel Eden Park - Forio d'Ischia, 200 mt. dalla spiaggia della Chiaia*\n\n✅ La quota include:\n- Viaggio andata e ritorno con trasferimenti e passaggi marittimi fino all'hotel\n- Tv Con Canali Sky In Camera\n- Riscaldamento / aria condizionata\n- Internet Wi-Fi\n- Colazione con dolce e salato\n- Bevande incluse ai pasti\n- Pasti al ristorante con 3 Menu' a Scelta\n- Piscina Esterna con Solarium attrezzato\n- Piscina Geotermica con Idromassaggio\n- Piscina Interna con Idromassaggio\n- Sauna\n- Doccia Emozionale\n- Parcheggio fino ad esaurimento posti",
                example: {
                    body_text: [['dal 7 al 20 giugno', 'doppia', '570,00', 'Milano centrale']],
                },
            },
            {
                type: 'FOOTER',
                text: 'Restiamo a vostra disposizione, staff infoischia.com',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: "Guarda l'Hotel",
                        url: 'https://www.infoischia.com/hotel-eden-park/',
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+3908119758551',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '284987627193550',
    },
    {
        name: 'infopartenza',
        components: [
            {
                type: 'HEADER',
                format: 'DOCUMENT',
                example: {
                    header_handle: [
                        'https://scontent.whatsapp.net/v/t61.29466-34/343574694_1395463684625324_3494160595636776511_n.pdf?ccb=1-7&_nc_sid=57045b&_nc_ohc=3XnBcpdXTVAAX-tfvfp&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_AdRTFaFAJO6LJthJVYpqSRh5_POSktlPMlHeh6RIzIA_Nw&oe=64AD1593',
                    ],
                },
            },
            {
                type: 'BODY',
                text: 'Gentile {{1}},\n\nbuongiorno da Info Ischia\n\nSiamo lieti inviarLe la Sua comunicazione di partenza, restiamo a disposizione per qualsiasi delucidazione.',
                example: {
                    body_text: [['Marco']],
                },
            },
            {
                type: 'FOOTER',
                text: 'Cordiali Saluti',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+3908119751066',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '1395463681291991',
    },
    {
        name: 'tirrenia',
        components: [
            {
                type: 'BODY',
                text: "Gentile {{1}} di seguito il preventivo da te richiesto:\n\n{{2}} trattamento di pensione completa bevande incluse.\n\nSistemazione camera {{3}} totale del soggiorno euro {{4}} con viaggio da {{5}}, incluso di passaggi marittimi e trasferimenti fino all'hotel.\n\n*Hotel Terme Tirrenia 3 stelle - In centro ad Ischia Porto*\n\n✅ La quota inoltre include:\n- Ristorante ricco di prodotti freschi di stagione con menù a base di carne e pesce\n- Ristorazione con Servizio ai Tavoli\n- Bevande ai Pasti incluse nel prezzo\n- Una Serata Ischitana con Menù Tipico della Tradizione\n- Piscine Termali, Coperte e Scoperte, e Lettini Prendisole sono Inclusi\n- Spa\n- Wi-Fi\n- Sistemazione in Camera Standard Clima",
                example: {
                    body_text: [['Alex', 'dal 20 al 27 agosto euro 400 per persona', 'doppia', '800,00', 'Monza']],
                },
            },
            {
                type: 'FOOTER',
                text: 'Resto a vostra disposizione.',
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: "Guarda l'Hotel",
                        url: 'https://www.infoischia.com/hotel-terme-tirrenia-ischia/',
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+3908119758551',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '784978746551871',
    },
    {
        name: 'modulipreventivi',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}} un caro saluto da Ischia.',
                example: {
                    header_text: ['Marco'],
                },
            },
            {
                type: 'BODY',
                text: "di seguito il preventivo da te richiesto:\n\nPeriodo del soggiorno: {{1}}\nTipologia di camera: {{2}}\nTotale soggiorno: € {{3}} con viaggio da {{4}}, incluso di passaggi marittimi e trasferimenti fino all'hotel.\n\n✅ Hotel assegnato: {{5}} restiamo a tua disposizione staff infoischia.com",
                example: {
                    body_text: [
                        [
                            '28 maggio - 30 maggio 2 notti',
                            'doppia (2 persone)',
                            '700,00 in pensione completa con bevande incluse',
                            'Milano trano da centrale',
                            'Hotel Terme Colella',
                        ],
                    ],
                },
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: "Guarda l'hotel",
                        url: 'https://www.infoischia.com/{{1}}',
                        example: ['https://www.infoischia.com/hotel-san-valentino-terme-ischia/'],
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+3908119758551',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '958208292165448',
    },
    {
        name: 'ischiapnew',
        components: [
            {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Gentile {{1}} un caro saluto da Ischia.',
                example: {
                    header_text: ['Alex'],
                },
            },
            {
                type: 'BODY',
                text: "di seguito il preventivo da te richiesto:\n\n{{1}} trattamento di pensione completa bevande incluse.\n\nSistemazione camera {{2}} totale del soggiorno euro {{3}} con viaggio da {{4}}, incluso di passaggi marittimi e trasferimenti fino all'hotel.\n\n*Hotel Terme San Valentino 4 stelle - In centro ad Ischia Porto*\n\n✅ La quota inoltre include:\nWI-FI in tutto l’hotel\nInternet Café\n1 Serata danzante a settimana dal 1 Giugno al 20 Settembre\n1 Serata all’Ischitana con chitarra e mandolino\n\n*Uso gratuito delle piscine termali*, di cui 2 interne ed 1 esterna ,con lettini ed ombrelloni fino ad esaurimento posti.\nNavetta Hotel-Spiaggia Lido San Pietro ad orari prestabiliti dal 1/06 al 16/09\nAria condizionata dal 15/06 al 15/09\n\n*Percorso Benessere* (bagno turco, doccia emozionale, sauna e Percorso Kneipp)\nServizio termale convenzionato con SSN.",
                example: {
                    body_text: [['dal 7 al 14 maggio € 700', 'doppia', '1400', 'Milano (centrale treno)']],
                },
            },
            {
                type: 'BUTTONS',
                buttons: [
                    {
                        type: 'URL',
                        text: "Guarda l'Hotel",
                        url: 'https://www.infoischia.com/hotel-san-valentino-terme-ischia/',
                    },
                    {
                        type: 'PHONE_NUMBER',
                        text: 'Chiamaci',
                        phone_number: '+3908119758551',
                    },
                ],
            },
        ],
        language: 'it',
        status: 'APPROVED',
        category: 'MARKETING',
        id: '6536673069678719',
    },
];

module.exports = templates;
