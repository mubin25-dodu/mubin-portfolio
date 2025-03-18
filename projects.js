document.addEventListener('DOMContentLoaded', () => {
    const projectsList = document.getElementById('projects-list');
    const cardTemplate = document.getElementById('card-template').content;

    fetch('https://winter-mode-133a.mubin9516.workers.dev')
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                const card = cardTemplate.cloneNode(true);
                const cardElement = card.querySelector('.card');

                // Create a container for text content
                const cardContent = document.createElement('div');
                cardContent.classList.add('card-content');

                // Set project information
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

                // Append text elements to the card content
                cardContent.appendChild(repoLink);
                cardContent.appendChild(repoDescription);
                cardContent.appendChild(repoStars);
                cardContent.appendChild(repoForks);

                // Add an image beside the project information
                const imageElement = document.createElement('img');
                imageElement.src = `https://raw.githubusercontent.com/mubin25-dodu/${repo.name}/main/img/${repo.name}.png`;
                imageElement.alt = `${repo.name} project image`;
                imageElement.onerror = () => {
                    // Fallback image if the GitHub image is not found
                    imageElement.src = 'img/default-project.png';
                };

                // Append the image and card content to the card
                cardElement.appendChild(imageElement);
                cardElement.appendChild(cardContent);

                // Add click event to redirect to the repository
                cardElement.addEventListener('click', () => {
                    window.location.href = repo.html_url;
                });

                projectsList.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching repos:', error));
});