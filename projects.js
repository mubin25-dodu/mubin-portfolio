document.addEventListener('DOMContentLoaded', () => {
  const projectsList = document.getElementById('projects-list');
  const cardTemplate = document.getElementById('card-template').content;

  fetch('https://winter-mode-133a.mubin9516.workers.dev')
    .then(response => response.json())
    .then(repos => {
      repos.forEach(repo => {
        const card = cardTemplate.cloneNode(true);
        const cardElement = card.querySelector('.card');

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const repoLink = document.createElement('a');
        repoLink.classList.add('repo-link');
        repoLink.textContent = repo.name;

        const repoDescription = document.createElement('p');
        repoDescription.classList.add('repo-description');
        repoDescription.textContent = repo.description || 'No description';

        const repoStars = document.createElement('span');
        repoStars.classList.add('repo-stars');
        repoStars.textContent = `⭐ ${repo.stargazers_count}`;

        const repoForks = document.createElement('span');
        repoForks.classList.add('repo-forks');
        repoForks.textContent = `🍴 ${repo.forks_count}`;

        const languageContainer = document.createElement('div');
        languageContainer.classList.add('language-container');
        languageContainer.textContent = 'Languages: Loading...';

        // Fetch languages for the repository
        fetch(repo.languages_url)
          .then(languagesResponse => languagesResponse.json())
          .then(languages => {
            const languageList = Object.keys(languages).join(', ');
            languageContainer.textContent = `Languages: ${languageList || 'None'}`;
          })
          .catch(error => {
            console.error(`Error fetching languages for ${repo.name}:`, error);
            languageContainer.textContent = 'Languages: Error loading';
          });

        cardContent.append(repoLink, repoDescription, repoStars, repoForks, languageContainer);

        const imageElement = document.createElement('img');
        imageElement.src = `https://raw.githubusercontent.com/mubin25-dodu/${repo.name}/main/img/${repo.name}.png`;
        imageElement.alt = `${repo.name} project image`;
        imageElement.onerror = () => {
          imageElement.src = 'img/default-project.png';
        };

        cardElement.append(imageElement, cardContent);
        cardElement.addEventListener('click', () => {
          window.location.href = repo.html_url;
        });

        projectsList.appendChild(card);
      });
    })
    .catch(error => console.error('Error fetching repos:', error));
});