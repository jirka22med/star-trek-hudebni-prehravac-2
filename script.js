// Upravená JavaScript část pro správné zvýraznění skladby v playlistu
// Nejprve definujeme globální populatePlaylist, aby byla dostupná odkudkoli
window.populatePlaylist = function() {
  console.log("Funkce populatePlaylist ještě není inicializována");
};

document.addEventListener('DOMContentLoaded', function() {
  // Základní nastavení
  const audioPlayer = document.getElementById('audioPlayer');
  const audioSource = document.getElementById('audioSource');
  const trackTitle = document.getElementById('trackTitle');
  const progressBar = document.getElementById('progress-bar');
  const currentTimeDisplay = document.getElementById('currentTime');
  const durationDisplay = document.getElementById('duration');
  const playButton = document.getElementById('play-button');
  const pauseButton = document.getElementById('pause-button');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const loopButton = document.getElementById('loop-button');
  const shuffleButton = document.getElementById('shuffle-button');
  const resetButton = document.getElementById('reset-button');
  const fullscreenToggle = document.getElementById('fullscreen-toggle');
  const toggleInfoButton = document.getElementById('toggle-info-button');
  const reloadButton = document.getElementById('reload-button');
  const togglePlaylistButton = document.getElementById('toggle-playlist-button');
  const playlist = document.getElementById('playlist');
  const popisky = document.getElementById('popisky');
  const volumeSlider = document.getElementById('volume-slider');
  const volumeValue = document.getElementById('volume-value');
  const muteButton = document.getElementById('mute-button');
  document.getElementById('popisky').style.display = 'none';
  document.querySelectorAll('.favorite-button')  
  // Načtení oblíbených skladeb z localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
 // Hodiny a datum
  function updateClock() {
    const now = new Date();
    document.querySelector('.hours').textContent = String(now.getHours()).padStart(2, '0');
    document.querySelector('.minutes').textContent = String(now.getMinutes()).padStart(2, '0');
    document.querySelector('.seconds').textContent = String(now.getSeconds()).padStart(2, '0');
    
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('cs-CZ', options);
  }
  
  setInterval(updateClock, 1000);
  updateClock();
  
  // Pro hodnotu slideru 0.5 (50%):
  // Math.pow(0.5, 1.0) = 0.5    // 50% hlasitosti
  // Math.pow(0.5, 2.0) = 0.25   // 25% hlasitosti
  // Math.pow(0.5, 3.0) = 0.125  // 12.5% hlasitosti
  // Math.pow(0.5, 4.0) = 0.0625 // 6.25% hlasitosti
    
    
  // Nastavení výchozí hlasitosti na 10 % při načtení stránky
  let previousVolume = 0.1;
  audioPlayer.volume = 0.1;
  volumeSlider.value = 0.1;

  // Helper funkce pro logaritmickou konverzi hodnoty slideru na hlasitost
  function logarithmicVolume(value) {
    // Exponenciální křivka pro plynulejší nárůst hlasitosti
    return Math.pow(value, 3.0);
  }

  // Událost pro ovládání hlasitosti pomocí slideru
  volumeSlider.addEventListener('input', (e) => {
    const sliderValue = parseFloat(e.target.value);
    // Použití logaritmické konverze pro plynulejší změnu hlasitosti
    audioPlayer.volume = logarithmicVolume(sliderValue);
    updateVolumeIcon();

    // Aktualizace číselného ukazatele
    const volumePercentage = Math.round(sliderValue * 100); // Převod na % (0 až 100)
    volumeValue.textContent = volumePercentage; // Zobrazení hodnoty
  });

  // Ovládání hlasitosti pomocí tlačítka mute
  muteButton.addEventListener('click', () => {
    if (audioPlayer.volume > 0) {  // Změněno z 0.01 na 0
      previousVolume = volumeSlider.value;
      audioPlayer.volume = 0;  // Nastaveno na 0
      volumeSlider.value = 0;  // Nastaveno na 0
    } else {
      volumeSlider.value = previousVolume;
      audioPlayer.volume = logarithmicVolume(previousVolume);
    }
    updateVolumeIcon();
  });


  // Helper funkce pro aktualizaci ikonky hlasitosti
  function updateVolumeIcon() {
    const volume = audioPlayer.volume;
    if (volume === 0) {
      muteButton.textContent = '🔇';
    } else if (volume <= 0.2) {
      muteButton.textContent = '🔈';
    } else if (volume <= 0.4) {
      muteButton.textContent = '🎶';
    } else if (volume <= 0.6) {
      muteButton.textContent = '🎵';
    } else if (volume < 0.9) {
      muteButton.textContent = '📢';
    } else {
      muteButton.textContent = '🔊';
    }
  }
    
  // Seznam skladeb - zde přidejte své vlastní skladby
  window.tracks =  tracks = [
    { src: 'https://www.dropbox.com/scl/fi/x0z9ddkz3zfqrvcnb6nr8/Odysea-Kapit-na-Ar-era-1.mp3?rlkey=mlav41qi6qe5ukss3q4qdd8f6&st=44y26ef2&dl=1', title: 'Odysea-Kapitána-Arčra' },
{ src: 'https://www.dropbox.com/scl/fi/hl4pp862wvlgd3kj2uixj/Hv-zdn-lo-sn.mp3?rlkey=uxfr6emv2h70v9blgmoily2ug&st=h40ynmje&dl=1', title: 'Hvězdná-Loď-snů' },
{ src: 'https://www.dropbox.com/scl/fi/w6jjzo8avh3rnd70gyva6/Stanice-Hlubok-Vesm-r-9.mp3?rlkey=sy23k7qogrbott7gmj5q7db2v&st=lcr4ygmh&dl=1', title: 'Stanice-Hluboký-Vesmír-9' },
           

{ src: "https://www.dropbox.com/scl/fi/qs7h9fotngaf8dc5bmvf2/Vesm-rn-Odyssea-1.mp3?rlkey=e38vuocv7kuieiccmf5oz8562&st=ju9xxk8e&dl=1", title: "Vesmírná Odisea 1" },
{ src: "https://www.dropbox.com/scl/fi/2v0ez9ynqj9u3tbbs2kn4/ARAKAIN-DYMYTRY-t-sv-j-sen.mp3?rlkey=begwlnhg48um443rm64jaj8k0&st=g7r3sb52&dl=1", title: "Arakain dymytry žít svuj sen" },
{ src: "https://www.dropbox.com/scl/fi/2m0xferijus0v4lbpdj2k/Bl-en-k-Hv-zd-m-1.mp3?rlkey=7h7sdbaph6qpi4tcia94vybvq&st=b4xy2s6z&dl=1", title: "Blížení ke hvězdám" },
{ src: "https://www.dropbox.com/scl/fi/2pjvhjg0okjl2vdbxjn22/erv-D-ra-1.mp3?rlkey=r4lwn5zfy6y4m0opkkgwde0g0&st=qyl44r63&dl=1", title: "Červí díra" },
{ src: 'https://www.dropbox.com/scl/fi/7qsfzey00g0g05xe7k0gw/Kapit-n-Picard.mp3?rlkey=e08fflsut3k99tur8ew0xcvjj&st=naaxt96i&dl=1', title: 'Kapitán-Pikard' },            
{ src: "https://www.dropbox.com/scl/fi/1sany2hf4pw97y7ikx6kr/Kapit-n-Picard-2.mp3?rlkey=oov5g18lfhoq9tnvnbpd4au1l&st=vo0xcyj4&dl=1", title: "Kapitán Pikard 2" },
{ src: "https://www.dropbox.com/scl/fi/iep5gi3gfgkw41dn6j2b9/Kapit-n-Riker.mp3?rlkey=sehzr8lek8c28jyeq4ayjjfn5&st=5yrju1im&dl=1", title: "Kapitán Riker" },
{ src: "https://www.dropbox.com/scl/fi/pi8vjvwj02c1zj4nuw149/Nad-je-v-Temn-ch-asech.mp3?rlkey=0xiycum1ji18dok9rh1mmqhwo&st=4abhd0x2&dl=1", title: "Naděje v temních časech" },
{ src: "https://www.dropbox.com/scl/fi/ccckqqvzifs8b1ysruiq1/Odv-n-Pos-dka.mp3?rlkey=bnfy7ym2m0rao2374mw0g4xhc&st=22fenwvk&dl=1", title: "Odvážná posádka" },
{ src: "https://www.dropbox.com/scl/fi/x0z9ddkz3zfqrvcnb6nr8/Odysea-Kapit-na-Ar-era-1.mp3?rlkey=mlav41qi6qe5ukss3q4qdd8f6&st=ymr1hpfw&dl=1", title: "Odisea Kapitána Arčra 1" },
{ src: "https://www.dropbox.com/scl/fi/27zunc86ujirpxj1hvhxc/Pos-dka-Enterprise-D.mp3?rlkey=ge98t19y7y1nqtec0jlq9w0kr&st=qozanohm&dl=1", title: "Posádka Enterprise-D" },
{ src: "https://www.dropbox.com/scl/fi/9xxqrcosag1w38qlwamft/Stanice-Hlubok-Vesm-r-9-2.mp3?rlkey=yvrxshbsg1fw4ulfgc9awyaqn&st=sussqmc2&dl=1", title: "Stanice Hluboký Vesmír 9 ,2" },
{ src: "https://www.dropbox.com/scl/fi/j14wk1i4gj15s5w2jn5l4/Star-Trek-Enterprise-Theme-Extended-Version-.mpg.mp3?rlkey=bfykx9urgc0m58lshd4u6y0g8&st=undzz81o&dl=1", title: "Star Trek Enterprise NX-01 Intro" },
{ src: "https://www.dropbox.com/scl/fi/oazfxyf28omnabs6wsy09/Star-Trek-Voyager-4k-HD-Intro-NeonVisual.mp3?rlkey=cj5o6lhite277q9f8oeeixnlc&st=7bl423dk&dl=1", title: "Star Trek Voyager Intro" },
{ src: "https://www.dropbox.com/scl/fi/beossqqw6rquqfzghfvbf/Star-Trek_-Discovery-Main-Theme.mp3?rlkey=oba8a483o61glsm3b62lasy2p&st=59uxhh2u&dl=1", title: "Star Trek Discovery Intro" },
{ src: "https://www.dropbox.com/scl/fi/yi1w5b9mwuwwl4gsrg01l/Star-Trek_-The-Next-Generation-Theme-EPIC-VERSION.mp3?rlkey=7wsegbwm0f2zqrdv4lstx3hbg&st=j5z0t7db&dl=1", title: "Star Trek Nová Generace Intro" },
{ src: "https://www.dropbox.com/scl/fi/61uxo0jemsb84iyg6yxw3/Star-Trek_-Deep-Space-Nine-4K-HD-Intro-NeonVisual.mp3?rlkey=ltd4xwfosro3xcu08go2aeiza&st=tatj06i2&dl=1", title: "Star Trek Deep Space Nine intro" },
{ src: "https://www.dropbox.com/scl/fi/wlqagj87943cxdkcupbvl/Vesm-rn-Odyssea-2.mp3?rlkey=pneeuvj35yf4ucvey572b98zm&st=tpuzyc6b&dl=1", title: "Vesmírná Odisea 2" },
{ src: "https://www.dropbox.com/scl/fi/z6cga3177ej1yjobq0zip/EPICK-OUTRO-STAR-TREK-STYLE-v.2.mp3?rlkey=9u3v2buyfavfc237l11in5iff&st=drotyft0&dl=1", title: "Epické Outro-Star Trek Style v.2" },
{ src: "https://www.dropbox.com/scl/fi/6e24v3a9h6eer8vsiwxnj/EPICK-OUTRO-STAR-TREK-STYLE-v.1.mp3?rlkey=vylstj6deofmapytc4tfnx8kg&st=epol3xel&dl=1", title: "Epické Outro-Star Trek Style v.1" }, 
{ src: "https://www.dropbox.com/scl/fi/zfsubjnfmaj4wfjd6kqmu/Star-tek-p-sni-ka-pos-dek-1.mp3?rlkey=a37s46ylfidynhwd5m53ds4im&st=ectq5xua&dl=1", title: "Star Trek Písnička posádek 1" },
{ src: "https://www.dropbox.com/scl/fi/ts7rsuztzji2w2s4ylrj3/Star-tek-p-sni-ka-pos-dek-1-2.mp3?rlkey=c3qoi52mwjq4igkzppl0thvbs&st=keimo1r4&dl=1", title: "Star Trek Písnička posádek 2" },
{ src: "https://www.dropbox.com/scl/fi/wcx0yh5vqh6da7re7topd/star-terk-p-sni-ka-3-2.mp3?rlkey=v86ltne45qv7sx8muc71hwrk9&st=whcmp6r8&dl=1", title: "Star Trek Písnička posádek 3" },
{ src: "https://www.dropbox.com/scl/fi/rn7b6bvpsnfut6wqewxjz/Star-tek-p-sni-ka-pos-dek-4.mp3?rlkey=dryx6brexafix5cj921otvf5k&st=j7xkxd7m&dl=1", title: "Star Trek Písnička posádek 4" },
{ src: "https://www.dropbox.com/scl/fi/yfehbrin7c3vi3tvnc7kc/Star-tek-p-sni-ka-pos-dek-7.mp3?rlkey=lajmr19vwbkf78gy1v265kf9u&st=gedx6g9v&dl=1", title: "Star Trek Písnička posádek 7" },
{ src: "https://www.dropbox.com/scl/fi/k380vwma00v0c29hidtqi/Star-tek-p-sni-ka-pos-dek-9.mp3?rlkey=h7y8brihtr831easrdsh9xkpi&st=wp3esqld&dl=1", title: "Star Trek Písnička posádek 9" },
{ src: "https://www.dropbox.com/scl/fi/mr6erkk5n84k57qcszzmx/Star-tek-p-sni-ka-pos-dek-10.mp3?rlkey=wmslnntr00rt0vabgfv2wzxng&st=5m9pnouh&dl=1", title: "Star Trek Písnička posádek 10" },
{ src: "https://www.dropbox.com/scl/fi/bfxlnanu7jm5gisn04j5g/stat-tek-pisnicka-2.mp3?rlkey=0d6e0iucvfxocvm386uqox8gq&st=ktfvgpba&dl=1", title: "Star Trek Písnička 2" },            
{ src: "https://www.dropbox.com/scl/fi/hexg5kal8hdbuhv8f39ez/star-terk-p-sni-ka-3.mp3?rlkey=rk0k2kkvh06xcqzzm9v1c1bmm&st=4icoon1g&dl=1", title: "Star Trek Písnička 3" },
{ src: "https://www.dropbox.com/scl/fi/ulcq4mit0ucamvl4tv0c1/star-trek-v-echni-serie.mp3?rlkey=c3mc95v1uft1amf0pci5i6o54&st=dqqdunyb&dl=1", title: "Star Trek všechny serie" },  
{ src: "https://www.dropbox.com/scl/fi/gt8lcls71trqsxi2fch40/Stanice-Hlubok-Vesm-r-9.2.mp3?rlkey=ao55ik01svoqx6kr737einpv6&st=ab33d1bx&dl=1 ", title: "Stacion deep space nine " },
{ src: "https://www.dropbox.com/scl/fi/5t3lw3e7z3ktkvyia9z91/Star-trek-Klingoni.mp3?rlkey=hy7i5e3z8e9hty33jn2yb4qym&st=g3av6e0t&dl=1", title: "Star Trek klingoni v.1" },
{ src: "https://www.dropbox.com/scl/fi/dswgdwr4ha5zwobzpi65o/Star-trek-Klingoni-2.mp3?rlkey=y3bknrocic66fysdbyg6rypc9&st=dkgis1hg&dl=1", title: "Star Trek klingoni v.2 " },
{ src: "https://www.dropbox.com/scl/fi/eexwqik55aafcdbzfx3kz/Klingonsk-opera-star-trek-1.mp3?rlkey=yfkld3uizzvrcdeeexc2p04xh&st=tmo3n2so&dl=1", title: "Klingonská opera v.1" },
{ src: "https://www.dropbox.com/scl/fi/iddvpiwebeqmhee688jeb/Klingonsk-opera-star-trek-2.mp3?rlkey=wf7hratdanpryqydwdr5htwjv&st=xdu1p96r&dl=1", title: "Klingonská opera v.2" },            
            

{ src: "https://www.dropbox.com/scl/fi/huywy0fcr1a2kebh79t5w/P-se-o-Jirkovy.-v2.mp3?rlkey=lft56ljrs0bscchtzpv8br3r5&st=ib3q970i&dl=1", title: "Písnička O jirkovy v.2" },
{ src: "https://www.dropbox.com/scl/fi/rlvrljgsfoyxj0z8yiavd/P-se-o-Jirkovy..mp3?rlkey=t9kypjev5gpryz58u0tj8d053&st=ui34m5ot&dl=1", title: "Písnička o jirkovy " },
{ src: "https://www.dropbox.com/scl/fi/ecbgf4bv0nar9zbbsonz5/P-se-o-Jirkovy..wav?rlkey=8c8hxobvfxfebde24u0u9bmgw&st=j7a8nugp&dl=1", title: "Píseň o Jirkovy" },

{ src: "https://www.dropbox.com/scl/fi/rgaq0j1h90p4v8m1rju7l/Jirka-je-Hrdina.mp3?rlkey=vnl5k7fmaiqe81x5022r01s9v&st=lsi2d9uy&dl=1", title: "Jirka je hrdina" },
{ src: "https://www.dropbox.com/scl/fi/sgkz57znp4ef645ud75kv/Jirka-je-Tlust-Hovado.mp3?rlkey=qw92ixc81txqlw0b0yhp1yjjm&st=wdxjc2l8&dl=1", title: "Jirka je Tlustý Hovado" },
{ src: "https://www.dropbox.com/scl/fi/o1upftixk1mp1q0bg6ies/Jirka-je-Tlust.mp3?rlkey=mnzxobvsgeavpj70shih9bp10&st=egs2d0q7&dl=1", title: "Jirka je tlustý" },
{ src: "https://www.dropbox.com/scl/fi/ya7xcqy3jb4q7y9s46d3t/Jirkovi-se-l-b-kluci.mp3?rlkey=59vcjfkb4s3oyqaw0v5k2x9ut&st=s4iojpd7&dl=1", title: "Jirkovy se líbí kluci" },
{ src: "https://www.dropbox.com/scl/fi/6w0iv0mdpytdfjwfd01m1/Jirk-v-futuristick-kviz-1.mp3?rlkey=7wot60ljvyhy0gday938jg6ef&st=62159rxb&dl=1", title: "Jirkův futuristický kvíz 1" },
{ src: "https://www.dropbox.com/scl/fi/a0bp5g48zw0wvcsrxk9p8/Jirk-v-futuristick-kv-z-1.mp3?rlkey=er6x232s8dctei47asb77cbwu&st=yyvedd4e&dl=1", title: "Jirkův futuristický kvíz 2" },
{ src: "https://www.dropbox.com/scl/fi/vmmr22osjuabzk9kexbru/Jirk-v-Futuristick-Kv-z-3.mp3?rlkey=oj7mvctsodgsi24xmzidsdqv9&st=2z1x6hhl&dl=1", title: "Jirkův futuristický kviz 3" },
{ src: "https://www.dropbox.com/scl/fi/xthbu4a9jvli6wkfavpen/Jirk-v-Futuristick-Kv-z-top-1.mp3?rlkey=rpg404uzibp95vgr9pq3segqo&st=bnax6wi7&dl=1", title: "Jirkův futuristický kvíz top-1" },
{ src: "https://www.dropbox.com/scl/fi/8tar6rg1kjb5329epj8em/Jirk-v-futuristick-kviz.mp3?rlkey=kv7xabnccq5xscpwk7rbhfjni&st=tm8s11ol&dl=1", title: "Jirkův futuristický kviz 4" },            
{ src: "https://www.dropbox.com/scl/fi/hxi7v9sxf0j6xb07atz9l/Cesta-za-S-rie-v.1.mp3?rlkey=91bmfoh9yt1fij47hre2nkh9a&st=x3z5ohbm&dl=1 ",title: "Cesta za serie v.1 " },
{ src: "https://www.dropbox.com/scl/fi/ruz2vwsifxe52g3ndzaku/Journey-Through-i-kov-v.1.mp3?rlkey=fvbbr3ezzjb1i0oxapt15gfum&st=1dmj8x88&dl=1 ", title: "Journey Through Žižkov v.1" },
{ src: "https://www.dropbox.com/scl/fi/5g1rg0rh082hoy6eukbgl/Journey-Through-i-kov-v.2.mp3?rlkey=f83d8wjfv8fshcdasq225awjq&st=5tw5ppz8&dl=1", title: "Journey Through Žižkov v.2" },
 
{ src: "https://www.dropbox.com/scl/fi/v6me6mzartct01ndzi722/jirka-a-ondra-jsou-nejlep-br-chov-Vysok-kvalita.mp3?rlkey=urg0junbwcdc6paqtutmttmpl&st=07wnlf6f&dl=1", title: "Jirka a ondra jsou nejlepší bráchové org" },
            
{ src: "https://www.dropbox.com/scl/fi/cj69d5dhy6v7f9lavu8qw/Jirka-a-Ondra-jsou-nejlep-brachov-V.1.mp3?rlkey=vkjfy9gxpo38f383zlqdf2yo7&st=lsycsnot&dl=1",title: "Jirka a Ondra jsou nejlepší bráchové dico verze V.01 " },              
              
{ src: "https://www.dropbox.com/scl/fi/jcmqbtfvldndzcopr5ugy/Jirka-a-Ondra-jsou-nejlep-brachov-V.4.mp3?rlkey=egz3d4c243b5vlmui3awtg03w&st=op1toyux&dl=1",title: "Jirka a Ondra jsou nejlepší bráchové dico verze V.02 " },
            
{ src: "https://www.dropbox.com/scl/fi/oo8fjj7jte1et8turk8hv/v-let-v-Praze-Ondra-a-Jirka-v.5.mp3?rlkey=ueuy8n3xwc1doc142bl5kqtdd&st=6mlikti6&dl=1", title: "Výlet Do Prahy Ondra A Jirka v.3" },            
            
{ src: "https://www.dropbox.com/scl/fi/j1ua4fykiw6ozka8t7iv4/p-sn-o-bratrsk-m-p-telstv-4-opr.mp3?rlkey=xuyk9u3ir8fe8zq7g259ea377&st=udj6qujw&dl=1", title: "písně o bratrském přátelství v.4 Top-1/2" },             
            
{ src: "https://www.dropbox.com/scl/fi/73u5c3whfsb46bhli2kvk/utah-a-jeho-bratr-1.mp3?rlkey=433d0f5su6h9azh937khz5qn7&st=36pslteq&dl=1", title: "Útah a jeho bratr 1" },
{ src: "https://www.dropbox.com/scl/fi/ch85m3ruuk483n0av2alt/utah-a-jeho-bratr2-2.mp3?rlkey=lin5be4rgrc7zzq3j30h2n2r7&st=g54jel4m&dl=1", title: "Útah a jeho bratr 2" },
{ src: "https://www.dropbox.com/scl/fi/pibbsiihpyo1v2sv1127l/utah-a-jeho-bratr2-5.mp3?rlkey=5wqi21ex128gd3gzrbgv6pmd8&st=36wb7tm4&dl=1", title: "Útah a jeho bratr 2-5" },
{ src: "https://www.dropbox.com/scl/fi/rr1j0huzew4w71su1t0vt/No-n-St-ny-4.mp3?rlkey=k7vwqwyt10a7fyqk85et8hiwv&st=k1oygg30&dl=1", title: "Noční stíny 4" },
{ src: "https://www.dropbox.com/scl/fi/rr1j0huzew4w71su1t0vt/No-n-St-ny-4.mp3?rlkey=k7vwqwyt10a7fyqk85et8hiwv&st=k1oygg30&dl=1", title: "Bod Zlomu 3" },
{ src: "https://www.dropbox.com/scl/fi/cvynixepb9sr5p8od1c6k/No-n-St-ny-2.mp3?rlkey=wbg54xwvsvcpgwnqw71wq70of&st=860jjrig&dl=1", title: "Noční Stíny 2" },
{ src: "https://www.dropbox.com/scl/fi/zyw6pqghlsxzr6jt0wzv0/No-n-St-ny-3.wav?rlkey=5sav7md3gem737dsu1o2pnsm8&st=sbbvqicx&dl=1", title: "Noční stíny 3" },            
{ src: "https://www.dropbox.com/scl/fi/cvynixepb9sr5p8od1c6k/No-n-St-ny-2.mp3?rlkey=wbg54xwvsvcpgwnqw71wq70of&st=ygualcbn&dl=1", title: "Noční Stíny 5" },            
{ src: "https://www.dropbox.com/scl/fi/8u2jqzqt7yhtzksc5qi6j/Bolivia-con-Amor.mp3?rlkey=rurkepmch68nrckh502js2g5q&st=daidw0mp&dl=1 ", title: "56--Bolivia con Amor " },
{ src: "https://www.dropbox.com/scl/fi/d0usu2bwz053yl2lc3ago/Kr-l-Agraelus.mp3?rlkey=kl55dxlrmh8n91cselr6rbo8k&st=m9btx6wq&dl=1 ", title: "Král Agrealus " },
            

            
{ src: "https://www.dropbox.com/scl/fi/bcticba8dh56gei1d4ucg/mohambi-v.1.mp3?rlkey=yz62mjo15sa1y0e890ac6ncwa&st=xqwkqd28&dl=1 ", title: "Mohambi v.1 " },
{ src: "https://www.dropbox.com/scl/fi/b9a77dvf60w71i26pmhhz/mohambi-v.2.mp3?rlkey=ml6q2gf0hhdzgkjfyoxzh2ryi&st=4gr7nrw5&dl=1 ", title: "Mohambi v.2 " },
{ src: "https://www.dropbox.com/scl/fi/bqlmlojk6r022kdn8ix08/mohambi-v.3.mp3?rlkey=r6lidbh3nnroplxgfhu9wzpka&st=7ymwtysh&dl=1 ", title: "Mohambi v.3 " },
{ src: "https://www.dropbox.com/scl/fi/x82vbvj5bij83yw6ib4vf/mohambi-v.4.mp3?rlkey=v6wpk51scml9y7si2jltkq2eu&st=kcazz62r&dl=1 ", title: "mohambi v.4 " },
{ src: "https://www.dropbox.com/scl/fi/6f0gxj9wavuiu3w3mio2a/mohambi-v.5.mp3?rlkey=t2neoa68q98w7xdutmwf71a8c&st=ri0gsxup&dl=1 ", title: "mohambi v.5 " },
{ src: "https://www.dropbox.com/scl/fi/xc8xizr9qyjbns4jbkkbv/mohambi-v.6.mp3?rlkey=d3bs0knmmz8m4wnyyz3mzzem3&st=6pzfehir&dl=1 ", title: "mohambi v.6 " },
{ src: "https://www.dropbox.com/scl/fi/uemvzfu49av2ibv2czypl/mohambi-v.7.mp3?rlkey=m7u6reo3sw804z89s8egli01w&st=cf2lhsv1&dl=1 ", title: "mohambi v.7 " },
{ src: "https://www.dropbox.com/scl/fi/jsplu6hyq94deiswqp28z/mohambi-v.8.mp3?rlkey=8vlw6p91t74e64hbdcp3s5r1c&st=dyssttv0&dl=1 ", title: "mohambi v.8 " },



{ src: "https://www.dropbox.com/scl/fi/zq7jbt5qvo7c87juxqzod/Feder-ln-stav-kret-n-2-v.1.mp3?rlkey=sizk7lqag231gqyswqxlsbobs&st=5lry8g19&dl=1", title: "Federální ústav kreténů v.1 " },
{ src: "https://www.dropbox.com/scl/fi/320d9o45lo277jiwldg74/Feder-ln-stav-kret-n-2-v.2.mp3?rlkey=ehsiw8hvj4o4hn5r2e537sx0a&st=jwmq1llp&dl=1 ", title: "Federální ústav kreténů v.2 " },
{ src: "https://www.dropbox.com/scl/fi/vnv3xrvzzzgkw4lnuqkmb/Bacha-na-v-ezn-lky-Crazy-SkaMix-federaln-ustav-ktretenu-v1.mp3?rlkey=kskxippifxjdafznmrwyf7n6x&st=84384d5o&dl=1 ", title: "Federalní ustav kreténu vv.3" },
{ src: "https://www.dropbox.com/scl/fi/0ndx32iumdq89nwc53ei4/Bacha-na-v-ezn-lky-Crazy-SkaMix-federalni-ustav-ktretenu-v2.mp3?rlkey=rgaav98hnd6frs5h1amva8i5h&st=grv21l7z&dl=1 ", title: "Federální ústav kreténu vv.4 " },
{ src: "https://www.dropbox.com/scl/fi/fsw3sltst7qgl9eig8sx7/I-only-ate-3-cheeseburgers-federalni-ustav-kretenu-v1.mp3?rlkey=bvh871fajfaxz8l3wae1t58pe&st=9sgywky9&dl=1 ", title: "Federalní ustav kreténu vvv.5 " },
{ src: "https://www.dropbox.com/scl/fi/x20q4bt8p2ffa6h7sd2w7/I-only-ate-3-cheeseburgers-federalni-ustav-kretenu-v2.mp3?rlkey=9rs85h7hirybtjzf5movpk3hu&st=alu7p5en&dl=1 ", title: "Federální ústav kreténů vvv.6 " },

            
{ src: "https://www.dropbox.com/scl/fi/ysax641nd7abt6cgs11jd/kohout-v.1.mp3?rlkey=oyjq4zwqz30z47lkj99drvq1l&st=6wq0aodd&dl=1 ", title: "kohout v.1 " },            
{ src: "https://www.dropbox.com/scl/fi/1iwyhbpb7fhgcegrehnme/mix-kohout-V.1.mp3?rlkey=wc7adcp832pqw7k6l3mh2nccn&st=25sgnb5q&dl=1 ", title: "Mix kohout V.01" },
{ src: "https://www.dropbox.com/scl/fi/6laqe8d8qfza22p2dslyo/mix-kohout-V.2.mp3?rlkey=t0604v56k83b4el04peuqafle&st=12o5jltm&dl=1", title: "Mix kohout V.02" },
{ src: "https://www.dropbox.com/scl/fi/8ol14d205geanvxq9akf9/mix-kohout-V.3.mp3?rlkey=e5zr0alxkkr6a2krecad2r9f5&st=2s6y36jp&dl=1 ", title: "Mix kohout V.03" },
{ src: "https://www.dropbox.com/scl/fi/ecjw4tz5gcn8smcofutiz/mix-kohout-V.4.mp3?rlkey=3hp5vl5725eqzlqkrj1n5r1r7&st=2wp2rk7k&dl=1 ", title: "Mix kohout V.04" },
{ src: "https://www.dropbox.com/scl/fi/4c3safd6877tyf6zuosjr/mix-kohout-V-5.mp3?rlkey=iwnqphuf9ctsepm47xsdthhzu&st=xult9x0g&dl=1 ", title: "Mix kohout V.05" },
{ src: "https://www.dropbox.com/scl/fi/jcj6ryqqyuonpxrymt8lg/mix-kohout-V.6.mp3?rlkey=ojc1cbn8wnccqy74tx71cj6ds&st=jugq6nqk&dl=1 ", title: "Mix kohout V.06" },
{ src: "https://www.dropbox.com/scl/fi/ayrvc3uupjv5lx92g4gyz/mix-kohout-V.7.mp3?rlkey=ljd67k1trd0o7vkmo6epir4iu&st=qz1ueob9&dl=1 ", title: "Mix kohout V.07" },
{ src: "https://www.dropbox.com/scl/fi/zwrj184pqcemowfua3w1u/mix-kohout-V.8.mp3?rlkey=ez41k47e59iyo6m31aughaqej&st=wt767u2t&dl=1 ", title: "Mix kohout V.08" },
{ src: "https://www.dropbox.com/scl/fi/g279fbyosxb6x01witj7f/mix-kohout-V.9.mp3?rlkey=fgamtlpxa8ndvfff492w91940&st=etozw2uf&dl=1 ", title: "Mix kohout V.09" },
{ src: "https://www.dropbox.com/scl/fi/91g27sj33psivnm0lzr8k/mix-kohout-V.10.mp3?rlkey=f1223z2o2h3u8akdouv941jzy&st=ratiibn9&dl=1 ", title: "Mix kohout V.10" },
{ src: "https://www.dropbox.com/scl/fi/nfl1l0glqnt8b60qbcje1/kohout-v.3-military-song-ritmick-melodic-military.mp3?rlkey=wh5ukr8e2xb1vzkwuwy3zy18m&st=hl4zeaji&dl=1", title: "kohout v.3 [military song ritmick melodic military]" },           
{ src: "https://www.dropbox.com/scl/fi/kzqtqh7dpzv57i7dyi6cr/Hv-zdy-a-Plameny-org.mp3?rlkey=tgxrfqz52058ilcqcxtf9avhl&st=2kt1169z&dl=1", title: "Hvězdy a Plameny original" },       
{ src: "https://www.dropbox.com/scl/fi/z54l1sn2yrci97xeg3e6e/HV-ZDN-PLAMENY-DICO-VERZE-V.1.mp3?rlkey=jyfdzy0ompb8ks4ov0tzoniol&st=4162nuh3&dl=1",title: "HVĚZDNÉ PLAMENY DICO VERZE   V.01" }, 
{ src: "https://www.dropbox.com/scl/fi/d11ro7p6pmrcjkpjdm0p5/HV-ZDN-PLAMENY-DICO-VERZE-V.2.mp3?rlkey=oi2wucut7b30dal2t3efmp67y&st=dh50smjg&dl=1",title: "HVĚZDNÉ PLAMENY DICO VERZE   V.02" },
{ src: "https://www.dropbox.com/scl/fi/861lxplmb2ytlugi7xu8u/HV-ZDN-PLAMENY-DICO-VERZE-V.4.mp3?rlkey=t9orz8yxtl95k7mycx55bytym&st=pu6x5h87&dl=1",title: "HVĚZDNÉ PLAMENY DICO VERZE   V.03" },
{ src: "https://www.dropbox.com/scl/fi/zusevzhfh9ofqjvtznrx3/HV-ZDN-PLAMENY-DICO-VERZE-V.13.mp3?rlkey=we8kdvae7vv0lyqm2uvlfppo3&st=pxkxgugg&dl=1",title: "HVĚZDNÉ PLAMENY DICO VERZE  V.04" },
{ src: "https://www.dropbox.com/scl/fi/5k8fby7gcb2j08qvgj6xt/HV-ZDN-PLAMENY-DICO-VERZE-V.24.mp3?rlkey=9dqweybqtbip1px0vp1zresmq&st=w8fxvr1v&dl=1",title: "HVĚZDNÉ PLAMENY DICO VERZE  V.05" },
{ src: "https://www.dropbox.com/scl/fi/hv5nr3q9nnye5p9j1wmcs/HV-ZDN-PLAMENY-DICO-VERZE-V.25.mp3?rlkey=pqgbm75bcrwbwf3j9zcj8bdtd&st=6u9rswbe&dl=1",title: "HVĚZDNÉ PLAMENY DICO VERZE  V.06" },
{ src: "https://www.dropbox.com/scl/fi/hnwu6kowls4goqizray8q/HV-ZDN-PLAMENY-DICO-VERZE-V.26.mp3?rlkey=bz9s4x4ujkf9oxqzeki3dzl68&st=uvjo2qrw&dl=1",title: "HVĚZDNÉ PLAMENY DICO VERZE  V.07" },  

                                                                                      
{ src: "https://www.dropbox.com/scl/fi/0pjs6006vyxnneol5kmb0/velk-oslavy-ds9-V.1-Top2.mp3?rlkey=gzlayqu1qg5j63eucf8qy1y02&st=0upduvwu&dl=1",title: "Velké Oslaby DS9 V.1 TOP 2" },
{ src: "https://www.dropbox.com/scl/fi/o2s8ggtekzmw9me861l7h/velk-oslavy-ds9-V.2.mp3?rlkey=ov1f8z1dh6oiz3iyzeotue7jg&st=5zps1rhx&dl=1",title: "Velké Oslaby DS9 V.2" },
{ src: "https://www.dropbox.com/scl/fi/6zw923x4tanvkjsczmxbe/velk-oslavy-ds9-V.3.mp3?rlkey=w51y716l9gr92z14y9xi8ai07&st=1nud4ku3&dl=1",title: "Velké Oslaby DS9 V.3" },
{ src: "https://www.dropbox.com/scl/fi/3ehelfnqs0owq4azk8ztu/velk-oslavy-ds9-V.4.mp3?rlkey=76rkn6lkqqrtm0l14xweg4mpo&st=18w9o0oa&dl=1",title: "Velké Oslaby DS9  V.4" },       
{ src: "https://www.dropbox.com/scl/fi/fof9r4whf5q4obu2eph3v/velk-oslavy-ds9-V.5.mp3?rlkey=kbqzomstplo4mxp7m8pt1ga4u&st=zsi640cz&dl=1",title: "Velké Oslaby DS9  V.5" },
{ src: "https://www.dropbox.com/scl/fi/yko0z073uve2oi28pw974/velk-oslavy-ds9-V.6.mp3?rlkey=nu542dsonhslq2d1uqwl6r1wc&st=5ed5kzua&dl=1",title: "Velké Oslaby DS9  V.6" },
{ src: "https://www.dropbox.com/scl/fi/rwkuusern1cgtrg3uf2ym/velk-oslavy-ds9-V.7.mp3?rlkey=c4cxcsthye40ntif7gk0xgt1g&st=rockkqvo&dl=1",title: "Velké Oslaby DS9  V.7" },
{ src: "https://www.dropbox.com/scl/fi/varh31wjuldj9vhz7ys01/velk-oslavy-ds9-v.8-Top1.mp3?rlkey=t4nfn8tis6ilacz13vm7pjtul&st=1sflpjs3&dl=1",title: "Velké Oslaby DS9  V.8 TOP 1" },
{ src: "https://www.dropbox.com/scl/fi/7sblob56djhzvndwtgha3/Mohombi-v.13-v.1.mp3?rlkey=9nljppq53huqglufrl975ph3y&st=rknv7tgj&dl=1",title: "Bumpy Rider Mohombi V.1" },
{ src: "https://www.dropbox.com/scl/fi/h2krpngsn6uokdh3pjorz/Mohombi-v.13-v.2.mp3?rlkey=8alcqlxyf2ibxl76p1kyjen1f&st=tn8vgz6y&dl=1",title: "Bumpy Rider Mohombi V.2" },
{ src: "https://www.dropbox.com/scl/fi/53yo6zu8rnownjni4q2kn/mohambi-1.mp3?rlkey=1d7x1yar74nggirof8uqcpkr3&st=0rqyr2se&dl=1",title: "Bumpy Rider Mohombi V.3 TOP 1" },
{ src: "https://www.dropbox.com/scl/fi/ltij7sipmqhv9aifbjbse/Mohombi-v.15-v.3.mp3?rlkey=ddzjopdssb4sct3uvnf7ulcl6&st=dzcxt5mu&dl=1",title: "Bumpy Rider Mohombi V.4" },
{ src: "https://www.dropbox.com/scl/fi/7txrsffgevqw4f403hpjt/mohambi-2.mp3?rlkey=jfc8sphdqwiat851gqks8kcod&st=c3gna1lz&dl=1",title: "Bumpy Rider Mohombi V.5" }, { src: "https://www.dropbox.com/scl/fi/ce6bh03ghx9zueyj04z5p/ern-havran-Czech.mp3?rlkey=yknv0yzzec235p7ssk78bf5gc&st=6xcn1s6i&dl=1",title: "Více admirál Jiřík a Claude.AI" }, 
{ src: "https://www.dropbox.com/scl/fi/4vglklzizcxu8lgjbop0c/ern-havran-Czech-1.mp3?rlkey=4hp1nlsqaz1adji751ziccn2u&st=v8gq8n9s&dl=1",title: "Černý Havran" }, 
{ src: "https://www.dropbox.com/scl/fi/cpj7vvl8kbjr80i5kdi6l/P-sni-ka-o-Enterprise-a-NCC-1701-D-v.7.mp3?rlkey=s213mz3x608ocekrktzoq98gt&st=plfx3oas&dl=1",title: "Písnička o Enterprise a NCC 1701 D V.1" },
{ src: "https://www.dropbox.com/scl/fi/09v1mudjybqkpx7bos7fz/P-sni-ka-o-Enterprise-a-NCC-1701-D-v.7-v-2.mp3?rlkey=ult84zjchfj0sljrmfqslkdd3&st=v7plml0q&dl=1",title: "Písnička o Enterprise a NCC 1701 D V.2" },   
{ src: "https://www.dropbox.com/scl/fi/wv8gurlh0dyyqgvczn0i2/P-sni-ka-o-Enterprise-a-NCC-1701-D.mp3?rlkey=xysxuormyjteveympe4hgipz1&st=m3h8ghu9&dl=1",title: "Písnička o Enterprise a NCC 1701 D V.3" },   
{ src: "https://www.dropbox.com/scl/fi/f4o0a1zge4sigiz3k7959/P-sni-ka-o-Enterprise-a-NCC-1701-D-v.5.mp3?rlkey=rpcd68ysaa8uwwqc427wzlq90&st=wzy7bnu4&dl=1",title: "Písnička o Enterprise a NCC 1701 D V.4" },  
{ src: "https://www.dropbox.com/scl/fi/1ubpb0orcki3f031vsb24/star-trek-p-sni-ka-o-pos-dk-ch-v.1.mp3?rlkey=cpxyo8va9123ljx8t8ngh44np&st=r9062rts&dl=1",title: "Star Trek písnička posádek disco verze V.01 " },              
{ src: "https://www.dropbox.com/scl/fi/7euhdrx1lmjqzo1xa35gj/star-trek-p-sni-ka-o-pos-dk-ch-v.2.mp3?rlkey=3xgc6b7pboyfgrjvcmspws4tp&st=hmgv9eua&dl=1",title: "Star Trek písnička posádek disco verze V.02 Top.1 " },              
{ src: "https://www.dropbox.com/scl/fi/ksxqpfiqx76oluenhowzo/star-trek-p-sni-ka-o-pos-dk-ch-v.3.mp3?rlkey=r6eqazy355hkumyo69jszq1ao&st=8z4lnk59&dl=1",title: "Star Trek písnička posádek disco verze V.03 " },              
{ src: "https://www.dropbox.com/scl/fi/96mae2ko4etzwgizd1lxg/star-trek-p-sni-ka-o-pos-dk-ch-v.4.mp3?rlkey=gx8xkqsefd1jfcqn86g81mya5&st=yaxreec1&dl=1",title: "Star Trek písnička posádek disco verze V.04 " },  
{ src: "https://www.dropbox.com/scl/fi/ze5mjoe8eqgrpwkg26qe0/star-trek-p-sni-ka-o-pos-dk-ch-v.5.mp3?rlkey=up2qsecc9c0we3j6ukdd2wx14&st=nvlpyzgl&dl=1",title: "Star Trek písnička posádek disco verze V.05 " },          
{ src: "https://www.dropbox.com/scl/fi/f7rpkrb5d4oayuujwowsd/star-trek-p-sni-ka-o-pos-dk-ch-v.6.mp3?rlkey=8wmgui88mqz182kqijaxe218o&st=xfzwslay&dl=1",title: "Star Trek písnička posádek disco verze V.06 " },          
{ src: "https://www.dropbox.com/scl/fi/0lu4iy8imnjfoer0h5sxx/star-trek-p-sni-ka-o-pos-dk-ch-v.7.mp3?rlkey=2bfzirx8eee9avkpcqeux0wap&st=9oc37rjt&dl=1",title: "Star Trek písnička posádek disco verze V.07 " },          
{ src: "https://www.dropbox.com/scl/fi/mpv5x7ctx47g5annnrrwx/star-trek-p-sni-ka-o-pos-dk-ch-v.8.mp3?rlkey=lyy7poxwdmznhm9pjbbkm2p2w&st=98ypi5dz&dl=1",title: "Star Trek písnička posádek disco verze V.08 " },          
{ src: "https://www.dropbox.com/scl/fi/jy5lnm3gvr8wonk9hevit/star-trek-p-sni-ka-o-pos-dk-ch-v.9.mp3?rlkey=pnlafws9na7327fwhltttdtnj&st=8fijh4se&dl=1",title: "Star Trek písnička posádek disco verze V.09 " },          
{ src: "https://www.dropbox.com/scl/fi/13wqn6cb90uzoxboumva6/star-trek-p-sni-ka-o-pos-dk-ch-v.10.mp3?rlkey=pxqz1ob71w0oe2imo2zsr9wiw&st=3oc5sm5s&dl=1",title: "Star Trek písnička posádek disco verze V.10 " },        
     
        
        
{ src: "https://www.dropbox.com/scl/fi/8acno184v1hne57pajobo/star-trek-sout-1.mp3?rlkey=ubwep111sfll8bsyszgotmu36&st=g7mfb1ld&dl=1", title: "Star trek soutěž 1" },
{ src: "https://www.dropbox.com/scl/fi/fnxyyuv8huallq9g2wqs5/star-trek-sout-2.mp3?rlkey=3k4xcpssgbdrr5u6e5ej6zk7h&st=qfl50p4d&dl=1", title: "Star trek soutěž 2" },
{ src: "https://www.dropbox.com/scl/fi/wzeqg0l0bu9mse2ixxkpy/star-trek-sout-3.mp3?rlkey=wqd7tljlazpp2cpqoem9gnkdb&st=hbmut3xh&dl=1", title: "Star trek soutěž 3" },
{ src: "https://www.dropbox.com/scl/fi/n2e8gz7sf99rvtzzf6uee/star-trek-sout-4.mp3?rlkey=wyup1v6xl8qo6g7dq3yxqkczc&st=x3tvzshx&dl=1", title: "Star trek soutěž 4" },
{ src: "https://www.dropbox.com/scl/fi/6sfmcqpdg3avkwso4ucpf/Karaoke-na-Enterprise-5.mp3?rlkey=m8sx7x4ix1fd2ak2yq13b6upy&st=5sovg8c8&dl=1", title: "Star trek soutěž 5" },
{ src: "https://www.dropbox.com/scl/fi/a8gip4mg752f76f7u971j/Karaoke-na-Enterprise-6.mp3?rlkey=zxyhivnohx0cov069ccs8j8xo&st=l5z3k7k5&dl=1", title: "Star trek soutěž 6" },
{ src: "https://www.dropbox.com/scl/fi/enh0nxwnm1u5v0mon4luy/star-trek-sout-na-deep-space-nine-1.mp3?rlkey=grcdhapaq3ct66j41cylbd5wj&st=btzwwno3&dl=1", title: "Star trek soutěž na DS9 01" },
{ src: "https://www.dropbox.com/scl/fi/mjqwsbtdl86n7akxxsh7l/star-trek-sout-na-deep-space-nine-2.mp3?rlkey=36ug7ut6qgxkunwxoqa4uust7&st=26whu40u&dl=1", title: "Star trek soutěž na DS9 02" },
{ src: "https://www.dropbox.com/scl/fi/plobktvizyq07sk6xj2tx/star-trek-sout-na-deep-space-nine-3.mp3?rlkey=xrwazluywbabtekgjo03elw1e&st=pujepxx5&dl=1", title: "Star trek soutěž na DS9 03" },
{ src: "https://www.dropbox.com/scl/fi/g36fk3yhe9ve3x3j023w6/star-trek-sout-na-deep-space-nine-4.mp3?rlkey=q5d37jnp0rvbn49liohaun6hf&st=j3lc2nmk&dl=1", title: "Star trek soutěž na DS9 04" },
{ src: "https://www.dropbox.com/scl/fi/h57cit5eklouyuuuvx8q3/star-trek-sout-na-deep-space-nine-5.mp3?rlkey=4etrqaxge41nj8gmwq76bqhs3&st=r3azqnhw&dl=1", title: "Star trek soutěž na DS9 05" },
{ src: "https://www.dropbox.com/scl/fi/u91l7b9ww4gwr6ssu470s/star-trek-sout-na-deep-space-nine-6.mp3?rlkey=uwfuro88zfka6xxzapxrpecx2&st=sjhlwrtl&dl=1", title: "Star trek soutěž na DS9 06" },
{ src: "https://www.dropbox.com/scl/fi/ha8pavbnjimgcdnf93g9t/star-trek-sout-na-deep-space-nine-7.mp3?rlkey=c73lgmzdbjr5rtx0u0qnhvtbx&st=1l8l0tsn&dl=1", title: "Star trek soutěž na DS9 07" },
{ src: "https://www.dropbox.com/scl/fi/bn33vbo54tu33hbnar7ox/star-trek-sout-na-deep-space-nine-8.mp3?rlkey=8rdk7r20d1h2xykfq8pmn8uux&st=d8qzl0l2&dl=1", title: "Star trek soutěž na DS9 08" },
{ src: "https://www.dropbox.com/scl/fi/k9qmqi7l1cow2oqqizlfz/star-trek-sout-na-deep-space-nine-9.mp3?rlkey=3fdy1hiw4itk0h0w8qcni3yqr&st=q9hkyceg&dl=1", title: "Star trek soutěž na DS9 09" },
{ src: "https://www.dropbox.com/scl/fi/ugml45kt4h6o591p3ibrz/star-trek-sout-na-deep-space-nine-10.mp3?rlkey=rozfsc6r9gy59up5xtxzk0za0&st=g2g7zvtk&dl=1", title: "Star trek soutěž na DS9 10" },
{ src: "https://www.dropbox.com/scl/fi/oxo15o5abaf2cc3z6f7wa/star-trek-sout-na-deep-space-nine-11.mp3?rlkey=afey9t0bt03sm60vm8g7qddvy&st=eimas7pt&dl=1", title: "Star trek soutěž na DS9 11" },
{ src: "https://www.dropbox.com/scl/fi/ih11tzjn4qbi8macdqes6/star-trek-sout-na-deep-space-nine-12.mp3?rlkey=4vwkx3m3rae9lvqk7oqmvntww&st=zhb6ytr8&dl=1", title: "Star trek soutěž na DS9 12" },
{ src: "https://www.dropbox.com/scl/fi/4m6ypnmrsqlypadyfuw3j/star-trek-sout-na-deep-space-nine-13.mp3?rlkey=a7vj3jqvzcfj1ya54ol6fpir1&st=xfw0xzyo&dl=1", title: "Star trek soutěž na DS9 13" },
{ src: "https://www.dropbox.com/scl/fi/u85upit3ivjxbwxezqfci/star-trek-sout-na-deep-space-nine-14.mp3?rlkey=rdta91qj8bck97wq5f4i07b8y&st=b5alg5ya&dl=1", title: "Star trek soutěž na DS9 14" },        

 { src: "https://www.dropbox.com/scl/fi/064aefbc041suj0c8oua2/V-ce-admir-l-Ji-k-Admir-l-chatbot-Claude.AI-V.3.mp3?rlkey=vl8m9jou6jr1a5r1hl9318k8i&st=5v0q3chj&dl=1 ", title: "Více Admirál Jiřík, Admirál Chatbot, Claude.AI V.1" },           
 { src: "https://www.dropbox.com/scl/fi/xp0eg4pq6q5unhcxerkie/V-ce-admir-l-Ji-k-Admir-l-chatbot-Claude.AI-V.7.mp3?rlkey=pcasoogvq9f27gjgfc6ia4wts&st=223pm0qf&dl=1", title: "Více Admirál Jiřík, Admirál Chatbot, Claude.AI V.2" },   
 { src: "https://www.dropbox.com/scl/fi/lse1g527r86witpb8cpc5/V-ce-admir-l-Ji-k-Admir-l-chatbot-Claude.AI-V.8.mp3?rlkey=g47dep5cojuorgtqgqchx3fax&st=l8xon1z8&dl=1", title: "Více Admirál Jiřík, Admirál Chatbot, Claude.AI V.3" }, 
                      
{ src: "https://www.dropbox.com/scl/fi/k9t18v9dek0b2d1r9h3km/V-no-n-hv-zdn-flotila-v.1.mp3?rlkey=8lv4sgnnqf50bsezu0b1jiprn&st=g79znz3x&dl=1 ", title: "🎄 Vánoční hvězdná flotila 🎄v.1 " },   
{ src: "https://www.dropbox.com/scl/fi/k9qscdl4d2ks45ykotrf7/V-no-n-hv-zdn-flotila-v.2.mp3?rlkey=45eypom90tynyfe7c9ljb01xk&st=3w42nd6l&dl=1 ", title: "🎄 Vánoční hvězdná flotila 🎄v.2 " }, 
{ src: "https://www.dropbox.com/scl/fi/h7kp6hp86eoullbwpk502/V-no-n-hv-zdn-flotila-v.3.mp3?rlkey=7c3irtf3fnwuda7rqir1u9wpc&st=x5zpzpry&dl=1 ", title: "🎄 Vánoční hvězdná flotila 🎄v.03 " },   
{ src: "https://www.dropbox.com/scl/fi/n7gwwqcwp6ows6nd74dn7/V-no-n-hv-zdn-flotila-v.4.mp3?rlkey=n6ud0bu89gnmknr1gevcbih1g&st=gm06i2x7&dl=1 ", title: "🎄 Vánoční hvězdná flotila 🎄v.04 " },               
{ src: "https://www.dropbox.com/scl/fi/n7gwwqcwp6ows6nd74dn7/V-no-n-hv-zdn-flotila-v.4.mp3?rlkey=n6ud0bu89gnmknr1gevcbih1g&st=gm06i2x7&dl=1 ", title: "🎄 Vánoční hvězdná flotila 🎄v.05 " },   
{ src: "https://www.dropbox.com/scl/fi/auhytys4jj9yzba2t6qf1/V-no-n-hv-zdn-flotila-v.6.mp3?rlkey=6uxv9ov3c2ug68en6moica1cp&st=cfg2fsjb&dl=1", title: "🎄 Vánoční hvězdná flotila 🎄v.06 " },               
{ src: "https://www.dropbox.com/scl/fi/ewdl26nnogg4fkhtbl2hf/V-no-n-hv-zdn-flotila-v.7.mp3?rlkey=b4k53fop1ik8fhpts18sao1j3&st=d771wvk4&dl=1 ", title: "🎄 Vánoční hvězdná flotila 🎄v.07 " },   
{ src: "https://www.dropbox.com/scl/fi/vusc0wvfsu1ksddfkp5q1/V-no-n-hv-zdn-flotila-v.8.mp3?rlkey=fi31cvz066l4rh12133v773ye&st=lmdayk7v&dl=1 ", title: "🎄 Vánoční hvězdná flotila 🎄v.08 " },               
{ src: "https://www.dropbox.com/scl/fi/zt3h0319iz7j5svk3htjg/V-no-n-hv-zdn-flotila-v.9.mp3?rlkey=6tl8kumc3el6sq2kvr5tljumh&st=7s8t86ia&dl=1 ", title: "🎄 Vánoční hvězdná flotila 🎄v.09 " },   
{ src: "https://www.dropbox.com/scl/fi/mhr1dx2eet4ekxjrdpril/V-no-n-hv-zdn-flotila-v.10.mp3?rlkey=e1x78ofhqqhvvc293j49kvnox&st=vn45a3nt&dl=1 ", title: "🎄 Vánoční hvězdná flotila 🎄v.10 " },               
{ src: "https://www.dropbox.com/scl/fi/f8korjpx5vygudobe751y/V-no-n-hv-zdn-flotila-aj-v.11.mp3?rlkey=75p2937zsn13jyts9ytoi8jel&st=2lk6byjx&dl=1 ", title: "🎄 Vánoční hvězdná flotila 🎄v.11 " },   
{ src: "https://www.dropbox.com/scl/fi/lx31v7stuwwngiyu1gh73/na-oko-je-cesta-V.5.mp3?rlkey=unzilsmm49gmleo9qq2sk7180&st=w4ciths2&dl=1 ", title: "Na okož je cesta V.1 " },               
{ src: "https://www.dropbox.com/scl/fi/22usijk3mfq5a24hou01l/na-oko-je-cesta-V.9.mp3?rlkey=ruuxm0hweyu98g5gl1zm1a1wn&st=o0haf1zx&dl=1 ", title: "Na okož je cesta V.2" },   
{ src: "https://www.dropbox.com/scl/fi/a9hbcr02vejmgodexj4du/na-oko-je-cesta-V.13.mp3?rlkey=fvebjye6qp2c7jkey4t21rffy&st=vbviz1n6&dl=1", title: "Na okož je cesta V.3 " },               
{ src: "https://www.dropbox.com/scl/fi/17estx6ahgrj72wj5fzoz/na-oko-je-cesta-V.14.mp3?rlkey=kk24z8vzes99od62f7ep3j81q&st=afsawdqs&dl=1", title: "Na okož je cesta V.4 " },   
            
{ src: "https://www.dropbox.com/scl/fi/049qq9d3m6l2nzfrdhy3p/Star-Trek_-Do-nezn-ma.mp3?rlkey=spwsps7x20f7qgmmhsopx6q39&st=bcfzt5a0&dl=1", title: "Star Trek do neznama 1" },               
{ src: "https://www.dropbox.com/scl/fi/d6mabsk8pcdxheh322uv0/Star-Trek-do-neznama-v.2.mp3?rlkey=g7z6mk4ham3n5s4pjjxn7srd7&st=z2951gp7&dl=1", title: "Star Trek do neznama 2" },                   
{ src: "https://www.dropbox.com/scl/fi/h1iu2h7mizu1o63vwvtcv/Star-Trek-do-neznama-v.3.mp3?rlkey=s1px14pjmh62jmxc0ygt1o4s5&st=4iu7d1cw&dl=1", title: "Star Trek do neznama 3" }, 
{ src: "https://www.dropbox.com/scl/fi/djc3q1qqtidqv8cmmlc4r/Star-Trek-do-neznama-v.4-Top-1.mp3?rlkey=gxexg98bsp2c5arxjzvu016i8&st=12o7pqew&dl=1", title: "Star Trek do neznama 4 Top-1" },         
{ src: "https://www.dropbox.com/scl/fi/za7fxq8ng9cyjje8pmz6c/Star-Trek-do-neznama-v.5-Top-2.mp3?rlkey=0fsnk2q9rw97xcl1cgiifp4gf&st=pjsw8nwq&dl=1", title: "Star Trek do neznama 5 Top-2" },         
        
            
{ src: "https://www.dropbox.com/scl/fi/4onalygztdm0pfes6vyip/Klingon-opera-star-trek.mp3?rlkey=zvokfh2gx4i1whieqbdam40kz&st=k3i7y619&dl=1", title: "Klingon opeta Star Trek " },
{ src: "https://www.dropbox.com/scl/fi/hvdpjs006hx6643hj38rk/Beyond-the-Stars-v.1.mp3?rlkey=rtgxbbtcs5zosj215hf4odmn6&st=7jiixej0&dl=1", title: "Beyond the Stars v.1" },              
{ src: "https://www.dropbox.com/scl/fi/8bmnb3u2qclfqfhrf9r6x/Beyond-the-Stars-v.2.mp3?rlkey=ezaamgdpdyg3dvg2ngadxh7am&st=3msfough&dl=1", title: "Beyond the Stars v.2 " },              
{ src: "https://www.dropbox.com/scl/fi/upigtgzher2bvmr5394j1/vice-admiral-ji-k-a-admiral-chatbot.V.1.mp3?rlkey=moiadh4qqse2a7i7b22tjb14n&st=ile4lup8&dl=1", title: "Více admiral Jiřík a admirál chatbot v.1 " },              
{ src: "https://www.dropbox.com/scl/fi/z4r2ugvvnmyzd8nbyf0na/vice-admiral-ji-k-a-admiral-chatbot.V.2.mp3?rlkey=4g180cun5yt1lnl7zudwzx4ih&st=60crzwco&dl=1", title: "Více admiral Jiřík a admirál chatbot v.2" },              
{ src: "https://www.dropbox.com/scl/fi/o91w5hsnozau6oad1g4j3/vice-admiral-ji-k-a-admiral-chatbot.V.3.mp3?rlkey=5wdibr1lhe9v92eaxa1ktsow2&st=q1mcelob&dl=1", title: "Více admiral Jiřík a admirál chatbot v.3" },              
{ src: "https://www.dropbox.com/scl/fi/a8o0195oj0ao72bkku0f2/vice-admiral-ji-k-a-admiral-chatbot.V.4.mp3?rlkey=0kamkho6hr6gr0dqr42hjp5kj&st=75pji7yy&dl=1", title: "Více admiral Jiřík a admirál chatbot v.4" },              
             
{ src: "https://www.dropbox.com/scl/fi/kxyq3z2uje7dd03w5kyfe/V-ce-admir-l-Ji-k-Admir-l-chatbot-Claude.AI-T-mov-Pr-ce-V.1.mp3?rlkey=p017fqibdwvq6nofqp38g5yea&st=ys2f0926&dl=1", title: "Týmová Práce na NCC-1701-D V.1" },           
{ src: "https://www.dropbox.com/scl/fi/uanba9tela1n6e2ngyepg/V-ce-admir-l-Ji-k-Admir-l-chatbot-Claude.AI-T-mov-Pr-ce-V.2.mp3?rlkey=p9l11x06k2ov3zahbaxenbw54&st=7dtpse8o&dl=1", title: "Týmová Práce na NCC-1701-D V.2 top 2" },
{ src: "https://www.dropbox.com/scl/fi/r4r37go18hsqgzov93nei/V-ce-admir-l-Ji-k-Admir-l-chatbot-Claude.AI-T-mov-Pr-ce-V.3.mp3?rlkey=hdcpadkhldumy5srgiextmt6r&st=e1bhhgpk&dl=1", title: "Týmová Práce na NCC-1701-D V.3" },
{ src: "https://www.dropbox.com/scl/fi/vfawutdd3hbl78d3tc5rt/V-ce-admir-l-Ji-k-Admir-l-chatbot-Claude.AI-T-mov-Pr-ce-V.4.mp3?rlkey=lr03uqet3ef74wnid1nsgnmm5&st=nq65i35h&dl=1", title: "Týmová Práce na NCC-1701-D V.4" },
{ src: "https://www.dropbox.com/scl/fi/04m7zzgm2cechke0kybw8/V-ce-admir-l-Ji-k-Admir-l-chatbot-Claude.AI-T-mov-Pr-ce-V.5-top-1.mp3?rlkey=7t92lk9f2ckt2ff45t4rhjvwt&st=2wjswbca&dl=1", title: "Týmová Práce na NCC-1701-D V.5 top 1" },                         
{ src: "https://www.dropbox.com/scl/fi/xryte4343vkkz37qcluyz/P-se-_-Admir-lsk-den-k-Admir-la-Chatbota-V.1.mp3?rlkey=izsuscmejelqd3w3mad2d3a5i&st=klmwhwen&dl=1", title: "Píseň:-Admirálský-deník-Admirála- Chatbota-V.1" }, 
{ src: "https://www.dropbox.com/scl/fi/buhhxky4xz434qa1f79dx/P-se-_-Admir-lsk-den-k-Admir-la-Chatbota-V.2.mp3?rlkey=r7hu5rxzcyauur02mshae5gu3&st=6v2jbdul&dl=1", title: "Píseň:-Admirálský-deník-Admirála- Chatbota-V.2" },
{ src: "https://www.dropbox.com/scl/fi/5n5xapuqvkb7ygljvgauy/P-se-_-Admir-lsk-den-k-Admir-la-Chatbota-V.3.mp3?rlkey=nyg3evugyfeirhnrutj9zdwg7&st=8db67yn5&dl=1", title: "Píseň:-Admirálský-deník-Admirála- Chatbota-V.3" },
{ src: "https://www.dropbox.com/scl/fi/t1z36j6mb8i6zb88py4qs/P-se-_-Admir-lsk-den-k-Admir-la-Chatbota-V.4.mp3?rlkey=i661bk67gwzxq1248kh4zkgpw&st=rbg9i40h&dl=1", title: "Píseň:-Admirálský-deník-Admirála- Chatbota-V.4" },
{ src: "https://www.dropbox.com/scl/fi/tl8v92i0m6cu10uvob9bl/P-se-_-Admir-lsk-den-k-Admir-la-Chatbota-V.5-Top-2..mp3?rlkey=uu2bsxwetnyupawdfnq7sw7ts&st=xqcrstmf&dl=1", title: "Píseň:-Admirálský-deník-Admirála- Chatbota-V.5 Top.2" },
{ src: "https://www.dropbox.com/scl/fi/6s16eyyvlxwa9nx3zuke5/P-se-_-Admir-lsk-den-k-Admir-la-Chatbota-V.6-Top-1..mp3?rlkey=0arqcandq82qf1gtm23dv5n20&st=qkduhugj&dl=1", title: "Píseň:-Admirálský-deník-Admirála- Chatbota-V.6 Top.1" },   
            
            
{ src: "https://www.dropbox.com/scl/fi/wvjzu3iqyq2vsvq135klj/V-no-n-Hudba-na-Palub-v.1.mp3?rlkey=lxp4j3fbehjangrv0t832srxj&st=myv0vmjt&dl=1", title: "Vánoční Hudba na Palubě v.1" },
{ src: "https://www.dropbox.com/scl/fi/k8j9ueeaanvbi5hstjycb/V-no-n-Hudba-na-Palub-v.2.mp3?rlkey=32266kbkyetwclxl1qknvbdbl&st=1keskft7&dl=1", title: "Vánoční Hudba na Palubě v.2" },
{ src: "https://www.dropbox.com/scl/fi/qrlhgym277deyy60z2f7w/V-no-n-Hudba-na-Palub-v.3.mp3?rlkey=pjqjvneu3u1iuv50p9u3lxxt7&st=mnaug2o2&dl=1", title: "Vánoční Hudba na Palubě v.3" }, 
{ src: "https://www.dropbox.com/scl/fi/izbalkp7de3w5m48le2xv/V-no-n-Hudba-na-Palub-v.4.mp3?rlkey=qe3p3ssjx2xrgqjfulbqotlg5&st=4zda72ay&dl=1", title: "Vánoční Hudba na Palubě v.4" },    
{ src: "https://www.dropbox.com/scl/fi/jq16of1rejgniuxli5w5p/V-no-n-Hudba-na-Palub-v.5.mp3?rlkey=u8v892o3frxjfg0vzbbb2v43h&st=g8vs05pd&dl=1", title: "Vánoční Hudba na Palubě v.5" },     
            
            
            
{ src: "https://www.dropbox.com/scl/fi/vu0erherxo1cv7fm1w97s/Hv-zdy-a-Plameny-Remastered-V.1.mp3?rlkey=h5rqabwrkxcobrka6rewdrjrf&st=0q9m6iur&dl=1", title: "Hvězdné Plameny Remastered V.1" },  
{ src: "https://www.dropbox.com/scl/fi/h1c51dl8r1yggfexi6a2p/Hv-zdy-a-Plameny-Remastered-V.2.mp3?rlkey=07r123j8po3elr4nim1b1xo0r&st=c0gl2g4t&dl=1", title: "Hvězdné Plameny Remastered V.2" },  
{ src: "https://www.dropbox.com/scl/fi/3q9f6dknc5ltrtv1zf71u/P-se-_-Admir-lsk-den-k-Admir-la-Chatbota-V.3-Remastered-V.3.mp3?rlkey=wujypwk13somkmyxdvsc17nnx&st=je445r9k&dl=1", title: "Admiralskí deník Remastered V.1" },            
{ src: "https://www.dropbox.com/scl/fi/hypr1ni1tf88nbe600gff/P-se-_-Admir-lsk-den-k-Admir-la-Chatbota-V.3-Remastered-V.4.mp3?rlkey=nrpjftz0howr1xrr19dqn4jx6&st=ewc4jjyz&dl=1", title: "Admiralskí deník Remastered V.2" },  
{ src:"https://www.dropbox.com/scl/fi/1aw2iovwp9k03v8564owl/mohambi-v.3-Remastered-V.5.mp3?rlkey=jdhakwcvca11uu5kvygwtydza&st=qb7edfsq&dl=1", title: "Mohombi Remastered V.1" },            
{ src:"https://www.dropbox.com/scl/fi/hk3hde8ms0zwn5y02ufpf/mohambi-v.3-Remastered-V.6.mp3?rlkey=zyki8gpglge8dyxuy6i9f7k1u&st=8273b87j&dl=1", title: "Mohombi Remastered V.2" },            
{ src:"https://www.dropbox.com/scl/fi/o2i2tod1da3an0qg3hxmf/St-ny-z-Utah-Remastered-V.7.mp3?rlkey=bitm1exyei3krwu7jkj14icu8&st=fznwkhnk&dl=1", title: "Stíny z Utahy Remastered V.1" },            
{ src:"https://www.dropbox.com/scl/fi/if6lddn4ocl8g91h311nc/St-ny-z-Utah-Remastered-V.8.mp3?rlkey=tpd1kit3d75mjujwnm64chex8&st=dmzxiy47&dl=1", title: "Stíny z Utahy Remastered V.2" },            
{ src:"https://www.dropbox.com/scl/fi/lh2oq4ssjccjngnbgjwpn/Hv-zdn-Pos-dka-Remastered-V.9.mp3?rlkey=unrvafu72fe6oildlrb7zhik5&st=ul0depqa&dl=1", title: "Hvězdná Posádka Remastered V.0" },             
{ src: "https://www.dropbox.com/scl/fi/he6wtpnqvprwrfvefnzoy/jirka-pisnicka.mp3?rlkey=381v7xqasgcu79hajzzxpmwl1&st=6gfkzfyu&dl=1", title: "Písnička o jirkovy Remastered " },
{ src: 'https://www.dropbox.com/scl/fi/qdsz9ggqnkqgw51pj7k06/Stanice-Hlubok-Vesm-r-9-Remastered.mp3?rlkey=m6jhmtfsaw8xigu9p27g9ync1&st=9jv8h1jf&dl=1', title: 'Stanice-Hluboký-Vesmír-9 Remastered ' },        
            
{ src: 'https://www.dropbox.com/scl/fi/4834qpbtwv1sl8cynyp9x/star-trek-do-neznama-remake-v1.mp3?rlkey=q312iwodtdvk2ya8w7e3gw2cv&st=gq4l0w9r&dl=1', title: 'star trek do neznama remake v1' },            
{ src: 'https://www.dropbox.com/scl/fi/ptmeoxhjn1zhrjvu5b26t/star-trek-do-neznama-remake-v2.mp3?rlkey=lay48irwtcvm6shfvzsljc9vd&st=fvsh9y32&dl=1', title: 'star trek do neznama remake v2' },            
{ src: 'https://www.dropbox.com/scl/fi/i1ag5qh4qlihjgwweocfo/star-trek-do-neznama-v.4-verze-1.mp3?rlkey=y3tsncupaxphx70e9icr6s6po&st=y7n2nzrp&dl=1', title: 'star trek do neznama remake v3' },            
            
{ src: 'https://www.dropbox.com/scl/fi/9zc0davs7hlhn38y6p7cz/Federaln-ustav-remake-v.1.mp3?rlkey=y7zf474nql83af1ynj7huu65n&st=hkdzvil0&dl=1', title: 'Federaln ustav remake v.1' },            
{ src: 'https://www.dropbox.com/scl/fi/l5xet02uhqfuc9vq3qmbm/Federaln-ustav-remake-v.2.mp3?rlkey=m5vg6locsgxleydh3ozzq4113&st=uiwf7bf7&dl=1', title: 'Federaln ustav remake v.2' },            
{ src: 'https://www.dropbox.com/scl/fi/0bv6pkaml0avm0qr8ve1v/Federaln-ustav-remake-v.3.mp3?rlkey=dhjxhckdrw47sk6u9m8iywxfu&st=vow4jcmp&dl=1', title: 'Federaln ustav remake v.3' },            
{ src: 'https://www.dropbox.com/scl/fi/6rd61a7lqqk4yr1lua8yt/Federaln-ustav-remake-v.4.mp3?rlkey=plaa27nw4kbiuocuv5dr8s0vm&st=u29au84h&dl=1', title: 'Federaln ustav remake v.4' },
{ src: 'https://www.dropbox.com/scl/fi/6nr2jfxfdjm7qrlt2bgp0/sprost-pisni-ka-remake-v.00.mp3?rlkey=hvnqn8h8bi2zuu9nro0mg3tqn&st=l7r2e041&dl=1', title: 'sprostá pisniška remake v.00' },          
 
{ src: 'https://www.dropbox.com/scl/fi/13chcwt5eqkka6geyiyc0/Prace-je-na-hovno-top.1.mp3?rlkey=3068g08c89o9toiuea1g2c9ne&st=9wjfq9p5&dl=1', title: 'Práce na hovno top.1' },             
            
{ src: 'https://www.dropbox.com/scl/fi/yde84537d819x5dwlgt28/Feder-ln-stav-kret-n-a-kohout.mp3?rlkey=znwx7v4bsatxckeu1bco0cf17&st=ui4ijphe&dl=1', title: 'Federalní ústav kreténů a kohout' },            
            
{ src: 'https://www.dropbox.com/scl/fi/eyr17lry1clnuqolxre5j/Vesm-rn-Odysea-V.1.mp3?rlkey=32aw1g6okugh1c9pu4qpkz91f&st=6x30o87m&dl=1', title: 'Vesmírná Odysea V.01' },             
{ src: 'https://www.dropbox.com/scl/fi/qt1otz2xebl3kkvikvdjm/Vesm-rn-Odysea-V.2.mp3?rlkey=gakvk3w5rs0xmrbnjlhsu76cm&st=5u4wxw4a&dl=1', title: 'Vesmírná Odysea V.02' },
{ src: 'https://www.dropbox.com/scl/fi/7yeh1qlh53qix1vombvrn/Vesm-rn-Odysea-V.3.mp3?rlkey=4vxf48y12nj1ssr5fa77n69l3&st=52qkk2qi&dl=1', title: 'Vesmírná Odysea V.03' },            
{ src: 'https://www.dropbox.com/scl/fi/usv017ym9c0h6085uxz6r/Vesm-rn-Odysea-V.4.mp3?rlkey=vbnv8du5e5s3smnqlusmko2y4&st=m4wcywmd&dl=1', title: 'Vesmírná Odysea V.04' },            
{ src: 'https://www.dropbox.com/scl/fi/8npem7eu2ftpml1gz1krf/Vesm-rn-Odysea-V.5.mp3?rlkey=b4f3rstlybwnq6a4os1v44vdm&st=y2jzu0yr&dl=1', title: 'Vesmírná Odysea V.05' },            
{ src: 'https://www.dropbox.com/scl/fi/d5jr7hei2ymuledevm7m8/Vesm-rn-Odysea-V.6.mp3?rlkey=k2vmdhpk46o0fngmoyv70acea&st=6xifmw65&dl=1', title: 'Vesmírná Odysea V.06' },            
{ src: 'https://www.dropbox.com/scl/fi/92erpvy3u4zc04j5o8cuy/Vesm-rn-Odysea-V.7.mp3?rlkey=t0o790lxwyucceb6quy4arkj2&st=c6z3fpjy&dl=1', title: 'Vesmírná Odysea V.07' },            
{ src: 'https://www.dropbox.com/scl/fi/m4qcr8y36ishmv9kcp5p0/Vesm-rn-Odysea-V.8.mp3?rlkey=h8ke7ml7pklp4qbxakq2fmq6f&st=ohngbwxu&dl=1', title: 'Vesmírná Odysea V.08' },            
{ src: 'https://www.dropbox.com/scl/fi/v0nbtgqwuii1o1ss43azz/Vesm-rn-Odysea-V.9.mp3?rlkey=mc1bygy5fh75coot42c3t8dkr&st=a7w81b0y&dl=1', title: 'Vesmírná Odysea V.09' },            
{ src: 'https://www.dropbox.com/scl/fi/xmc7t8vts8m7k72hm6bc3/Vesm-rn-Odysea-V.10.mp3?rlkey=mmbcuw0wygs62uyuktsl22yoa&st=voob4jv4&dl=1', title: 'Vesmírná Odysea V.10' },            
{ src: 'https://www.dropbox.com/scl/fi/wqqs5rpbwd092t158djjw/nova-posnicka.mp3?rlkey=n9awbj9z1azvb2ygn56b9wn9e&st=wadbtu0b&dl=1', title: 'Nová Písnička V.00' },            
{ src: 'https://www.dropbox.com/scl/fi/weopw6zr9j9w6sex2bf57/Kouzeln-V-noce-s-admir-ly-v.2.mp3?rlkey=xfo9wgqlgu575rxf2brzqpv8w&st=pg7st8f5&dl=1', title: 'Kouzelné Vánoce s Admirály V.00' },            
 { src: 'https://www.dropbox.com/scl/fi/2znr74akdskdujwgvw6gc/Diana-Fuentes-Gente-de-Zona-La-Vida-Me-Cambi-V.1.mp3?rlkey=qhf5rrc7nws7qvgyx9vc42ors&st=eto383yf&dl=1', title: 'Diana Fuentes, Gente de Zona - La Vida Me Cambió V.1' },             
{ src: 'https://www.dropbox.com/scl/fi/tp8mo3nt4ylkxlo0kiasy/Diana-Fuentes-Gente-de-Zona-La-Vida-Me-Cambi-V.2.mp3?rlkey=v5164nd80stuqwk9lmxx4c7ll&st=ow6cisfr&dl=1', title: 'Diana Fuentes, Gente de Zona - La Vida Me Cambió V.2' },           
 { src: 'https://www.dropbox.com/scl/fi/0jck7g1hzfyik45ieqeti/disko-p-se-instrument-ln.mp3?rlkey=y5iylsvzndt6dbscl0gmu1rio&st=k1stq0ff&dl=1', title: 'instrumentální disko 1' },
  { src: 'https://www.dropbox.com/scl/fi/hsroimbojr834uwvdl6ox/disko-p-se-instrument-ln-2.mp3?rlkey=bpwj21le026nhali2f7mee5fy&st=1dsdu7a3&dl=1', title: 'instrumentální disko 2' },
  { src: 'https://www.dropbox.com/scl/fi/07fpmhlm23uyw33gfv09f/disko-instrument-ln-3.mp3?rlkey=nhuznhkvfdy7xp26npycfuhid&st=04ulykjz&dl=1', title: 'instrumentální disko 3' },
  { src: 'https://www.dropbox.com/scl/fi/offnpaxhw3q5rslyqiurk/disko-instrument-ln-4.mp3?rlkey=78g3k5u006xilem2jfhx31h6x&st=m5b7011g&dl=1', title: 'instrumentální disko 4' },
  { src: 'https://www.dropbox.com/scl/fi/bo6dy6iq8syw93jl0v09r/disko-instrument-ln-5.mp3?rlkey=773zl86r2ixeby3x11m6ki6to&st=i5s5uu02&dl=1', title: 'instrumentální disko 5' },
  { src: 'https://www.dropbox.com/scl/fi/bi4ep9vcik6carhzabxsc/disko-instrument-ln-6.mp3?rlkey=0f1ahtkras67qrxner9c69ows&st=jz20lx4m&dl=1', title: ' instrumentální disko 6' },
  { src: 'https://www.dropbox.com/scl/fi/e2ayrw4afeag8d0714i5z/disko-instrument-ln-8.mp3?rlkey=f4kdo9km5elqivhey34n52yen&st=oti4430o&dl=1', title: 'instrumentální disko 7' },
  { src: 'https://www.dropbox.com/scl/fi/e2ayrw4afeag8d0714i5z/disko-instrument-ln-8.mp3?rlkey=f4kdo9km5elqivhey34n52yen&st=oti4430o&dl=1', title: ' instrumentální disko8' },
  { src: 'https://www.dropbox.com/scl/fi/gxrzzkowi1jf8mr8xqn3s/disko-instrument-ln-9.mp3?rlkey=7pwrvdt7432pu3020pwew10qv&st=ti3qhed9&dl=1', title: 'instrumentální disko 9' },
  { src: 'https://www.dropbox.com/scl/fi/hy1u6hakkstqbk2f33xto/disko-instrument-ln-10.mp3?rlkey=wzqsyv4aveuo26n9xknjkyjwo&st=qjdk4773&dl=1', title: 'instrumentální disko 10' },  
            
{ src: 'https://www.dropbox.com/scl/fi/vzvoi93r4ucnkdl4flzpf/Feder-ln-stav-Kret-n-v.1.mp3?rlkey=0y0gqjtyw6irjsnz1bqpw9sic&st=7id6prfv&dl=1', title: 'Federalní ústav kreténů V.1' },
{ src: 'https://www.dropbox.com/scl/fi/z5evgh76w5cru202m5400/Feder-ln-stav-Kret-n-v.2.mp3?rlkey=x2yv2vpfht2gg1s4f4oyc1zhe&st=72j19qwd&dl=1', title: 'Federalní ústav kreténů V.2' },
{ src: 'https://www.dropbox.com/scl/fi/yifc12ogr968c402noz9q/Matterhorn-v.1.mp3?rlkey=4hiirddy63t7h6p4cfj0sdkko&st=t47jom0x&dl=1', title: 'Hora Matterhorn V.01' },
{ src: 'https://www.dropbox.com/scl/fi/4pone6lz1v69ud9p54je9/Matterhorn-v.2.mp3?rlkey=wifirr8ltryxckesresc8mpf8&st=0zuyyli1&dl=1', title: 'Hora Matterhorn V.02' },
{ src: 'https://www.dropbox.com/scl/fi/tzp1ayk64yaqxkc4ykfsg/Matterhorn-v.3.mp3?rlkey=bjczth72wvwu33mgftl4boihf&st=zivgx8jk&dl=1', title: 'Hora Matterhorn V.03' },
{ src: 'https://www.dropbox.com/scl/fi/zw9s5l809j63px20732c0/Matterhorn-v.4.mp3?rlkey=hc9orcsudx7mkxblng9lmbqyi&st=8775n8k8&dl=1', title: 'Hora Matterhorn V.04' },
{ src: 'https://www.dropbox.com/scl/fi/eva148erkiq5ihp4sgyk6/Matterhorn-v.5.mp3?rlkey=nl48abg9e7pob3kuof7cz6rq2&st=cq77lql2&dl=1', title: 'Hora Matterhorn V.05' },
{ src: 'https://www.dropbox.com/scl/fi/86a1ju270l8a3qrk8rtro/Matterhorn-v.6.mp3?rlkey=a3zoyvnnsst4m87nz4nzis513&st=70kun1gb&dl=1', title: 'Hora Matterhorn V.06' },
{ src: 'https://www.dropbox.com/scl/fi/oz0r85rjy5qpq10fevgni/Matterhorn-v.7.mp3?rlkey=lu5ialgoyst9rcrohuscpb25l&st=vqhdfjfe&dl=1', title: 'Hora Matterhorn V.07' },
{ src: 'https://www.dropbox.com/scl/fi/bdcos3qqna6m9jmpqjvyv/Matterhorn-v.8.mp3?rlkey=4jo77smgmemfl46k7b59cq4d6&st=7eipxp13&dl=1', title: 'Hora Matterhorn V.08' },
{ src: 'https://www.dropbox.com/scl/fi/06117xzx2uxntef8gvwx7/Matterhorn-v.9.mp3?rlkey=jrjjj3ajy9v1r06bjpamcq34u&st=in90rus4&dl=1', title: 'Hora Matterhorn V.09' },  
            
{ src: 'https://www.dropbox.com/scl/fi/wl5i599mnidodxc8gixyi/Posledn-den-k-NCC-1701-v-11.mp3?rlkey=hlg24huv9ggjmt344gjuiul2p&st=btvxv4b7&dl=1', title: 'Poslední deník NCC-1701 V.01' },            
{ src: 'https://www.dropbox.com/scl/fi/0f3iih97yk57gkq7veymi/Posledn-den-k-NCC-1701-v-11.mp3?rlkey=nqa1hi1wbnnjlacio1z17u49e&st=6js7or6q&dl=1', title: 'Poslední deník NCC-1701 V.02' },  
{ src: 'https://www.dropbox.com/scl/fi/24l3k0p4zday6f0ohd0to/Posledn-den-k-NCC-1701-v-17.mp3?rlkey=futpak2zji1s0cksitcsragyd&st=j2xku61z&dl=1', title: 'Poslední deník NCC-1701 V.03' }, 
            
{ src: 'https://www.dropbox.com/scl/fi/jpdrerbkn1vuw7vqttke6/V-ce-admir-l-Ji-k-a-Claude.AI-v.1.mp3?rlkey=i88lt4arsvme4h097eec0ek2j&st=pc944cwu&dl=1', title: 'Více admirál Jiřík a Claude.AI V.1' },
{ src: 'https://www.dropbox.com/scl/fi/s3u5fezxfi1jo8z6mrxze/V-ce-admir-l-Ji-k-a-Claude.AI-v.2.mp3?rlkey=g712s0x5n72xl9fh4f8jcu69i&st=r7kv62aj&dl=1', title: 'Více admirál Jiřík a Claude.AI V.2' },             
{ src: 'https://www.dropbox.com/scl/fi/6jrfqi9s3pna49dee9sk1/V-ce-admir-l-Ji-k-a-Claude.AI-v.3.mp3?rlkey=y1u8k3ohokk4em2ukuoi5g79r&st=f694x807&dl=1', title: 'Více admirál Jiřík a Claude.AI V.3' },             
{ src: 'https://www.dropbox.com/scl/fi/7u8x3wyyxkqjqjxkh89ec/V-ce-admir-l-Ji-k-a-Claude.AI-v.4.mp3?rlkey=z5layi8shi3t2qhyzk6fjwvzu&st=kmq0g5dp&dl=1', title: 'Více admirál Jiřík a Claude.AI V.4' },             
{ src: 'https://www.dropbox.com/scl/fi/1sr61tw6bozlnv6qyu6ks/V-ce-admir-l-Ji-k-a-Claude.AI-v.5.mp3?rlkey=ws2o7kvv0h24rbkt5f5mki4kj&st=0gz5gnn9&dl=1', title: 'Více admirál Jiřík a Claude.AI V.5' },             
{ src: 'https://www.dropbox.com/scl/fi/odfjak89mwzwwu0yhkzde/V-ce-admir-l-Ji-k-a-Claude.AI-v.6.mp3?rlkey=0fibl9ubon3aqbbcttbhnuofp&st=ef3wdvgv&dl=1', title: 'Více admirál Jiřík a Claude.AI V.6' },             
{ src: 'https://www.dropbox.com/scl/fi/0fnjgh0c8svjxpsqqph5t/Na-Cest-k-V-nosti-V.1.mp3?rlkey=54x9bmmjxb33i47qvasnkraa9&st=cv54125z&dl=1', title: 'Na Cestě k Věčnosti V.1' },             
{ src: 'https://www.dropbox.com/scl/fi/t35xudn6rakbh5fvs32dr/Na-Cest-k-V-nosti-V.2.mp3?rlkey=rp5ckqyxzsmo365j7m8ttcs86&st=kf7ymtx8&dl=1', title: 'Na Cestě k Věčnosti V.2' },             
{ src: 'https://www.dropbox.com/scl/fi/d3wskuj9nnnxtkk6ru7uf/Na-Cest-k-V-nosti-V.3.mp3?rlkey=timmfpd18ka4r1foem2h5u9vl&st=fddz8i0o&dl=1', title: 'Na Cestě k Věčnosti V.3' },             
{ src: 'https://www.dropbox.com/scl/fi/e7ke9h0sd8z4foqheaytv/Na-Cest-k-V-nosti-V.4.mp3?rlkey=mnjx5lw5us827kp3yb6lyock8&st=v77zrfvb&dl=1', title: 'Na Cestě k Věčnosti V.4' },             

{ src: 'https://www.dropbox.com/scl/fi/kgj27r4c79xed0zi6ljzm/na-ceste-k-vecnosti-v.5.mp3?rlkey=5mefo6j4x1tmkaw0u34qiymx9&st=p8wzgkiz&dl=1', title: 'Na Cestě k Věčnosti V.5' },             
{ src: 'https://www.dropbox.com/scl/fi/aehzbo7km5t7y47jqz7vm/na-ceste-k-vecnosti-v.6.mp3?rlkey=t9gtnzo9x8a3prd6f1fyzmlb8&st=dlytnlj9&dl=1', title: 'Na Cestě k Věčnosti V.6' },       
{ src: 'https://www.dropbox.com/scl/fi/k6wi5e2qh45152obzhct8/na-ceste-k-vecnosti-v.7.mp3?rlkey=6tg4gisattbvlexk7ap8mndl5&st=vd7xnbjw&dl=1', title: 'Na Cestě k Věčnosti V.7' },
{ src: 'https://www.dropbox.com/scl/fi/o9u5v9cc317g7mqm2kiy0/Na-cest-k-v-cnosti-v.2.0-nova-verze.mp3?rlkey=9fukslcoxmau62r974njjuayw&st=zeh00idx&dl=1', title: 'Na cestě k věcnosti v.2.0 nova verze' },
      
{ src: 'https://www.dropbox.com/scl/fi/qazvjqxkbre0sbnem67gx/Srdce-mezi-hv-zdami-Star-Trek-v2.1.mp3?rlkey=db7evo8tygn65arynew329ahs&st=0or2a8v9&dl=1', title: 'Srdce mezi hvězdami v.2.1 ' },      
{ src: 'https://www.dropbox.com/scl/fi/3eo01y34rlssox0f1vgj0/Srdce-mezi-hv-zdami-Star-Trek-v2.0.mp3?rlkey=yhvqqwwzf70a91bi0t7iz7gz5&st=bd0eyw5y&dl=1', title: 'Srdce mezi hvězdami v.2.2' },
      
      
{ src: 'https://www.dropbox.com/scl/fi/p54l2pqbkavk1tz44js9y/chrismas-pisen-v.1.wav?rlkey=3w09tngmuudrk0gld15vcv7df&st=6wj6ork0&dl=1', title: 'Chrismas piseň V.1' },
{ src: 'https://www.dropbox.com/scl/fi/aza5f1ue1r3qsvdwu0ce7/chrismas-pisen-v.2.wav?rlkey=3pkw7sto0smlp1uf54079lxhr&st=gf1f3ppn&dl=1', title: 'Chrismas piseň V.1' },    
             
{ src: 'https://www.dropbox.com/scl/fi/xmwpg06o52s2wy91ssov5/Nebude-to-ahk-v.1.mp3?rlkey=fv6ah3vzgxrdqdkgct9u8f1hv&st=59gtbxr0&dl=1', title: 'Nebude to ľahké v.01' },
{ src: 'https://www.dropbox.com/scl/fi/qer50nnq5ociabsn9qhnu/Nebude-to-ahk-v.2.mp3?rlkey=8f567r1tb449z2gi4qmrxkxg7&st=ku36cbzq&dl=1', title: 'Nebude to ľahké v.02' },
{ src: 'https://www.dropbox.com/scl/fi/yhdp3lazpic8az1y4g9cw/Nebude-to-ahk-v.3.mp3?rlkey=adksrbsgo8gc5qs5ihjz5dbvs&st=7k1ukaf5&dl=1', title: 'Nebude to ľahké v.03' },
{ src: 'https://www.dropbox.com/scl/fi/g87yq7wn257lip1jg1fln/Nebude-to-ahk-v.4.mp3?rlkey=k4dya875ljgpaoqfufoyzmf8j&st=epuatjog&dl=1', title: 'Nebude to ľahké v.04' },
{ src: 'https://www.dropbox.com/scl/fi/5el3qv7vsdn6y02lg2uec/Nebude-to-ahk-v.5.mp3?rlkey=2c1u0nh4evsf5e2xm8gnqepko&st=7e6r2ehc&dl=1', title: 'Nebude to ľahké v.05' },
{ src: 'https://www.dropbox.com/scl/fi/5zojb0mbwl4hez9nelt1i/Nebude-to-ahk-v.6.mp3?rlkey=xget125ermw2bhowyoaifizmn&st=f3z18305&dl=1', title: 'Nebude to ľahké v.06' },
{ src: 'https://www.dropbox.com/scl/fi/4jwbsz4v6g37o8tte7tmu/Nebude-to-ahk-v.7.mp3?rlkey=uiqqux4xu8bgbknt00npals78&st=w3k2cezl&dl=1', title: 'Nebude to ľahké v.07' },
{ src: 'https://www.dropbox.com/scl/fi/7imkyrq0e4jfv1d8ckuze/Nebude-to-ahk-v.8.mp3?rlkey=v2ugatpgkhjsvnpczvrcf95kq&st=60c8hc3x&dl=1', title: 'Nebude to ľahké v.08' },
{ src: 'https://www.dropbox.com/scl/fi/er47x7bhnd3e853ammxio/Nebude-to-ahk-v.9.mp3?rlkey=l5k5ang4e72fxf2pbawuuhw8h&st=0f4u4l2d&dl=1', title: 'Nebude to ľahké v.09' },
{ src: 'https://www.dropbox.com/scl/fi/0ys4aun4k5ohoor27fl7a/Nebude-to-ahk-v.10.mp3?rlkey=rhgetwm5mgkyae6p5mrnqfx9y&st=eyeiqkth&dl=1', title: 'Nebude to ľahké v.10' },
{ src: 'https://www.dropbox.com/scl/fi/oh2e9k5yniq1843d52v2y/Nebude-to-ahk-v.11.mp3?rlkey=fsgpfvv2qwm4hfes82s1qlu4j&st=96qpdmw3&dl=1', 
 title: 'Nebude to ľahké v.11' },
      
 { src: 'https://www.dropbox.com/scl/fi/w3b8kuohto098omw0z3b8/hvezdy-a-plameny.mp3?rlkey=3j379v1pbmnvnwyb8dwxk0bie&st=34kh84g0&dl=1', title: 'hvezdy a plameny v.1' },
  { src: 'https://www.dropbox.com/scl/fi/zpnrs94vqygfbfhwwxu79/hvezdy-a-plameny-v.2.mp3?rlkey=8nzdujhednp7ri65kh42sdar0&st=dv83wq0k&dl=1', title: 'hvezdy a plameny v.2' },
  { src: 'https://www.dropbox.com/scl/fi/nms1mnq4tv9bmm3tcrydx/hvezdy-a-plameny-v.3.mp3?rlkey=x130f7pjj49xxu1hmdkcoglvg&st=8zrdo9t0&dl=1', title: 'hvezdy a plameny v.3' },
  { src: 'https://www.dropbox.com/scl/fi/utu6md4m2k8lk1fny20w7/hvezdy-a-plameny-v.4.mp3?rlkey=w2ex0f4majq2yos858xlaoyam&st=fkanr8mv&dl=1', title: 'hvezdy a plameny v.4' },
  { src: 'https://www.dropbox.com/scl/fi/wsqsrw2i32exaqwhsb5rm/hvezdy-a-plameny-v.5.mp3?rlkey=51gsmodvw4wq1g71jp8hwyqh0&st=w62cw6ol&dl=1', title: 'hvezdy a plameny v.5' },
  { src: 'https://www.dropbox.com/scl/fi/9luix60q58x8h87r37w5l/cesta-krystof-v.1.mp3?rlkey=lmkz8mgemr30hnp87rvsvvqu6&st=jiiahmk2&dl=1', title: 'cesta krystof v.1' },
  { src: 'https://www.dropbox.com/scl/fi/ydc898bua4j48zy6wk325/cesta-krystof-v.2.mp3?rlkey=xu8iyjtfk1teyj8ysc88v0sdt&st=5egj170w&dl=1', title: 'cesta krystof v.2' },
  { src: 'https://www.dropbox.com/scl/fi/7hbodk9f03dmzzswe5c9d/Journey-Through-i-kov-jirka-remake-v.1.mp3?rlkey=qam6zmao3wcv3bli3qr62d2g0&st=eimcbma2&dl=1', title: 'Journey Through Žižkov jirka remake v.1' },
  { src: 'https://www.dropbox.com/scl/fi/4y61fb4wv70ct64yqezzh/Journey-Through-i-kov-jirka-remake-v.2.mp3?rlkey=iheqc9qo6409fux274dk3uj0q&st=sqhoocsp&dl=1', title: 'Journey Through Žižkov jirka remake v.2' },
  { src: 'https://www.dropbox.com/scl/fi/r2xiv7vz84djw4rl44rkk/Journey-Through-i-kov-jirka-remake-v.3.mp3?rlkey=p6l7eo5sfortyvr6omwqlc1lo&st=lj2kpxo7&dl=1', title: 'Journey Through Žižkov jirka remake v.3' },
  { src: 'https://www.dropbox.com/scl/fi/l7fsiidq9u7pad9o19qd8/Kr-ma-U-D-tenic.mp3?rlkey=tvy2t3mgfqj2xgoptu3gsp0or&st=zh38xe5o&dl=1', title: 'Krčma v Dětenicích v.1' },
  { src: ' https://www.dropbox.com/scl/fi/ravwza7pm2b0f2dgi0oyo/Kr-ma-v-D-tenic-ch.mp3?rlkey=kikl7nr5k6zw41x9xm6ufg2dt&st=6nj05mib&dl=1', title: 'Krčma v Dětenicích v.2' },
  { src: 'https://www.dropbox.com/scl/fi/7jygh1xw8puztqy6pdmcd/Srdce-mezi-hv-zdami-Star-Trek-v2.0.mp3?rlkey=67khxsi9ond3inf2g43pa3z8e&st=f8ytrufm&dl=1 ', title: 'Srdce mezi hvězdami Star Trek V.3.0' },
  { src: ' https://www.dropbox.com/scl/fi/m8v17v8uc182qbjgo4s6c/Srdce-na-Dlani.mp3?rlkey=k6zuatqhqwcpkc8bfax7oc4um&st=bpa3l6mm&dl=1', title: 'Srdce-na-Dlani' },
  { src: 'https://www.dropbox.com/scl/fi/93f309yudg0w78ylcikll/SuvwI-pu-maH-qa-wIquvmoH-QeylIS-HoS-oH-mInmaj-voqchu-mo-cha-law-maH-neH-Qap-DujDajDaq-jach-full-verze-2.mp3?rlkey=zt0f4a2luk8pnb8kxe55h3t05&st=dak2m66f&dl=0', title: 'Klingonská píseň' },    
  ];
function checkAndFixTracks(tracks) {
               let fixedUrls = 0;
               let validTracks = 0;
               
               if (!Array.isArray(tracks)) {
                   console.error("❌ Chyba: seznam skladeb není pole nebo je prázdný.");
                   return;
               }
               
               tracks.forEach(track => {
                   if (track.src) {
                       if (track.src.includes("dl=0")) {
                           track.src = track.src.replace("dl=0", "dl=1");
                           fixedUrls++;
                       }
                   }
                   
                   if (typeof track === 'object' && track.title && track.title.trim() && !track.title.includes("—")) {
                       validTracks++;
                   }
               });
               
               // Souhrnný výpis na dva řádky
               console.log(`✅ Kontrola dokončena - Celkem skladeb: ${tracks.length}, Opraveno URL: ${fixedUrls}`);
               console.log(`🔍 Platných skladeb: ${validTracks}, Zkontrolováno URL: ${tracks.length}`);
           }
           
           // Spuštění kontroly
           checkAndFixTracks(tracks);
    
  // Aktuální index skladby
  let currentTrackIndex = 0;
  let isShuffled = false;
  let shuffledIndices = [];
  
  // Naplnění playlistu - DŮLEŽITÁ OPRAVA: exportujeme tuto funkci do window objektu
  window.populatePlaylist = function() {
    console.log("Spouštím populatePlaylist");
    if (!playlist) {
      console.error("Element playlist nebyl nalezen!");
      return;
    }
    playlist.innerHTML = '';
    tracks.forEach((track, index) => {
      const item = document.createElement('div');
      item.className = 'playlist-item';
      
      // Zvýraznění aktivní skladby
      if (index === currentTrackIndex) {
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 🚀 Posun na aktuální skladbu
      }
      
      item.textContent = track.title;
        
        // Přidání tlačítka pro oblíbené
        const favButton = document.createElement('button');
        favButton.className = 'favorite-button';
        favButton.textContent = favorites.includes(track.title) ? '⭐' : '☆';
        favButton.onclick = (e) => {
          e.stopPropagation(); // Zabrání spuštění události kliknutí na playlist item
          toggleFavorite(index);
        };
        
        // Přidání favButton do položky playlistu
        item.appendChild(favButton);
        
        item.addEventListener('click', () => {
          console.log("Kliknuto na položku:", index);
          window.playTrack(index);  // Upraveno: používáme window.playTrack místo playTrack
          updateButtonStyles(true);
          updateFavoriteDisplay();
        });
        
        playlist.appendChild(item);
      });
      
      // Po inicializaci playlistu načteme první skladbu (bez přehrání)
      if (tracks.length > 0) {
        const firstTrack = tracks[0];
        audioSource.src = firstTrack.src;
        trackTitle.textContent = firstTrack.title;
        audioPlayer.load(); // připravíme ji k přehrání
      }
  };
  
  // Upravená funkce pro aktualizaci aktivní skladby v playlistu
  function updateActiveTrack() {
    console.log("Aktualizuji aktivní skladbu, index:", currentTrackIndex);
    const items = document.querySelectorAll('.playlist-item');
    
    items.forEach((item, index) => {
      if (index === currentTrackIndex) {
        item.classList.add('active');
        
        // Zajistíme, že je položka viditelná při scrollování
        setTimeout(() => {
          // Použijeme timeout pro zajištění, že DOM je připraven
          item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        item.classList.remove('active');
      }
    });
  }
  
  // Inicializace playlistu
  window.populatePlaylist();
  
  let currentPlaybackId = 0;
  
  // DŮLEŽITÁ OPRAVA: Exportujeme funkci playTrack do window objektu
  window.playTrack = function(index) {
    currentTrackIndex = index;
    const track = tracks[index];
    audioSource.src = track.src;
    trackTitle.textContent = track.title;
    currentPlaybackId++; // Nový pokus
    const thisPlaybackId = currentPlaybackId;
    updateButtonStyles(true);
    // Bezpečné zastavení předchozího přehrávání
    audioPlayer.pause();
    audioPlayer.load();
    audioPlayer.oncanplaythrough = () => {
      if (thisPlaybackId !== currentPlaybackId) {
        console.log("Zrušeno: jiný track byl mezitím zvolen.");
        return;
      }
      audioPlayer.play()
        .then(() => {
          console.log("Přehrávání skladby:", track.title);
          updateActiveTrack();
          updateButtonStyles(true);
        })
        .catch(error => {
          console.error('Chyba při přehrávání:', error);
          trackTitle.textContent = 'Chyba při přehrávání - zkontrolujte URL skladby';
        });
    };
  };

  // Přehrání další skladby
  function playNextTrack() {
    if (isShuffled) {
      if (shuffledIndices.length === 0) {
        generateShuffledIndices();
      }
      currentTrackIndex = shuffledIndices.pop();
    } else {
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    }
    console.log("Přehrávání další skladby, nový index:", currentTrackIndex);
    playTrack(currentTrackIndex);
    updateButtonStyles(true);  
  }

  function playPrevTrack() {
    if (isShuffled) {
      if (shuffledIndices.length === 0) {
        generateShuffledIndices();
      }
      currentTrackIndex = shuffledIndices.pop();
    } else {
      currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    }
    console.log("Přehrávání předchozí skladby, nový index:", currentTrackIndex);
    playTrack(currentTrackIndex);
    updateButtonStyles(true);    
  }

  // Generování seznamu náhodně zamíchaných indexů
  function generateShuffledIndices() {
    shuffledIndices = Array.from({ length: tracks.length }, (_, i) => i)
      .filter(i => i !== currentTrackIndex);
    
    // Fisher-Yates shuffle
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }
  }

  // Formátování času
  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return {
      hours: String(h).padStart(2, '0'),
      minutes: String(m).padStart(2, '0'),
      seconds: String(s).padStart(2, '0')
    };
  }

  // Aktualizace času přehrávání
  function updateTimeDisplay() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration || 0;
    const formattedCurrentTime = formatTime(currentTime);
    const formattedDuration = formatTime(duration);
    
    const currentTimeParts = currentTimeDisplay.querySelectorAll('.time-part');
    currentTimeParts[0].textContent = formattedCurrentTime.hours;
    currentTimeParts[1].textContent = formattedCurrentTime.minutes;
    currentTimeParts[2].textContent = formattedCurrentTime.seconds;
    
    const durationParts = durationDisplay.querySelectorAll('.time-part');
    durationParts[0].textContent = formattedDuration.hours;
    durationParts[1].textContent = formattedDuration.minutes;
    durationParts[2].textContent = formattedDuration.seconds;
    
    // Aktualizace progress baru
    if (!isNaN(duration) && duration > 0) {
      progressBar.value = (currentTime / duration) * 100;
    }
  }

  // Event listenery pro audio player
  audioPlayer.addEventListener('timeupdate', updateTimeDisplay);
  
  audioPlayer.addEventListener('ended', function() {
    if (audioPlayer.loop) {
      audioPlayer.currentTime = 0;
      audioPlayer.play();
    } else {
      playNextTrack();
    }
  });

  audioPlayer.addEventListener('loadedmetadata', function() {
    updateTimeDisplay();
  });
  
  audioPlayer.addEventListener('pause', () => {
    playButton.classList.remove('active');
  });

  audioPlayer.addEventListener('ended', () => {
    playButton.classList.remove('active');
  });
  
playButton.addEventListener('click', function(event) {
  event.preventDefault(); // Aby platil vždy

  if (audioSource.src) {
    audioPlayer.play();
    playButton.classList.add('active');
    pauseButton.classList.remove('active');
    updateButtonStyles(true);
    
    // Aktualizace aktivní skladby v playlistu a posun na ni
    updateActiveTrack();
    
    // Ujištění, že playlist je viditelný před scrollováním
    if (playlist.style.display === 'none' || playlist.style.display === '') {
      // Volitelně: Můžeš dočasně zobrazit playlist, aby bylo vidět scrollování
      // playlist.style.display = 'block';
      // setTimeout(() => { if (!playlistVisible) playlist.style.display = 'none'; }, 2000);
    }
  } else if (tracks.length > 0) {
    playTrack(0);
    updateButtonStyles(true);
  }
});



  pauseButton.addEventListener('click', function() {
    audioPlayer.pause();
  });
  
  prevButton.addEventListener('click', playPrevTrack);
  nextButton.addEventListener('click', playNextTrack);

  loopButton.addEventListener('click', function() {
  audioPlayer.loop = !audioPlayer.loop;
  if (audioPlayer.loop) {
    // Aktivní stav s oranžovou #FFA500
    loopButton.style.backgroundColor = '#FFA500';
    loopButton.style.color = 'var(--main-bg-color)';
  } else {
    // Neaktivní stav zůstává stejný
    loopButton.style.backgroundColor = 'var(--button-bg)';
    loopButton.style.color = 'var(--text-color)';
  }
});
  
  pauseButton.addEventListener('click', function() {
    audioPlayer.pause();
    // Přidání aktivní třídy pro pauzu
    pauseButton.classList.add('active');
    // Pokud hraje hudba, odebereme aktivní třídu z play tlačítka
    playButton.classList.remove('active');
  });

  shuffleButton.addEventListener('click', function() {
    isShuffled = !isShuffled;
    if (isShuffled) {
      generateShuffledIndices();
      shuffleButton.style.backgroundColor = 'var(--accent-color)';
      shuffleButton.style.color = 'var(--main-bg-color)';
    } else {
      shuffleButton.style.backgroundColor = 'var(--button-bg)';
      shuffleButton.style.color = 'var(--text-color)';
    }
  });

  resetButton.addEventListener('click', function() {
    audioPlayer.currentTime = 0;
  });

  toggleInfoButton.addEventListener('click', function() {
    if (popisky.style.display === 'none' || popisky.style.display === '') {
      popisky.style.display = 'block';
    } else {
      popisky.style.display = 'none';
    }
  });

  togglePlaylistButton.addEventListener('click', function() {
    if (playlist.style.display === 'none' || playlist.style.display === '') {
      playlist.style.display = 'block';
      // Zajistíme, že aktivní skladba bude viditelná
      const activeItem = document.querySelector('.playlist-item.active');
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else {
      playlist.style.display = 'none';
    }
  });

  reloadButton.addEventListener('click', function() {
    location.reload();
  });

  // Progress bar
  progressBar.addEventListener('input', function() {
    const seekTime = audioPlayer.duration * (progressBar.value / 100);
    audioPlayer.currentTime = seekTime;
  });

  // Funkce pro práci s oblíbenými
  function toggleFavorite(trackIndex) {
    console.log("Přepínám oblíbenou skladbu na indexu:", trackIndex);
    const track = tracks[trackIndex];
    if (track && track.title) {
      const index = favorites.indexOf(track.title);
      
      if (index === -1) {
        console.log("Přidávám skladbu do oblíbených:", track.title);
        favorites.push(track.title);
      } else {
        console.log("Odebírám skladbu z oblíbených:", track.title);
        favorites.splice(index, 1);
      }
      
      localStorage.setItem('favorites', JSON.stringify(favorites));
      updateFavoriteDisplay();
    }
  }

  function updateFavoriteDisplay() {
    console.log("Aktualizuji zobrazení oblíbených skladeb");
    const items = playlist.getElementsByClassName('playlist-item');
    Array.from(items).forEach((item, index) => {
      const favButton = item.querySelector('.favorite-button');
      const track = tracks[index];
      if (favButton && track && track.title) {
        favButton.textContent = favorites.includes(track.title) ? '⭐' : '☆';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    let currentSliderValue = parseFloat(volumeSlider.value);

    switch (e.code) {
      case 'KeyD':
        currentSliderValue = Math.min(currentSliderValue + 0.01, 1);
        volumeSlider.value = currentSliderValue;
        audioPlayer.volume = logarithmicVolume(currentSliderValue);
        break;

      case 'KeyA':
        currentSliderValue = Math.max(currentSliderValue - 0.01, 0);
        volumeSlider.value = currentSliderValue;
        audioPlayer.volume = logarithmicVolume(currentSliderValue);
        break;
    }

    // 🎯 Nový kód pro update čísla v volumeValue
    const volumePercentage = Math.round(currentSliderValue * 100);
    volumeValue.textContent = volumePercentage;

    updateVolumeIcon();
  });
           
  document.addEventListener('keydown', (e) => {
    const playlistContainer = document.getElementById('playlist');
    const scrollAmount = 100;

    if (['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyM', 'KeyL', 'KeyP', 'KeyS', 'KeyR', 'KeyF', 'KeyA', 'KeyD'].includes(e.code)) {
      e.preventDefault();
    }

    switch (e.code) {
      case 'ArrowUp':
        console.log('Scrollování playlistu nahoru');
        playlistContainer.scrollTop -= scrollAmount;
        break;

      case 'ArrowDown':
        console.log('Scrollování playlistu dolů');
        playlistContainer.scrollTop += scrollAmount;
        break;

      case 'ArrowLeft':
        console.log('Přepnutí na předchozí skladbu');
        playPrevTrack();
        event.preventDefault();
        break;

      case 'ArrowRight':
        console.log('Přepnutí na další skladbu');
        playNextTrack();
        break;

      case 'Space':
      case 'KeyP':
        console.log(`${audioPlayer.paused ? 'Spouštím' : 'Pozastavuji'} přehrávání`);
        if (audioPlayer.paused) {
          if (typeof playTrack === 'function' && currentTrackIndex !== undefined) {
            playTrack(currentTrackIndex);
          } else {
            audioPlayer.play();
          }
        } else {
          audioPlayer.pause();
        }
        updateButtonStyles(!audioPlayer.paused);
        break;

      case 'KeyM':
        console.log('Přepínání ztlumení zvuku');
        muteButton.click();
        break;

      case 'KeyL':
        console.log('Přepínání smyčky');
        loopButton.click();
        
        // Tohle je důležité: upravíme pouze loopButton a ne ostatní
        loopButton.classList.toggle('active', audioPlayer.loop);
        
        // Tlačítka pro play/pause by měla stále reagovat na aktuální stav přehrávání
        updateButtonStyles(!audioPlayer.paused);
        break;

      case 'KeyS':
        console.log('Zastavení přehrávání a reset pozice');
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        break;

      case 'KeyR':
        console.log('Restart aktuální skladby');
        audioPlayer.currentTime = 0;
        audioPlayer.play().catch(err => console.log('Chyba při přehrávání:', err));
        break;

      case 'KeyF':
        console.log(`${document.fullscreenElement ? 'Opouštím' : 'Vstupuji do'} režimu celé obrazovky`);
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
        break;

      case 'KeyA':
        let volumeDown = Math.max(parseFloat(volumeSlider.value) - 0.01, 0);
        volumeSlider.value = volumeDown;
        audioPlayer.volume = logarithmicVolume(volumeDown);
        updateVolumeIcon();
        break;

      case 'KeyD':
        let volumeUp = Math.min(parseFloat(volumeSlider.value) + 0.01, 1);
        volumeSlider.value = volumeUp;
        audioPlayer.volume = logarithmicVolume(volumeUp);
        updateVolumeIcon();
        break;
    }

    // Obnov číselný ukazatel hlasitosti
    const volumePercentage = Math.round(parseFloat(volumeSlider.value) * 100);
    volumeValue.textContent = volumePercentage;
  });

  // Inicializace
  if (tracks.length > 0) {
    trackTitle.textContent = tracks[0].title;
  }
  
  // Přidání CSS přímo z JavaScriptu pro zajištění aplikace stylu
const styleElement = document.createElement('style');
styleElement.textContent = `
  /* Obecné styly pro playlist kontejner */
#playlist {
    counter-reset: playlist-counter;
    padding: 0px;
    overflow-y: auto;
    border: 1px solid #0f0;
    margin: 20px auto 0 auto;
    margin-top: 20px;
    scrollbar-width: thin;
    scrollbar-color: var(--primary-color) var(--background-dark);
    position: relative;
    user-select: none; /* Zabrání označení textu */
    z-index: 2; /* Zajišťuje, že titulky a ovládání času budou nad pozadím */
    background: var(--background-light);
     
    color: var(--text-primary);
    border-radius: 20px;
    width: 98%; /* Rozšíření na celou šířku */
     margin: 0 auto;
}

/* Skrytý playlist */
#playlist.hidden {
    max-height: 0;
    opacity: 0;
    margin: 0;
    padding: 0;
}

/* Scrollbar styly */
#playlist::-webkit-scrollbar {
    width: 6px;
}

#playlist::-webkit-scrollbar-track {
    background: var(--background-dark);
}

#playlist::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 3px;
}

/* Animace pro plynulé přechody */
.playlist-transition {
    transition: all 0.3s ease-in-out;
}

/* Položka playlistu */
.playlist-item {
    position: relative;
    padding: 5px 0;
    margin: 3px 0;
    padding-left: 40px;
    padding-right: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 16px;
    min-height: 15px; /* Minimální výška položky */
}

/* Levé číslování */
.playlist-item::before {
    content: counter(playlist-counter);
    counter-increment: playlist-counter;
    position: absolute;
    left: 15px; /* Posunuto vlevo s šipkou <<< */
    color: white;
    opacity: 0.7;
    width: 24px;
    text-align: center;
    font-size: 16px;
}

/* Pravé číslování */
.playlist-item::after {
    content: counter(playlist-counter);
    position: absolute;
    right: 15px; /* Posunuto vpravo s šipkou >>> */
    color: white;
    opacity: 0.7;
    width: 24px;
    text-align: center;
    font-size: 16px;
}

/* Text uvnitř položky playlistu */
.playlist-item span {
    flex: 1;
    text-align: center;
    line-height: 1.1; /* Zmenšeno pro lepší vertikální kompaktnost */
}

/* Hover efekt */
.playlist-item:hover {
    background: rgba(33, 150, 243, 0.15);
}

/* Zachování zvýraznění aktivní skladby */
.playlist-item.active {
    background: linear-gradient(45deg, rgba(33, 150, 243, 0.2), rgba(0, 255, 128, 0.2)) !important;
    color: var(--text-primary) !important;
    font-weight: bold !important;
    border-left: 3px solid #fff !important;
    box-shadow: 0 0 8px rgba(71, 169, 255, 0.7) !important;
    font-size: 16px;
}

/* Styly pro tlačítko oblíbených */
.favorite-button {
    margin-left: 10px;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #ffc107; /* Zlatá barva */
    z-index: 3;  
    margin-top: 0px;
}

.favorite-button:hover {
    color: #ff9800;
    z-index: 3; 
}

.favorite-button:active {
    color: #ffa726;
    z-index: 3; 
}

/* Styly pro toggle tlačítko */
#toggle-playlist-button {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 0px;
    color: var(--text-primary);
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 600;
    padding: 12px 20px;
    transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    z-index: 2;
     margin: 1px 0 auto;
            background: transparent;     /* Průhledné pozadí */
    border: 4px solid #3498db; /* Tenký bílý průhledný rámeček */
    margin-bottom: 10px;
}

#toggle-playlist-button:hover {
    background: var(--primary-color);
    transform: translateY(-2px);
     
}

#toggle-playlist-button.active {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.1);
}
/* Základní @media queries pro playlist */

/* Pro mobilní telefony (menší obrazovky) */
@media only screen and (max-width: 480px) {
  #playlist {
    width: 98%;
    border-radius: 0px;
    margin-top: 5px;
  }
  
  .playlist-item {
    padding-left: 30px;
    padding-right: 30px;
    font-size: 13px;
    min-height: 20px;
  }
  
  .playlist-item::before {
    left: 10px;
    font-size: 13px;
  }
  
  .playlist-item::after {
    right: 10px;
    font-size: 13px;
  }
  /* Zachování zvýraznění aktivní skladby */
.playlist-item.active {
    background: linear-gradient(45deg, rgba(33, 150, 243, 0.2), rgba(0, 255, 128, 0.2)) !important;
    color: var(--text-primary) !important;
    font-weight: bold !important;
    border-left: 10px solid #fff !important;
    box-shadow: 0 0 8px rgba(71, 169, 255, 0.7) !important;
    font-size: 5px;
}
  .favorite-button {
    font-size: 13px;
  }
}
/* Styly pro toggle tlačítko */
#toggle-playlist-button {
    padding: 12px 12px;
    font-size: 15px;
    min-width: 1px;
    margin: 0;  /* Odstraníme margin pro těsné přiléhání */
    background: transparent;  /* Průhledné pozadí */
    border: 4px solid #3498db;  /* Tenký modrý rámeček */
}
/* Pro tablety (střední obrazovky) */
@media only screen and (min-width: 481px) and (max-width: 768px) {
  #playlist {
    width: 98%;
    border-radius: 0px;
  }
  
  .playlist-item {
    padding-left: 35px;
    padding-right: 35px;
    font-size: 13px;
    min-height: 14px;
  }
}
/* Zachování zvýraznění aktivní skladby */
.playlist-item.active {
    background: linear-gradient(45deg, rgba(33, 150, 243, 0.2), rgba(0, 255, 128, 0.2)) !important;
    color: var(--text-primary) !important;
    font-weight: bold !important;
    border-left: 2px solid #fff !important;
    box-shadow: 0 0 2px rgba(71, 169, 255, 0.7) !important;
    font-size: 13px;
}
/* Pro orientaci na výšku (portrait mode) */
@media (orientation: portrait) {
  #toggle-playlist-button {
    padding: 5px 5px;
    font-size: 1.2rem;
  }
}

/* Pro zařízení s dotykovým displejem */
@media (hover: none) {
  .playlist-item {
    padding-top: 8px;
    padding-bottom: 10px;
    font-size: 13px;
  }
  
  .playlist-item:active {
    background: rgba(33, 150, 243, 0.15);
     font-size: 10px;
  }
}
/* Zachování zvýraznění aktivní skladby */
.playlist-item.active {
    background: linear-gradient(45deg, rgba(33, 150, 243, 0.2), rgba(0, 255, 128, 0.2)) !important;
    color: var(--text-primary) !important;
    font-weight: bold !important;
    border-left: 1px solid #fff !important;
    box-shadow: 0 0 5px rgba(71, 169, 255, 0.7) !important;
    font-size: 13px;
}
/* Pro tmavý režim, pokud jej systém podporuje */
@media (prefers-color-scheme: dark) {
  #playlist {
    border-color: #0c0;
  }
  
  .playlist-item {
    background: rgba(255, 255, 255, 0.07);
   font-size: 13px;
  }
  
  .playlist-item:hover {
    background: rgba(33, 150, 243, 0.2);
     font-size: 13px;
  }
}
`;
document.head.appendChild(styleElement);
  
function updateButtonStyles(isPlaying) {
  // 🎛 Stylování tlačítek
  if (isPlaying) {
    playButton.classList.add('active');
    pauseButton.classList.remove('active');
  } else {
    playButton.classList.remove('active');
    pauseButton.classList.add('active');
  }

  // 🎵 Stylování playlistu (předpokládáme .playlist-item a currentTrackIndex)
  document.querySelectorAll('.playlist-item').forEach((item, index) => {
    if (index === currentTrackIndex) {
      item.classList.add('active'); // ✅ zvýrazní aktivní skladbu
    } else {
      item.classList.remove('active');
    }
  });
}

  function initStorageNotificationSystem() {
    // Tohle je inicializační log pro systém
    console.log('%c[Notifikace] Systém notifikací byl úspěšně inicializován', 'color: #4CAF50; font-weight: bold');

    // Příklad notifikace, která se zobrazí, pokud je místo v úložišti nízké
    if (navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then(({ quota, usage }) => {
            const usedSpace = Math.round((usage / quota) * 100); // Kolik % úložiště je využito
            logStorageUsage(usedSpace);
            if (usedSpace > 80) {
                showStorageWarning('Úložiště je téměř plné!');
            } else {
                showStorageStatus(`Úložiště využívá ${usedSpace}%`);
            }
        });
    } else {
        console.error('API pro správu úložiště není podporováno.');
    }
}

// Funkce pro zobrazení stavu úložiště
function logStorageUsage(usedSpace) {
    console.log(`%c[Úložiště] Aktuálně využíváno: ${usedSpace}%`, 'color: #FFC107; font-weight: bold');
}

// Funkce pro zobrazení varování, pokud je úložiště plné
function showStorageWarning(message) {
    console.log('%c[Varování] ' + message, 'color: #f44336; font-weight: bold');
}

// Funkce pro zobrazení běžného stavu úložiště
function showStorageStatus(message) {
    console.log('%c[Stav úložiště] ' + message, 'color: #4CAF50; font-weight: bold');
}

  // Inicializace notifikačního systému pro ukládání
  initStorageNotificationSystem();
});

// Fullscreen funkce
console.log("Inicializace tlačítka pro fullscreen.");
const fullscreenToggle = document.getElementById("fullscreen-toggle");

// Funkce pro aktualizaci stylu tlačítka podle fullscreen stavu
function updateFullscreenButton() {
  if (document.fullscreenElement) {
    fullscreenToggle.classList.add("active");
    fullscreenToggle.textContent = "⛶ ";
    console.log("Přecházím na celou obrazovku.");
  } else {
    fullscreenToggle.classList.remove("active");
    fullscreenToggle.textContent = "⛶ ";
    console.log("Odcházím z celé obrazovky.");
  }
}

// Event listener na tlačítko fullscreen
fullscreenToggle.addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen().catch(err => {
      console.error("Fullscreen request failed: ", err);
    });
  }
});

