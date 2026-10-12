
const appContent = document.getElementById("app-content");
const currentYear = document.getElementById("current-year");

let tasks = [
    { id: 1, title: "Revise JavaScript basics", completed: false },
    { id: 2, title: "Complete college assignments", completed: true },
    { id: 3, title: "Practice aptitude questions", completed: false }
];

let nextTaskId = 4;

currentYear.textContent = new Date().getFullYear();

const pages = {
    dashboard: {
        title: "Your Study Dashboard",
        description: "Organize your learning, manage tasks, and make progress one step at a time."
    },
    tasks: {
        title: "My Tasks",
        description: "Add your study tasks, mark completed work, or remove tasks you no longer need."
    },
    about: {
        title: "About StudyHub",
        description: "A simple single-page application built to demonstrate client-side navigation."
    }
};

// Escape user-entered text before inserting it into HTML.
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];
    });
}

function getTaskStats() {
    const completed = tasks.filter(task => task.completed).length;

    return {
        total: tasks.length,
        completed: completed,
        remaining: tasks.length - completed
    };
}

function renderDashboard() {
    const stats = getTaskStats();

    return `
        <section class="page-content">
            <p class="eyebrow">STUDENT PRODUCTIVITY HUB</p>
            <h1 class="page-title">Welcome to StudyHub 👋</h1>
            <p class="page-description">
                Your personal space to plan study activities and keep track of your progress.
            </p>

            <div class="card-grid">
                <article class="stat-card">
                    <p class="stat-label">Total Tasks</p>
                    <p class="stat-number">${stats.total}</p>
                    <p class="stat-note">All your study tasks</p>
                </article>

                <article class="stat-card">
                    <p class="stat-label">Completed</p>
                    <p class="stat-number">${stats.completed}</p>
                    <p class="stat-note">Tasks finished</p>
                </article>

                <article class="stat-card">
                    <p class="stat-label">Remaining</p>
                    <p class="stat-number">${stats.remaining}</p>
                    <p class="stat-note">Tasks to work on</p>
                </article>
            </div>

            <section class="panel">
                <h2>Plan your next step</h2>
                <p class="page-description">
                    Keep your study goals organized. Visit your task list to add new activities
                    and update your progress.
                </p>
                <a class="button" href="#tasks">Manage My Tasks</a>
            </section>

            <section class="panel">
                <h2>Study tip</h2>
                <p>
                    Break a large assignment into smaller tasks and complete them one by one.
                    A simple daily plan can make studying easier to manage.
                </p>
            </section>
        </section>
    `;
}

function renderTasks() {
    const stats = getTaskStats();

    const taskItems = tasks.map(task => `
        <li class="task-item ${task.completed ? "completed" : ""}">
            <input
                type="checkbox"
                data-action="toggle"
                data-id="${task.id}"
                aria-label="Mark ${escapeHTML(task.title)} as completed"
                ${task.completed ? "checked" : ""}
            >

            <span class="task-name">${escapeHTML(task.title)}</span>

            <button
                type="button"
                class="delete-button"
                data-action="delete"
                data-id="${task.id}"
                aria-label="Delete ${escapeHTML(task.title)}"
            >
                Delete
            </button>
        </li>
    `).join("");

    return `
        <section class="page-content">
            <p class="eyebrow">TASK MANAGER</p>
            <h1 class="page-title">My Study Tasks</h1>
            <p class="page-description">
                Add tasks, check off completed work, and keep your study plan up to date.
            </p>

            <section class="panel">
                <h2>Add a new task</h2>

                <form id="task-form" class="task-form">
                    <input
                        id="task-input"
                        class="task-input"
                        type="text"
                        maxlength="120"
                        placeholder="Example: Study database management"
                        aria-label="New task name"
                        required
                    >
                    <button class="button" type="submit">Add Task</button>
                </form>

                <p id="task-feedback" class="feedback" aria-live="polite"></p>

                <p class="stat-label">
                    Total: ${stats.total} · Completed: ${stats.completed}
                    · Remaining: ${stats.remaining}
                </p>
            </section>

            <section class="panel">
                <h2>Your task list</h2>

                ${
                    tasks.length > 0
                        ? `<ul class="task-list">${taskItems}</ul>`
                        : `<p class="empty-state">No tasks yet. Add a task to get started!</p>`
                }
            </section>
        </section>
    `;
}

