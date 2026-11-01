/* HOLM Leapmotor Card — https://github.com/kaaribou/holm-leapmotor-card — licence MIT
 * Votre Leapmotor (via Leapmotor Mate) dans Home Assistant : batterie et charge, climatisation,
 * portes / vitres / pneus, actions à distance, position. Photo personnalisable. */
(() => {
  // ---- HOLM i18n : textes écrits en français, traduits à l'affichage (en, de, es, it, nl, pt, pl) ----
  // Langue : option `language` de la carte, sinon celle du profil Home Assistant ; anglais si la langue n'est pas traduite.
  const HOLM_LANGS = ["en", "de", "es", "it", "nl", "pt", "pl"];
  const LANG_NAMES = { fr: "Français", en: "English", de: "Deutsch", es: "Español", it: "Italiano", nl: "Nederlands", pt: "Português", pl: "Polski" };
  const LOCALES = { fr: "fr-FR", en: "en-GB", de: "de-DE", es: "es-ES", it: "it-IT", nl: "nl-NL", pt: "pt-PT", pl: "pl-PL" };
  const I18N = {
    "Automatique (profil)": ["Automatic (profile)", "Automatisch (Profil)", "Automático (perfil)", "Automatica (profilo)", "Automatisch (profiel)", "Automático (perfil)", "Automatycznie (profil)"],
    "Langue": ["Language", "Sprache", "Idioma", "Lingua", "Taal", "Idioma", "Język"],
    "Titre": ["Title", "Titel", "Título", "Titolo", "Titel", "Título", "Tytuł"],
    "Titre (optionnel)": ["Title (optional)", "Titel (optional)", "Título (opcional)", "Titolo (facoltativo)", "Titel (optioneel)", "Título (opcional)", "Tytuł (opcjonalnie)"],
    "Nom": ["Name", "Name", "Nombre", "Nome", "Naam", "Nome", "Nazwa"],
    "Nom affiché": ["Display name", "Anzeigename", "Nombre mostrado", "Nome visualizzato", "Weergavenaam", "Nome apresentado", "Wyświetlana nazwa"],
    "Icône": ["Icon", "Symbol", "Icono", "Icona", "Pictogram", "Ícone", "Ikona"],
    "Couleur": ["Colour", "Farbe", "Color", "Colore", "Kleur", "Cor", "Kolor"],
    "Couleurs": ["Colours", "Farben", "Colores", "Colori", "Kleuren", "Cores", "Kolory"],
    "Entité": ["Entity", "Entität", "Entidad", "Entità", "Entiteit", "Entidade", "Encja"],
    "Entités": ["Entities", "Entitäten", "Entidades", "Entità", "Entiteiten", "Entidades", "Encje"],
    "Chargement…": ["Loading…", "Wird geladen…", "Cargando…", "Caricamento…", "Laden…", "A carregar…", "Ładowanie…"],
    "Erreur": ["Error", "Fehler", "Error", "Errore", "Fout", "Erro", "Błąd"],
    "Fermer": ["Close", "Schließen", "Cerrar", "Chiudi", "Sluiten", "Fechar", "Zamknij"],
    "Annuler": ["Cancel", "Abbrechen", "Cancelar", "Annulla", "Annuleren", "Cancelar", "Anuluj"],
    "Enregistrer": ["Save", "Speichern", "Guardar", "Salva", "Opslaan", "Guardar", "Zapisz"],
    "Supprimer": ["Delete", "Löschen", "Eliminar", "Elimina", "Verwijderen", "Eliminar", "Usuń"],
    "Ajouter": ["Add", "Hinzufügen", "Añadir", "Aggiungi", "Toevoegen", "Adicionar", "Dodaj"],
    "Monter": ["Move up", "Nach oben", "Subir", "Sposta su", "Omhoog", "Mover para cima", "W górę"],
    "Descendre": ["Move down", "Nach unten", "Bajar", "Sposta giù", "Omlaag", "Mover para baixo", "W dół"],
    "Afficher le cadre de la carte": ["Show the card frame", "Kartenrahmen anzeigen", "Mostrar el marco de la tarjeta", "Mostra la cornice della scheda", "Kaartkader tonen", "Mostrar a moldura do cartão", "Pokaż ramkę karty"],
    "Indisponible": ["Unavailable", "Nicht verfügbar", "No disponible", "Non disponibile", "Niet beschikbaar", "Indisponível", "Niedostępne"],
    "Aujourd'hui": ["Today", "Heute", "Hoy", "Oggi", "Vandaag", "Hoje", "Dziś"],
    "Hier": ["Yesterday", "Gestern", "Ayer", "Ieri", "Gisteren", "Ontem", "Wczoraj"],
    "Demain": ["Tomorrow", "Morgen", "Mañana", "Domani", "Morgen", "Amanhã", "Jutro"],
    "Batterie": ["Battery", "Batterie", "Batería", "Batteria", "Batterij", "Bateria", "Bateria"],
    "Aucune donnée sur cette période.": ["No data for this period.", "Keine Daten für diesen Zeitraum.", "No hay datos en este periodo.", "Nessun dato per questo periodo.", "Geen gegevens voor deze periode.", "Sem dados neste período.", "Brak danych w tym okresie."],
    "à l'instant": ["just now", "gerade eben", "ahora mismo", "proprio ora", "zojuist", "agora mesmo", "przed chwilą"],
    "il y a {n} min": ["{n} min ago", "vor {n} Min.", "hace {n} min", "{n} min fa", "{n} min geleden", "há {n} min", "{n} min temu"],
    "il y a {n} h": ["{n} h ago", "vor {n} Std.", "hace {n} h", "{n} h fa", "{n} u geleden", "há {n} h", "{n} godz. temu"],
    "il y a {n} j": ["{n} d ago", "vor {n} T.", "hace {n} d", "{n} g fa", "{n} d geleden", "há {n} d", "{n} dni temu"],
    "Garée": ["Parked", "Geparkt", "Aparcado", "Parcheggiata", "Geparkeerd", "Estacionado", "Zaparkowany"],
    "En route": ["Driving", "Unterwegs", "En marcha", "In viaggio", "Onderweg", "Em andamento", "W drodze"],
    "En charge": ["Charging", "Lädt", "Cargando", "In carica", "Laden", "A carregar", "Ładowanie"],
    "Prête": ["Ready", "Bereit", "Listo", "Pronta", "Klaar", "Pronto", "Gotowy"],
    "En veille": ["Asleep", "Im Ruhemodus", "En reposo", "In standby", "Slaapstand", "Em repouso", "Uśpiony"],
    "Hors ligne": ["Offline", "Offline", "Sin conexión", "Offline", "Offline", "Offline", "Offline"],
    "Aperçu": ["Overview", "Übersicht", "Resumen", "Panoramica", "Overzicht", "Visão geral", "Przegląd"],
    "Charge": ["Charge", "Laden", "Carga", "Ricarica", "Laden", "Carga", "Ładowanie"],
    "Climat": ["Climate", "Klima", "Clima", "Clima", "Klimaat", "Clima", "Klimat"],
    "Véhicule": ["Vehicle", "Fahrzeug", "Vehículo", "Veicolo", "Voertuig", "Veículo", "Pojazd"],
    "Actions": ["Actions", "Aktionen", "Acciones", "Azioni", "Acties", "Ações", "Akcje"],
    "Aucune voiture Leapmotor Mate trouvée.": ["No Leapmotor Mate car found.", "Kein Leapmotor-Mate-Fahrzeug gefunden.", "No se ha encontrado ningún coche Leapmotor Mate.", "Nessuna auto Leapmotor Mate trovata.", "Geen Leapmotor Mate-auto gevonden.", "Nenhum carro Leapmotor Mate encontrado.", "Nie znaleziono auta Leapmotor Mate."],
    "Activez « MQTT → Home Assistant » dans Leapmotor Mate, ou indiquez le préfixe des entités dans l'éditeur.": ["Enable “MQTT → Home Assistant” in Leapmotor Mate, or set the entity prefix in the editor.", "Aktivieren Sie „MQTT → Home Assistant“ in Leapmotor Mate oder geben Sie im Editor das Entitätspräfix an.", "Activa «MQTT → Home Assistant» en Leapmotor Mate o indica el prefijo de las entidades en el editor.", "Attiva «MQTT → Home Assistant» in Leapmotor Mate o indica il prefisso delle entità nell'editor.", "Schakel ‘MQTT → Home Assistant’ in Leapmotor Mate in, of geef het entiteitsvoorvoegsel op in de editor.", "Ative «MQTT → Home Assistant» no Leapmotor Mate ou indique o prefixo das entidades no editor.", "Włącz „MQTT → Home Assistant” w Leapmotor Mate lub podaj prefiks encji w edytorze."],
    "Heures creuses": ["Off-peak hours", "Niedertarif", "Horas valle", "Fuori punta", "Daltarief", "Horas de vazio", "Poza szczytem"],
    "Maintenant": ["Now", "Jetzt", "Ahora", "Ora", "Nu", "Agora", "Teraz"],
    "Arrêt": ["Off", "Aus", "Apagado", "Spento", "Uit", "Desligado", "Wył."],
    "HC": ["Off-peak", "NT", "Valle", "F. punta", "Dal", "Vazio", "Poza szczytem"],
    "{x} km d'autonomie": ["{x} km range", "{x} km Reichweite", "{x} km de autonomía", "{x} km di autonomia", "{x} km bereik", "{x} km de autonomia", "{x} km zasięgu"],
    "En charge · {p} kW": ["Charging · {p} kW", "Lädt · {p} kW", "Cargando · {p} kW", "In carica · {p} kW", "Laden · {p} kW", "A carregar · {p} kW", "Ładowanie · {p} kW"],
    " · encore {t}": [" · {t} left", " · noch {t}", " · faltan {t}", " · ancora {t}", " · nog {t}", " · faltam {t}", " · jeszcze {t}"],
    "Branchée": ["Plugged in", "Angeschlossen", "Enchufado", "Collegata", "Aangesloten", "Ligado", "Podłączony"],
    " · borne en {m}": [" · charger: {m}", " · Wallbox: {m}", " · cargador: {m}", " · wallbox: {m}", " · laadpaal: {m}", " · carregador: {m}", " · ładowarka: {m}"],
    "Débranchée": ["Unplugged", "Nicht angeschlossen", "Desenchufado", "Scollegata", "Niet aangesloten", "Desligado da tomada", "Odłączony"],
    "Portes": ["Doors", "Türen", "Puertas", "Porte", "Deuren", "Portas", "Drzwi"],
    "Verrouillées": ["Locked", "Verriegelt", "Bloqueadas", "Bloccate", "Vergrendeld", "Trancadas", "Zablokowane"],
    "Ouvertes": ["Unlocked", "Entriegelt", "Desbloqueadas", "Sbloccate", "Ontgrendeld", "Destrancadas", "Odblokowane"],
    "Ouvrants": ["Openings", "Öffnungen", "Aperturas", "Aperture", "Openingen", "Aberturas", "Otwory"],
    "{n} ouvert": ["{n} open", "{n} offen", "{n} abierta", "{n} aperta", "{n} open", "{n} aberta", "{n} otwarte"],
    "{n} ouverts": ["{n} open", "{n} offen", "{n} abiertas", "{n} aperte", "{n} open", "{n} abertas", "otwarte: {n}"],
    "Fermés": ["Closed", "Geschlossen", "Cerradas", "Chiuse", "Dicht", "Fechadas", "Zamknięte"],
    "En marche": ["On", "Ein", "En marcha", "In funzione", "Aan", "Ligado", "Włączony"],
    "Intérieur": ["Inside", "Innen", "Interior", "Interno", "Binnen", "Interior", "Wnętrze"],
    "Pneus": ["Tyres", "Reifen", "Neumáticos", "Pneumatici", "Banden", "Pneus", "Opony"],
    "Pression basse": ["Low pressure", "Niedriger Druck", "Presión baja", "Pressione bassa", "Lage druk", "Pressão baixa", "Niskie ciśnienie"],
    "Verrouillée": ["Locked", "Verriegelt", "Bloqueado", "Bloccata", "Vergrendeld", "Trancado", "Zablokowany"],
    "Déverrouillée": ["Unlocked", "Entriegelt", "Desbloqueado", "Sbloccata", "Ontgrendeld", "Destrancado", "Odblokowany"],
    "Ouvert": ["Open", "Offen", "Abierto", "Aperto", "Open", "Aberto", "Otwarte"],
    "Données {x}": ["Data {x}", "Daten {x}", "Datos {x}", "Dati {x}", "Gegevens {x}", "Dados {x}", "Dane {x}"],
    "Autonomie {x}": ["Range {x}", "Reichweite {x}", "Autonomía {x}", "Autonomia {x}", "Bereik {x}", "Autonomia {x}", "Zasięg {x}"],
    "Batterie {x}": ["Battery {x}", "Batterie {x}", "Batería {x}", "Batteria {x}", "Batterij {x}", "Bateria {x}", "Bateria {x}"],
    "Limite de charge": ["Charge limit", "Ladelimit", "Límite de carga", "Limite di carica", "Laadlimiet", "Limite de carga", "Limit ładowania"],
    "Borne": ["Charger", "Wallbox", "Cargador", "Wallbox", "Laadpaal", "Carregador", "Ładowarka"],
    "Ventilation": ["Ventilation", "Lüftung", "Ventilación", "Ventilazione", "Ventilatie", "Ventilação", "Wentylacja"],
    "Chauffage": ["Heating", "Heizung", "Calefacción", "Riscaldamento", "Verwarming", "Aquecimento", "Ogrzewanie"],
    "Climatisation": ["Air conditioning", "Klimaanlage", "Aire acondicionado", "Climatizzazione", "Airco", "Ar condicionado", "Klimatyzacja"],
    "Dégivrage": ["Defrost", "Enteisen", "Desempañado", "Sbrinamento", "Ontdooien", "Desembaciamento", "Odmrażanie"],
    "Auto": ["Auto", "Auto", "Auto", "Auto", "Auto", "Auto", "Auto"],
    "Toucher pour arrêter": ["Tap to stop", "Zum Stoppen tippen", "Toca para detener", "Tocca per fermare", "Tik om te stoppen", "Toque para parar", "Dotknij, aby zatrzymać"],
    "Confirmer ?": ["Confirm?", "Bestätigen?", "¿Confirmar?", "Confermare?", "Bevestigen?", "Confirmar?", "Potwierdzić?"],
    "Envoyé…": ["Sent…", "Gesendet…", "Enviado…", "Inviato…", "Verzonden…", "Enviado…", "Wysłano…"],
    "{x} en marche": ["{x} on", "{x} läuft", "{x} en marcha", "{x} in funzione", "{x} aan", "{x} ligado", "{x} włączone"],
    "Ventilation {n}": ["Fan {n}", "Lüftung {n}", "Ventilación {n}", "Ventilazione {n}", "Ventilatie {n}", "Ventilação {n}", "Wentylacja {n}"],
    "consigne {t}": ["set to {t}", "Soll {t}", "consigna {t}", "impostata a {t}", "ingesteld op {t}", "definido para {t}", "nastawa {t}"],
    "Arrêter": ["Stop", "Stoppen", "Detener", "Ferma", "Stoppen", "Parar", "Zatrzymaj"],
    "Chauffe rapide": ["Quick heat", "Schnellheizen", "Calentar rápido", "Riscaldamento rapido", "Snel verwarmen", "Aquecimento rápido", "Szybkie grzanie"],
    "Clim rapide": ["Quick cool", "Schnellkühlen", "Enfriar rápido", "Raffreddamento rapido", "Snel koelen", "Arrefecimento rápido", "Szybkie chłodzenie"],
    "Siège conducteur": ["Driver seat", "Fahrersitz", "Asiento del conductor", "Sedile conducente", "Bestuurdersstoel", "Banco do condutor", "Fotel kierowcy"],
    "Siège passager": ["Passenger seat", "Beifahrersitz", "Asiento del pasajero", "Sedile passeggero", "Passagiersstoel", "Banco do passageiro", "Fotel pasażera"],
    "Volant": ["Steering wheel", "Lenkrad", "Volante", "Volante", "Stuur", "Volante", "Kierownica"],
    "Rétroviseurs": ["Mirrors", "Spiegel", "Retrovisores", "Specchietti", "Spiegels", "Retrovisores", "Lusterka"],
    "La voiture confirme les commandes en une minute environ.": ["The car confirms commands within about a minute.", "Das Auto bestätigt Befehle in etwa einer Minute.", "El coche confirma las órdenes en un minuto aproximadamente.", "L'auto conferma i comandi in circa un minuto.", "De auto bevestigt opdrachten binnen ongeveer een minuut.", "O carro confirma os comandos em cerca de um minuto.", "Auto potwierdza polecenia w około minutę."],
    "Consigne": ["Set point", "Sollwert", "Consigna", "Temperatura impostata", "Instelpunt", "Temperatura definida", "Nastawa"],
    "réglable dans Leapmotor Mate": ["adjustable in Leapmotor Mate", "in Leapmotor Mate einstellbar", "ajustable en Leapmotor Mate", "regolabile in Leapmotor Mate", "instelbaar in Leapmotor Mate", "ajustável no Leapmotor Mate", "regulowana w Leapmotor Mate"],
    "Porte avant gauche": ["Front left door", "Tür vorne links", "Puerta delantera izquierda", "Porta anteriore sinistra", "Deur linksvoor", "Porta dianteira esquerda", "Drzwi przednie lewe"],
    "Porte avant droite": ["Front right door", "Tür vorne rechts", "Puerta delantera derecha", "Porta anteriore destra", "Deur rechtsvoor", "Porta dianteira direita", "Drzwi przednie prawe"],
    "Porte arrière gauche": ["Rear left door", "Tür hinten links", "Puerta trasera izquierda", "Porta posteriore sinistra", "Deur linksachter", "Porta traseira esquerda", "Drzwi tylne lewe"],
    "Porte arrière droite": ["Rear right door", "Tür hinten rechts", "Puerta trasera derecha", "Porta posteriore destra", "Deur rechtsachter", "Porta traseira direita", "Drzwi tylne prawe"],
    "Vitre avant gauche": ["Front left window", "Fenster vorne links", "Ventanilla delantera izquierda", "Finestrino anteriore sinistro", "Raam linksvoor", "Vidro dianteiro esquerdo", "Szyba przednia lewa"],
    "Vitre avant droite": ["Front right window", "Fenster vorne rechts", "Ventanilla delantera derecha", "Finestrino anteriore destro", "Raam rechtsvoor", "Vidro dianteiro direito", "Szyba przednia prawa"],
    "Vitre arrière gauche": ["Rear left window", "Fenster hinten links", "Ventanilla trasera izquierda", "Finestrino posteriore sinistro", "Raam linksachter", "Vidro traseiro esquerdo", "Szyba tylna lewa"],
    "Vitre arrière droite": ["Rear right window", "Fenster hinten rechts", "Ventanilla trasera derecha", "Finestrino posteriore destro", "Raam rechtsachter", "Vidro traseiro direito", "Szyba tylna prawa"],
    "Coffre": ["Boot", "Kofferraum", "Maletero", "Bagagliaio", "Kofferbak", "Bagageira", "Bagażnik"],
    "Ouvrants et pneus": ["Openings and tyres", "Öffnungen und Reifen", "Aperturas y neumáticos", "Aperture e pneumatici", "Openingen en banden", "Aberturas e pneus", "Otwory i opony"],
    "Tout est fermé": ["All closed", "Alles geschlossen", "Todo cerrado", "Tutto chiuso", "Alles dicht", "Tudo fechado", "Wszystko zamknięte"],
    "Rideau de toit": ["Sunshade", "Sonnenrollo", "Cortinilla del techo", "Tendina del tetto", "Zonnescherm", "Cortina do teto", "Roleta dachowa"],
    "ouvert {p} %": ["open {p}%", "offen {p} %", "abierta {p} %", "aperta {p}%", "open {p}%", "aberta {p}%", "otwarta {p}%"],
    "fermé": ["closed", "geschlossen", "cerrada", "chiusa", "dicht", "fechada", "zamknięta"],
    "pression basse": ["low pressure", "niedriger Druck", "presión baja", "pressione bassa", "lage druk", "pressão baixa", "niskie ciśnienie"],
    "Rapport": ["Gear", "Gang", "Marcha", "Marcia", "Versnelling", "Mudança", "Bieg"],
    "Déverrouiller": ["Unlock", "Entriegeln", "Desbloquear", "Sblocca", "Ontgrendelen", "Destrancar", "Odblokuj"],
    "Verrouiller": ["Lock", "Verriegeln", "Bloquear", "Blocca", "Vergrendelen", "Trancar", "Zablokuj"],
    "Ouvrir le coffre": ["Open the boot", "Kofferraum öffnen", "Abrir el maletero", "Apri il bagagliaio", "Kofferbak openen", "Abrir a bagageira", "Otwórz bagażnik"],
    "Fermer le coffre": ["Close the boot", "Kofferraum schließen", "Cerrar el maletero", "Chiudi il bagagliaio", "Kofferbak sluiten", "Fechar a bagageira", "Zamknij bagażnik"],
    "Ouvrir les vitres": ["Open the windows", "Fenster öffnen", "Abrir las ventanillas", "Apri i finestrini", "Ramen openen", "Abrir os vidros", "Otwórz szyby"],
    "Fermer les vitres": ["Close the windows", "Fenster schließen", "Cerrar las ventanillas", "Chiudi i finestrini", "Ramen sluiten", "Fechar os vidros", "Zamknij szyby"],
    "Ouvrir le rideau": ["Open the sunshade", "Rollo öffnen", "Abrir la cortinilla", "Apri la tendina", "Zonnescherm openen", "Abrir a cortina", "Otwórz roletę"],
    "Fermer le rideau": ["Close the sunshade", "Rollo schließen", "Cerrar la cortinilla", "Chiudi la tendina", "Zonnescherm sluiten", "Fechar a cortina", "Zamknij roletę"],
    "Klaxon / feux": ["Horn / lights", "Hupe / Licht", "Claxon / luces", "Clacson / luci", "Toeter / lichten", "Buzina / luzes", "Klakson / światła"],
    "Préchauffer la batterie": ["Precondition the battery", "Batterie vorwärmen", "Precalentar la batería", "Preriscalda la batteria", "Batterij voorverwarmen", "Pré-aquecer a bateria", "Podgrzej baterię"],
    "Libérer le câble": ["Release the cable", "Kabel freigeben", "Liberar el cable", "Sblocca il cavo", "Kabel ontgrendelen", "Libertar o cabo", "Odblokuj kabel"],
    "À la maison": ["At home", "Zu Hause", "En casa", "A casa", "Thuis", "Em casa", "W domu"],
    "En déplacement": ["Away", "Unterwegs", "Fuera", "Fuori casa", "Onderweg", "Fora", "Poza domem"],
    "Photo": ["Photo", "Foto", "Foto", "Foto", "Foto", "Foto", "Zdjęcie"],
    "Affichage": ["Display", "Anzeige", "Visualización", "Visualizzazione", "Weergave", "Apresentação", "Wyświetlanie"],
    "Préfixe des entités (automatique si vide)": ["Entity prefix (automatic if empty)", "Entitätspräfix (automatisch wenn leer)", "Prefijo de las entidades (automático si está vacío)", "Prefisso delle entità (automatico se vuoto)", "Entiteitsvoorvoegsel (automatisch indien leeg)", "Prefixo das entidades (automático se vazio)", "Prefiks encji (automatycznie, jeśli puste)"],
    "Photo (médiathèque : vous pouvez y téléverser une image)": ["Photo (media library: you can upload an image there)", "Foto (Medienbibliothek: Sie können dort ein Bild hochladen)", "Foto (mediateca: puedes subir una imagen)", "Foto (libreria multimediale: puoi caricarci un'immagine)", "Foto (mediabibliotheek: je kunt er een afbeelding uploaden)", "Foto (biblioteca multimédia: pode carregar uma imagem)", "Zdjęcie (biblioteka multimediów: możesz przesłać obraz)"],
    "… ou adresse d'une image (ex. /local/voiture.jpg)": ["… or an image address (e.g. /local/car.jpg)", "… oder Bildadresse (z. B. /local/auto.jpg)", "… o dirección de una imagen (p. ej. /local/coche.jpg)", "… o indirizzo di un'immagine (es. /local/auto.jpg)", "… of adres van een afbeelding (bijv. /local/auto.jpg)", "… ou endereço de uma imagem (ex. /local/carro.jpg)", "… lub adres obrazu (np. /local/auto.jpg)"],
    "Position, mini-carte et kilométrage": ["Location, mini map and mileage", "Standort, Minikarte und Kilometerstand", "Ubicación, minimapa y kilometraje", "Posizione, minimappa e chilometraggio", "Locatie, minikaart en kilometerstand", "Localização, minimapa e quilometragem", "Lokalizacja, minimapa i przebieg"],
    "Commande de la borne (HOLM Lektrico)": ["Charger control (HOLM Lektrico)", "Wallbox-Steuerung (HOLM Lektrico)", "Control del cargador (HOLM Lektrico)", "Comando della wallbox (HOLM Lektrico)", "Bediening laadpaal (HOLM Lektrico)", "Comando do carregador (HOLM Lektrico)", "Sterowanie ładowarką (HOLM Lektrico)"],
    "Confirmer les actions sensibles": ["Confirm sensitive actions", "Sensible Aktionen bestätigen", "Confirmar las acciones sensibles", "Conferma le azioni sensibili", "Gevoelige acties bevestigen", "Confirmar as ações sensíveis", "Potwierdzaj wrażliwe akcje"],
    "Sélecteur de mode de la borne (automatique si vide)": ["Charger mode selector (automatic if empty)", "Modusauswahl der Wallbox (automatisch wenn leer)", "Selector de modo del cargador (automático si está vacío)", "Selettore di modalità della wallbox (automatico se vuoto)", "Moduskiezer van de laadpaal (automatisch indien leeg)", "Seletor de modo do carregador (automático se vazio)", "Wybór trybu ładowarki (automatycznie, jeśli puste)"],
    "Onglet affiché à l'ouverture": ["Tab shown on opening", "Beim Öffnen angezeigter Reiter", "Pestaña mostrada al abrir", "Scheda mostrata all'apertura", "Tabblad bij openen", "Separador mostrado ao abrir", "Karta pokazywana po otwarciu"],
    "Zoom de la mini-carte": ["Mini map zoom", "Zoom der Minikarte", "Zoom del minimapa", "Zoom della minimappa", "Zoom van de minikaart", "Zoom do minimapa", "Powiększenie minimapy"],
    "Couleur d'accent": ["Accent colour", "Akzentfarbe", "Color de acento", "Colore d'accento", "Accentkleur", "Cor de destaque", "Kolor akcentu"],
    "Alerte pression des pneus en dessous de": ["Tyre pressure alert below", "Reifendruckwarnung unter", "Alerta de presión de neumáticos por debajo de", "Avviso pressione pneumatici sotto", "Bandenspanningswaarschuwing onder", "Alerta de pressão dos pneus abaixo de", "Alert ciśnienia opon poniżej"],
    "HOLM Leapmotor": ["HOLM Leapmotor", "HOLM Leapmotor", "HOLM Leapmotor", "HOLM Leapmotor", "HOLM Leapmotor", "HOLM Leapmotor", "HOLM Leapmotor"],
    "Votre Leapmotor via Leapmotor Mate : batterie, charge, climatisation, ouvrants, pneus, actions et position, avec votre photo.": ["Your Leapmotor via Leapmotor Mate: battery, charging, air conditioning, openings, tyres, actions and location, with your photo.", "Ihr Leapmotor über Leapmotor Mate: Batterie, Laden, Klimaanlage, Öffnungen, Reifen, Aktionen und Standort, mit Ihrem Foto.", "Tu Leapmotor vía Leapmotor Mate: batería, carga, climatización, aperturas, neumáticos, acciones y ubicación, con tu foto.", "La tua Leapmotor tramite Leapmotor Mate: batteria, ricarica, clima, aperture, pneumatici, azioni e posizione, con la tua foto.", "Je Leapmotor via Leapmotor Mate: batterij, laden, airco, openingen, banden, acties en locatie, met je foto.", "O seu Leapmotor via Leapmotor Mate: bateria, carga, climatização, aberturas, pneus, ações e localização, com a sua foto.", "Twój Leapmotor przez Leapmotor Mate: bateria, ładowanie, klimatyzacja, otwory, opony, akcje i lokalizacja, z Twoim zdjęciem."]
  };
  let LANG = "fr", NUMLOC = "fr-FR";
  const langOf = (hass, c) => { const l = String((c && c.language) || (hass && ((hass.locale && hass.locale.language) || hass.language)) || navigator.language || "en").toLowerCase().split(/[-_]/)[0]; return l === "fr" || HOLM_LANGS.includes(l) ? l : "en"; };
  const setLang = (hass, c) => { LANG = langOf(hass, c); const p = hass && hass.locale && hass.locale.language; NUMLOC = !(c && c.language) && p && p.toLowerCase().startsWith(LANG) ? p : LOCALES[LANG]; return LANG; };
  const _ = (s, v) => { let o = LANG === "fr" ? s : ((I18N[s] && I18N[s][HOLM_LANGS.indexOf(LANG)]) || s); if (v) for (const k in v) o = o.split("{" + k + "}").join(v[k]); return o; };
  // champ « Langue » pour les éditeurs visuels (ha-form)
  const langField = () => ({ name: "language", selector: { select: { mode: "dropdown", options: [{ value: "", label: _("Automatique (profil)") }, ...Object.entries(LANG_NAMES).map(([value, label]) => ({ value, label }))] } } });
  // traduit les titres de sections et les libellés d'options d'un schéma ha-form (écrits en français)
  const locSchema = (sc) => (sc || []).map((x) => { const o = { ...x }; if (o.title) o.title = _(o.title); if (o.schema) o.schema = locSchema(o.schema);
    if (o.selector && o.selector.select && o.name !== "language") o.selector = { ...o.selector, select: { ...o.selector.select, options: (o.selector.select.options || []).map((op) => (typeof op === "string" ? op : { ...op, label: _(op.label) })) } };
    if (o.name === "language" && o.selector && o.selector.select) o.selector = { ...o.selector, select: { ...o.selector.select, options: o.selector.select.options.map((op) => (op.value ? op : { ...op, label: _("Automatique (profil)") })) } };
    return o; });
  const VERSION = "1.1.0";
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const num = (v) => { const n = parseFloat(v); return isNaN(n) ? null : n; };
  const fr = (v, d = 0) => (v === null || v === undefined ? "—" : Number(v).toLocaleString(NUMLOC, { maximumFractionDigits: d, minimumFractionDigits: d }));
  const hex2rgb = (h) => { const m = /^#?([0-9a-f]{6})$/i.exec(h || ""); if (!m) return undefined; const n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const rgb2hex = (a) => (Array.isArray(a) ? "#" + a.map((v) => Number(v).toString(16).padStart(2, "0")).join("") : a);
  const STATE = { parked: [_("Garée"), "mdi:parking"], driving: [_("En route"), "mdi:car-arrow-right"], charging: [_("En charge"), "mdi:ev-station"], ready: [_("Prête"), "mdi:car-key"], sleeping: [_("En veille"), "mdi:sleep"], offline: [_("Hors ligne"), "mdi:cloud-off-outline"] };
  const TABS = [["overview", "mdi:car-info", _("Aperçu")], ["charge", "mdi:ev-station", _("Charge")], ["climate", "mdi:fan", _("Climat")], ["body", "mdi:car-door", _("Véhicule")], ["actions", "mdi:gesture-tap-button", _("Actions")]];
  const ago = (iso) => {
    const t = Date.parse(iso); if (isNaN(t)) return "";
    const m = Math.max(0, Math.round((Date.now() - t) / 60000));
    return m < 1 ? _("à l'instant") : m < 60 ? _("il y a {n} min", { n: m }) : m < 1440 ? _("il y a {n} h", { n: Math.round(m / 60) }) : _("il y a {n} j", { n: Math.round(m / 1440) });
  };

  class HolmLeapmotorCard extends HTMLElement {
    static getConfigElement() { return document.createElement("holm-leapmotor-card-editor"); }
    static getStubConfig(hass) { return { prefix: HolmLeapmotorCard.findPrefix(hass) || "" }; }
    // préfixe des entités Leapmotor Mate : sensor.<prefix>_battery, _range, _odometer…
    static findPrefix(hass) {
      if (!hass) return null;
      const id = Object.keys(hass.states).find((e) => /^sensor\..+_odometer$/.test(e) && hass.states[e.replace(/_odometer$/, "_range")] && hass.states[e.replace(/_odometer$/, "_battery")]);
      return id ? id.slice(7, -9) : null;
    }
    setConfig(c) {
      this._c = { show_climate: true, show_body: true, show_actions: true, show_location: true, show_charger: true, confirm: true, accent: "#2ec4b6", ...c };
      this._img = null;
      this._tab = this._c.default_tab || "overview";
      if (this.shadowRoot) { this._build(); this._render(); }
    }
    set hass(h) {
      const first = !this._hass;
      this._hass = h;
      if (!this.shadowRoot) { this.attachShadow({ mode: "open" }); this._build(); }
      if (first) this._resolveImage();
      // les compteurs qui changent toutes les quelques secondes (âge des données…) ne redessinent pas la carte
      const key = setLang(h, this._c) + this._ids().filter((e) => !/_(data_age|data_timestamp|last_seen)$/.test(e)).map((e) => { const s = h.states[e]; return s ? s.state : ""; }).join("|");
      if (key !== this._key) {
        this._key = key;
        if (this._pending && this._pending.sig !== this._climSig()) this._pending = null;   // la voiture a répondu
        this._render();
      } else if (this._map) this._map.hass = h;
    }
    getCardSize() { return 6; }
    getGridOptions() { return { columns: 12, min_columns: 6, rows: "auto" }; }
    _p() { return this._c.prefix || HolmLeapmotorCard.findPrefix(this._hass) || ""; }
    _e(dom, key) { return `${dom}.${this._p()}_${key}`; }
    _s(dom, key) { return this._hass && this._hass.states[this._e(dom, key)]; }
    _v(key, dom = "sensor") { const s = this._s(dom, key); return s ? s.state : null; }
    _n(key) { return num(this._v(key)); }
    _on(key) { return this._v(key, "binary_sensor") === "on"; }
    _ids() {
      const p = this._p(); if (!p || !this._hass) return [];
      const ids = Object.keys(this._hass.states).filter((e) => e.split(".")[1].startsWith(p + "_"));
      const ch = this._chargerMode(); if (ch) ids.push(ch);
      return ids;
    }
    _chargerMode() {
      if (!this._c.show_charger || !this._hass) return null;
      if (this._c.charger_mode) return this._c.charger_mode;
      return Object.keys(this._hass.states).find((e) => e.startsWith("select.") && e.endsWith("_mode_de_charge") && (this._hass.states[e].attributes.options || []).includes("heures_creuses")) || null;
    }
    async _resolveImage() {
      const c = this._c;
      if (c.image_media && c.image_media.media_content_id && this._hass) {
        try {
          const r = await this._hass.callWS({ type: "media_source/resolve_media", media_content_id: c.image_media.media_content_id, expires: 86400 });
          this._img = r.url.startsWith("http") ? r.url : this._hass.hassUrl(r.url);
        } catch (e) { this._img = null; }
        this._render();
      }
    }
    _call(domain, service, data) { return this._hass.callService(domain, service, data); }
    _press(key) { return this._call("button", "press", { entity_id: this._e("button", key) }); }
    _more(entityId) { this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true })); }

    _build() {
      this.shadowRoot.innerHTML = `<style>${HolmLeapmotorCard.css()}</style><ha-card><div class="root" id="root"></div></ha-card>`;
      const root = this.shadowRoot.getElementById("root");
      root.addEventListener("click", (e) => {
        const b = e.target.closest("[data-a]"); if (!b) return;
        e.stopPropagation();
        this._action(b);
      });
      clearInterval(this._tick);
      this._tick = setInterval(() => {
        const f = this.shadowRoot && this.shadowRoot.querySelector(".fresh");
        if (f && this._hass) f.textContent = ago(this._v("last_seen"));
      }, 30000);
      root.addEventListener("pointerdown", () => { this._hold = true; });
      const release = () => { if (!this._hold) return; this._hold = false; if (this._dirty) setTimeout(() => this._render(), 50); };
      ["pointerup", "pointercancel", "pointerleave"].forEach((ev) => root.addEventListener(ev, release));
      root.addEventListener("input", (e) => {
        if (e.target.id === "lim") this.shadowRoot.getElementById("limv").textContent = `${e.target.value} %`;
      });
      root.addEventListener("change", (e) => {
        if (e.target.id === "lim") this._call("number", "set_value", { entity_id: this._e("number", "charge_limit"), value: Number(e.target.value) });
      });
    }
    // actions sensibles : un premier toucher arme le bouton, un second confirme (pas de boîte de dialogue)
    _action(b) {
      const a = b.dataset.a, sens = b.dataset.confirm === "1" && this._c.confirm;
      if (sens && !b.classList.contains("armed")) {
        this.shadowRoot.querySelectorAll(".armed").forEach((x) => x.classList.remove("armed"));
        b.classList.add("armed");
        clearTimeout(this._armT); this._armT = setTimeout(() => b.classList.remove("armed"), 4000);
        return;
      }
      b.classList.remove("armed");
      if (a !== "tab") { b.classList.add("busy"); setTimeout(() => b.classList.remove("busy"), 1500); }
      if (a === "tab") { this._tab = b.dataset.t; return this._render(); }
      if (a === "more") return this._more(b.dataset.id);
      if (a === "lock") return this._call("lock", "lock", { entity_id: this._e("lock", "door_lock") });
      if (a === "unlock") return this._call("lock", "unlock", { entity_id: this._e("lock", "door_lock") });
      if (a === "press") {
        if (b.dataset.pend) { this._pending = { key: b.dataset.k, until: Date.now() + 90000, sig: this._climSig() }; b.classList.add("pend"); clearTimeout(this._pendT); this._pendT = setTimeout(() => { this._pending = null; this._render(); }, 90000); }
        return this._press(b.dataset.k);
      }
      if (a === "mode") return this._call("select", "select_option", { entity_id: this._chargerMode(), option: b.dataset.o });
      if (a === "fan") {
        this._fanSet = { v: Number(b.dataset.v), until: Date.now() + 90000 };
        this.shadowRoot.querySelectorAll(".fan .fs").forEach((x) => x.classList.toggle("sel", Number(x.dataset.v) <= this._fanSet.v));
        const fb = this.shadowRoot.querySelector(".fan b"); if (fb) fb.textContent = this._fanSet.v;
        return this._call("number", "set_value", { entity_id: this._e("number", "fan_level"), value: this._fanSet.v });
      }
    }

    _render() {
      const root = this.shadowRoot && this.shadowRoot.getElementById("root");
      if (!root || !this._hass || !this._c) return;
      setLang(this._hass, this._c);
      // pas de redessin pendant un appui : sinon le bouton disparaît sous le doigt et l'action est perdue
      if (this._hold) { this._dirty = true; return; }
      this._dirty = false;
      const p = this._p();
      if (!p || !this._s("sensor", "battery")) {
        root.innerHTML = `<div class="miss"><ha-icon icon="mdi:car-electric-outline"></ha-icon><div>${_("Aucune voiture Leapmotor Mate trouvée.")}<br><small>${_("Activez « MQTT → Home Assistant » dans Leapmotor Mate, ou indiquez le préfixe des entités dans l'éditeur.")}</small></div></div>`;
        return;
      }
      const c = this._c;
      root.style.setProperty("--ac", c.accent);
      const tabs = TABS.filter(([k]) => k === "overview" || k === "charge" || (k === "climate" && c.show_climate) || (k === "body" && c.show_body) || (k === "actions" && c.show_actions));
      if (!tabs.some(([k]) => k === this._tab)) this._tab = tabs.some(([k]) => k === c.default_tab) ? c.default_tab : "overview";
      const pane = { overview: () => this._overview(), charge: () => this._charge(), climate: () => this._climate(), body: () => this._body(), actions: () => this._actions() }[this._tab]();
      root.innerHTML = `${this._hero()}
        <div class="tabs" style="grid-template-columns:repeat(${tabs.length},minmax(0,1fr))">${tabs.map(([k, i, l]) => `<button data-a="tab" data-t="${k}" class="${k === this._tab ? "on" : ""}"><ha-icon icon="${i}" class="${(k === "climate" && this._on("climate")) || (k === "charge" && this._on("charging")) ? "spin" + (k === "charge" ? " pulse" : "") : ""}"></ha-icon><span>${_(l)}</span>${k === "body" && this._openCount() ? '<i class="dot"></i>' : ""}</button>`).join("")}</div>
        <div class="pane">${pane}</div>${c.show_location ? this._footer() : ""}`;
      const slot = root.querySelector("#mapslot");
      if (slot) this._mountMap(slot);
    }
    _climSig() { return ["climate", "climate_mode", "fan_level", "seat_heating_driver", "seat_heating_passenger", "steering_wheel_heat", "mirror_heating_left"].map((k) => { const s = this._s("binary_sensor", k) || this._s("sensor", k) || this._s("number", k); return s ? s.state : ""; }).join("|"); }
    _openCount() {
      return ["door_front_left", "door_front_right", "door_rear_left", "door_rear_right", "window_front_left", "window_front_right", "window_rear_left", "window_rear_right", "trunk"].filter((k) => this._on(k)).length;
    }
    // mini-carte de la position (carte « map » de Home Assistant, créée une seule fois)
    async _mountMap(slot) {
      const tr = this._e("device_tracker", "location"), st = this._hass.states[tr];
      if (!st || st.attributes.latitude === undefined) { slot.remove(); return; }
      if (!this._map) {
        if (this._mapLoading) return;
        this._mapLoading = true;
        try {
          const helpers = await window.loadCardHelpers();
          this._map = await helpers.createCardElement({ type: "map", entities: [tr], hours_to_show: 0, default_zoom: this._c.map_zoom || 15, theme_mode: "auto", aspect_ratio: "16:7" });
        } catch (e) { this._mapLoading = false; slot.remove(); return; }
        this._mapLoading = false;
      }
      this._map.hass = this._hass;
      const cur = this.shadowRoot.getElementById("mapslot");
      if (cur && this._map.parentNode !== cur) cur.appendChild(this._map);
    }
    _overview() {
      const bat = this._n("battery"), rng = this._n("range"), charging = this._on("charging"), plug = this._on("plug_connected");
      const R = 40, C = 2 * Math.PI * R, pct = Math.max(0, Math.min(100, bat ?? 0));
      const col = pct <= 15 ? "#ef5350" : pct <= 30 ? "#f5a623" : "var(--ac)";
      const open = this._openCount(), lowTyre = ["fl", "fr", "rl", "rr"].some((k) => { const v = this._n("tyre_" + k); return v !== null && v < (this._c.tyre_min ?? 2.1); });
      const lockSt = this._s("lock", "door_lock"), locked = lockSt ? lockSt.state === "locked" : this._on("locked");
      const pw = this._n("charge_power"), rem = this._n("charge_time_remaining");
      const remTxt = rem ? (rem >= 60 ? `${Math.floor(rem / 60)} h ${String(Math.round(rem % 60)).padStart(2, "0")}` : `${Math.round(rem)} min`) : null;
      const tile = (ic, label, value, cls = "", tab = "") => `<button class="tile ${cls}" ${tab ? `data-a="tab" data-t="${tab}"` : ""}><ha-icon icon="${ic}"></ha-icon><small>${label}</small><b>${value}</b></button>`;
      const mode = this._chargerMode(), ms = mode && this._hass.states[mode];
      const modeLab = ms ? (_({ heures_creuses: _("Heures creuses"), maintenant: _("Maintenant"), arret: _("Arrêt") }[ms.state] || ms.state)) : null;
      return `<div class="ov ${charging ? "charging" : ""}">
        <div class="ovtop"><div class="ring sm"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="${R}" class="rbg"/>
          <circle cx="50" cy="50" r="${R}" class="rfg" style="stroke:${col};stroke-dasharray:${((C * pct) / 100).toFixed(1)} ${C.toFixed(1)}"/></svg>
          <div class="rin"><div class="pct">${fr(bat, 0)}<small>%</small></div>${charging ? `<ha-icon class="bolt" icon="mdi:lightning-bolt"></ha-icon>` : ""}</div></div>
          <div class="ovtxt"><div class="ovr">${_("{x} km d'autonomie", { x: `<b>${fr(rng)}</b>` })}</div>
            <div class="ovs">${charging ? _("En charge · {p} kW", { p: `<b>${fr(pw, 1)}</b>` }) + (remTxt ? _(" · encore {t}", { t: remTxt }) : "") : plug ? _("Branchée") + (modeLab ? _(" · borne en {m}", { m: modeLab.toLowerCase() }) : "") : _("Débranchée")}</div></div></div>
        <div class="tiles">
          ${tile(locked ? "mdi:lock" : "mdi:lock-open-variant", _("Portes"), locked ? _("Verrouillées") : _("Ouvertes"), locked ? "" : "warn", "actions")}
          ${tile(open ? "mdi:car-door" : "mdi:car-door-lock", _("Ouvrants"), open ? _(open > 1 ? _("{n} ouverts") : _("{n} ouvert"), { n: open }) : _("Fermés"), open ? "bad" : "", "body")}
          ${(() => { const cl = this._clim(); return cl.on ? tile(cl.icon, cl.label, cl.target ? `${fr(cl.target, 1)} °C` : _("En marche"), `on run ${cl.kind}`, "climate") : tile("mdi:thermometer", _("Intérieur"), `${fr(this._n("inside_temp"), 1)} °C`, "", "climate"); })()}
          ${tile(lowTyre ? "mdi:car-tire-alert" : "mdi:tire", _("Pneus"), lowTyre ? _("Pression basse") : "OK", lowTyre ? "bad" : "", "body")}
        </div>
        ${this._c.show_location ? '<div id="mapslot" class="mapslot"></div>' : ""}</div>`;
    }

    _hero() {
      const c = this._c, st = this._v("state") || "", charging = this._on("charging");
      const [lab, ic] = charging ? STATE.charging : STATE[st] || [st ? st.charAt(0).toUpperCase() + st.slice(1) : "—", "mdi:car"];
      const lockSt = this._s("lock", "door_lock"), locked = lockSt ? lockSt.state === "locked" : this._on("locked");
      const img = this._img || c.image || "";
      const link = this._v("data_link"), seen = this._v("last_seen");
      const openAlert = this._on("any_door") || this._on("any_window") || this._on("trunk");
      return `<div class="hero ${img ? "img" : ""}">
        ${img ? `<div class="photo" style="background-image:url('${esc(img)}')"></div>` : `<div class="silh">${HolmLeapmotorCard.carSide()}</div>`}
        <div class="shade"></div>${charging ? '<div class="eflow"></div>' : ""}
        <div class="htop"><div><div class="name">${esc(c.name || "Leapmotor")}</div>
          <div class="chips"><span class="chip ${charging ? "on" : ""}"><ha-icon icon="${ic}"></ha-icon>${esc(_(lab))}</span>
          <button class="chip ${locked ? "" : "warn"}" data-a="more" data-id="${this._e("lock", "door_lock")}"><ha-icon icon="${locked ? "mdi:lock" : "mdi:lock-open-variant"}"></ha-icon>${locked ? _("Verrouillée") : _("Déverrouillée")}</button>
          ${(() => { const cl = this._clim(); return cl.on ? `<span class="chip run ${cl.kind}"><ha-icon class="spin" icon="${cl.icon}"></ha-icon>${esc(cl.label)}</span>` : ""; })()}
          ${openAlert ? `<span class="chip bad"><ha-icon icon="mdi:car-door"></ha-icon>${_("Ouvert")}</span>` : ""}
          ${this._on("plug_connected") ? `<span class="chip"><ha-icon icon="mdi:power-plug"></ha-icon>${_("Branchée")}</span>` : ""}</div></div>
          <div class="fresh ${link === "fresh" ? "ok" : "old"}" title="${_("Données {x}", { x: esc(link || "") })}">${esc(ago(seen))}</div></div>
      </div>`;
    }

    _charge() {
      const bat = this._n("battery"), rng = this._n("range"), lim = this._n("charge_limit") ?? num(this._v("charge_limit", "number"));
      const charging = this._on("charging"), plug = this._on("plug_connected");
      const pw = this._n("charge_power"), rem = this._n("charge_time_remaining"), cur = this._n("charge_current"), volt = this._n("charge_voltage");
      const R = 52, C = 2 * Math.PI * R, pct = Math.max(0, Math.min(100, bat ?? 0));
      const col = pct <= 15 ? "#ef5350" : pct <= 30 ? "#f5a623" : "var(--ac)";
      const limS = this._s("number", "charge_limit"), limV = limS ? num(limS.state) : lim;
      const remTxt = rem ? (rem >= 60 ? `${Math.floor(rem / 60)} h ${String(Math.round(rem % 60)).padStart(2, "0")}` : `${Math.round(rem)} min`) : null;
      const mode = this._chargerMode(), ms = mode && this._hass.states[mode];
      const pilot = mode && this._hass.states[mode.replace(/^select\./, "sensor.").replace(/_mode_de_charge$/, "_pilotage")];
      return `<div class="sec charge ${charging ? "charging" : ""}">
        <div class="ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="${R}" class="rbg"/>
          <circle cx="60" cy="60" r="${R}" class="rfg" style="stroke:${col};stroke-dasharray:${((C * pct) / 100).toFixed(1)} ${C.toFixed(1)}"/>
          ${limV ? (() => { const a = (limV / 100) * 2 * Math.PI; return `<line x1="${60 + 45 * Math.cos(a)}" y1="${60 + 45 * Math.sin(a)}" x2="${60 + 59 * Math.cos(a)}" y2="${60 + 59 * Math.sin(a)}" class="rlim"/>`; })() : ""}</svg>
          <div class="rin"><div class="pct">${fr(bat, 0)}<small>%</small></div><div class="rng">${fr(rng)} km</div>${charging ? `<ha-icon class="bolt" icon="mdi:lightning-bolt"></ha-icon>` : ""}</div></div>
        <div class="cinfo">
          <div class="ctitle">${charging ? _("En charge") : plug ? _("Branchée") : _("Batterie")}</div>
          ${charging ? `<div class="kv big"><b>${fr(pw, 1)}</b> kW${remTxt ? _(" · encore {t}", { t: `<b>${remTxt}</b>` }) : ""}</div><div class="kv">${fr(cur, 0)} A · ${fr(volt, 0)} V</div>` :
            `<div class="kv">${_("Autonomie {x}", { x: `<b>${fr(rng)} km</b>` })}</div><div class="kv">${_("Batterie {x}", { x: `<b>${fr(this._n("battery_temp"), 1)} °C</b>` })}</div>`}
          ${limS ? `<div class="lim"><span>${_("Limite de charge")}</span><input type="range" id="lim" min="50" max="100" step="5" value="${limV ?? 100}"><b id="limv">${fr(limV)} %</b></div>` : ""}
          ${ms ? `<div class="borne"><span class="bl"><ha-icon icon="mdi:ev-station"></ha-icon>${_("Borne")}</span>
            ${[["heures_creuses", _("HC")], ["maintenant", _("Maintenant")], ["arret", _("Arrêt")]].map(([o, l]) => `<button class="seg ${ms.state === o ? "on" : ""}" data-a="mode" data-o="${o}">${_(l)}</button>`).join("")}
            ${pilot && !["maintenant", "arret", "arrêt"].includes(String(pilot.state).toLowerCase()) ? `<button class="pst" data-a="more" data-id="${esc(pilot.entity_id)}">${esc(pilot.state)}</button>` : ""}</div>` : ""}
        </div></div>`;
    }

    // mode de climatisation en cours (Leapmotor Mate : auto, vent, heat, cool, defrost…)
    _clim() {
      const on = this._on("climate"), mode = String(this._v("climate_mode") || "").toLowerCase();
      const M = { auto: [_("Auto"), "a_c_auto", "mdi:fan-auto", "auto"], vent: [_("Ventilation"), "quick_ventilation", "mdi:fan", "vent"], ventilation: [_("Ventilation"), "quick_ventilation", "mdi:fan", "vent"],
        heat: [_("Chauffage"), "quick_heat", "mdi:fire", "heat"], heating: [_("Chauffage"), "quick_heat", "mdi:fire", "heat"], cool: [_("Climatisation"), "quick_cool", "mdi:snowflake", "cool"], cooling: [_("Climatisation"), "quick_cool", "mdi:snowflake", "cool"],
        defrost: [_("Dégivrage"), "defrost", "mdi:car-defrost-front", "heat"] };
      const m = M[mode] || [mode ? mode.charAt(0).toUpperCase() + mode.slice(1) : _("Climatisation"), "", "mdi:fan", "vent"];
      return { on, label: _(m[0]), key: m[1], icon: m[2], kind: m[3], fan: num(this._v("fan_level", "number")), target: this._n("ac_target") };
    }
    _climate() {
      const cl = this._clim(), inT = this._n("inside_temp"), outT = this._n("outside_temp");
      const pend = this._pending && this._pending.until > Date.now() ? this._pending.key : null;
      // le bouton du mode en cours arrête la climatisation (comme dans Leapmotor Mate)
      const b = (k, ic, l) => this._s("button", k) ? `<button class="act ${cl.on && cl.key === k ? `on run ${cl.kind}` : ""} ${pend === k ? "pend" : ""}" data-a="press" data-k="${cl.on && cl.key === k && this._s("button", "a_c_off") ? "a_c_off" : k}" data-pend="1" ${cl.on && cl.key === k ? `title="${_("Toucher pour arrêter")}"` : ""}><ha-icon icon="${ic}"></ha-icon><span>${l}</span><em>${_("Confirmer ?")}</em><i class="sent">${_("Envoyé…")}</i></button>` : "";
      const tog = (onK, offK, valK, ic, l) => {
        if (!this._s("button", onK)) return "";
        const v = this._n(valK), act = v && v > 0;
        return `<button class="act ${act ? "on run heat" : ""} ${pend === onK || pend === offK ? "pend" : ""}" data-a="press" data-k="${act ? offK : onK}" data-pend="1"><ha-icon icon="${ic}"></ha-icon><span>${l}</span>${act ? `<i class="lv">${v}</i>` : ""}<i class="sent">${_("Envoyé…")}</i></button>`;
      };
      const banner = cl.on ? `<div class="cban ${cl.kind}"><ha-icon class="spin" icon="${cl.kind === "heat" ? "mdi:fire" : cl.kind === "cool" ? "mdi:snowflake" : "mdi:fan"}"></ha-icon>
          <div><b>${_("{x} en marche", { x: esc(cl.label) })}</b><small>${cl.fan ? _("Ventilation {n}", { n: cl.fan }) : ""}${cl.target ? `${cl.fan ? " · " : ""}${_("consigne {t}", { t: fr(cl.target, 1) + " °C" })}` : ""}</small></div>
          ${this._s("button", "a_c_off") ? `<button class="cstop" data-a="press" data-k="a_c_off" data-pend="1">${_("Arrêter")}</button>` : ""}<i class="flow"></i></div>` : "";
      return `<div class="sec">
        <div class="sh"><ha-icon icon="mdi:fan" class="${cl.on ? "spin" : ""}"></ha-icon>${_("Climatisation")}<span class="sp"></span>
          <span class="tmp"><ha-icon icon="mdi:car-seat"></ha-icon>${fr(inT, 1)}°</span><span class="tmp"><ha-icon icon="mdi:weather-partly-cloudy"></ha-icon>${fr(outT, 1)}°</span>
          ${cl.target ? `<span class="tmp tg ${cl.on ? "on" : ""}"><ha-icon icon="mdi:thermostat"></ha-icon>${fr(cl.target, 1)}°</span>` : ""}</div>
        ${banner}
        <div class="grid">${b("a_c_auto", "mdi:fan-auto", _("Auto"))}${b("quick_heat", "mdi:fire", _("Chauffe rapide"))}${b("quick_cool", "mdi:snowflake", _("Clim rapide"))}
          ${b("defrost", "mdi:car-defrost-front", _("Dégivrage"))}${b("quick_ventilation", "mdi:fan", _("Ventilation"))}${b("a_c_off", "mdi:power", _("Arrêt"))}
          ${tog("driver_seat_heat_on", "driver_seat_heat_off", "seat_heating_driver", "mdi:car-seat-heater", _("Siège conducteur"))}
          ${tog("passenger_seat_heat_on", "passenger_seat_heat_off", "seat_heating_passenger", "mdi:car-seat-heater", _("Siège passager"))}
          ${tog("steering_heat_on", "steering_heat_off", "steering_wheel_heat", "mdi:steering", _("Volant"))}
          ${tog("mirror_heat_on", "mirror_heat_off", "mirror_heating_left", "mdi:mirror", _("Rétroviseurs"))}</div>
        ${this._fanRow(cl)}
        <div class="note">${_("La voiture confirme les commandes en une minute environ.")}</div></div>`;
    }

    // vitesse de ventilation (number.*_fan_level) + consigne en lecture seule (Leapmotor Mate ne l'expose pas en réglage)
    _fanRow(cl) {
      const st = this._s("number", "fan_level");
      if (!st && !cl.target) return "";
      let cur = num(st && st.state);
      if (this._fanSet) { if (this._fanSet.until < Date.now() || this._fanSet.v === cur) this._fanSet = null; else cur = this._fanSet.v; }
      const mn = Number(st?.attributes?.min ?? 1), mx = Number(st?.attributes?.max ?? 7), segs = [];
      for (let i = mn; i <= mx; i++) segs.push(`<button class="fs ${cur !== null && i <= cur ? "sel" : ""}" data-a="fan" data-v="${i}" style="--h:${30 + (70 * (i - mn)) / Math.max(1, mx - mn)}%" title="${_("Ventilation {n}", { n: i })}"><i></i></button>`);
      return `<div class="fanbox">
        ${st ? `<div class="fan"><ha-icon icon="mdi:fan" class="${cl.on ? "spin" : ""}"></ha-icon><span>${_("Ventilation")}</span><div class="fsegs">${segs.join("")}</div><b>${cur ?? "—"}</b></div>` : ""}
        ${cl.target ? `<div class="cons"><ha-icon icon="mdi:thermostat"></ha-icon><span>${_("Consigne")}</span><b>${fr(cl.target, 1)} °C</b><small>${_("réglable dans Leapmotor Mate")}</small></div>` : ""}
      </div>`;
    }

    _body() {
      const o = (k) => this._on(k);
      const tyre = (k) => { const v = this._n("tyre_" + k); return { v, low: v !== null && v < (this._c.tyre_min ?? 2.1) }; };
      const t = { fl: tyre("fl"), fr: tyre("fr"), rl: tyre("rl"), rr: tyre("rr") };
      const sun = this._n("sunshade_position");
      const parts = [["door_front_left", _("Porte avant gauche")], ["door_front_right", _("Porte avant droite")], ["door_rear_left", _("Porte arrière gauche")], ["door_rear_right", _("Porte arrière droite")],
        ["window_front_left", _("Vitre avant gauche")], ["window_front_right", _("Vitre avant droite")], ["window_rear_left", _("Vitre arrière gauche")], ["window_rear_right", _("Vitre arrière droite")], ["trunk", _("Coffre")]];
      const open = parts.filter(([k]) => o(k)).map(([, l]) => l);
      const tl = (k, x, y, anchor) => `<text x="${x}" y="${y}" text-anchor="${anchor}" class="ty ${t[k].low ? "low" : ""}">${t[k].v === null ? "—" : fr(t[k].v, 2)}</text>`;
      return `<div class="sec body">
        <div class="sh"><ha-icon icon="mdi:car-door"></ha-icon>${_("Ouvrants et pneus")}<span class="sp"></span>${open.length ? `<span class="alert">${_(open.length > 1 ? _("{n} ouverts") : _("{n} ouvert"), { n: open.length })}</span>` : `<span class="okk">${_("Tout est fermé")}</span>`}</div>
        <div class="bwrap"><svg viewBox="0 0 260 150" class="top">
          ${HolmLeapmotorCard.carTop({ fl: o("door_front_left"), fr: o("door_front_right"), rl: o("door_rear_left"), rr: o("door_rear_right"),
            wfl: o("window_front_left"), wfr: o("window_front_right"), wrl: o("window_rear_left"), wrr: o("window_rear_right"), trunk: o("trunk"), sun: o("sunshade") })}
          ${tl("fl", 62, 14, "middle")}${tl("rl", 196, 14, "middle")}${tl("fr", 62, 146, "middle")}${tl("rr", 196, 146, "middle")}
        </svg>
        <div class="blist">${open.length ? open.map((l) => `<div class="bo"><ha-icon icon="mdi:alert-circle"></ha-icon>${l}</div>`).join("") : ""}
          ${sun !== null ? `<div class="bi"><ha-icon icon="mdi:blinds-horizontal"></ha-icon>${_("Rideau de toit")} <b>${o("sunshade") ? _("ouvert {p} %", { p: fr(sun) }) : _("fermé")}</b></div>` : ""}
          <div class="bi"><ha-icon icon="mdi:car-tire-alert"></ha-icon>${_("Pneus")} <b>${["fl", "fr", "rl", "rr"].some((k) => t[k].low) ? _("pression basse") : "OK"}</b> <small>(bar)</small></div>
          ${this._v("gear") ? `<div class="bi"><ha-icon icon="mdi:car-shift-pattern"></ha-icon>${_("Rapport")} <b>${esc(this._v("gear"))}</b></div>` : ""}</div></div></div>`;
    }

    _actions() {
      const lockSt = this._s("lock", "door_lock"), locked = lockSt && lockSt.state === "locked";
      const b = (k, ic, l, conf) => this._s("button", k) ? `<button class="act" data-a="press" data-k="${k}" ${conf ? 'data-confirm="1"' : ""}><ha-icon icon="${ic}"></ha-icon><span>${l}</span><em>${_("Confirmer ?")}</em></button>` : "";
      return `<div class="sec">
        <div class="sh"><ha-icon icon="mdi:gesture-tap-button"></ha-icon>${_("Actions")}</div>
        <div class="grid">
          ${lockSt ? (locked ? `<button class="act" data-a="unlock" data-confirm="1"><ha-icon icon="mdi:lock-open-variant"></ha-icon><span>${_("Déverrouiller")}</span><em>${_("Confirmer ?")}</em></button>`
            : `<button class="act on" data-a="lock"><ha-icon icon="mdi:lock"></ha-icon><span>${_("Verrouiller")}</span></button>`) : ""}
          ${b("open_trunk", "mdi:car-back", _("Ouvrir le coffre"), true)}${b("close_trunk", "mdi:car-back", _("Fermer le coffre"))}
          ${b("open_windows", "mdi:car-door", _("Ouvrir les vitres"), true)}${b("close_windows", "mdi:car-door-lock", _("Fermer les vitres"))}
          ${b("open_sunshade", "mdi:blinds-horizontal", _("Ouvrir le rideau"))}${b("close_sunshade", "mdi:blinds-horizontal-closed", _("Fermer le rideau"))}
          ${b("find_car", "mdi:car-search", _("Klaxon / feux"))}${b("preheat_battery", "mdi:battery-heart-variant", _("Préchauffer la batterie"))}
          ${b("unlock_charge_cable", "mdi:ev-plug-type2", _("Libérer le câble"), true)}</div></div>`;
    }

    _footer() {
      const tr = this._hass.states[this._e("device_tracker", "location")];
      let where = "—";
      if (tr) {
        const z = tr.state;
        where = z === "home" ? _("À la maison") : z === "not_home" ? _("En déplacement") : (this._hass.states["zone." + z]?.attributes.friendly_name || z);
      }
      return `<div class="foot">
        ${tr ? `<button class="fi" data-a="more" data-id="${esc(tr.entity_id)}"><ha-icon icon="mdi:map-marker"></ha-icon>${esc(where)}</button>` : ""}
        <span class="fi"><ha-icon icon="mdi:counter"></ha-icon>${fr(this._n("odometer"))} km</span>
        ${this._n("speed") ? `<span class="fi"><ha-icon icon="mdi:speedometer"></ha-icon>${fr(this._n("speed"))} km/h</span>` : ""}</div>`;
    }

    // silhouette générique (vue de profil) quand aucune photo n'est choisie
    static carSide() {
      return `<svg viewBox="0 0 320 120"><defs><linearGradient id="cb" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="rgba(255,255,255,.35)"/><stop offset="1" stop-color="rgba(255,255,255,.08)"/></linearGradient></defs>
        <path d="M18 86 C18 70 30 64 52 61 L92 56 C112 38 136 30 168 30 L206 31 C232 33 252 44 270 58 L292 63 C304 66 308 74 306 86 Z" fill="url(#cb)" stroke="rgba(255,255,255,.45)" stroke-width="1.5"/>
        <path d="M104 56 C120 42 140 37 166 37 L202 38 C222 40 238 48 252 58 Z" fill="rgba(0,0,0,.25)" stroke="rgba(255,255,255,.3)"/>
        <line x1="176" y1="38" x2="174" y2="58" stroke="rgba(255,255,255,.3)"/>
        <circle cx="82" cy="88" r="17" fill="#1a1f24" stroke="rgba(255,255,255,.5)" stroke-width="3"/><circle cx="82" cy="88" r="6" fill="rgba(255,255,255,.4)"/>
        <circle cx="246" cy="88" r="17" fill="#1a1f24" stroke="rgba(255,255,255,.5)" stroke-width="3"/><circle cx="246" cy="88" r="6" fill="rgba(255,255,255,.4)"/>
        <path d="M290 70 h12" stroke="var(--ac)" stroke-width="3" stroke-linecap="round"/><path d="M22 76 h10" stroke="#ef5350" stroke-width="3" stroke-linecap="round"/></svg>`;
    }
    // vue de dessus : avant à gauche ; portes / vitres / coffre ouverts en couleur
    static carTop(o) {
      const st = (open) => (open ? 'class="open"' : "");
      return `<g class="car">
        <rect x="30" y="34" width="200" height="82" rx="34" class="shell"/>
        <path d="M88 44 Q100 75 88 106 L76 106 Q64 75 76 44 Z" class="glass"/>
        <path d="M184 46 Q194 75 184 104 L196 104 Q206 75 196 46 Z" class="glass"/>
        <rect x="104" y="46" width="72" height="58" rx="10" class="roof ${o.sun ? "sun" : ""}"/>
        <rect x="96" y="30" width="44" height="7" rx="3" ${st(o.fl)} data-p="door"/><rect x="142" y="30" width="40" height="7" rx="3" ${st(o.rl)} data-p="door"/>
        <rect x="96" y="113" width="44" height="7" rx="3" ${st(o.fr)} data-p="door"/><rect x="142" y="113" width="40" height="7" rx="3" ${st(o.rr)} data-p="door"/>
        <rect x="102" y="39" width="34" height="4" rx="2" ${st(o.wfl)} class="win"/><rect x="146" y="39" width="30" height="4" rx="2" ${st(o.wrl)} class="win"/>
        <rect x="102" y="107" width="34" height="4" rx="2" ${st(o.wfr)} class="win"/><rect x="146" y="107" width="30" height="4" rx="2" ${st(o.wrr)} class="win"/>
        <rect x="222" y="52" width="8" height="46" rx="3" ${st(o.trunk)} data-p="trunk"/>
        <rect x="46" y="22" width="32" height="10" rx="4" class="tyre"/><rect x="180" y="22" width="32" height="10" rx="4" class="tyre"/>
        <rect x="46" y="118" width="32" height="10" rx="4" class="tyre"/><rect x="180" y="118" width="32" height="10" rx="4" class="tyre"/>
        <path d="M34 58 v34" class="lamp"/></g>`;
    }
    static css() {
      return `
      :host { display:block; }
      ha-card { overflow:hidden; }
      .root { --ac:#2ec4b6; --bad:#ef5350; --warn:#f5a623; --mut: var(--secondary-text-color); container-type:inline-size; }
      button { font:inherit; color:inherit; border:0; background:none; cursor:pointer; padding:0; -webkit-tap-highlight-color:transparent; }
      .miss { display:flex; gap:12px; align-items:center; padding:18px; color: var(--mut); }
      .miss ha-icon { --mdc-icon-size:40px; }
      /* ---------- en-tête ---------- */
      .hero { position:relative; height:190px; overflow:hidden; background: radial-gradient(120% 90% at 70% 10%, color-mix(in srgb, var(--ac) 45%, #10202a), #0b1418 70%); color:#fff; }
      .hero.img { height:220px; }
      .photo { position:absolute; inset:0; background-size:cover; background-position:center; transform: scale(1.02); }
      .silh { position:absolute; left:50%; bottom:6px; width:min(86%, 420px); transform:translateX(-50%); opacity:.95; }
      .silh svg { width:100%; height:auto; display:block; filter: drop-shadow(0 10px 18px rgba(0,0,0,.45)); }
      .shade { position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.05) 45%, rgba(0,0,0,.35) 100%); }
      .htop { position:absolute; left:0; right:0; top:0; display:flex; justify-content:space-between; gap:10px; padding:14px 16px; }
      .name { font-size:20px; font-weight:800; letter-spacing:.3px; text-shadow: 0 2px 8px rgba(0,0,0,.5); }
      .chips { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
      .chip { display:inline-flex; align-items:center; gap:5px; height:26px; padding:0 10px; border-radius:13px; font-size:12px; font-weight:700;
        background: rgba(0,0,0,.35); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); box-shadow: inset 0 0 0 1px rgba(255,255,255,.18); }
      .chip ha-icon { --mdc-icon-size:15px; }
      .chip.on { background: color-mix(in srgb, var(--ac) 55%, transparent); }
      .chip.warn { background: color-mix(in srgb, var(--warn) 60%, transparent); }
      .chip.bad { background: color-mix(in srgb, var(--bad) 65%, transparent); }
      .fresh { align-self:flex-start; font-size:11px; padding:3px 8px; border-radius:10px; background: rgba(0,0,0,.35); white-space:nowrap; }
      .fresh::before { content:""; display:inline-block; width:7px; height:7px; border-radius:50%; margin-right:5px; background:#3ec97a; vertical-align:1px; }
      .fresh.old::before { background: var(--warn); }
      /* ---------- onglets ---------- */
      .tabs { display:grid; gap:4px; margin:12px 14px 0; padding:4px; border-radius:14px; background: color-mix(in srgb, var(--primary-text-color) 6%, transparent); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-text-color) 8%, transparent); }
      .tabs button { position:relative; display:flex; align-items:center; justify-content:center; gap:6px; height:36px; border-radius:11px; font-size:12.5px; font-weight:700; color: var(--mut); transition: background .25s, color .25s; }
      .tabs button ha-icon { --mdc-icon-size:17px; }
      .tabs button.on { background: color-mix(in srgb, var(--ac) 20%, transparent); color: var(--primary-text-color); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ac) 45%, transparent); }
      .tabs button.on ha-icon { color: var(--ac); }
      .tabs .dot { position:absolute; top:6px; right:8px; width:7px; height:7px; border-radius:50%; background: var(--bad); }
      .pane > .sec { border-top:0; }
      @container (max-width: 470px) { .tabs button span { display:none; } .tabs button { height:38px; } }
      /* ---------- aperçu ---------- */
      .ov { padding:14px 16px 6px; display:flex; flex-direction:column; gap:12px; }
      .ovtop { display:flex; align-items:center; gap:14px; }
      .ring.sm { width:92px; height:92px; } .ring.sm .pct { font-size:24px; }
      .ovtxt { flex:1; min-width:0; } .ovr { font-size:15px; } .ovr b { font-size:22px; font-weight:800; }
      .ovs { font-size:13px; color: var(--mut); margin-top:3px; } .ovs b { color: var(--primary-text-color); }
      .tiles { display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap:7px; }
      .tile { display:flex; flex-direction:column; align-items:flex-start; gap:2px; padding:9px 10px; border-radius:13px; background: color-mix(in srgb, var(--primary-text-color) 6%, transparent); text-align:left; min-width:0; }
      .tile:hover { background: color-mix(in srgb, var(--primary-text-color) 11%, transparent); }
      .tile ha-icon { --mdc-icon-size:19px; color: var(--ac); margin-bottom:2px; }
      .tile small { font-size:11px; color: var(--mut); } .tile b { font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%; }
      .tile.on { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ac) 55%, transparent); }
      .tile.warn ha-icon { color: var(--warn); } .tile.bad ha-icon, .tile.bad b { color: var(--bad); }
      .mapslot { border-radius:14px; overflow:hidden; }
      .mapslot:empty { display:none; }
      .mapslot > * { --ha-card-border-radius:14px; --ha-card-box-shadow:none; }
      @container (max-width: 420px) { .tiles { grid-template-columns: repeat(2, minmax(0,1fr)); } }
      /* ---------- sections ---------- */
      .sec { padding:14px 16px; border-top: 1px solid var(--divider-color, rgba(127,127,127,.18)); }
      .sh { display:flex; align-items:center; gap:7px; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:.5px; color: var(--mut); margin-bottom:10px; }
      .sh ha-icon { --mdc-icon-size:17px; color: var(--ac); }
      .sp { flex:1; }
      /* ---------- charge ---------- */
      .charge { display:flex; gap:18px; align-items:center; }
      .ring { position:relative; width:128px; height:128px; flex:0 0 auto; }
      .ring svg { width:100%; height:100%; transform: rotate(-90deg); }
      .rbg { fill:none; stroke: color-mix(in srgb, var(--primary-text-color) 10%, transparent); stroke-width:10; }
      .rfg { fill:none; stroke-width:10; stroke-linecap:round; transition: stroke-dasharray .8s; }
      .charging .rfg { animation: glow 2.2s ease-in-out infinite; }
      @keyframes glow { 50% { filter: drop-shadow(0 0 6px var(--ac)); opacity:.75; } }
      .rlim { stroke: var(--primary-text-color); stroke-width:2.5; stroke-linecap:round; opacity:.6; }
      .rin { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }
      .pct { font-size:30px; font-weight:800; line-height:1; font-variant-numeric: tabular-nums; }
      .pct small { font-size:15px; font-weight:700; margin-left:1px; }
      .rng { font-size:12.5px; color: var(--mut); margin-top:3px; }
      .bolt { --mdc-icon-size:18px; color: var(--ac); animation: pulse 1.4s ease-in-out infinite; }
      @keyframes pulse { 50% { opacity:.3; transform: scale(.85); } }
      .cinfo { flex:1; min-width:0; display:flex; flex-direction:column; gap:5px; }
      .ctitle { font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:.5px; color: var(--mut); }
      .kv { font-size:14px; } .kv.big { font-size:17px; } .kv b { font-variant-numeric: tabular-nums; }
      .fanbox { display:flex; flex-direction:column; gap:8px; margin-top:12px; padding:10px 12px; border-radius:14px; background: rgba(127,127,127,.08); }
      .fan, .cons { display:flex; align-items:center; gap:8px; font-size:12.5px; color: var(--mut); }
      .fan ha-icon, .cons ha-icon { --mdc-icon-size:18px; color: var(--ac); }
      .fan b, .cons b { color: var(--primary-text-color); min-width:34px; text-align:right; }
      .cons span { flex:1; } .cons small { opacity:.7; font-size:11px; }
      .fsegs { flex:1; display:flex; align-items:flex-end; gap:4px; height:26px; }
      .fs { flex:1; height:100%; display:flex; align-items:flex-end; padding:0; border:0; background:none; cursor:pointer; }
      .fs i { display:block; width:100%; height: var(--h); border-radius:4px; background: rgba(127,127,127,.25); transition: background .25s, transform .15s; }
      .fs.sel i { background: var(--ac); box-shadow: 0 0 6px color-mix(in srgb, var(--ac) 50%, transparent); }
      .fs:active i { transform: scaleY(.9); }
      .lim { display:flex; align-items:center; gap:8px; font-size:12.5px; color: var(--mut); margin-top:4px; }
      .lim input { flex:1; accent-color: var(--ac); min-width:60px; }
      .lim b { color: var(--primary-text-color); min-width:40px; text-align:right; }
      .borne { display:flex; flex-wrap:wrap; align-items:center; gap:5px; margin-top:4px; }
      .bl { display:inline-flex; align-items:center; gap:4px; font-size:12px; color: var(--mut); margin-right:2px; }
      .bl ha-icon { --mdc-icon-size:15px; }
      .seg { height:26px; padding:0 10px; border-radius:13px; font-size:12px; font-weight:700; background: color-mix(in srgb, var(--primary-text-color) 7%, transparent); }
      .seg.on { background: var(--ac); color:#fff; }
      .pst { font-size:11.5px; color: var(--mut); text-decoration: underline dotted; text-align:left; }
      /* ---------- climatisation et actions ---------- */
      .tmp { display:inline-flex; align-items:center; gap:3px; text-transform:none; letter-spacing:0; font-weight:700; font-size:13px; color: var(--primary-text-color); margin-left:8px; }
      .tmp ha-icon { --mdc-icon-size:15px; color: var(--mut); }
      .tmp.tg.on ha-icon { color: var(--ac); }
      .grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap:7px; }
      .act { position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px; min-height:64px; padding:8px 6px; border-radius:14px;
        background: color-mix(in srgb, var(--primary-text-color) 6%, transparent); font-size:12px; font-weight:600; text-align:center; transition: background .2s, transform .1s; overflow:hidden; }
      .act:hover { background: color-mix(in srgb, var(--primary-text-color) 11%, transparent); }
      .act:active { transform: scale(.96); }
      .act ha-icon { --mdc-icon-size:22px; color: var(--ac); }
      .act.on { background: color-mix(in srgb, var(--ac) 22%, transparent); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ac) 55%, transparent); }
      .act .lv { position:absolute; top:5px; right:7px; font-style:normal; font-size:10px; font-weight:800; color: var(--ac); }
      .act em { display:none; font-style:normal; }
      .act.armed { background: color-mix(in srgb, var(--warn) 30%, transparent); box-shadow: inset 0 0 0 1px var(--warn); }
      .act.armed span { display:none; } .act.armed em { display:block; font-weight:800; }
      .act.busy ha-icon { animation: pulse .8s ease-in-out infinite; }
      /* ---------- ouvrants ---------- */
      .alert { color: var(--bad); text-transform:none; letter-spacing:0; font-size:12.5px; }
      .okk { color:#3ec97a; text-transform:none; letter-spacing:0; font-size:12.5px; }
      .bwrap { display:flex; gap:16px; align-items:center; }
      .top { width:min(58%, 300px); height:auto; flex:0 0 auto; }
      .shell { fill: color-mix(in srgb, var(--primary-text-color) 9%, transparent); stroke: color-mix(in srgb, var(--primary-text-color) 30%, transparent); stroke-width:1.5; }
      .glass { fill: color-mix(in srgb, var(--ac) 18%, transparent); stroke: color-mix(in srgb, var(--primary-text-color) 20%, transparent); }
      .roof { fill: color-mix(in srgb, var(--primary-text-color) 5%, transparent); stroke: color-mix(in srgb, var(--primary-text-color) 18%, transparent); }
      .roof.sun { fill: color-mix(in srgb, #64b5f6 30%, transparent); }
      .car rect[data-p] { fill: color-mix(in srgb, var(--primary-text-color) 25%, transparent); }
      .car rect.win { fill: color-mix(in srgb, var(--ac) 30%, transparent); }
      .car rect.open { fill: var(--bad) !important; filter: drop-shadow(0 0 3px var(--bad)); }
      .tyre { fill: #23292e; stroke: color-mix(in srgb, var(--primary-text-color) 35%, transparent); }
      .lamp { stroke: var(--ac); stroke-width:3; stroke-linecap:round; }
      .ty { font-size:12px; font-weight:700; fill: var(--primary-text-color); }
      .ty.low { fill: var(--bad); }
      .blist { flex:1; display:flex; flex-direction:column; gap:6px; font-size:13px; }
      .bi, .bo { display:flex; align-items:center; gap:6px; } .bi ha-icon, .bo ha-icon { --mdc-icon-size:17px; color: var(--mut); }
      .bo { color: var(--bad); font-weight:700; } .bo ha-icon { color: var(--bad); }
      .bi small { color: var(--mut); }
      /* ---------- pied ---------- */
      .foot { display:flex; flex-wrap:wrap; gap:14px; padding:10px 16px 14px; border-top: 1px solid var(--divider-color, rgba(127,127,127,.18)); font-size:13px; color: var(--mut); }
      .fi { display:inline-flex; align-items:center; gap:5px; } .fi ha-icon { --mdc-icon-size:16px; color: var(--ac); }
      button.fi:hover { color: var(--primary-text-color); }
      @container (max-width: 420px) {
        .charge { flex-direction:column; align-items:stretch; } .ring { margin:0 auto; }
        .bwrap { flex-direction:column; } .top { width:100%; }
        .hero { height:170px; }
      }
      /* ---------- animations « en marche » ---------- */
      .spin { animation: spin 1.6s linear infinite; }
      .spin.pulse { animation: pulse 1.4s ease-in-out infinite; }
      .run.heat .spin, .cban.heat .spin, .chip.heat .spin { animation: flame 1.2s ease-in-out infinite; }
      .run.cool .spin, .cban.cool .spin, .chip.cool .spin { animation: spin 4s linear infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes flame { 0%,100% { transform: scale(1) translateY(0); filter: brightness(1); } 50% { transform: scale(1.15) translateY(-1px); filter: brightness(1.3); } }
      .act.run { animation: glowac 2.4s ease-in-out infinite; }
      .act.run ha-icon { animation: spin 1.6s linear infinite; }
      .act.run.heat ha-icon { animation: flame 1.2s ease-in-out infinite; color:#ff8a3d; }
      .act.run.heat { --g:#ff8a3d; } .act.run.cool { --g:#5ec8ff; } .act.run.vent, .act.run.auto { --g: var(--ac); }
      .act.run.cool ha-icon { color:#5ec8ff; }
      @keyframes glowac { 50% { box-shadow: inset 0 0 0 1px var(--g, var(--ac)), 0 0 14px -2px var(--g, var(--ac)); } }
      .act.run.heat::after { content:""; position:absolute; left:0; right:0; bottom:0; height:40%; background: linear-gradient(0deg, rgba(255,138,61,.28), transparent); animation: heatw 2s ease-in-out infinite; pointer-events:none; }
      @keyframes heatw { 50% { opacity:.35; transform: translateY(-4px); } }
      .act .sent { display:none; font-style:normal; font-size:10.5px; color: var(--ac); }
      .act.pend { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ac) 60%, transparent); }
      .act.pend .sent { display:block; } .act.pend ha-icon { animation: pulse 1s ease-in-out infinite; }
      .cban { position:relative; overflow:hidden; display:flex; align-items:center; gap:12px; padding:10px 12px; margin-bottom:10px; border-radius:14px;
        background: color-mix(in srgb, var(--g, var(--ac)) 16%, transparent); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--g, var(--ac)) 45%, transparent); }
      .cban.heat { --g:#ff8a3d; } .cban.cool { --g:#5ec8ff; }
      .cban > ha-icon { --mdc-icon-size:30px; color: var(--g, var(--ac)); }
      .cban b { display:block; font-size:14px; } .cban small { font-size:12px; color: var(--mut); }
      .cban > div { flex:1; min-width:0; }
      .cstop { position:relative; z-index:1; height:30px; padding:0 12px; border-radius:15px; font-size:12px; font-weight:800; background: color-mix(in srgb, var(--primary-text-color) 10%, transparent); }
      .cban .flow { position:absolute; inset:0; pointer-events:none; background: repeating-linear-gradient(110deg, transparent 0 22px, color-mix(in srgb, var(--g, var(--ac)) 14%, transparent) 22px 30px); animation: flowx 1.6s linear infinite; opacity:.7; }
      .cban.heat .flow { animation-direction: reverse; }
      @keyframes flowx { to { background-position: 60px 0; } }
      .chip.run.heat { background: rgba(255,138,61,.55); } .chip.run.cool { background: rgba(94,200,255,.5); } .chip.run.vent, .chip.run.auto { background: color-mix(in srgb, var(--ac) 55%, transparent); }
      .tile.run ha-icon { animation: spin 1.6s linear infinite; } .tile.run.heat ha-icon { animation: flame 1.2s ease-in-out infinite; color:#ff8a3d; } .tile.run.cool ha-icon { color:#5ec8ff; }
      .eflow { position:absolute; left:0; right:0; bottom:0; height:4px; background: linear-gradient(90deg, transparent, var(--ac), transparent); background-size: 40% 100%; background-repeat:no-repeat; animation: eflow 1.8s linear infinite; }
      @keyframes eflow { from { background-position: -40% 0; } to { background-position: 140% 0; } }
      .chip.warn { animation: warnp 2s ease-in-out infinite; }
      @keyframes warnp { 50% { box-shadow: inset 0 0 0 1px rgba(255,255,255,.18), 0 0 10px rgba(245,166,35,.7); } }
      .car rect.open { animation: blink 1.4s ease-in-out infinite; }
      @keyframes blink { 50% { opacity:.45; } }
      .note { margin-top:8px; font-size:11.5px; color: var(--mut); }
      @media (prefers-reduced-motion: reduce) { .rfg, .bolt, .act ha-icon, .spin, .act.run, .cban .flow, .eflow, .chip.warn, .car rect.open, .tile ha-icon, .act.run.heat::after { animation:none !important; } }`;
    }
  }

  class HolmLeapmotorCardEditor extends HTMLElement {
    setConfig(c) { this._config = { ...c }; this._update(); }
    set hass(h) { this._hass = h; this._update(); }
    _update() {
      if (!this._hass || !this._config) return;
      if (setLang(this._hass, this._config) !== this._lang && this._form) { this._lang = LANG; this._form.remove(); this._form = null; }
      this._lang = LANG;
      if (!this._form) {
        this._form = document.createElement("ha-form");
        this._form.schema = [
          { type: "grid", name: "", schema: [{ name: "name", selector: { text: {} } }, { name: "prefix", selector: { text: {} } }] },
          { type: "expandable", title: _("Photo"), icon: "mdi:image", flatten: true, expanded: true, schema: [
            { name: "image_media", selector: { media: { accept: ["image/*"] } } },
            { name: "image", selector: { text: {} } },
          ] },
          { type: "expandable", title: _("Affichage"), icon: "mdi:view-dashboard-outline", flatten: true, schema: [
            { type: "grid", name: "", schema: [
              { name: "show_climate", selector: { boolean: {} } }, { name: "show_body", selector: { boolean: {} } },
              { name: "show_actions", selector: { boolean: {} } }, { name: "show_location", selector: { boolean: {} } },
              { name: "show_charger", selector: { boolean: {} } }, { name: "confirm", selector: { boolean: {} } },
            ] },
            { name: "default_tab", selector: { select: { mode: "dropdown", options: [{ value: "overview", label: _("Aperçu") }, { value: "charge", label: _("Charge") }, { value: "climate", label: _("Climat") }, { value: "body", label: _("Véhicule") }, { value: "actions", label: _("Actions") }] } } },
            { name: "map_zoom", selector: { number: { min: 8, max: 19, step: 1, mode: "box" } } },
            { name: "charger_mode", selector: { entity: { domain: "select" } } },
            { type: "grid", name: "", schema: [{ name: "c_accent", selector: { color_rgb: {} } }, { name: "tyre_min", selector: { number: { min: 1, max: 4, step: 0.05, mode: "box", unit_of_measurement: "bar" } } }] },
          ] },
          langField(),
        ];
        this._form.schema = locSchema(this._form.schema);
        const L = { language: _("Langue"), name: _("Nom affiché"), prefix: _("Préfixe des entités (automatique si vide)"), image_media: _("Photo (médiathèque : vous pouvez y téléverser une image)"),
          image: _("… ou adresse d'une image (ex. /local/voiture.jpg)"), show_climate: _("Climatisation"), show_body: _("Ouvrants et pneus"), show_actions: _("Actions"),
          show_location: _("Position, mini-carte et kilométrage"), show_charger: _("Commande de la borne (HOLM Lektrico)"), confirm: _("Confirmer les actions sensibles"),
          charger_mode: _("Sélecteur de mode de la borne (automatique si vide)"), default_tab: _("Onglet affiché à l'ouverture"), map_zoom: _("Zoom de la mini-carte"), c_accent: _("Couleur d'accent"), tyre_min: _("Alerte pression des pneus en dessous de") };
        this._form.computeLabel = (s) => (L[s.name] ? _(L[s.name]) : s.name);
        this._form.addEventListener("value-changed", (ev) => {
          const v = { ...ev.detail.value }, out = { ...this._config };
          for (const [k, val] of Object.entries(v)) {
            if (k === "c_accent") { if (val) out.accent = rgb2hex(val); else delete out.accent; continue; }
            if (val === "" || val === undefined || val === null) delete out[k]; else out[k] = val;
          }
          for (const k of ["show_climate", "show_body", "show_actions", "show_location", "show_charger", "confirm"]) if (out[k] !== false) delete out[k];
          if (out.image_media && !out.image_media.media_content_id) delete out.image_media;
          this._config = out;
          this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: out }, bubbles: true, composed: true }));
        });
        this.appendChild(this._form);
      }
      const c = this._config;
      const d = { language: "", show_climate: true, show_body: true, show_actions: true, show_location: true, show_charger: true, confirm: true, ...c, c_accent: hex2rgb(c.accent || "#2ec4b6") };
      delete d.accent;
      this._form.hass = this._hass;
      this._form.data = d;
    }
  }

  if (!customElements.get("holm-leapmotor-card")) customElements.define("holm-leapmotor-card", HolmLeapmotorCard);
  if (!customElements.get("holm-leapmotor-card-editor")) customElements.define("holm-leapmotor-card-editor", HolmLeapmotorCardEditor);
  window.customCards = window.customCards || [];
  if (!window.customCards.some((c) => c.type === "holm-leapmotor-card"))
    setLang(document.querySelector("home-assistant")?.hass);
    window.customCards.push({ type: "holm-leapmotor-card", name: _("HOLM Leapmotor"), description: _("Votre Leapmotor via Leapmotor Mate : batterie, charge, climatisation, ouvrants, pneus, actions et position, avec votre photo."), preview: true });
  console.info(`%c HOLM-LEAPMOTOR %c ${VERSION} `, "background:#2ec4b6;color:#062;border-radius:3px 0 0 3px", "background:#123;color:#fff;border-radius:0 3px 3px 0");
})();