// Event listener pro detekci změny fullscreen režimu
document.addEventListener("fullscreenchange", updateFullscreenButton);

// Funkce pro vytvoření jednotného menu místo jednotlivých tlačítek
function createUnifiedMenu() {
  const playerControls = document.querySelector('.controls');
  if (!playerControls) return;
  
  // Odstraníme existující tlačítka, pokud existují
  const existingButtons = [
    '#save-storage-button', 
    '#clear-storage-button', 
    '#storage-settings-button',
    '#storage-info-button',
    '#toggle-tracks-button'
  ];
  
  existingButtons.forEach(selector => {
    const button = document.querySelector(selector);
    if (button) button.remove();
  });
  
  // Vytvoříme nové tlačítko pro menu
  const menuButton = document.createElement('button');
  menuButton.id = 'storage-menu-button';
  menuButton.textContent = '☰'; // Menu ikona
  menuButton.title = 'Menu pro správu skladeb';
  menuButton.className = 'control-button';
  
  // Přidáme CSS pro vzhled menu
  const style = document.createElement('style');
  style.textContent = `
    #storage-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 9998;
      display: none;
    }
    
    #storage-menu {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: var(--main-bg-color, #222);
      border: 2px solid var(--accent-color, #4772a5);
      border-radius: 8px;
      padding: 15px;
      z-index: 9999;
      min-width: 250px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      display: none;
    }
    
    #storage-menu h3 {
      margin-top: 0;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--accent-color, #4772a5);
      text-align: center;
    }
    
    #storage-menu-close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      background: none;
      border: none;
      color: var(--text-color, #fff);
      font-size: 18px;
    }
    
    .menu-item {
      display: flex;
      align-items: center;
      padding: 8px 10px;
      margin: 5px 0;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    
    .menu-item:hover {
      background-color: var(--accent-color, #4772a5);
      color: var(--main-bg-color, #222);
    }
    
    .menu-item-icon {
      margin-right: 10px;
      font-size: 18px;
      min-width: 24px;
      text-align: center;
    }
    
    .menu-item-active {
      background-color: var(--accent-color, #4772a5);
      color: var(--main-bg-color, #222);
    }
    
    #storage-menu-button.active {
      background-color: var(--accent-color, #4772a5);
      color: var(--main-bg-color, #222);
    }
  `;
  document.head.appendChild(style);
  
  // Vytvoříme overlay a menu kontejner
  const overlay = document.createElement('div');
  overlay.id = 'storage-menu-overlay';
  
  const menu = document.createElement('div');
  menu.id = 'storage-menu';
  
  // Přidáme nadpis menu
  const menuTitle = document.createElement('h3');
  menuTitle.textContent = 'Správa skladeb';
  menu.appendChild(menuTitle);
  
  // Přidáme tlačítko pro zavření
  const closeButton = document.createElement('button');
  closeButton.id = 'storage-menu-close';
  closeButton.textContent = '×';
  closeButton.title = 'Zavřít menu';
  menu.appendChild(closeButton);
  
  // Definujeme položky menu
  const menuItems = [
    { icon: '💾', text: 'Uložit playlist', id: 'save-tracks', action: function() {
      saveTracks();
      saveCurrentTrackIndex();
      savePlayerSettings();
      showNotification(`💾 Nastavení a ${userTracksToSave} skladeb uloženo`, 2000);
      hideMenu();
    }},
    { icon: '🗑️', text: 'Vymazat uložená data', id: 'clear-storage', action: function() {
      if (confirm('Opravdu chcete vymazat všechna uložená data?')) {
        localStorage.removeItem(STORAGE_CONFIG.TRACKS_KEY);
        localStorage.removeItem(STORAGE_CONFIG.CURRENT_TRACK_KEY);
        localStorage.removeItem(STORAGE_CONFIG.VOLUME_KEY);
        localStorage.removeItem(STORAGE_CONFIG.SHUFFLE_KEY);
        localStorage.removeItem(STORAGE_CONFIG.LOOP_KEY);
        localStorage.removeItem('musicPlayer_settings');
        showNotification("🗑️ Všechna uložená data byla vymazána", 2000);
        hideMenu();
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    }},
    { icon: '⚙️', text: 'Nastavení ukládání', id: 'storage-settings', action: function() {
      const newCount = prompt(`Zadej počet skladeb k uložení (1-285)\nAktuálně: ${userTracksToSave}`, userTracksToSave);
      if (newCount !== null) {
        const count = parseInt(newCount, 10);
        if (setTracksToSave(count)) {
          savePlayerSettings(); // Uložení nastavení
        }
      }
      hideMenu();
    }},
    { icon: 'ℹ️', text: 'Informace o úložišti', id: 'storage-info', action: function() {
      const usage = showStorageUsage();
      showNotification(`Využití úložiště: ${(usage / 1024).toFixed(2)} KB`, 5000);
      hideMenu();
    }},
    { icon: '📻', text: 'Přepnout na uložené skladby', id: 'toggle-tracks', toggleState: true, action: function() {
      // Přepneme stav
      window.showingAllTracks = !window.showingAllTracks;
      
      const menuItem = document.getElementById('toggle-tracks');
      
      if (window.showingAllTracks) {
        // Zobrazit všechny skladby
        window.tracks = window.originalTracks || window.allTracks;
        showNotification(`📋 Zobrazeno všech ${window.tracks.length} skladeb`, 2000);
        menuItem.querySelector('.menu-item-icon').textContent = '📻';
        menuItem.querySelector('.menu-item-text').textContent = 'Přepnout na uložené skladby';
        menuItem.classList.remove('menu-item-active');
      } else {
        // Zobrazit jen uložené skladby
        if (window.savedTracks && window.savedTracks.length > 0) {
          window.tracks = window.savedTracks;
          showNotification(`💾 Zobrazeno ${window.tracks.length} uložených skladeb`, 2000);
          menuItem.querySelector('.menu-item-icon').textContent = '💾';
          menuItem.querySelector('.menu-item-text').textContent = 'Přepnout na všechny skladby';
          menuItem.classList.add('menu-item-active');
          
          // Načtení aktuální skladby z paměti
          loadCurrentTrackFromMemory();
        } else {
          showNotification("⚠️ Žádné uložené skladby nenalezeny", 2000);
          window.showingAllTracks = true; // Vrátíme stav zpět
        }
      }
      
      // Aktualizujeme playlist
      if (typeof populatePlaylist === 'function') {
        populatePlaylist();
        
        // Aktualizujeme aktivní skladbu v playlistu
        if (typeof updateActiveTrack === 'function') {
          updateActiveTrack();
        }
      }
      
      hideMenu();
    }}
  ];
  
  // Vytvoříme položky menu
  menuItems.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.id = item.id;
    
    const icon = document.createElement('span');
    icon.className = 'menu-item-icon';
    icon.textContent = item.icon;
    
    const text = document.createElement('span');
    text.className = 'menu-item-text';
    text.textContent = item.text;
    
    menuItem.appendChild(icon);
    menuItem.appendChild(text);
    menuItem.addEventListener('click', item.action);
    
    menu.appendChild(menuItem);
  });
  
  // Přidáme menu a overlay do dokumentu
  document.body.appendChild(overlay);
  document.body.appendChild(menu);
  
  // Funkce pro zobrazení menu
  function showMenu() {
    overlay.style.display = 'block';
    menu.style.display = 'block';
    menuButton.classList.add('active');
    
    // Aktualizace stavu přepínače skladeb
    const toggleItem = document.getElementById('toggle-tracks');
    if (toggleItem && !window.showingAllTracks) {
      toggleItem.classList.add('menu-item-active');
      toggleItem.querySelector('.menu-item-icon').textContent = '💾';
      toggleItem.querySelector('.menu-item-text').textContent = 'Přepnout na všechny skladby';
    }
  }
  
  // Funkce pro skrytí menu
  function hideMenu() {
    overlay.style.display = 'none';
    menu.style.display = 'none';
    menuButton.classList.remove('active');
  }
  
  // Event listenery pro otevírání a zavírání menu
  menuButton.addEventListener('click', function(e) {
    e.stopPropagation();
    if (menu.style.display === 'block') {
      hideMenu();
    } else {
      showMenu();
    }
  });
  
  closeButton.addEventListener('click', hideMenu);
  overlay.addEventListener('click', hideMenu);
  
  // Zabráníme kliknutí skrz menu
  menu.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
  // Přidáme tlačítko do UI
  playerControls.appendChild(menuButton);
  
  console.log("Menu pro správu skladeb bylo vytvořeno");
}

