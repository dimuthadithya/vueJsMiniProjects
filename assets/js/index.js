// Project data storage
let projects = [];
let projectIdCounter = 1;

// Filter functions
function filterProjects(level) {
  const cards = document.querySelectorAll('.project-card[data-level]');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Update active filter button
  filterBtns.forEach((btn) => {
    btn.classList.remove('bg-vue-green', 'text-white', 'active');
    btn.classList.add('bg-gray-100', 'text-gray-700');
  });

  event.target.classList.remove('bg-gray-100', 'text-gray-700');
  event.target.classList.add('bg-vue-green', 'text-white', 'active');

  // Show/hide cards based on filter
  cards.forEach((card) => {
    if (level === 'all' || card.dataset.level === level) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const cards = document.querySelectorAll('.project-card[data-name]');

  cards.forEach((card) => {
    const projectName = card.dataset.name.toLowerCase();
    if (projectName.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// Update statistics
function updateStats() {
  const projectCards = document.querySelectorAll('.project-card[data-level]');
  const totalProjects = projectCards.length;

  document.getElementById('totalProjects').textContent = totalProjects;
  document.getElementById('completedProjects').textContent = Math.floor(
    totalProjects * 0.7
  );
  document.getElementById('inProgressProjects').textContent = Math.floor(
    totalProjects * 0.3
  );
  document.getElementById('thisMonthProjects').textContent = totalProjects;
}

// Add CSS for fade out animation
const style = document.createElement('style');
style.textContent = `
      @keyframes fadeOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.8); }
      }
  `;
document.head.appendChild(style);

// Initialize stats on page load
updateStats();

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card bg-white rounded-xl overflow-hidden fade-in';
  card.setAttribute('data-level', project.level);
  card.setAttribute('data-name', project.name.toLowerCase());

  const topSection = document.createElement('div');
  topSection.className = `h-48 bg-gradient-to-br from-${project.gradientColors[0]} to-${project.gradientColors[1]} relative`;

  const iconOverlay = document.createElement('div');
  iconOverlay.className =
    'absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center';

  const icon = document.createElement('i');
  icon.className = `${project.ImagePath} text-white text-4xl`;
  iconOverlay.appendChild(icon);

  const levelBadge = document.createElement('div');
  levelBadge.className = 'absolute top-4 right-4';
  levelBadge.innerHTML = `<span class="bg-white bg-opacity-20 text-white px-2 py-1 rounded-full text-xs font-medium">${
    project.level.charAt(0).toUpperCase() + project.level.slice(1)
  }</span>`;

  topSection.appendChild(iconOverlay);
  topSection.appendChild(levelBadge);

  const content = document.createElement('div');
  content.className = 'p-6';

  const title = document.createElement('h3');
  title.className = 'text-xl font-semibold text-gray-900 mb-2';
  title.textContent = project.name;

  const description = document.createElement('p');
  description.className = 'text-gray-600 mb-4 text-sm';
  description.textContent = project.description;

  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'flex flex-wrap gap-2 mb-4';
  project.tags.forEach((tag) => {
    const tagElement = document.createElement('span');
    tagElement.className =
      'tag bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium';
    tagElement.textContent = tag;
    tagsContainer.appendChild(tagElement);
  });

  const footer = document.createElement('div');
  footer.className = 'flex justify-between items-center';

  const postedTime = document.createElement('span');
  postedTime.className = 'text-sm text-gray-500';
  postedTime.textContent = project.posted;

  const actionsContainer = document.createElement('div');
  actionsContainer.className = 'flex space-x-2';

  project.actions.forEach((action) => {
    const button = document.createElement('a'); // Use <a> for link
    button.href = action.url;
    button.target = '_blank';
    button.className = 'text-gray-400 hover:text-vue-green transition-colors';
    button.title = action.title;

    const actionIcon = document.createElement('i');
    actionIcon.className = action.icon;

    button.appendChild(actionIcon);
    actionsContainer.appendChild(button);
  });

  footer.appendChild(postedTime);
  footer.appendChild(actionsContainer);

  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(tagsContainer);
  content.appendChild(footer);

  card.appendChild(topSection);
  card.appendChild(content);

  document.getElementById('projects-container').appendChild(card);
}

// Fetch JSON data
fetch('./data/projects.json')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((project) => createProjectCard(project));
  })
  .catch((error) => console.error('Error loading JSON:', error));
