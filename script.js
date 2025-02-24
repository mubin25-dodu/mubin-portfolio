document.addEventListener('DOMContentLoaded', function() {
  const dropdownButton = document.querySelector('#dropdown button');
  const dropdownContent = document.querySelector('#dropdown-content');

  dropdownButton.addEventListener('click', function() {
    if (dropdownContent.style.display === 'block') {
      dropdownContent.style.display = 'none';
    } else {
      dropdownContent.style.display = 'block';
    }
  });

  const menuButton = document.getElementById('menu-button');
  const nav2 = document.getElementById('nav2');

  menuButton.addEventListener('click', function() {
    nav2.classList.toggle('show');
  });

  function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} years, ${months} months, and ${days} days`;
  }

  const ageElement = document.getElementById('age');
  if (ageElement) {
    ageElement.textContent = calculateAge('2001-06-30');
  }

  async function fetchGitHubProjects() {
    const username = 'mubin25-dodu'; 
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) throw new Error('Network response was not ok');
      const repos = await response.json();
      const projectsList = document.getElementById('projects-list');
      const cardTemplate = document.getElementById('card-template').content;

      for (const repo of repos) {
        const card = cardTemplate.cloneNode(true);

        const link = card.querySelector('.repo-link');
        link.href = repo.html_url;
        link.textContent = repo.name;

        const description = card.querySelector('.repo-description');
        description.textContent = repo.description || 'No description available';

        const stars = card.querySelector('.repo-stars');
        stars.textContent = `⭐ ${repo.stargazers_count}`;

        const forks = card.querySelector('.repo-forks');
        forks.textContent = `🍴 ${repo.forks_count}`;

        const languageContainer = card.querySelector('.repo-languages');
        const languagesResponse = await fetch(repo.languages_url);
        if (!languagesResponse.ok) throw new Error('Network response was not ok');
        const languages = await languagesResponse.json();
        const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);

        for (const [language, bytes] of Object.entries(languages)) {
          const percentage = ((bytes / totalBytes) * 100).toFixed(2);
          const languageElement = document.createElement('span');
          languageElement.classList.add('repo-language');
          languageElement.textContent = `${language} (${percentage}%)`;
          languageContainer.appendChild(languageElement);
        }

        projectsList.appendChild(card);
      }
    } catch (error) {
      console.error('Error fetching GitHub projects:', error);
    }
  }

  fetchGitHubProjects();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Md Abdullah Al Mubin",
    "jobTitle": "Computer Science and Engineering Student",
    "affiliation": {
      "@type": "Organization",
      "name": "American International University-Bangladesh (AIUB)"
    },
    "url": "https://github.com/mubin25-dodu",
    "sameAs": [
      "https://www.facebook.com/abdullahalmubin69",
      "https://www.instagram.com/abdullahalmubin69",
      "https://www.linkedin.com/in/abdullah-al-mubin9516"
    ]
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);

});

document.addEventListener('scroll', function() {
  const nav3 = document.getElementById('nav3');
  if (window.scrollY > 100) {
    nav3.style.top = '-60px';
  } else {
    nav3.style.top = '50px';
  }
});

function addClass() {
  document.body.classList.add("sent");
}

document.getElementById("sendLetter").addEventListener("click", addClass);
function sendmail() {
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("Email").value,
    message: document.getElementById("message").value,
  }
    emailjs.send("service_0jgffj7", "template_89vfg5n", params).then(alert("success"));
  }
