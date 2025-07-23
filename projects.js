document.addEventListener('DOMContentLoaded', () => {
  const projectsList = document.getElementById('projects-list');
  const cardTemplate = document.getElementById('card-template').content;

  fetch('https://winter-mode-133a.mubin9516.workers.dev')
    .then(response => response.json())
    .then(repos => {
      // Calculate overview statistics
      const totalProjects = repos.length;
      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
      
      // Update overview statistics
      document.getElementById('total-projects').textContent = totalProjects;
      document.getElementById('total-stars').textContent = totalStars;
      document.getElementById('total-forks').textContent = totalForks;
      
      // Track languages for counting
      const allLanguages = new Set();
      let languagePromises = [];

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
        const description = repo.description || 'No description';
        const maxLength = 100;
        
        if (description.length > maxLength) {
          const shortDescription = description.substring(0, maxLength) + '...';
          repoDescription.innerHTML = `<span class="short-desc">${shortDescription}</span><span class="full-desc" style="display: none;">${description}</span><br><button class="see-more-btn" onclick="toggleDescription(this)">See more</button>`;
        } else {
          repoDescription.textContent = description;
        }

        const repoStars = document.createElement('span');
        repoStars.classList.add('repo-stars');
        repoStars.textContent = `⭐ ${repo.stargazers_count}`;

        const repoForks = document.createElement('span');
        repoForks.classList.add('repo-forks');
        repoForks.textContent = `🍴 ${repo.forks_count}`;

        const languageContainer = document.createElement('div');
        languageContainer.classList.add('language-container');
        languageContainer.textContent = 'Languages: Loading...';

        // Create buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');
        
        // GitHub button
        const githubButton = document.createElement('a');
        githubButton.href = repo.html_url;
        githubButton.target = '_blank';
        githubButton.classList.add('btn', 'github-btn');
        githubButton.innerHTML = '🔗 GitHub';
        
        // Website button (if homepage exists)
        if (repo.homepage) {
          const websiteButton = document.createElement('a');
          websiteButton.href = repo.homepage;
          websiteButton.target = '_blank';
          websiteButton.classList.add('btn', 'website-btn');
          websiteButton.innerHTML = '🌐 Website';
          buttonsContainer.append(githubButton, websiteButton);
        } else {
          buttonsContainer.appendChild(githubButton);
        }

        // Fetch languages for the repository
        const languagePromise = fetch(repo.languages_url)
          .then(languagesResponse => languagesResponse.json())
          .then(languages => {
            const languageList = Object.keys(languages);
            languageList.forEach(lang => allLanguages.add(lang));
            languageContainer.textContent = `Languages: ${languageList.join(', ') || 'None'}`;
            return languageList;
          })
          .catch(error => {
            console.error(`Error fetching languages for ${repo.name}:`, error);
            languageContainer.textContent = 'Languages: Error loading';
            return [];
          });
        
        languagePromises.push(languagePromise);

        cardContent.append(repoLink, repoDescription, repoStars, repoForks, languageContainer, buttonsContainer);

        const imageElement = document.createElement('img');
        imageElement.src = `https://raw.githubusercontent.com/mubin25-dodu/${repo.name}/main/img/${repo.name}.png`;
        imageElement.alt = `${repo.name} project image`;
        
        // Create placeholder for when image fails to load
        const imagePlaceholder = document.createElement('div');
        imagePlaceholder.classList.add('image-placeholder');
        imagePlaceholder.innerHTML = `
          <div class="placeholder-content">
            <i class="placeholder-icon">📷</i>
            <p>No Photo Found</p>
          </div>
        `;
        imagePlaceholder.style.display = 'none';
        
        imageElement.onerror = () => {
          imageElement.style.display = 'none';
          imagePlaceholder.style.display = 'flex';
        };

        cardElement.append(imageElement, imagePlaceholder, cardContent);

        projectsList.appendChild(card);
      });
      
      // Update languages count after all language requests complete
      Promise.all(languagePromises).then(() => {
        document.getElementById('languages-used').textContent = allLanguages.size;
      });
    })
    .catch(error => console.error('Error fetching repos:', error));
});

// Function to toggle description visibility
function toggleDescription(button) {
  const shortDesc = button.parentElement.querySelector('.short-desc');
  const fullDesc = button.parentElement.querySelector('.full-desc');
  
  if (fullDesc.style.display === 'none') {
    shortDesc.style.display = 'none';
    fullDesc.style.display = 'inline';
    button.textContent = 'See less';
  } else {
    shortDesc.style.display = 'inline';
    fullDesc.style.display = 'none';
    button.textContent = 'See more';
  }
}