// Aluksi määritellään, että myStorage = window.localStorage

myStorage = window.localStorage;

// myStorage käyttää selaimen localStorage-muistia

// tsekkaaMäärä()-funktio tarkistaa To Do -itemien määrän ja näyttää sen <p id='määrä'> -elementin (mittari) sisällä tekstimuodossa.
// tsekkaaMäärä()-funktio laskee To Do -itemien määrän tarkistamalla otsikkojen määrän luokan perusteella.
// ko. funktio ajetaan myöhemmin

function tsekkaaMäärä() {
  var mittari = document.getElementById("määrä");
  const otsikot = document.getElementsByClassName("otsikko");
  var luku = otsikot.length;

  if (luku == 1) {
    mittari.innerHTML = "Listassa on nyt vain " + luku + " kenttä.";
    mittari.style.color = "black";
  }
  if (luku > 1) {
    mittari.innerHTML = "Listassa on nyt yhteensä " + luku + " kenttää.";
    mittari.style.color = "black";
  }
  if (luku > 4) {
    mittari.innerHTML =
      "Listassa on jo yli " +
      luku +
      " kenttää. Selaa alaspäin jos et näe kaikkea!";
    mittari.style.color = "red";
  }
  if (luku == 0) {
    mittari.innerHTML = "Lista on tyhjä";
    mittari.style.color = "black";
  }
}

// const nappi on lomakkeen 'Lähetä'-nappi. Se on määritelty EventListener varten.

const nappi = document.getElementById("nappi");

// Alla määritelty EventListener tyhjentää otsikko (titleInput) ja kommentti / comment (commentInput) -kentät klikkauksen jälkeen.

nappi.addEventListener("click", function handleClick(event) {
  const titleInput = document.getElementById("otsikko");
  const commentInput = document.getElementById("comment");
  titleInput.value = "";
  commentInput.value = "";
});

// Alla oleva tallennaMuistiin() -funktio tallentaa To Do -itemien otsikot ja kommentit
// sekä niiden määrän localStorage-muistiin For-loopilla.
// Funktio ajetaan kun To Do -lista päivittyy eli kun sinne lisätään jotain tai poistetaan jotain.

function tallennaMuistiin() {
  const otsikot = document.getElementsByClassName("otsikko");
  const kommentit = document.getElementsByClassName("kommentti");

  // Funktio luo ensin Array:t sivulta löytyvistä otsikoista ja kommenteista HTML-classien perusteella.
  // For-looppi pyörii otsikot.lenght asti eli kunnes kaikki otsikot (ja mahdolliset kommentit) sekä niiden määrä on tallennettu.

  for (let i = 0; i < otsikot.length; i++) {
    var storeNumber = i + 1;
    var storeTitle = "otsikko" + storeNumber;
    console.log(storeTitle);
    var storeComment = "kommentti" + storeNumber;
    console.log(storeComment);
    var storeAmount = "määrä";
    console.log(storeAmount);
    // Ensin (yläpuolella) määrittelen localStorage avainten nimet tyylillä 'otsikko1', 'otsikko2', 'kommentti1' jne. mahdollistaen helpomman muistista lataamisen myöhemmässä funktiossa.
    var titleValue = otsikot[i].innerHTML;
    console.log(titleValue);
    var commentValue = kommentit[i].innerHTML;
    console.log(commentValue);
    var amountValue = i + 1;
    // Seuraavaksi (yläpuolella) määrittelen localStorage avainten arvot sivulta löytyvien otsikkojen ja kommenttien perusteella.
    myStorage.setItem(storeTitle, titleValue);
    myStorage.setItem(storeComment, commentValue);
    myStorage.setItem(storeAmount, amountValue);
    // Lopuksi lisään avaimet (nimet ja arvot) localStorageen.
  }
  tsekkaaMäärä();
  // Ajetaan tsekkaaMäärä()-funktio, jotta pysytään tasalla To Do -itemien määrästä. Sen takia tässä, että tallennaMuistiin() ajetaan itemeitä poistaessa ja lisätessä.
}
// lataaMuistista() -funktio lataa ja renderöi tallennaMuistiin() -funktion localStorageen tallentamat To Do -itemit otsikoineen ja kommentteineen For-loopilla.
// lataaMuistista() -funktio ajetaan sivun ladatessa eli <body onload='lataaMuistista();>'