function renderAbout() {
    return `
        <section class="page-content">
            <p class="eyebrow">ABOUT THE PROJECT</p>
            <h1 class="page-title">What is StudyHub?</h1>
            <p class="page-description">
                StudyHub is a student productivity website created as a Single Page Application
                simulation using HTML, CSS, and JavaScript.
            </p>

            <section class="panel">
                <h2>Project features</h2>
                <ul class="feature-list">
                    <li>Navigate between pages without a full browser reload.</li>
                    <li>Update the page content dynamically with JavaScript.</li>
                    <li>Change the URL using hash-based client-side routing.</li>
                    <li>Use browser Back and Forward buttons to change pages.</li>
                    <li>Add, complete, and delete study tasks.</li>
                    <li>Display a helpful message for an unknown route.</li>
                    <li>Use a responsive layout and visible keyboard focus styles.</li>
                </ul>

                <div class="info-banner">
                    <strong>Technology used:</strong> HTML5, CSS3, and vanilla JavaScript.
                    No external framework is required.
                </div>
            </section>
        </section>
    `;
}

function renderNotFound() {
    return `
        <section class="page-content">
            <p class="eyebrow">PAGE NOT FOUND</p>
            <h1 class="page-title">Oops! This page doesn't exist.</h1>
            <p class="page-description">
                The route you entered is not available. Return to the dashboard to continue.
            </p>
            <a class="button" href="#dashboard">Back to Dashboard</a>
        </section>
    `;
}

function renderRoute() {
    let route = window.location.hash.slice(1);

    if (!route) {
        route = "dashboard";
        window.history.replaceState(null, "", "#dashboard");
    }

    let pageHTML;

    if (route === "dashboard") {
        pageHTML = renderDashboard();
    } else if (route === "tasks") {
        pageHTML = renderTasks();
    } else if (route === "about") {
        pageHTML = renderAbout();
    } else {
        pageHTML = renderNotFound();
    }

    // Replace only the main content; the page itself is not reloaded.
    appContent.innerHTML = pageHTML;

    // Update the active navigation link.
    document.querySelectorAll(".main-nav a").forEach(link => {
        const isActive = link.dataset.route === route;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

// Handle task form submission using event delegation.
appContent.addEventListener("submit", function (event) {
    if (event.target.id !== "task-form") {
        return;
    }

    event.preventDefault();

    const input = document.getElementById("task-input");
    const feedback = document.getElementById("task-feedback");
    const title = input.value.trim();

    if (!title) {
        feedback.textContent = "Please enter a task name.";
        input.focus();
        return;
    }

    if (title.length > 120) {
        feedback.textContent = "Task names must be 120 characters or fewer.";
        return;
    }

    tasks.push({
        id: nextTaskId++,
        title: title,
        completed: false
    });

    renderRoute();

    const newFeedback = document.getElementById("task-feedback");
    if (newFeedback) {
        newFeedback.textContent = "Task added successfully!";
    }

    const newInput = document.getElementById("task-input");
    if (newInput) {
        newInput.focus();
    }
});

// Handle completing and deleting tasks.
appContent.addEventListener("change", function (event) {
    if (event.target.dataset.action !== "toggle") {
        return;
    }

    const taskId = Number(event.target.dataset.id);
    const task = tasks.find(item => item.id === taskId);

    if (task) {
        task.completed = event.target.checked;
        renderRoute();
    }
});

appContent.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");

    if (!button) {
        return;
    }

    const taskId = Number(button.dataset.id);

    if (button.dataset.action === "delete") {
        tasks = tasks.filter(task => task.id !== taskId);
        renderRoute();

        const feedback = document.getElementById("task-feedback");
        if (feedback) {
            feedback.textContent = "Task deleted.";
        }
    }
});

// Hash changes include navigation links and browser Back/Forward.
window.addEventListener("hashchange", renderRoute);

// Display the initial route.
renderRoute();