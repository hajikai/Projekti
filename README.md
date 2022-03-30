# Projekti
 Web-sovellusten kehittäminen Javascriptillä TO00BL10-3014 -kurssin ensimmäinen projekti, joka toimii To Do -listana DOM-metodeilla.

To Do -lista toimii niin, että saat lisätä sinne haluamasi määrän 'itemeitä' eli otsikoita (tai otsikko + kommentti kombinaatioita), joita voit merkitä tehdyksksi 'Merkitse tehdyksi' -nappia painamalla. Tämä yliviivaa item:n otsikon, piilottaa kommentin (jos sitä on) ja muuttaa 'Merkitse tehdyksi' -napin 'Palauta'-napiksi, jolla saat 'item':n takaisin edelliseen tilaan. 

To Do -lista pitää myös lukua siitä kuinka monta itemiä listassa on ja kuinka moni niistä on suoritettu - tämä informaatio näkyy reaaliajassa ennen lomaketta olevassa <p>-elementissä.
 
To Do -lista käyttää localStorage:a muistaakseen listaan laittamasi item:t sekä niiden tilat.
