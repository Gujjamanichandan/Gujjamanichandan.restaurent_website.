function shuffle(array) {
    var currentIndex = array.length,
        randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  
    return array;
  }
  
  function spin() {
  
    // Play the sound
    wheel.play();
  
    const box = document.getElementById("box");
    const element = document.getElementById("mainboxSpinner");
    let SelectedItem = "";
  
    let MagicRoaster = shuffle([1890, 2250, 2610]);
    let Sepeda = shuffle([1850, 2210, 2570]); //Kemungkinan : 100%
    let RiceCooker = shuffle([1810, 2170, 2530]);
    let LunchBox = shuffle([1770, 2130, 2490]);
    let Sanken = shuffle([1750, 2110, 2470]);
    let Electrolux = shuffle([1630, 1990, 2350]);
    let JblSpeaker = shuffle([1570, 1930, 2290]);
  
    let Hasil = shuffle([
      MagicRoaster[0],
      Sepeda[0],
      RiceCooker[0],
      LunchBox[0],
      Sanken[0],
      Electrolux[0],
      JblSpeaker[0],
    ]);
  
    // get the value of selected item
    if (MagicRoaster.includes(Hasil[0])) SelectedItem = "Magic Roaster";
    if (Sepeda.includes(Hasil[0])) SelectedItem = "Sepeda Aviator";
    if (RiceCooker.includes(Hasil[0])) SelectedItem = "Rice Cooker Philips";
    if (LunchBox.includes(Hasil[0])) SelectedItem = "Lunch Box Lock&Lock";
    if (Sanken.includes(Hasil[0])) SelectedItem = "Air Cooler Sanken";
    if (Electrolux.includes(Hasil[0])) SelectedItem = "Electrolux Blender";
    if (JblSpeaker.includes(Hasil[0])) SelectedItem = "JBL Speaker";
  
    // spin
    box.style.setProperty("transition", "all ease 5s");
    box.style.transform = "rotate(" + Hasil[0] + "deg)";
    element.classList.remove("animate");
    setTimeout(function () {
      element.classList.add("animate");
    }, 5000);
  
    // alert
    setTimeout(function () {
      applause.play();
      swal(
        "Congratulations",
        "You Won The " + SelectedItem + ".",
        "success"
      );
      var mainbox = document.getElementById("mainboxSpinner");
      mainbox.style.display = "none";
    }, 5500);
  
    // delay
    setTimeout(function () {
      box.style.setProperty("transition", "initial");
      box.style.transform = "rotate(90deg)";
    }, 6000);
  }