document.addEventListener('DOMContentLoaded', () => {
    const projectsList = document.getElementById('projects-list');
    const cardTemplate = document.getElementById('card-template').content;

    fetch('https://api.github.com/users/mubin25-dodu/repos')
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                const card = cardTemplate.cloneNode(true);
                const cardElement = card.querySelector('.card');
                cardElement.querySelector('.repo-link').textContent = repo.name;
                cardElement.querySelector('.repo-description').textContent = repo.description || 'No description';
                cardElement.querySelector('.repo-stars').textContent = `⭐ ${repo.stargazers_count}`;
                cardElement.querySelector('.repo-forks').textContent = `🍴 ${repo.forks_count}`;
                cardElement.addEventListener('click', () => {
                    window.location.href = repo.html_url;
                });
                projectsList.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching repos:', error));
});
