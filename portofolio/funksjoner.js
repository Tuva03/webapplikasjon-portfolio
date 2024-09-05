console.log("Script loading json load.js");

let projects = [];
const form = document.getElementById("prosjekt_info");

//oppretter et nytt prosjekt
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const tittelInput = document.getElementById("project_name");
  const tittelText = tittelInput.value;
  const beskrivelseInput = document.getElementById("description");
  const beskrivelseText = beskrivelseInput.value;
  const linkInput = document.getElementById("repo_link");
  const linkText = linkInput.value;
  const nyttProsjekt = {
    prosjekt_navn: tittelText,
    beskrivelse: beskrivelseText,
    repo_link: linkText,
  };
  projects.push(nyttProsjekt);

  try {
    const response = await fetch("http://localhost:3999/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nyttProsjekt),
    });

    console.log(response);
  } catch (error) {
    console.error("An error eccored sending the data to the server");
  }

  form.reset();
  loadProjects();
});

function loadProjects() {
  const prosjektListe = document.getElementById("prosjekter");
  prosjektListe.innerHTML = "";
  for (const prosjekt of projects) {
    const article = document.createElement("article");
    const h3 = document.createElement("h3");
    h3.textContent = prosjekt.prosjekt_navn;
    const p = document.createElement("p");
    p.textContent = prosjekt.beskrivelse;
    const a = document.createElement("a");
    a.textContent = "Link til prosjekt";
    a.href = prosjekt.repo_link;

    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(a);

    prosjektListe.appendChild(article);
  }
}

async function GetAllProjects() {
  const url = "http://localhost:3999";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    projects.push(...json);
    loadProjects();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

GetAllProjects();