function lataaMuistista() {
  var amount = myStorage.getItem("määrä");
  console.log(amount);
  // var amount on tallennaMuistiin()-funktion tallentama To Do -itemien määrä.
  // Alla oleva For-looppi tekee käytännössä saman kuin lisääListaan()-funktio, mutta ottaa otsikkojen ja kommenttien arvot localStorage-muistista.
  // Samalla For-looppi pitää huolen, että uudet otsikot ja kommentit saavat oikeat attribuutit kuten Class='otsikko' ja Class='kommentti'.
  for (let i = 1; i <= amount; i++) {
    var loadTitle = myStorage.getItem("otsikko" + i);
    var loadComment = myStorage.getItem("kommentti" + i);
    // loadTitle on localStorage-muistin otsikko1, otsikko2, otsikko3 jne. arvo.
    // loadComment on localStorage-muistin kommentti1, kommentti2, kommentti3 jne. arvo.
    const otsikkokenttä = document.createElement("h2");
    const otsikkoteksti = document.createTextNode(loadTitle);
    // Luodaan otsikkoa varten 'h2'-elementti ja luodaan sille TextNode arvolla loadTitle, joka ladataan localStoragesta.
    var a = document.createAttribute("class");
    a.value = "otsikko";
    otsikkokenttä.setAttributeNode(a);
    // Annetaan otsikon 'h2'-elementille attribuutti 'class' arvolla 'otsikko', jotta tallennaMuistiin()-funktio toimii.
    var x = document.createAttribute("id");
    x.value = "otsikko" + i;
    otsikkokenttä.setAttributeNode(x);
    // Annetaan otsikon 'h2'-elementille attribuutti id arvolla 'otsikko + i', jotta pysyn niistä tasalla. Ei tosin ole enää tarvetta tälle toiminnallisuudelle.
    otsikkokenttä.appendChild(otsikkoteksti);
    // Lisätään aiemmin määritelty TextNode 'h2'-elementtiin.
    const kommenttikenttä = document.createElement("p");
    const kommenttiteksti = document.createTextNode(loadComment);
    // Luodaan kommenttia varten 'p'-elementti ja TextNode arvolla loadComment, joka ladataan localStoragesta.
    var b = document.createAttribute("class");
    b.value = "kommentti";
    kommenttikenttä.setAttributeNode(b);
    // Annetaan kommentin 'p'-elementille attribuutti 'class' arvolla 'kommentti', jotta tallennaMuistiin()-funktio toimii.
    var y = document.createAttribute("id");
    y.value = "kommentti" + i;
    kommenttikenttä.setAttributeNode(y);
    // Annetaan kommentin 'p'-elementille attribuutti 'id' arvolla 'kommentti + i', jotta pysyn niistä ajan tasalla. Ei tosin enää ole tarpeellinen. Poistanko?
    kommenttikenttä.appendChild(kommenttiteksti);
    // Lisätään aiemmin määritelty TextNode 'p'-elementtiin.
    const poistokenttä = document.createElement("button");
    const poistoteksti = document.createTextNode("Poista listalta.");
    poistokenttä.appendChild(poistoteksti);
    // Luodaan 'button'-elementti ja TextNode arvolla 'Poista listalta' eli luodaan siis nappi, jolla voidaan poistaa To Do -itemeitä listalta.
    // Seuraavaksi luodaan poistonapille EventListener, joka poistaa ko. To Do -itemin HTML:stä sekä localStoragesta.
    poistokenttä.addEventListener(
      "click",
      function (e) {
        dynaaminentausta.parentNode.removeChild(dynaaminentausta);
        myStorage.clear();
        tallennaMuistiin();
      },
      false
    );
    // EventListener:n funktio aktivoituu nappia klikatessa ja poistaa ensin myöhemmin määriteltävän 'dynaaminentausta'-elementin, joka on DIV-elementti, jonka sisällä otsikko ja kommentti ovat.
    // Seuraavaksi tyhjennetään sivun localStorage-muisti hetkellisesti ja ajetaan tallennaMuistiin()-funktio uudestaan, jotta localStorage pysyy ajantasalla listan tilanteesta.
    const tausta = document.getElementById("lista");
    // tausta on jo sivulta löytyvä isompi DIV-elementti, jonka sisään jokainen To Do -item menee dynaaminentausta-nimisen DIV-elementissä.
    const dynaaminentausta = document.createElement("div");
    const tunnus = document.createAttribute("class");
    tunnus.value = "tausta";
    dynaaminentausta.setAttributeNode(tunnus);
    dynaaminentausta.style.width = "500px";
    // Luodaan 'dynaaminentausta' DIV-elementti ja määritellään sille attribuutti 'id' arvolla 'tausta + i' debugaussyistä.
    // Samalla muokataan 'dynaaminentausta' DIV-elementin tyyliä mm. width, margin ja padding.
    dynaaminentausta.appendChild(otsikkokenttä);
    dynaaminentausta.appendChild(kommenttikenttä);
    dynaaminentausta.appendChild(poistokenttä);
    // Ja lisätään otsikko, kommentti sekä poistonappi dynaamiseen taustaan.
    tausta.appendChild(dynaaminentausta);
    // Ja lopuksi lisätään dynaaminentausta sivulta valmiiksi löytyvään taustaan eli se vihdoin ilmestyy sivulle.
    tsekkaaMäärä();
    // Ajetaan tsekkaaMäärä()-funktio, jotta määrän näkee silloinkin kun sivun lataa uusiksi.
  }
}