// Nahradíme původní funkce pro vytváření tlačítek touto novou funkcí
function initStorageSystem() {
  // Proměnná pro zobrazování notifikací
  let notificationBox;
  
  // Konstanty pro nastavení ukládání
  const STORAGE_CONFIG = {
    TRACKS_KEY: 'musicPlayer_tracks',
    CURRENT_TRACK_KEY: 'musicPlayer_currentTrack',
    VOLUME_KEY: 'musicPlayer_volume',
    SHUFFLE_KEY: 'musicPlayer_shuffle',
    LOOP_KEY: 'musicPlayer_loop',
    MAX_STORAGE_SIZE: 4.5 * 1024 * 1024, // 4.5 MB maximum (localStorage je typicky 5MB)
    DEFAULT_TRACKS_TO_SAVE: 285 // Výchozí počet skladeb k uložení
  };
  
  // Proměnná pro uživatelské nastavení počtu skladeb k uložení
  let userTracksToSave = STORAGE_CONFIG.DEFAULT_TRACKS_TO_SAVE;
  
  // Vytvoření notifikačního prvku
  function createNotificationElement() {
    notificationBox = document.createElement('div');
    notificationBox.id = 'storage-notification';
    notificationBox.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px 15px;
      background-color: var(--accent-color, #4772a5);
      color: white;
      border-radius: 5px;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      z-index: 9999;
      transition: opacity 0.5s;
      opacity: 0;
      pointer-events: none;
    `;
    document.body.appendChild(notificationBox);
  }
  
  // Funkce pro zobrazení notifikace
  function showNotification(message, duration = 3000) {
    if (!notificationBox) return;
    
    notificationBox.textContent = message;
    notificationBox.style.opacity = '1';
    
    console.log(message); // Logování do konzole
    
    setTimeout(() => {
      notificationBox.style.opacity = '0';
    }, duration);
  }
  
  // Pomocná funkce pro zjištění velikosti dat
  function getDataSize(data) {
    const jsonString = JSON.stringify(data);
    return new Blob([jsonString]).size;
  }
  
  // Funkce pro kompresi dat
  function compressData(data) {
    // Pokud dostaneme objekty, budeme pracovat s redukovanými vlastnostmi
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
      return data.map(item => {
        // Vytvoříme nový objekt jen s potřebnými vlastnostmi
        const minimalItem = {};
        // Zachováme jen důležité vlastnosti
        if (item.title) minimalItem.title = item.title;
        if (item.src) minimalItem.src = item.src;
        // Další vlastnosti můžeme přidat podle potřeby
        return minimalItem;
      });
    }
    
    // Pro ostatní typy dat vrátíme původní data
    return data;
  }
  
  // Vyčištění localStorage a zjištění, kolik místa je k dispozici
  function cleanupStorage() {
    try {
      // Pokud je localStorage příliš plný, vyčistíme některé položky
      let totalSize = 0;
      const keysToKeep = Object.values(STORAGE_CONFIG).filter(v => typeof v === 'string');
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        totalSize += key.length + value.length;
        
        // Odstraníme položky, které nejsou v našem seznamu klíčů k uchování
        if (!keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      }
      
      return STORAGE_CONFIG.MAX_STORAGE_SIZE - totalSize;
    } catch (e) {
      console.error("Chyba při čištění localStorage:", e);
      return 0;
    }
  }
  
  // Funkce pro uložení požadovaného počtu skladeb do localStorage
  function saveTracks(count = userTracksToSave) {
    if (typeof tracks === 'undefined' || !tracks.length) {
      showNotification("⚠️ Žádné skladby k uložení");
      return false;
    }
    
    try {
      // Určíme počet skladeb k uložení
      count = Math.min(count, tracks.length);
      
      // Vytvoříme pole prvních 'count' skladeb
      const tracksToSave = tracks.slice(0, count);
      
      // Zkomprimujeme data
      const compressedTracks = compressData(tracksToSave);
      
      // Zjistíme velikost dat
      const dataSize = getDataSize(compressedTracks);
      
      // Pokud je velikost dat větší než dostupná kapacita, budeme ukládat méně skladeb
      if (dataSize > STORAGE_CONFIG.MAX_STORAGE_SIZE) {
        // Vyčistíme localStorage a zkusíme znovu
        const availableSpace = cleanupStorage();
        
        if (availableSpace < dataSize) {
          // Postupně snižujeme počet skladeb, dokud se nevejdou
          for (let i = count - 1; i >= 1; i--) {
            const smallerSet = compressData(tracks.slice(0, i));
            if (getDataSize(smallerSet) <= availableSpace) {
              localStorage.setItem(STORAGE_CONFIG.TRACKS_KEY, JSON.stringify(smallerSet));
              showNotification(`⚠️ Omezeno na ${i} skladeb kvůli omezené kapacitě`);
              return true;
            }
          }
          showNotification("❌ Nelze uložit žádné skladby - nedostatek místa");
          return false;
        }
      }
      
      // Uložíme zkomprimovaná data
      localStorage.setItem(STORAGE_CONFIG.TRACKS_KEY, JSON.stringify(compressedTracks));
      
      // Zkontrolujeme, zda se data uložila správně
      const savedData = localStorage.getItem(STORAGE_CONFIG.TRACKS_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        showNotification(`✅ Uloženo ${parsedData.length} skladeb do paměti`);
        console.log(`Uloženo ${parsedData.length} skladeb, velikost dat: ${getDataSize(parsedData)/1024} KB`);
        return true;
      } else {
        showNotification("⚠️ Ukládání se nezdařilo!");
        return false;
      }
    } catch (e) {
      console.error("Chyba při ukládání skladeb:", e);
      showNotification("❌ Chyba při ukládání skladeb");
      return false;
    }
  }
  
  // Aktualizovaná funkce pro načítání dat ze storage
  function loadTracks() {
    const savedTracks = localStorage.getItem(STORAGE_CONFIG.TRACKS_KEY);
    if (savedTracks) {
      try {
        const parsedTracks = JSON.parse(savedTracks);
        if (Array.isArray(parsedTracks) && parsedTracks.length > 0) {
          // ZMĚNA: Pouze uložíme načtené skladby do oddělené proměnné, ale nepřiřazujeme je do window.tracks
          window.savedTracks = parsedTracks;
          console.log(`Načteno ${parsedTracks.length} skladeb z paměti`);
          return true;
        }
      } catch (e) {
        console.error("Chyba při načítání skladeb z localStorage:", e);
        showNotification("❌ Chyba při načítání skladeb");
      }
    } else {
      console.log("Žádné uložené skladby nenalezeny");
    }
    return false;
  }
  
  // Funkce pro načtení aktuálního indexu skladby
  function loadCurrentTrackIndex() {
    const savedIndex = localStorage.getItem(STORAGE_CONFIG.CURRENT_TRACK_KEY);
    if (savedIndex !== null) {
      window.currentTrackIndex = parseInt(savedIndex, 284);
      return true;
    }
    return false;
  }
  
  // Funkce pro nastavení počtu skladeb k uložení
  function setTracksToSave(count) {
    if (isNaN(count) || count < 1) {
      showNotification("⚠️ Neplatný počet skladeb");
      return false;
    }
    
    userTracksToSave = Math.max(1, Math.min(count, 285)); // Omezení na 1-285 skladeb
    showNotification(`✅ Nastaveno ukládání ${userTracksToSave} skladeb`);
    return true;
  }
  
  // Funkce pro uložení aktuálního indexu skladby
  function saveCurrentTrackIndex() {
    if (typeof window.currentTrackIndex !== 'undefined') {
      localStorage.setItem(STORAGE_CONFIG.CURRENT_TRACK_KEY, window.currentTrackIndex);
      return true;
    }
    return false;
  }
  
  // Funkce pro uložení nastavení přehrávače
  function savePlayerSettings() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (!audioPlayer) return false;
    
    const settings = {};
    
    // Uložení hlasitosti
    settings.volume = audioPlayer.volume;
    localStorage.setItem(STORAGE_CONFIG.VOLUME_KEY, settings.volume);
    
    // Uložení stavu shuffle
    if (typeof window.isShuffled !== 'undefined') {
      settings.shuffle = window.isShuffled;
      localStorage.setItem(STORAGE_CONFIG.SHUFFLE_KEY, settings.shuffle);
    }
    
    // Uložení stavu loop
    settings.loop = audioPlayer.loop;
    localStorage.setItem(STORAGE_CONFIG.LOOP_KEY, settings.loop);
    
    // Uložení počtu skladeb pro ukládání
    settings.tracksToSave = userTracksToSave;
    localStorage.setItem('musicPlayer_settings', JSON.stringify(settings));
    
    return true;
  }
  
  // Funkce pro načtení nastavení přehrávače
  function loadPlayerSettings() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (!audioPlayer) return false;
    
    // Načtení hlasitosti
    const savedVolume = localStorage.getItem(STORAGE_CONFIG.VOLUME_KEY);
    if (savedVolume !== null) {
      const volume = parseFloat(savedVolume);
      audioPlayer.volume = volume;
      
      // Aktualizace slider hodnoty, pokud existuje
      const volumeSlider = document.getElementById('volume-slider');
      if (volumeSlider) {
        volumeSlider.value = volume;
      }
      
      // Aktualizace zobrazeného textu, pokud existuje
      const volumeValue = document.getElementById('volume-value');
      if (volumeValue) {
        volumeValue.textContent = Math.round(volume * 100);
      }
    }
    
    // Načtení stavu shuffle
    const savedShuffle = localStorage.getItem(STORAGE_CONFIG.SHUFFLE_KEY);
    if (savedShuffle !== null) {
      window.isShuffled = savedShuffle === 'true';
      
      // Aktualizace stylu tlačítka shuffle
      const shuffleButton = document.getElementById('shuffle-button');
      if (shuffleButton && window.isShuffled) {
        shuffleButton.style.backgroundColor = 'var(--accent-color)';
        shuffleButton.style.color = 'var(--main-bg-color)';
      }
    }
    
    // Načtení stavu loop
    const savedLoop = localStorage.getItem(STORAGE_CONFIG.LOOP_KEY);
    if (savedLoop !== null) {
      audioPlayer.loop = savedLoop === 'true';
      
      // Aktualizace stylu tlačítka loop
      const loopButton = document.getElementById('loop-button');
      if (loopButton && audioPlayer.loop) {
        loopButton.style.backgroundColor = 'var(--accent-color)';
        loopButton.style.color = 'var(--main-bg-color)';
      }
    }
    
    // Načtení nastavení počtu skladeb k uložení
    const settings = localStorage.getItem('musicPlayer_settings');
    if (settings) {
      try {
        const parsedSettings = JSON.parse(settings);
        if (parsedSettings.tracksToSave) {
          userTracksToSave = parsedSettings.tracksToSave;
        }
      } catch (e) {}
    }
    
    return true;
  }
  
  // UPRAVENO: Načtení aktuální skladby jen v případě přepnutí na uložené skladby
  function loadCurrentTrackFromMemory() {
    loadCurrentTrackIndex();
    
    if (window.tracks && window.tracks.length > 0 && typeof window.currentTrackIndex !== 'undefined') {
      const audioPlayer = document.getElementById('audioPlayer');
      const audioSource = audioPlayer ? audioPlayer.querySelector('source') : null;
      const trackTitle = document.getElementById('track-title');
      
      if (audioPlayer && audioSource && trackTitle) {
        // Pouze příprava skladby bez přehrání
        const track = window.tracks[window.currentTrackIndex];
        audioSource.src = track.src;
        trackTitle.textContent = track.title;
        audioPlayer.load();
        
        // Aktualizace aktivní položky v playlistu
        if (typeof window.updateActiveTrack === 'function') {
          window.updateActiveTrack();
        }
      }
    }
  }
  
  // Funkcionalita pro debug - zobrazení využití localStorage
  function showStorageUsage() {
    let totalSize = 0;
    let itemCount = 0;
    const details = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const size = (key.length + value.length) * 2; // Přibližná velikost v bytech
      totalSize += size;
      itemCount++;
      
      details.push({
        key,
        sizeKB: (size / 1024).toFixed(2)
      });
    }
    
    console.log(`LocalStorage využití: ${(totalSize / 1024).toFixed(2)} KB z cca 5120 KB (${(totalSize / 5120 / 1024 * 100).toFixed(2)}%)`);
    console.log(`Počet položek: ${itemCount}`);
    console.table(details);
    
    return totalSize;
  }
  
  // Pomocná funkce pro zachytávání všech skladeb
  function captureAllTracks() {
    // Tato funkce se pokusí zachytit všechny skladby při prvním načtení stránky
    if (typeof window.tracks !== 'undefined' && Array.isArray(window.tracks) && window.tracks.length > 0) {
      // Uložíme všechny skladby do globální proměnné
      window.originalTracks = [...window.tracks];
      console.log(`Zachyceno ${window.originalTracks.length} původních skladeb`);
    }
  }
  
  // UPRAVENO: Načtení všech dat a nastavení při startu
  function initializeFromLocalStorage() {
    // Načtení skladeb do savedTracks (ne přímo do window.tracks)
    loadTracks();
    
    // Načtení nastavení přehrávače
    loadPlayerSettings();
    
    // DŮLEŽITÉ: Nyní neměníme window.tracks, aby byly zobrazeny všechny skladby
    // Místo samostatného tlačítka pro přepínání nyní vše řešíme přes menu
    
    // Výchozí stav je "všechny skladby"
    window.showingAllTracks = true;
  }
  
  // Monitorování událostí pro přehrávání
  function setupPlayerEventListeners() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (!audioPlayer) return;
    
    // Uložení při změně hlasitosti
    audioPlayer.addEventListener('volumechange', function() {
      savePlayerSettings();
    });
    
    // Přepsání funkce playTrack, pokud existuje
    if (typeof window.playTrack === 'function') {
      const originalPlayTrack = window.playTrack;
      window.playTrack = function() {
        const result = originalPlayTrack.apply(this, arguments);
        saveCurrentTrackIndex();
        return result;
      };
    }
    
    // Uložení při zavření stránky
    window.addEventListener('beforeunload', function() {
      saveTracks();
      saveCurrentTrackIndex();
      savePlayerSettings();
    });
  }
  
  // Hlavní inicializační funkce
  function init() {
    // Nejdříve zachytíme originální playlist
    captureAllTracks();
    
    // Vytvoření notifikačního prvku
    createNotificationElement();
    
    // Vytvoření menu místo samostatných tlačítek
    createUnifiedMenu();
    
    // Nastavení eventů
    setupPlayerEventListeners();
    
    // Inicializace z localStorage s malým zpožděním
    setTimeout(initializeFromLocalStorage, 1000);
    
    showNotification("📚 Systém ukládání skladeb byl inicializován", 2000);
  }
  
  // Přidáme naše funkce do globálního objektu window, aby byly dostupné i pro menu
  window.saveTracks = saveTracks;
  window.saveCurrentTrackIndex = saveCurrentTrackIndex;
  window.savePlayerSettings = savePlayerSettings;
  window.loadCurrentTrackFromMemory = loadCurrentTrackFromMemory;
  window.showStorageUsage = showStorageUsage;
  window.setTracksToSave = setTracksToSave;
  window.userTracksToSave = userTracksToSave;
  window.showNotification = showNotification;
  
  // Spustíme inicializaci po načtení obsahu
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

// Spustit inicializaci storage systému
document.addEventListener('DOMContentLoaded', function() {
  // Odložené spuštění pro jistotu
  setTimeout(initStorageSystem, 1000);
});
// Skript pro sledování typu monitoru a nastavení výšky playlistu s persistentním nastavením
// Autor: Claude
// Datum: 24. dubna 2025

// Funkce pro detekci Infinix Note 30 a jiných zařízení
function detectDeviceType() {
    // Základní detekce
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Objekt s výsledky detekce
    const deviceInfo = {
        isInfinixNote30: false,
        isLargeMonitor: screenWidth > 1600,
        isMobile: screenWidth <= 768,
        orientation: window.matchMedia("(orientation: landscape)").matches ? 'landscape' : 'portrait'
    };
    
    // Detekce Infinix Note 30
    deviceInfo.isInfinixNote30 = (
        (screenWidth <= 420 && screenHeight >= 800) &&
        (userAgent.includes('infinix') || userAgent.includes('note30') || userAgent.includes('android'))
    );
    
    // Uložení informací o zařízení do localStorage
    localStorage.setItem('device_isLargeMonitor', deviceInfo.isLargeMonitor);
    localStorage.setItem('device_isInfinixNote30', deviceInfo.isInfinixNote30);
    localStorage.setItem('device_isMobile', deviceInfo.isMobile);
    localStorage.setItem('device_orientation', deviceInfo.orientation);
    
    console.log('Detekce zařízení:', deviceInfo);
    return deviceInfo;
}

// Funkce pro nastavení výšky playlistu podle typu zařízení a režimu
function adjustPlaylistHeight(isFullscreen = false) {
    // Získáme element playlistu
    const playlist = document.querySelector('#playlist');
    
    if (!playlist) {
        console.error('Element #playlist nebyl nalezen!');
        return;
    }
    
    // Získáme informace o zařízení
    const deviceInfo = detectDeviceType();
    
    // Uložíme stav fullscreen
    localStorage.setItem('playlist_isFullscreen', isFullscreen);
    
    let newHeight = '245px';  // Výchozí hodnota
    
    // Nastavení výšky podle typu zařízení
    if (deviceInfo.isInfinixNote30) {
        // Nastavení pro Infinix Note 30
        newHeight = deviceInfo.orientation === 'landscape' ? '350px' : '250px';
        console.log(`Infinix Note 30 v ${deviceInfo.orientation} orientaci - nastavena výška playlistu ${newHeight}`);
    } else if (isFullscreen) {
        // Fullscreen režim pro ostatní zařízení
        newHeight = deviceInfo.isLargeMonitor ? '527px' : '360px';
        console.log(`Fullscreen na ${deviceInfo.isLargeMonitor ? 'velkém monitoru' : 'notebooku'} - nastavena výška playlistu ${newHeight}`);
    } else {
        // Normální režim pro ostatní zařízení
        newHeight = deviceInfo.isLargeMonitor ? '360px' : '245px';
        console.log(`Normální režim na ${deviceInfo.isLargeMonitor ? 'velkém monitoru' : 'notebooku'} - nastavena výška playlistu ${newHeight}`);
    }
    
    // Aplikujeme novou výšku
    playlist.style.maxHeight = newHeight;
    
    // Uložíme aktuální nastavení výšky do localStorage
    localStorage.setItem('playlist_lastHeight', newHeight);
    
    return newHeight;
}

// Funkce pro obnovení předchozího nastavení playlistu
function restorePreviousSettings() {
    const playlist = document.querySelector('#playlist');
    if (!playlist) {
        console.error('Element #playlist nebyl nalezen!');
        return;
    }
    
    // Nejprve zkontrolujeme, zda máme uložené poslední nastavení výšky
    const lastHeight = localStorage.getItem('playlist_lastHeight');
    
    if (lastHeight) {
        // Použijeme uložené nastavení výšky
        playlist.style.maxHeight = lastHeight;
        console.log('Obnoveno předchozí nastavení výšky playlistu:', lastHeight);
        return;
    }
    
    // Pokud nemáme uložené nastavení, provedeme detekci zařízení a nastavíme výšku
    const deviceInfo = detectDeviceType();
    const isFullscreen = localStorage.getItem('playlist_isFullscreen') === 'true';
    
    // Nastavíme výšku playlistu podle aktuálního zařízení
    adjustPlaylistHeight(isFullscreen);
}

// Funkce pro nastavení pozadí podle typu zařízení
function setBackgroundForDevice() {
    // Získáme informace o zařízení z již existující funkce
    const deviceInfo = detectDeviceType();
    
    // URL obrázků pro různá zařízení
    const backgrounds = {
        desktop: 'https://img41.rajce.idnes.cz/d4102/19/19244/19244630_db82ad174937335b1a151341387b7af2/images/vnon-pozadi-od-admirala-chatbota..jpg?ver=1',
        infinix: 'https://img41.rajce.idnes.cz/d4103/19/19345/19345400_697de249bbe74592fe530fb6166058da/images/image_1024x1792.jpg?ver=0'
    };
    
    // Vybereme správné pozadí podle typu zařízení
    let backgroundUrl;
    
    if (deviceInfo.isInfinixNote30) {
        backgroundUrl = backgrounds.infinix;
        console.log('Nastavuji pozadí pro Infinix Note 30');
    } else {
        backgroundUrl = backgrounds.desktop;
        console.log('Nastavuji pozadí pro desktop/notebook');
    }
    
    // Nastavíme pozadí na tělo dokumentu
    document.body.style.backgroundImage = `url('${backgroundUrl}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    
    // Uložíme aktuální pozadí do localStorage pro případné obnovení
    localStorage.setItem('background_url', backgroundUrl);
    
    return backgroundUrl;
}

// Funkce pro obnovení předchozího pozadí (pokud existuje)
function restorePreviousBackground() {
    const savedBackgroundUrl = localStorage.getItem('background_url');
    
    if (savedBackgroundUrl) {
        // Použijeme uložené pozadí
        document.body.style.backgroundImage = `url('${savedBackgroundUrl}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        console.log('Obnoveno předchozí pozadí:', savedBackgroundUrl);
        return;
    }
    
    // Pokud nemáme uložené pozadí, nastavíme podle aktuálního zařízení
    setBackgroundForDevice();
}

// Posluchač události pro změnu orientace obrazovky
window.addEventListener('orientationchange', function() {
    // Krátké zpoždění pro stabilizaci
    setTimeout(function() {
        // Zjistíme, zda jsme ve fullscreen režimu
        const isFullscreen = !!document.fullscreenElement;
        // Nastavíme výšku playlistu podle typu zařízení a orientace
        adjustPlaylistHeight(isFullscreen);
        // Zkontrolujeme a případně aktualizujeme pozadí
        setBackgroundForDevice();
    }, 300);
});

// Posluchač události pro změnu velikosti okna
window.addEventListener('resize', function() {
    // Používáme debouncing pro zabránění přílišnému volání funkce
    if (window.resizeTimer) {
        clearTimeout(window.resizeTimer);
    }
    window.resizeTimer = setTimeout(function() {
        const isFullscreen = !!document.fullscreenElement;
        adjustPlaylistHeight(isFullscreen);
        // Zkontrolujeme a případně aktualizujeme pozadí
        setBackgroundForDevice();
    }, 250);
});

// Funkce pro nastavení fullscreen režimu
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        // Přepneme do fullscreen režimu
        document.documentElement.requestFullscreen().then(() => {
            adjustPlaylistHeight(true);
        }).catch(err => {
            //console.error('Chyba při přepnutí do fullscreen režimu:', err);
        });
    } else {
        // Ukončíme fullscreen režim
        document.exitFullscreen().then(() => {
            adjustPlaylistHeight(false);
        }).catch(err => {
            console.error('Chyba při ukončení fullscreen režimu:', err);
        });
    }
}

// Inicializace při načtení stránky
document.addEventListener('DOMContentLoaded', function() {
    // Obnovíme předchozí nastavení nebo nastavíme výchozí hodnoty
    restorePreviousSettings();
    
    // Přidáme posluchače událostí pro fullscreen
    document.addEventListener('fullscreenchange', function() {
        const isFullscreen = !!document.fullscreenElement;
        adjustPlaylistHeight(isFullscreen);
    });
    
    // Přidáme posluchače událostí pro tlačítko fullscreen (pokud existuje)
    const fullscreenButton = document.querySelector('#fullscreen-toggle');
    if (fullscreenButton) {
        fullscreenButton.addEventListener('click', toggleFullscreen);
    }
    
    // Nastavíme pozadí podle zařízení
    restorePreviousBackground();
});
      // 4. JavaScript kód pro časovač a menu oblíbených skladeb

// Přidej tento kód na konec tvého stávajícího JavaScriptu:


  // Získání reference na tlačítka
  const timerButton = document.getElementById('timer-button');
  const timerContainer = document.getElementById('timer-container');
  const timerMinutes = document.getElementById('timer-minutes');
  const timerSeconds = document.getElementById('timer-seconds');
  const timerStartButton = document.getElementById('timer-start');
  const timerStopButton = document.getElementById('timer-stop');
  const timer5Button = document.getElementById('timer-5');
  const timer15Button = document.getElementById('timer-15');
  const timer30Button = document.getElementById('timer-30');
  const timer60Button = document.getElementById('timer-60');

  // Přidání tlačítka pro oblíbené
  const controlPanel = document.getElementById('control-panel');
  const favoritesButton = document.createElement('button');
  favoritesButton.id = 'favorites-button';
  favoritesButton.textContent = '⭐';
  favoritesButton.title = 'Oblíbené skladby';
  controlPanel.querySelector('.controls').appendChild(favoritesButton);

  // Vytvoření menu pro oblíbené
  const favoritesMenu = document.createElement('div');
  favoritesMenu.className = 'favorites-menu';
  favoritesMenu.innerHTML = '<h3>Oblíbené skladby</h3><div id="favorites-list"></div>';
  document.body.appendChild(favoritesMenu);

  // Proměnné pro časovač
  let timerInterval = null;
  let timerValue = 15 * 60; // 15 minut ve vteřinách
  let timerRunning = false;

  // Aktualizace zobrazení časovače
  function updateTimerDisplay() {
    const minutes = Math.floor(timerValue / 60);
    const seconds = timerValue % 60;
    timerMinutes.textContent = String(minutes).padStart(2, '0');
    timerSeconds.textContent = String(seconds).padStart(2, '0');
  }

  // Funkce pro odpočítávání
  function countDown() {
    if (timerValue > 0) {
      timerValue--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerRunning = false;
      timerButton.classList.remove('active');
      
      // Zastavení přehrávání
      const audioPlayer = document.getElementById('audioPlayer');
      if (audioPlayer) {
        audioPlayer.pause();
      }
      
      // Přehrání zvukového signálu - Star Trek styl
      const alertSound = new Audio('https://www.trekcore.com/audio/computer/tng_computer_start_beep.mp3');
      alertSound.play().catch(e => console.log('Nepodařilo se přehrát zvuk časovače: ', e));
      
      // Oznámení
      alert('🖖 Časovač vypršel! Přehrávání bylo zastaveno.');
    }
  }

  // Nastavení hodnoty časovače
  function setTimerValue(minutes) {
    timerValue = minutes * 60;
    updateTimerDisplay();
  }

  // Obsluha tlačítka časovače
  timerButton.addEventListener('click', function() {
    if (timerContainer.style.display === 'none' || !timerContainer.style.display) {
      timerContainer.style.display = 'flex';
      timerButton.classList.add('active');
    } else {
      timerContainer.style.display = 'none';
      timerButton.classList.remove('active');
    }
  });

  // Start časovače
  timerStartButton.addEventListener('click', function() {
    if (!timerRunning) {
      timerInterval = setInterval(countDown, 1000);
      timerRunning = true;
      timerButton.classList.add('active');
    }
  });

  // Zastavení časovače
  timerStopButton.addEventListener('click', function() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerButton.classList.remove('active');
  });

  // Nastavení předdefinovaných časů
  timer5Button.addEventListener('click', () => setTimerValue(5));
  timer15Button.addEventListener('click', () => setTimerValue(15));
  timer30Button.addEventListener('click', () => setTimerValue(30));
  timer60Button.addEventListener('click', () => setTimerValue(60));

  // Inicializace časovače
  updateTimerDisplay();

  // Funkce pro zobrazení a aktualizaci menu oblíbených skladeb
  function updateFavoritesMenu() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';

    // Získání oblíbených skladeb z localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.length === 0) {
      favoritesList.innerHTML = '<div class="favorites-empty">Žádné oblíbené skladby</div>';
      return;
    }

    // Vytvoření položek menu
    favorites.forEach(title => {
      const favoriteItem = document.createElement('div');
      favoriteItem.className = 'favorites-menu-item';
      favoriteItem.innerHTML = `
        <span>${title}</span>
        <button class="favorite-remove" title="Odebrat z oblíbených">🗑️</button>
      `;
      
      // Přehrání skladby po kliknutí
      favoriteItem.addEventListener('click', function(e) {
        if (e.target.classList.contains('favorite-remove')) {
          return; // Nebudeme přehrávat, pokud bylo kliknuto na tlačítko pro odebrání
        }
        
        // Najít index skladby v hlavním seznamu
        const trackIndex = window.tracks.findIndex(track => track.title === title);
        if (trackIndex !== -1) {
          playTrack(trackIndex);
          
          // OPRAVENO: Kontrola existence funkce před jejím voláním
          if (typeof window.updateButtonStyles === 'function') {
            window.updateButtonStyles(true);
          } else if (typeof updateButtonStyles === 'function') {
            updateButtonStyles(true);
          } else {
            console.log('Funkce updateButtonStyles není dostupná');
            
            // Alternativní řešení - přímá aktualizace stylů
            try {
              const playButton = document.getElementById('play-button');
              const pauseButton = document.getElementById('pause-button');
              
              if (playButton && pauseButton) {
                playButton.classList.add('active');
                pauseButton.classList.remove('active');
              }
              
              // Aktualizace playlistu, pokud existuje currentTrackIndex
              if (typeof currentTrackIndex !== 'undefined') {
                document.querySelectorAll('.playlist-item').forEach((item, index) => {
                  if (index === currentTrackIndex) {
                    item.classList.add('active');
                  } else {
                    item.classList.remove('active');
                  }
                });
              }
            } catch (e) {
              console.log('Nelze aktualizovat styly tlačítek:', e);
            }
          }
        }
      });
      
      // Odebrání z oblíbených
      const removeButton = favoriteItem.querySelector('.favorite-remove');
      removeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const index = favorites.indexOf(title);
        if (index !== -1) {
          favorites.splice(index, 1);
          localStorage.setItem('favorites', JSON.stringify(favorites));
          updateFavoritesMenu();
          
          // Aktualizace zobrazení oblíbených v hlavním playlistu
          if (typeof updateFavoriteDisplay === 'function') {
            updateFavoriteDisplay();
          }
        }
      });
      
      favoritesList.appendChild(favoriteItem);
    });
  }

  // Zobrazení/skrytí menu oblíbených skladeb
  favoritesButton.addEventListener('click', function() {
    if (favoritesMenu.style.display === 'none' || !favoritesMenu.style.display) {
      updateFavoritesMenu();
      favoritesMenu.style.display = 'block';
      favoritesButton.classList.add('active');
    } else {
      favoritesMenu.style.display = 'none';
      favoritesButton.classList.remove('active');
    }
  });

  // Zavření menu oblíbených kliknutím mimo něj
  document.addEventListener('click', function(e) {
    if (!favoritesMenu.contains(e.target) && e.target !== favoritesButton) {
      favoritesMenu.style.display = 'none';
      favoritesButton.classList.remove('active');
    }
  });

  // Přidání klávesové zkratky pro časovač (T)
  document.addEventListener('keydown', function(e) {
    if (e.code === 'KeyT') {
      timerButton.click();
    }
  });

  // Přidání klávesové zkratky pro oblíbené (B)
  document.addEventListener('keydown', function(e) {
    if (e.code === 'KeyB') { // B jako Bookmarks/Oblíbené
      favoritesButton.click();
    }
  });
let db;
const dbName = "HudebniDB";
const storeName = "pisnicky";
let playlisty = []; // Pro uchování písniček
let aktualni = -1; // Index aktuálně přehrávané písničky
let prehravac = document.getElementById("prehravac");

// Reference na ovládací prvky
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const progress = document.getElementById("progress");
const casElement = document.getElementById("cas");
const celkovyCasElement = document.getElementById("celkovyCas");
const hlasitostSlider = document.getElementById("hlasitostSlider");
const hlasitostUroven = document.getElementById("hlasitostUroven");
const nazevPisne = document.getElementById("nazevPisne");
const hlasitostIcon = document.getElementById("hlasitostIcon");

// Inicializace přehrávače
let isPlaying = false;
prehravac.volume = 1.0;

// Otevření nebo vytvoření databáze
let request = indexedDB.open(dbName, 1);
request.onupgradeneeded = function (event) {
  db = event.target.result;
  db.createObjectStore(storeName, { keyPath: "id" });
};
request.onsuccess = function (event) {
  db = event.target.result;
  console.log("Databáze připravena");
  nactiPlaylist();
};
request.onerror = function () {
  console.error("Chyba při otevírání databáze");
};

// Uložit písničky (hromadně)
function ulozitPisnicky() {
  let soubory = document.getElementById("upload").files;
  if (soubory.length === 0) return alert("Vyber alespoň jeden soubor!");

  let tx = db.transaction([storeName], "readwrite");
  let store = tx.objectStore(storeName);

  Array.from(soubory).forEach(soubor => {
    let blobPisne = new Blob([soubor], { type: soubor.type });
    let id = `pisnicka-${new Date().getTime()}-${soubor.name}`;
    
    // Uloží každou písničku do IndexedDB
    store.put({ id, blob: blobPisne, nazev: soubor.name });
  });

  tx.oncomplete = () => {
    alert("Písničky byly uloženy do databáze!");
    nactiPlaylist(); // Aktualizuje playlist
  };
}

// Načíst playlist
function nactiPlaylist() {
  let tx = db.transaction([storeName], "readonly");
  let store = tx.objectStore(storeName);
  let getAllRequest = store.getAll();

  getAllRequest.onsuccess = function (event) {
    playlisty = event.target.result;
    zobrazeniPlaylistu(); // Zobrazí seznam písniček v UI
  };
}

// Smazat písničku z databáze
function smazatPisnicku(index) {
  if (index < 0 || index >= playlisty.length) return;
  
  // Potvrzení před smazáním
  if (!confirm(`Opravdu chceš smazat písničku "${playlisty[index].nazev}"?`)) return;
  
  let tx = db.transaction([storeName], "readwrite");
  let store = tx.objectStore(storeName);
  let request = store.delete(playlisty[index].id);
  
  request.onsuccess = function() {
    // Pokud byla smazána aktuálně přehrávaná písnička
    if (index === aktualni) {
      prehravac.pause();
      prehravac.src = "";
      isPlaying = false;
      aktualizujTlacitkoPlay();
      nazevPisne.textContent = "";
      aktualni = -1;
    } else if (index < aktualni) {
      // Pokud byla smazána písnička před aktuální, musíme upravit index
      aktualni--;
    }
    
    alert("Písnička byla úspěšně smazána!");
    nactiPlaylist(); // Aktualizuje playlist
  };
  
  request.onerror = function() {
    alert("Chyba při mazání písničky.");
  };
}

// Zobrazit playlist v UI
function zobrazeniPlaylistu() {
  const playlistElement = document.getElementById("playlisty");
  playlistElement.innerHTML = ""; // Vymazat předchozí seznam

  playlisty.forEach((pisnicka, index) => {
    let li = document.createElement("li");
    
    // Kontejner pro název písničky
    let nazevDiv = document.createElement("div");
    nazevDiv.className = "nazev-pisne";
    nazevDiv.textContent = pisnicka.nazev || "Neznámý název";
    li.appendChild(nazevDiv);
    
    // Tlačítko pro smazání
    let smazatBtn = document.createElement("button");
    smazatBtn.className = "smazat-btn";
    smazatBtn.textContent = "🗑️";
    smazatBtn.title = "Smazat písničku";
    smazatBtn.onclick = function(e) {
      e.stopPropagation(); // Zabránit kliknutí na položku playlistu
      smazatPisnicku(index);
    };
    li.appendChild(smazatBtn);
    
    li.setAttribute("data-index", index);
    
    // Označení aktuálně přehrávané písničky
    if (index === aktualni) {
      li.classList.add("aktivni");
    }

    // Kliknutí na písničku pro přehrání
    li.addEventListener("click", function () {
      prehratPisnicku(index);
    });

    // Držení pro přesun písničky
    let holdTimeout;
    li.addEventListener("mousedown", function() {
      holdTimeout = setTimeout(function() {
        presunPisnicku(index); // Aktivuje přesun po držení
      }, 1000); // Po 1 sekundě držení se aktivuje přesun
    });

    li.addEventListener("mouseup", function() {
      clearTimeout(holdTimeout); // Zruší přesun pokud uživatel neudržel dostatečně dlouho
    });

    playlistElement.appendChild(li);
  });
}

// Přehrát písničku z IndexedDB
function prehratPisnicku(index) {
  if (index < 0 || index >= playlisty.length) return;
  
  let tx = db.transaction([storeName], "readonly");
  let store = tx.objectStore(storeName);
  let getRequest = store.get(playlisty[index].id);

  getRequest.onsuccess = function (event) {
    let vysledek = event.target.result;
    if (!vysledek) return alert("Nenalezena písnička.");

    aktualni = index;
    let url = URL.createObjectURL(vysledek.blob);
    prehravac.src = url;
    prehravac.play();
    isPlaying = true;
    aktualizujTlacitkoPlay();
    nazevPisne.textContent = vysledek.nazev || "Neznámý název";
    zobrazeniPlaylistu(); // Aktualizuje označení aktivní písničky
  };
}

// Přesunout písničku v playlistu
function presunPisnicku(index) {
  let newIndex = prompt("Na jaké místo v playlistu chcete přesunout tuto písničku?", index);
  newIndex = parseInt(newIndex);

  if (isNaN(newIndex) || newIndex < 0 || newIndex >= playlisty.length) {
    alert("Neplatné místo v playlistu.");
    return;
  }

  let movedSong = playlisty.splice(index, 1)[0]; // Vyjme písničku
  playlisty.splice(newIndex, 0, movedSong); // Vloží písničku na nové místo
  
  // Aktualizace aktuálního indexu, pokud byl přesunut
  if (aktualni === index) {
    aktualni = newIndex;
  } else if (aktualni > index && aktualni <= newIndex) {
    aktualni--;
  } else if (aktualni < index && aktualni >= newIndex) {
    aktualni++;
  }
  
  zobrazeniPlaylistu(); // Aktualizuje playlist zobrazený na stránce
}

// Formátování času (sekundy -> MM:SS)
function formatCas(cas) {
  let minuty = Math.floor(cas / 60);
  let sekundy = Math.floor(cas % 60);
  return `${minuty}:${sekundy < 10 ? '0' : ''}${sekundy}`;
}

// Aktualizace tlačítka play/pause
function aktualizujTlacitkoPlay() {
  playBtn.innerHTML = isPlaying ? "⏸️" : "▶️";
}

// Aktualizace ikony hlasitosti
function aktualizujIkonuHlasitosti() {
  if (prehravac.volume === 0) {
    hlasitostIcon.textContent = "🔇";
  } else if (prehravac.volume < 0.5) {
    hlasitostIcon.textContent = "🔉";
  } else {
    hlasitostIcon.textContent = "🔊";
  }
}

// Event listenery pro přehrávač

// Play/Pause
playBtn.addEventListener("click", function() {
  if (aktualni < 0 && playlisty.length > 0) {
    // Pokud žádná písnička není vybraná, ale playlist není prázdný
    prehratPisnicku(0);
    return;
  }
  
  if (prehravac.paused) {
    prehravac.play();
    isPlaying = true;
  } else {
    prehravac.pause();
    isPlaying = false;
  }
  aktualizujTlacitkoPlay();
});

// Předchozí písnička
prevBtn.addEventListener("click", function() {
  if (aktualni > 0) {
    prehratPisnicku(aktualni - 1);
  } else if (playlisty.length > 0) {
    prehratPisnicku(playlisty.length - 1); // Přejde na konec playlistu
  }
});

// Další písnička
nextBtn.addEventListener("click", function() {
  if (aktualni < playlisty.length - 1) {
    prehratPisnicku(aktualni + 1);
  } else if (playlisty.length > 0) {
    prehratPisnicku(0); // Přejde na začátek playlistu
  }
});

// Progress bar - kliknutí pro změnu pozice přehrávání
progressBar.addEventListener("click", function(e) {
  if (aktualni < 0) return;
  
  const rect = progressBar.getBoundingClientRect();
  const pozice = (e.clientX - rect.left) / rect.width;
  prehravac.currentTime = prehravac.duration * pozice;
});

// Ovládání hlasitosti
hlasitostSlider.addEventListener("click", function(e) {
  const rect = hlasitostSlider.getBoundingClientRect();
  const hlasitost = (e.clientX - rect.left) / rect.width;
  prehravac.volume = Math.max(0, Math.min(1, hlasitost));
  hlasitostUroven.style.width = (prehravac.volume * 100) + "%";
  aktualizujIkonuHlasitosti();
});

// Kliknutí na ikonu hlasitosti pro ztlumení/zapnutí zvuku
hlasitostIcon.addEventListener("click", function() {
  if (prehravac.volume > 0) {
    prehravac.volume = 0;
  } else {
    prehravac.volume = 1.0;
  }
  hlasitostUroven.style.width = (prehravac.volume * 100) + "%";
  aktualizujIkonuHlasitosti();
});

// Událost po načtení metadat (získání celkové délky)
prehravac.addEventListener("loadedmetadata", function() {
  celkovyCasElement.textContent = formatCas(prehravac.duration);
});

// Aktualizace času a progress baru během přehrávání
prehravac.addEventListener("timeupdate", function() {
  if (prehravac.duration) {
    const procento = (prehravac.currentTime / prehravac.duration) * 100;
    progress.style.width = procento + "%";
    casElement.textContent = formatCas(prehravac.currentTime);
  }
});

// Automatické přehrání další písničky po skončení
prehravac.addEventListener("ended", function() {
  if (aktualni < playlisty.length - 1) {
    prehratPisnicku(aktualni + 1);
  } else if (playlisty.length > 0) {
    prehratPisnicku(0); // Přejde na začátek playlistu po přehrání poslední písničky
  }
});

// Inicializace hlasitosti
hlasitostUroven.style.width = "100%";

// Tlačítko pro smazání všech písniček
function pridejTlacitkoSmazatVse() {
  const ovladaciPrvky = document.getElementById('ovladaciPrvky');
  
  const smazatVseBtn = document.createElement('button');
  smazatVseBtn.id = 'smazatVseBtn';
  smazatVseBtn.textContent = '🗑️';
  smazatVseBtn.title = 'Smazat všechny písničky';
  smazatVseBtn.className = 'tlacitko smazat-vse-btn';
  
  smazatVseBtn.addEventListener('click', function() {
    smazatVsechnyPisnicky();
  });
  
  // Přidáme do divu s tlačítky
  const tlacitkaDiv = document.getElementById('tlacitka');
  tlacitkaDiv.appendChild(smazatVseBtn);
}

// Funkce pro smazání všech písniček
function smazatVsechnyPisnicky() {
  if (playlisty.length === 0) {
    alert("Playlist je prázdný.");
    return;
  }
  
  if (!confirm("Opravdu chceš smazat všechny písničky?")) return;
  
  let tx = db.transaction([storeName], "readwrite");
  let store = tx.objectStore(storeName);
  let clearRequest = store.clear();
  
  clearRequest.onsuccess = function() {
    prehravac.pause();
    prehravac.src = "";
    isPlaying = false;
    aktualizujTlacitkoPlay();
    nazevPisne.textContent = "";
    aktualni = -1;
    
    alert("Všechny písničky byly smazány.");
    nactiPlaylist();
  };
  
  clearRequest.onerror = function() {
    alert("Chyba při mazání písniček.");
  };
}

// Přidat CSS styly pro nová tlačítka
function pridejCSS() {
  const style = document.createElement('style');
  style.textContent = `
    .smazat-btn {
      background: none;
      border: none;
      cursor: pointer;
      margin-left: 10px;
      opacity: 0.7;
      transition: opacity 0.3s;
    }
    
    .smazat-btn:hover {
      opacity: 1;
    }
    
    .smazat-vse-btn {
      background: none;
      color: inherit;
      font-size: inherit;
    }
    
    #playlisty li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
    }
    
    .nazev-pisne {
      flex-grow: 1;
    }
  `;
  document.head.appendChild(style);
}

// Přidání CSS a tlačítka pro smazání všech písniček po načtení stránky
document.addEventListener('DOMContentLoaded', function() {
  pridejCSS();
  pridejTlacitkoSmazatVse();
});
       //tady je konec hl kodu $
       
 
      
    // Minimální JavaScript pro přepínání stránek
document.addEventListener('DOMContentLoaded', function() {
  // Získání referencí na tlačítka a stránky
  const page1Btn = document.getElementById('page1-btn');
  const page2Btn = document.getElementById('page2-btn');
  const page1 = document.getElementById('page1');
  const page2 = document.getElementById('page2');

  // Funkce pro přepnutí na první stránku
  function showPage1() {
    page2.classList.remove('active');
    page1.classList.add('active');
    page1Btn.classList.add('active');
    page2Btn.classList.remove('active');
  }

  // Funkce pro přepnutí na druhou stránku
  function showPage2() {
    page1.classList.remove('active');
    page2.classList.add('active');
    page2Btn.classList.add('active');
    page1Btn.classList.remove('active');
  }

  // Přidání event listenerů na tlačítka
  page1Btn.addEventListener('click', showPage1);
  page2Btn.addEventListener('click', showPage2);
});