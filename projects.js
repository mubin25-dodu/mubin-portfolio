document.addEventListener('DOMContentLoaded', () => {
    const projectsList = document.getElementById('projects-list');
    const cardTemplate = document.getElementById('card-template').content;

    fetch('https://api.github.com/users/mubin25-dodu/repos')
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                const card = cardTemplate.cloneNode(true);
                card.querySelector('.repo-link').href = repo.html_url;
                card.querySelector('.repo-link').textContent = repo.name;
                card.querySelector('.repo-description').textContent = repo.description || 'No description';
                card.querySelector('.repo-stars').textContent = `⭐ ${repo.stargazers_count}`;
                card.querySelector('.repo-forks').textContent = `🍴 ${repo.forks_count}`;
                projectsList.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching repos:', error));
});
