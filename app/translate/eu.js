module.exports = {
    general: {
        generalError: "Zerbait oker joan da. Akatsa, grabatu da eta gure langileei zuzenduko zaie. Barkatu eragozpenak!",
        permissionError: "Ez duzu nahikoa baimen",
        adminOneError: "Ez duzu nahikoa baimen. Ezin diozu zure maila edo handiagoko bati aldaketarik egin.",
        adminTwoError: "Ez duzu nahikoa baimen. Administratzailea izan behar duzu beste bat administratzaile mailara igotzeko."
    },
    validation: {
        emailLength: "Posta elektronikoak gutxienez 5 karaktere izan behar ditu, baina ez 30 baino gehiago.",
        emailValid: "Baliozko posta elektoniko bat izan behar du.",
        nameLength: "Izenak gutxienez 5 karaktere izan behar ditu, baina ez 35 baino gehiago.",
        nameValid: "Izenak ezin du karaktere berezirik izan.",
        usernameLength: "Erabiltzaile izenak gutxienez 3 karaktere izan behar ditu, baina ez 15 baino gehiago.",
        usernameValid: "Erabiltzaile izenak ezin du karaktere berezirik izan.",
        passwordLength: "Pasahitzak gutxienez 8 karaktere izan behar ditu, baina ez 35 baino gehiago.",
        passwordValid: "Gutxienez, maiuskula, minuskula, zenbaki eta karaktere berezi bat izan behar du.",
        aboutYourselfLength: "Zuri buruzek 500 karaktere baino gutxiago izan behar ditu.",
        titleLength: "Tituluak gutxienez 3 karaktere izan behar ditu, baina ez 35 baino gehiago.",
        titleValid: "Tituluak ezin du karaktere berezirik izan.",
        locationLength: "Kokapenak 1000 karaktere baino gutxiago izan behar ditu.",
        categoryDescriptionLength: "Deskribapenak gutxienez 5 karaktere izan behar ditu, baina ez 200 baino gehiago.",
        eventDescriptionLength: "Deskribapenak gutxienez 50 karaktere izan behar ditu, baina ez 20000 baino gehiago.",
        observationLength: "Oharrak 1000 karaktere baino gutxiago izan behar ditu.",
        discoveryLength: "Aurkikuntzak 1000 karaktere baino gutxiago izan behar ditu.",
        bibliographyLength: "Bibliografiak 1000 karaktere baino gutxiago izan behar ditu.",
        latitudeValid: "Mesedez, sar ezazu latitudea hamartar formatuan.",
        longitudeValid: "Mesedez, sar ezazu luzeera hamartar formatuan.",
        commentLength: "Iruzkinak 1500 karaktere baino gutxiago izan behar ditu."
    },
    register: {
        nameProvidedError: "Izen bat eman behar duzu.",
        emaiProvidedlError: "Posta elektroniko bat eman behar duzu.",
        usernameProvidedError: "Erabiltzaile izen bat eman behar duzu.",
        passwordProvidedError: "Pasahitz bat eman behar duzu.",
        duplicateError: "Erabiltzaile izena edo posta elektronikoa existitzen da.",
        saveError: "Ezin izan da erabiltzailea gorde. Akatsa: ",
        emailSubject: "Zure aktibazio esteka",
        emailTextOne: "Kaixo ",
        emailTextTwo: ", eskerrik asko localhost.com-en izena emateagatik. Egin klik honako estekan aktibazioa osatzeko: http://localhost:4200/eu/aktibatu/",
        emailHtmlOne: "Kaixo<strong> ",
        emailHtmlTwo: '</strong>,<br><br>Eskerrik asko localhost.com-en izena emateagatik. Egin klik honako estekan aktibazioa osatzeko:<br><br><a href="http://localhost:4200/eu/aktibatu/',
        emailHtmlThree: '">http://localhost:4200/eu/aktibatu/</a>',
        success: "Kontua erregistratuta! Egiaztatu zure posta elektronikoko aktibazio esteka."
    },
    checkEmail: {
        emailProvidedError: "Ez da posta elektronikoa eman.",
        emailTakenError: "Posta elektronikoa hartuta dago.",
        success: "Posta elektronikoa eskuragarri dago."
    },
    checkUsername: {
        usernameProvidedError: "Ez da erabiltzaile izena eman.",
        usernameTakenError: "Erabiltzaile izena hartuta dago.",
        success: "Erabiltzaile izena eskuragarri dago."
    },
    login: {
        usernameProvidedError: "Erabiltzaile izena ez da eman.",
        usernameError: "Erabiltzailea ez da aurkitu.",
        passwordError: "Ez da pasahitzik eman.",
        passwordValidError: "Ezin izan da pasahitza balioztatu.",
        activatedError: "Kontua oraindik ez dago aktibatuta. Egiaztatu zure posta elektronikoko aktibazio esteka.",
        success: "Erabiltzailea balioztatua!"
    },
    activate: {
        temporaryTokenProvidedError: "Behin-behineko tokena ez da eman.",
        expiredError: "Aktibazio esteka iraungi da.",
        passwordError: "Pasahitza ez da eman.",
        passwordValidError: "Ezin izan da pasahitza balioztatu.",
        activatedError: "Kontua oraindik ez dago aktibatuta. Egiaztatu zure posta elektronikoko aktibazio esteka.",
        emailSubject: "kontua aktibatuta",
        emailTextOne: "Kaixo ",
        emailTextTwo: ", Zure kontua ondo aktibatu da!",
        emailHtmlOne: "Kaixo<strong> ",
        emailHtmlTwo: "</strong>,<br><br>Zure kontua ondo aktibatu da!",
        success: "kontua aktibatuta!"
    },
    resend: {
        usernameProvidedError: "Erabiltzaile izena ez da eman.",
        passwordProvidedError: "Pasahitza ez da eman.",
        userError: "Ezin izan da erabiltzailea balioztatu.",
        validPasswordError: "Ezin izan da pasahitza balioztatu.",
        accountError: "Kontua dagoeneko aktibatuta dago.",
        emailSubject: "Aktibazio estekaren eskaera",
        emailTextOne: "Kaixo ",
        emailTextTwo: ", Berriki, kontu berri bat aktibatzeko esteka eskatu duzu. Egin klik beheko estekan zure aktibazioa osatzeko: http://localhost:4200/eu/aktibatu/",
        emailHtmlOne: "Kaixo<strong> ",
        emailHtmlTwo: '</strong>,<br><br>Berriki, kontu berri bat aktibatzeko esteka eskatu duzu. Egin klik beheko estekan zure aktibazioa osatzeko:<br><br><a href="http://localhost:4200/eu/aktibatu/',
        emailHtmlThree: '">http://localhost:4200/eu/aktibatu/</a>',
        success: "Aktibazio esteka hona bidali da "
    },
    resetUsername: {
        emailProvidedError: "Posta elektonikoa ez da eman.",
        emailError: "Ez da posta elektronikoa aurkitu.",
        emailSubject: "Erabiltzaile izen eskaera.",
        emailTextOne: "Kaixo ",
        emailTextTwo: ", Berriki, zure erabiltzaile izena eskatu duzu. Mesedez, gorde ezazu zure fitxategietan: ",
        emailHtmlOne: "Kaixo<strong> ",
        emailHtmlTwo: "</strong>,<br><br>Berriki, zure erabiltzaile izena eskatu duzu. Mesedez, gorde ezazu zure fitxategietan: ",
        success: "Erabiltzaile izena posta elektronikoara bidali da!"
    },
    resetPassword: {
        tokenProvidedError: "Tokena ez da eman.",
        usernameError: "Erabiltzaile izena ez da aurkitu.",
        accountError: "Kontua oraindik ez da aktibatu.",
        emailSubject: "Berrezarri pasahitz eskaera",
        emailTextOne: "Kaixo ",
        emailTextTwo: ', Berriki, pasahitza berrezartzeko esteka eskatu duzu. Egin klik beheko estekan zure pasahitza berrezartzeko:<br><br><a href="http://localhost:4200/eu/pasahitz-berria/',
        emailHtmlOne: "Kaixo<strong> ",
        emailHtmlTwo: '</strong>,<br><br>Berriki, pasahitza berrezartzeko esteka eskatu duzu. Egin klik beheko estekan zure pasahitza berrezartzeko:<br><br><a href="http://localhost:4200/eu/pasahitz-berria/',
        emailHtmlThree: '">http://localhost:4200/eu/pasahitz-berria/</a>',
        success: "Pasahitza berrezartzeko, egiaztatu zure posta elekronikoko esteka.",
        expiredError: "Pasahitz esteka iraungi da.",

    },
    savePassword: {
        usernameProvidedError: "Erabiltzaile izena ez da eman.",
        passwordProvidedError: "Pasahitza ez da eman.",
        emailSubject: "Pasahitza berrezarri da",
        emailTextOne: "Kaixo ",
        emailTextTwo: ", Posta elektroniko honek jakinarazten dizu zure pasahitza berrezarri berria dela.",
        emailHtmlOne: "Kaixo<strong> ",
        emailHtmlTwo: "</strong>,<br><br>Posta elektroniko honek jakinarazten dizu zure pasahitza berrezarri berria dela.",
        success: "Pasahitza berrezarri da!"
    },
    usersImages: {
        usernamesError: "Erabiltzaile izenen zerrenda ez da eman."
    },
    headers: {
        tokenError: "Ez da tokena eman.",
        validError: "Token baliogabea."
    },
    renewToken: {
        usernameProvidedError: "Erabiltzaile izena ez da eman.",
        userError: "Erabiltzailea ez da aurkitu."
    },
    permission: {
        userError: "Erabiltzailea ez da aurkitu."
    },
    management: {
        usernameProvidedError: "Erabiltzaile izena ez da eman.",
        userError: "Erabiltzailea ez da aurkitu.",
        usersError: "Erabiltzaileak ez dira aurkitu.",
        permissionError: "Ez duzu nahikoa baimen"
    },
    authentication: {
        userError: "Erabiltzailea ez da aurkitu."
    },
    profile: {
        usernameProvidedError: "Erabiltzaile izena ez da eman.",
    },
    editUser: {
        usernameProvidedError: "Erabiltzailea ez da eman.",
        userError: "Erabiltzailea ez da aurkitu.",
        nameUpdated: "Izena eguneratu da!",
        usernameUpdated: "Erabiltzaile izena eguneratu da!",
        emailUpdated: "Posta elektronikoa egunertu da!",
        avatarUpload: "Erabiltzaile argazkia igo da",
        aboutYourselfUpdated: "Zuri buruz eguneratu da!",
        success: "Baimenak eguneratu dira",
    },
    //File upload
    fileUpload: {
        usernameProvidedError: "Erabiltzaile izena ez da eman.",
        imageProvidedError: "Irudia ez da eman.",
        bucketProvidedError: "Edukiontzia ez da eman.",
        nameProvidedError: "Irudiaren izena ez da eman.",
        uploadError: "Akatsa gertatu da irudiak igotzean!",
        uploadSuccess: "Irudiak ongi igo dira.",
        deleteError: "Akatsa gertatu da irudiak ezabatzean!",
        deleteSuccess: "Irudiak ongi ezabatu dira.",
        keyError: "Giltza eman behar duzu.",
        bucketError: "Irudiaren edukiontzaia eman behar duzu."
    },
    //newCategory
    newCategory: {
        titleProvidedError: "Kategoriaren izenburua beharrezkoa da.",
        descriptionProvidedError: "Kategoriaren deskribapena beharrezkoa da.",
        saveError: "Kategoria ezin da gorde. Errorea:",
        success: "Kategoria gorde da!"
    },
    //newEvent
    newEvent: {
        createdByProvidedError: "Ekintzaren sortzailea beharrezkoa da.",
        categoryIdProvidedError: "Kategoriaren IDa beharrezkoa da.",
        titleProvidedError: "Ekintzaren izenburua beharrezkoa da.",
        startProvidedError: "Ekintzaren hasiera beharrezkoa da.",
        endProvidedError: "Ekintzaren bukaera beharrezkoa da.",
        descriptionProvidedError: "Ekintzaren deskribapena beharrezkoa da.",
        saveError: "Ekintza ezin da gorde. Errorea:",
        success: "Ekintza gorde da!"
    },
     //newAplication
    newAplication: {
        usersProvidedError: "Aplikazioaren erabiltzaileak beharrezkoak dira.",
        titleProvidedError: "Aplikazioaren izenburua beharrezkoa da.",
        licenseNameProvidedError: "Aplikazioaren lizentzia beharrezkoa da.",
        conditionsProvidedError: "Aplikazioaren baldintzak beharrezkoak dira.",
        priceProvidedError: "Aplikazioaren prezioa beharrezkoa da.",
        expiredAtProvidedError: "Aplikazioaren iraungitze data beharrezkoa da.",
        userError: "Erabiltzailea ez da aurkitu.", 
        saveError: "Aplikazioa ezin da gorde. Errorea:",
        success: "Aplikazioa gorde da!"
    },
    //allUserEvents
    allUserEvents: {
        usernameProvidedError: "Ekintzen erabiltzailea ez da eman.",
        eventsError: "Ez dira ekintzak aurkitu.",
    },
     //allUserAplications
    allUserAplications: {
        usernameProvidedError: "Aplikazioen erabiltzailea ez da eman.",
        userError: "Erabiltzailea ez da aurkitu.",     
        aplicationsError: "Ez dira aplikazioak aurkitu."
    },
     //allUsersSearch
    allUsersSearch: {
        searchTermProvidedError: "Bilaketa hitza ez da eman.",
        usersError: "Erabiltzaileak ez dira aurkitu.",
    },
     //allEventsSearch
    allEventsSearch: {
        searchTermProvidedError: "Bilaketa hitza ez da eman.",
        eventsError: "Ekintzak ez dira aurkitu.",
    },
    //getEvent
    getEvent: {
        idProvidedError: "Ekintzaren IDa ez da eman.",
        eventError: "Ez da ekintza aurkitu.",
        placeError:"Ez da lekua aurkitu.",
        categoryError:"Ez da kategoria aurkitu."
    },
    //getAplication
     getAplication: {
        idProvidedError: 'Aplikazioaren IDa ez da eman.',
        usernameProvidedError: "Aplikazioen erabiltzailea ez da eman.",
        userError: "Erabiltzailea ez da aurkitu.",      
        aplicationError: "Aplikazioa ez da aurkitu."
    },
    //newPlace
    newPlace: {
        eventIdProvidedError: 'Ekintzaren IDa beharrezkoa da.',
        provinceProvidedError: "Probintzia beharrezkoa da.",
        geonameIdProvinceProvidedError: "Probintziaren geoname ID beharrezkoa da.",
        municipalityProvidedError: "Udalerria beharrezkoa da.",
        geonameIdMunicipalityProvidedError: "Udalerriaren geoname ID beharrezkoa da.",
        latProvidedError: "Latitudea beharrezkoa da.",
        lngProvidedError: "Luzeera beharrezkoa da.",
        saveError: "Lekua ezin da gorde. Errorea:",
        success: "Lekua gorde da!"
    },
    allCategories: {
        idProvidedError: 'Ez da categoriaren IDa eman.',
        categoriesError: "Ez da kategoriarik aurkitu.",
        thematicProvidedError: "Ez da tematika eman.",
        visibleProvidedError: "Ez da ikusgai parametroa eman.",
        themeProvidedError: "Ez da gaia eman.",
        classProvidedError: "Ez da mota eman.",
        countryProvidedError: "Herrialdea ez da eman.",
        regionProvidedError: "Eskualdea ez da eman."
    },
    singleTheme: {
        paramProvidedError: "Ez da gaiaren IDa eman.",
        themeError: "Ez da gaia aurkitu."
    },
    updateCategory: {
        idProvidedError: 'Ez da gaiaren IDa eman.',
        categoryError: "Kategoria ez da aurkitu.",
        userError: "Erabiltzailea ez da aurkitu.",
        permissionError: "Ez duzu kategoria hau aldatzeko baimenik.",
        saveError: "Ezin izan da kategoria eguneratu. Akatsa: ",
        success: "Kategoria eguneratu da!"
    },
    editEvent: {
        idProvidedError: 'Ez da ekintzaren IDa eman.',
        createdByProvidedError:'Ekintzaren erabiltzailea ez da eman.',
        saveError: "Ezin izan da ekintza aldatu. Akatsa: ",
        success: "Ekintza aldatu da!"
    },
    deleteTheme: {
        idProvidedError: 'Ez da gaiaren IDa eman.',
        themeError: "Gaia ez da aurkitu.",
        userError: "Erabiltzailea ez da aurkitu.",
        permissionError: "Ez duzu gaiaren publikazio hau ezabatzeko baimenik.",
        saveError: "Ezin izan da gaia ezabatu. Akatsa: ",
        success: "Gaia ezabatu da!"
    },
    addThemeReaction: {
        idProvidedError: 'Ez da gaiaren IDa eman.',
        reactionProvidedError: 'La reacción del tema no fue proporcionada.',
        themeError: "Gaia ez da aurkitu.",
        userError: "Erabiltzailea ez da aurkitu.",
        ownError: "Ezin diozu zeure publikazioari erreakziorik egin.",
        likedBeforeError: "Publicazio oni erreakzioa jada egin diozu. ",
        saveError: "Ezin izan da erreakzioa gehitu. Akatsa: ",
        success: "Erreakzioa gehitu da!"
    },
    deleteThemeReaction: {
        idProvidedError: 'Ez da gaiaren IDa eman.',
        themeError: "Gaia ez da aurkitu.",
        userError: "Erabiltzailea ez da aurkitu.",
        ownError: "Ezin diozu zeure publicazioari erreakziorik egin.",
        quitBeforeError: "Ya has dejado de reaccionar este post",
        saveError: "Ezin izan da erreakzioa ezabatu. Akatsa: ",
        success: "Erreakzioa ezabatu da!"
    },
    newComment: {
        createdByProvidedError: "Iruzkinaren sortzailea beharrezkoa da.",
        themeIdProvidedError: "Gaiaren IDa beharrezkoa da.",
        commentProvidedError: "Iruzkina beharrezkoa da.",
        saveError: "Iruzkina ezin da gorde. Errorea:",
        success: "Iruzkina gorde da!"
    },
    comments: {
        commentsError: "Ez da iruzkinik aurkitu."
    }
};