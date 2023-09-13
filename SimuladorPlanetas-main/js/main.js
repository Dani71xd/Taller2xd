$(document).ready(function () {
  const planetSelector = $('#planetSelector');
  const planet = $('#planet');
  const openFormBtn = $('#openGenericPlanetModalBtn');
  const genericPlanetForm = $('#genericPlanetModal');
  const saveGenericPlanetBtn = $('#saveGenericPlanetBtn');
  const gravityInput = $('#genericGravity');


  openFormBtn.click(function () {
    genericPlanetForm.modal('show');
  });

  saveGenericPlanetBtn.click(function () {
    const gravityValue = parseFloat(gravityInput.val());
    setGenericPlanetGravity(gravityValue);
    genericPlanetForm.modal('hide');
  });


  function setGenericPlanetGravity(gravity) {
    const genericPlanet = 'generico';
    const gravityValues = {
      [genericPlanet]: gravity,
    };
    displaySelectedPlanet(genericPlanet);
    planetSelector.val(genericPlanet);
  }



  planetSelector.change(function () {
    const selectedPlanet = planetSelector.val();
    displaySelectedPlanet(selectedPlanet);
  });


  planet.click(function () {
    const selectedPlanet = planetSelector.val();
    startFreeFall(selectedPlanet);
  });

  function displaySelectedPlanet(planetName) {
    const planetImageUrl = getPlanetImage(planetName);
    planet.css('background-image', `url('${planetImageUrl}')`);
  }

  function startFreeFall(planetName) {
    const gravity = getGravity(planetName);
    let distance = 0;
    let time = 0;

    const intervalId = setInterval(() => {
      time += 0.1;
      distance = 0.5 * gravity * time * time;
      planet.css('top', 100 + distance + '200px');

      if (distance >= 900) {
        clearInterval(intervalId);
        setTimeout(() => {
          planet.css('top', '200px');
        }, 1000);
      }
    }, 100);
  }

  function getGravity(planetName) {
    const gravityValues = {
      mercurio: 3.7,
      venus: 8.87,
      tierra: 9.81,
      marte: 3.71,
      jupiter: 24.79,
    };
    return gravityValues[planetName] || 0;
  }

  function getPlanetImage(planetName) {
    const planetImages = {
      mercurio: 'img/mercurio.png',
      venus: 'img/venus.png',
      tierra: 'img/tierra.png',
      marte: 'img/marte.png',
      jupiter: 'img/jupiter.png',
      generico: 'img/generico.png'
    };
    return planetImages[planetName] || '';
  }

  displaySelectedPlanet(planetSelector.val());
});