// lisääListaan()-funktio lisää To Do -itemeitä ja ajetaan 'Lähetä'-nappia painamalla.

function lisääListaan() {
  var otsikko = document.getElementById("otsikko").value;
  var kommentti = document.getElementById("comment").value;
  // Luodaan muuttujat kenttien otsikosta ja kommentista, jos kentät eivät ole tyhjiä.
  if (otsikko == "") {
    window.alert(
      "Otsikko on pakollinen. Lisää jotain tekstiä otsikkokenttään."
    );
  } else {
    // Tarkistetaan tukeeko selain localStorage / sessionStorage -toimintoja - jos tukee niin sitten luodaan otsikko ja kommentti -muuttujista HTML-elementit.
    if (typeof Storage !== "undefined") {
      const otsikkokenttä = document.createElement("h2");
      const otsikkoteksti = document.createTextNode(otsikko);
      var a = document.createAttribute("class");
      a.value = "otsikko";
      otsikkokenttä.setAttributeNode(a);
      otsikkokenttä.appendChild(otsikkoteksti);
      // Luotiin otsikolle 'h2'-elementti sekä TextNode tekstikentän arvolla.
      // Määriteltiin otsikon 'h2'-elementille attribuutti 'class' arvolla 'otsikko', jotta localStorageen tallennus onnistuu helpommin.
      // Lisätään olennainen TextNode 'h2'-elementtiin.
      const kommenttikenttä = document.createElement("p");
      const kommenttiteksti = document.createTextNode(kommentti);
      var b = document.createAttribute("class");
      b.value = "kommentti";
      kommenttikenttä.setAttributeNode(b);
      kommenttikenttä.appendChild(kommenttiteksti);
      // Luotiin kommentille 'p'-elementti sekä TextNode tekstikentän arvolla.
      // Määriteltiin kommentin 'p'-elementille attribuutti 'class' arvolla 'kommentti', jotta localStorageen tallennus onnistuu helpommin.
      // Lisätään olennainen TextNode 'p'-elementtiin.
      const poistokenttä = document.createElement("button");
      const poistoteksti = document.createTextNode("Poista listalta.");
      poistokenttä.appendChild(poistoteksti);
      // Luodaan 'button'-elementti ja TextNode arvolla 'Poista listalta' eli luodaan siis nappi, jolla voidaan poistaa To Do -itemeitä listalta.
      // Seuraavaksi luodaan poistonapille EventListener, joka poistaa ko. To Do -itemin HTML:stä sekä localStoragesta.
      poistokenttä.addEventListener(
        "click",
        function (e) {
          dynaaminentausta.parentNode.removeChild(dynaaminentausta);
          myStorage.clear();
          tallennaMuistiin();
        },
        false
      );
      // EventListener:n funktio aktivoituu nappia klikatessa ja poistaa ensin 'dynaaminentausta'-elementin, jonka sisältä löytyvät otsikko ja kommentti.
      // Seuraavaksi tyhjennetään sivun localStorage-muisti hetkellisesti ja ajetaan tallennaMuistiin()-funktio uudestaan, jotta localStorage pysyy ajantasalla listan tilanteesta.
      const tausta = document.getElementById("lista");
      // tausta on jo sivulta löytyvä isompi DIV-elementti ID:llä 'lista', jonka sisään jokainen To Do -item menee dynaaminentausta-nimisen DIV-elementissä.
      const dynaaminentausta = document.createElement("div");
      const tunnus = document.createAttribute("class");
      tunnus.value = "tausta";
      dynaaminentausta.setAttributeNode(tunnus);
      dynaaminentausta.style.width = "500px";
      // Luodaan 'dynaaminentausta' DIV-elementti ja määritellään sille attribuutti 'id' arvolla 'tausta + i' debugaussyistä.
      // Samalla muokataan 'dynaaminentausta' DIV-elementin tyyliä mm. width, margin ja padding.
      dynaaminentausta.appendChild(otsikkokenttä);
      dynaaminentausta.appendChild(kommenttikenttä);
      dynaaminentausta.appendChild(poistokenttä);
      // Lisätään otsikko, kommentti sekä poistonappi dynaamiseen taustaan.
      tausta.appendChild(dynaaminentausta);
      // Lisätään dynaaminentausta sivulta löytyvään taustaan, jotta To Do -item ilmestyy sivulle.
      tallennaMuistiin();
      // Ajetaan tallennaMuistiin()-funktio, jotta uusi To Do -item pääsee localStorageen.
    } else {
      window.alert("Sorry, your browser does not support web storage...");
      // Jos selain ei tue localStorage / sessionStorage niin sivusto hälyttää käyttäjää eikä käyttö onnistu.
    }
  }
}
