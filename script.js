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

  document.getElementById('age').textContent = calculateAge('2001-06-30');

});

document.addEventListener('scroll', function() {
  const nav3 = document.getElementById('nav3');
  if (window.scrollY > 100) {
    nav3.style.top = '-60px';
  } else {
    nav3.style.top = '50px';
  }
});
async function fetchGitHubProjects() {
  const username = 'mubin25-dodu'; 
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await response.json();
  const projectsList = document.getElementById('projects-list');
  const cardTemplate = document.getElementById('card-template').content;

  repos.forEach(repo => {
    const card = cardTemplate.cloneNode(true);

    const link = card.querySelector('.repo-link');
    link.href = repo.html_url;
    link.textContent = repo.name;

    const description = card.querySelector('.repo-description');
    description.textContent = repo.description || 'No description available';
    const img = card.querySelector('.repo-description');
    description.textContent = repo.description || 'No description available';


    const forks = card.querySelector('.repo-forks');
    forks.textContent = `🍴 ${repo.forks_count}`;

    const language = card.querySelector('.repo-language');
    language.textContent = `📝 ${repo.language}`;

    projectsList.appendChild(card);
  });
}

fetchGitHubProjects();
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
