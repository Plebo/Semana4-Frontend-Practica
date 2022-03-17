function searchPokemon(event) {
  event.preventDefault();
  const pokemon = document.getElementById("pokemon").value;
  if (pokemon === "") {
    alert("Ingrese un pokemon valido");
    return;
  }
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      const error =
        response.status === 404
          ? "Pokemon no encontrado"
          : "Ocurrio un error inesperado, intente de nuevo";
      throw new Error(`Ha ocurrido un error: ${error}`);
    })
    .then((response) => {
      console.log(response);
      document.getElementById("pokeName").innerText = response.name;
      document.getElementById("pokeImage").src = response.sprites.front_default;

      for (const type of response.types) {
        const typeTextElement = document.createElement("div");
        // typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;

        document.getElementById("pokeTypes").appendChild(typeTextElement);
      }

      let stats = "";
      for (const stat of response.stats) {
        stats += `${stat.stat.name} -  ${stat.base_stat} <br />`;
      }
      document.getElementById("stats").innerText = "Stats";
      document.getElementById("pokeStats").innerHTML = stats;

      let moves = "";
      for (const move of response.moves) {
        moves += `${move.move.name} <br />`;
      }
      document.getElementById("moves").innerText = "Moves";
      document.getElementById("pokeMoves").innerHTML = moves;
    })
    .catch((error) => {
      const url =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfbaEtmv4pKEUj3IZojRO5G_LLcP5m1l71VA&usqp=CAU";
      document.getElementById("pokeImage").src = url;
      document.getElementById("pokeName").innerText = "Pokemon";
      document.getElementById("types").innerText = "";
      document.getElementById("pokeTypes").innerText = "";
      document.getElementById("stats").innerText = "";
      document.getElementById("pokeStats").innerText = "";
      document.getElementById("stats").innerText = "";
      document.getElementById("pokeStats").innerText = "";
      alert(error);
    });
}
