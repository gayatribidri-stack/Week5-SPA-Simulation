# Week 5 Report: Developing a Single Page Application (SPA) Simulation

## 1. Project Title

**Student Productivity Hub**

## 2. Objective

The objective of this project is to develop a Single Page Application (SPA) simulation using HTML5, CSS3, and vanilla JavaScript. The project demonstrates client-side navigation, dynamic content rendering, URL hash routing, browser history support, responsive design, and basic error handling without requiring a full page reload for each section.

## 3. Technologies Used

* HTML5 for the page structure and navigation.
* CSS3 for styling, responsive layouts, focus indicators, and transitions.
* JavaScript for routing, DOM manipulation, task management, and event handling.
* Visual Studio Code for development.
* Google Chrome and Live Server for running and testing the project.

## 4. Project Features

The Student Productivity Hub contains three main sections: Dashboard, My Tasks, and About. The Dashboard displays the total number of tasks, completed tasks, and remaining tasks. The My Tasks section allows users to add tasks, mark them as completed, and delete individual tasks. The About section explains the project and its features.

The application uses URL hash routing with routes such as `#dashboard`, `#tasks`, and `#about`. JavaScript reads the current hash and dynamically updates the main content area. The `hashchange` event supports navigation when the URL changes, including browser Back and Forward actions. An unknown route displays a Page Not Found message.

CSS provides a responsive layout for smaller screens, active navigation styling, visible keyboard focus indicators, and a short fade-in animation. The application also includes basic validation for empty task names and limits task names to 120 characters. User-entered task text is escaped before being inserted into the task list.

## 5. Testing

The application should be tested by navigating between all three sections, adding a task, completing a task, deleting a task, using browser Back and Forward, entering an invalid route, and checking the layout at desktop and mobile widths.

Record the actual outcome of each test before submitting this report. The task list is maintained in JavaScript memory, so tasks remain available while navigating between sections but reset after a browser refresh.

## 6. Challenges and Solutions

One challenge was updating page content without reloading the entire website. This was addressed by rendering the appropriate content dynamically with JavaScript. Another challenge was keeping navigation state synchronized with the URL, which was handled using hash routing and the `hashchange` event. Input validation and HTML escaping were also added to improve reliability when users enter task names.

## 7. Learning Outcomes

This project helped demonstrate the fundamentals of SPA simulation, client-side routing, DOM manipulation, event listeners, browser history, dynamic rendering, responsive CSS, and basic input validation.

## 8. Conclusion

The Student Productivity Hub demonstrates how a small website can behave like a single-page application using standard web technologies. It provides dynamic navigation and simple task management while maintaining a consistent layout across its sections.
