module.exports = {
    general: {
        generalError: "Algo salió mal. Este error ha sido registrado y será dirigido a nuestro personal. ¡Pedimos disculpas por este inconveniente!"
    },
    validation: {
        emailLength: "El correo electrónico debe tener al menos 5 caracteres pero no más de 30.",
        emailValid: "Debe ser un correo electrónico válido.",
        nameLength: "El nombre debe tener al menos 5 caracteres pero no más de 35.",
        nameValid: "El nombre no debe tener caracteres especiales.",
        usernameLength: "El nombre de usuario debe tener al menos 3 caracteres pero no más de 15.",
        usernameValid: "El nombre de usuario no debe tener caracteres especiales.",
        passwordLength: "La contraseña debe tener al menos 8 caracteres pero no más de 35.",
        passwordValid: "Debe tener al menos una mayúscula, minúscula, carácter especial y número.",
        aboutYourselfLength: "Acerca de ti no debe tener más de 500 caracteres.",
        categoryTitleLength: "El título debe tener al menos 3 caracteres pero no más de 35.",
        eventTitleLength: "El título debe tener al menos 3 caracteres pero no más de 35.",
        titleValid: "El título no debe tener caracteres especiales.",
        locationLength: "La localización no debe tener más de 1000 caracteres.",
        categoryDescriptionLength: "La descripción debe tener al menos 5 caracteres pero no más de 200.",
        eventDescriptionLength: "La descripción debe tener al menos 50 caracteres pero no más de 20000.",
        observationsLength: "Observaciones no debe tener más de 1000 caracteres.",
        discoveryLength: "El descubrimiento no debe tener más de 1000 caracteres.",
        bibliographyLength: "La bibliografía no debe tener más de 1000 caracteres.",
        latitudeValid: "Por favor, inserte la latitud en formato decimal.",
        longitudeValid: "Por favor, inserte la longitud en formato decimal.",
        commentLength: "El comentario no debe tener más de 1500 caracteres."
    },
    register: {
        nameProvidedError: "Debe proporcionar un nombre.",
        emailProvidedError: "Debe proporcionar un correo electrónico.",
        usernameProvidedError: "Debe proporcionar un nombre de usuario.",
        passwordProvidedError: "Debe proporcionar una contraseña.",
        duplicateError: "El nombre de usuario o correo electrónico ya existe.",
        saveError: "No se pudo guardar el usuario. Error: ",
        emailSubject: "Tu link de activación",
        emailTextOne: "Hola ",
        emailTextTwo: ", Gracias por registrarse en localhost.com. Haga clic en el siguiente enlace para completar su activación: http://localhost:4200/es/activar/",
        emailHtmlOne: "Hola<strong> ",
        emailHtmlTwo: '</strong>,<br><br>Gracias por registrarse en localhost.com. Haga clic en el siguiente enlace para completar su activación:<br><br><a href="http://localhost:4200/es/activar/',
        emailHtmlThree: '">http://localhost:4200/es/activar/</a>',
        success: "Cuenta registrada! Compruebe su enlace de activación por correo electrónico."
    },
    checkEmail: {
        emailProvidedError: "El correo electrónico no fue proporcionado.",
        emailTakenError: "El correo electronico ya ha sido tomado.",
        success: "El correo electrónico está disponible."
    },
    checkUsername: {
        usernameProvidedError: "El nombre de usuario no fue proporcionado.",
        usernameTakenError: "El nombre de usuario ya ha sido tomado.",
        success: "El nombre de usuario está disponible."
    },
    login: {
        usernameProvidedError: "El nombre de usuario no fue proporcionado.",
        usernameError: "Usuario no encontrado.",
        passwordError: "La contraseña no fue proporcionada.",
        passwordValidError: "No se pudo autentificar la contraseña.",
        activatedError: "La cuenta aún no está activada. Compruebe su enlace de activación por correo electrónico.",
        success: "Usuario autentificado!"
    },
    activate: {
        temporaryTokenProvidedError: "El token temporal no fue proporcionado.",
        expiredError: "El enlace de activación ha caducado.",
        passwordError: "La contraseña no fue proporcionada.",
        passwordValidError: "No se pudo autentificar la contraseña.",
        activatedError: "La cuenta aún no está activada. Compruebe su enlace de activación por correo electrónico.",
        emailSubject: "Cuenta activada",
        emailTextOne: "Hola ",
        emailTextTwo: ", Su cuenta ha sido activada exitosamente!",
        emailHtmlOne: "Hola<strong> ",
        emailHtmlTwo: "</strong>,<br><br>Su cuenta ha sido activada exitosamente!",
        success: "Cuenta activada!"
    },
    resend: {
        usernameProvidedError: "El nombre de usuario no fue proporcionado.",
        passwordProvidedError: "La contraseña no fue proporcionada.",
        userError: "No se pudo autentificar el usuario.",
        validPasswordError: "No se pudo autentificar la contraseña.",
        accountError: "La cuenta ya está activada.",
        emailSubject: "Solicitud de enlace de activación",
        emailTextOne: "Hola ",
        emailTextTwo: ", Recientemente has solicitado un enlace para la nueva cuenta. Haga clic en el siguiente enlace para completar su activación: http://localhost:4200/es/activar/",
        emailHtmlOne: "Hola<strong> ",
        emailHtmlTwo: '</strong>,<br><br>Recientemente has solicitado un enlace para la nueva cuenta. Haga clic en el siguiente enlace para completar su activación:<br><br><a href="http://localhost:4200/es/activar/',
        emailHtmlThree: '">http://localhost:4200/es/activar/</a>',
        success: "El enlace de activación ha sido enviado a "
    },
    resetUsername: {
        emailProvidedError: "El correo electrónico no fue proporcionado.",
        emailError: "El correo electrónico no fue encontrado.",
        emailSubject: "Solicitud de nombre de usuario",
        emailTextOne: "Hola ",
        emailTextTwo: ", Recientemente has solicitado tu nombre de usuario. Guárdelo en sus archivos: ",
        emailHtmlOne: "Hola<strong> ",
        emailHtmlTwo: "</strong>,<br><br>Recientemente has solicitado tu nombre de usuario. Guárdelo en sus archivos: ",
        success: "El nombre de usuario se ha enviado al correo electrónico!"
    },
    resetPassword: {
        tokenProvidedError: "El token no fue proporcionado.",
        usernameError: "No se encontró el nombre de usuario.",
        accountError: "La cuenta aún no se ha activado.",
        emailSubject: "Solicitud para restablecer la contraseña",
        emailTextOne: "Hola ",
        emailTextTwo: ', Recientemente has solicitado un enlace de restablecimiento de contraseña. Haga clic en el enlace de abajo para restablecer su contraseña:<br><br><a href="http://localhost:4200/es/nueva-contraseña/',
        emailHtmlOne: "Hola<strong> ",
        emailHtmlTwo: '</strong>,<br><br>Recientemente has solicitado un enlace de restablecimiento de contraseña. Haga clic en el enlace de abajo para restablecer su contraseña:<br><br><a href="http://localhost:4200/es/nueva-contraseña/',
        emailHtmlThree: '">http://localhost:4200/es/nueva-contraseña/</a>',
        success: "Por favor, compruebe su correo electrónico para el enlace de restablecimiento de contraseña.",
        expiredError: "El enlace de la contraseña ha caducado.",

    },
    savePassword: {
        usernameProvidedError: "El nombre de usuario no fue proporcionado.",
        passwordProvidedError: "La contraseña no fue proporcionada.",
        emailSubject: "Contraseña restablecida recientemente",
        emailTextOne: "Hola ",
        emailTextTwo: ", TEste correo electrónico es para notificarle que su contraseña se ha restablecido recientemente.",
        emailHtmlOne: "Hola<strong> ",
        emailHtmlTwo: "</strong>,<br><br>Este correo electrónico es para notificarle que su contraseña se ha restablecido recientemente.",
        success: "La contraseña se ha restablecido!"
    },
    usersImages: {
        usernamesError: "La lista con nombres de usuario no fue proporcionado."
    },
    headers: {
        tokenError: "No se proporciono ningún token.",
        validError: "Token invalido."
    },
    renewToken: {
        usernameProvidedError: "El nombre de usuario no fue proporcionado.",
        userError: "No se encontró el usuario."
    },
    permission: {
        userError: "No se encontró el usuario."
    },
    management: {
        usernameProvidedError: "El nombre de usuario no fue proporcionado.",
        userError: "No se encontró el usuario.",
        usersError: "Usuarios no encontrados.",
        permissionError: "Permisos insuficientes."
    },
     authentication: {
        userError: "No se encontró el usuario."
    },
    profile:{
        usernameProvidedError: "El nombre de usuario no fue proporcionado.",
    },
    editUser: {
        idProvidedError: "El ID no fue proporcionado.",
        userError: "No se encontró el usuario.",
        permissionError: "Permisos insuficientes.",
        nameUpdated: "¡El nombre ha sido actualizado!",
        usernameUpdated: "¡El nombre de usuario ha sido actualizado!",
        emailUpdated: "¡El correo electrónico ha sido actualizado!",
        avatarUpload: "¡El Avatar ha sido subido!",
        aboutYourselfUpdated: "¡Acerca de ti ha sido actualizado!",
        adminOneError: "Permisos insuficientes. No puedes hacer cambios a uno de tu mismo grado o superior.",
        adminTwoError: "Permisos insuficientes. Debes ser administrador para subir a otro a grado de administrador.",
        success: "Se han actualizado los permisos.!"
    },
    //File upload
    fileUpload: {
        usernameProvidedError: "El nombre de usuario no fue proporcionado.",
        imageProvidedError: "La imagen no fue proporcionada.",
        bucketProvidedError: "El recipiente no fue proporcionado.",
        nameProvidedError: "El nombre de la imagen no fue proporcionada.",
        uploadError: "¡Se ha producido un error al subir imágenes!",
        uploadSuccess: "Imágenes subidas correctamente.",
        deleteError: "¡Se ha producido un error al eliminar imágenes!",
        deleteSuccess: "Imágenes eliminadas correctamente.",
        keyError: "Debe proporcionar la llave.",
        bucketError: "Debe proporcionar el contenedor de la imagen."
    },
    //newCategory
    newCategory: {
        titleProvidedError: "El título de la categoría es requerida.",
        descriptionProvidedError: "La descripción del la categoría es requerida.",
        saveError: "No se pudo guardar la categoría. Error:",
        success: "¡Categoría guardada!"
    },
     //newEvent
    newEvent: {
        createdByProvidedError: "El creador del evento es requerido.",
        categoryIdProvidedError: "El ID de la categoria es requerida.",
        titleProvidedError: "El título del evento es requerido.",
        startProvidedError: "El inicio del evento es requerido.",
        endProvidedError: "El final del evento es requerido.",
        descriptionProvidedError: "La descripción del evento es requerido.",
        saveError: "No se pudo guardar el evento. Error:",
        success: "¡Evento guardado!"
    },
     //allUserEvents
    allUserEvents: {
        usernameProvidedError: "El usurio del evento no fue proporcionado.",
        eventsError: "No se encontraron eventos.",
    },
    //getEvent
    getEvent: {
        idProvidedError: "El ID del evento no fue proporcionado.",
        eventError: "No se encontro el evento.",
        placeError:"No se encontro el lugar."
    },
      //newPlace
    newPlace: {
        eventIdProvidedError: 'El ID del evento es requerido.',
        provinceProvidedError: "La provincia es requerida.",
        geonameIdProvinceProvidedError:"Geoname ID de la provincia es requerida.",
        municipalityProvidedError: "El municipio es requerido.",
        geonameIdMunicipalityProvidedError:"Geoname ID del municipio es requerido.",
        latProvidedError: "La latitud es requerida.",
        lngProvidedError: "La longitud es requerida.",
        saveError: "No se pudo guardar el lugar. Error:",
        success: "¡Lugar guardado!"
    },
    allCategories: {
        idProvidedError: 'El ID de la categoría, no fue proporcionado.',
        categoriesError: "No se encontraron categorías.",
        thematicProvidedError: "La temática no fue proporcionada.",
        visibleProvidedError: "El parametro visible no fue proporcionado.",
        themeProvidedError: "El tema no fue proporcionado.",
        classProvidedError: "La clase no fue proporcionada.",
        countryProvidedError: "El país no fue proporcionado.",
        regionProvidedError: "La región no fue proporcionada."
    },
    singleTheme: {
        paramProvidedError: "El ID del tema, no fue proporcionado.",
        themeError: "No se encontró ningun tema."
    },
    updateCategory: {
        idProvidedError: 'El ID de la categoría, no fue proporcionada.',
        categoryError: "No se encontró la categoría.",
        userError: "No se encontró el usuario.",
        permissionError: "No estás autorizado para editar esta categoría.",
        saveError: "No se pudo editar la categoría. Error: ",
        success: "¡Categoría actualizada!"
    },
    editTheme: {
        idProvidedError: 'El ID del tema, no fue proporcionado.',
        themeError: "No se encontró el tema.",
        userError: "No se encontró el usuario.",
        permissionError: "No estás autorizado para editar esta publicación de tema.",
        saveError: "No se pudo editar el tema. Error: ",
        success: "¡Tema editado!"
    },
    deleteTheme: {
        idProvidedError: 'El ID del tema, no fue proporcionado.',
        themeError: "No se encontró el tema.",
        userError: "No se encontró el usuario.",
        permissionError: "No estás autorizado para eliminar esta publicación de tema.",
        saveError: "No se pudo eliminar el tema. Error: ",
        success: "¡Tema eliminado!"
    },
    addThemeReaction: {
        idProvidedError: 'El ID del tema, no fue proporcionado.',
        reactionProvidedError: 'La reacción del tema no fue proporcionada.',
        themeError: "No se encontró el tema.",
        userError: "No se encontró el usuario.",
        ownError: "No puedes reaccionar a tu propia publicación.",
        likedBeforeError: "Ya has reaacionado a esta publicación. ",
        saveError: "No se pudo añadir la reacción. Error: ",
        success: "!Reacción añadida!"
    },
    deleteThemeReaction: {
        idProvidedError: 'El ID del tema, no fue proporcionado.',
        themeError: "No se encontró el tema.",
        userError: "No se encontró el usuario.",
        ownError: "No puedes reaccionar a tu propia publicación.",
        quitBeforeError: "Ya has dejado de reaccionar este post",
        saveError: "No se pudo eliminar la reacción. Error: ",
        success: "¡Reacción eliminada!"
    },
    newComment: {
        createdByProvidedError: "El creador del comentario es requerido.",
        themeIdProvidedError: "El ID del tema es requerido.",
        commentProvidedError: "El comentario es requerido.",
        saveError: "No se pudo guardar el comentario. Error:",
        success: "¡Comentario guardado!"
    },
    comments: {
        commentsError: "No se encontraron comentarios."
    }

};