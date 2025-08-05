

---

```markdown
# ✅ To-Do List Web App

A dynamic and user-friendly to-do list application built using **HTML**, **CSS**, and **JavaScript**. This app helps users stay organized by allowing them to add, edit, delete, filter, and reorder tasks—all while saving progress in the browser using Local Storage.

## 🌟 Features

- ✍️ Add new tasks via button click or pressing Enter
- 🧹 Filter tasks: All, Active, or Completed
- 🔄 Update task status with checkboxes
- 📝 Edit task text inline using a prompt
- ❌ Delete tasks with one click
- 📦 Auto-save tasks in Local Storage
- 🎯 Display number of tasks left
- 🖱️ Reorder tasks using drag-and-drop
- 🌙/☀️ Toggle between Light and Dark mode
- 📱 Mobile-friendly filtering buttons

## 📦 Structure

```
📁 todo-list-app
├── index.html
├── style.css
├── script.js
└── images/
    ├── icon-check.svg
    ├── icon-cross.svg
    ├── icon-moon.svg
    └── icon-sun.svg
```

## 🚧 How It Works

- All tasks are stored in `localStorage` using a simple array of objects:
  ```js
  {
    id: Number,
    text: String,
    isComplete: Boolean
  }
  ```
- Tasks are rendered dynamically into the DOM with event listeners attached for interaction.
- Filtering updates the visible list while maintaining the original data.
- Drag-and-drop modifies the order of tasks visually and updates the data model.

## 📋 Getting Started

1. Clone or download the project.
2. Open `index.html` in your browser.
3. Start adding tasks and see them persist across sessions.

> No setup or build tools needed. Just run in any modern browser.

## 💡 Future Improvements

- ✨ Add animations during drag and filter transitions
- ☁️ Sync with a backend service like Firebase
- 📱 Refine responsiveness for better mobile UX
- 🔊 Add audio or notifications for task updates

---

```

