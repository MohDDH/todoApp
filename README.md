
---

**✅ To-Do List Web App**

A dynamic and user-friendly to-do list application built using HTML, CSS, and JavaScript. This app helps users stay organized by allowing them to add, edit, delete, filter, and reorder tasks—all while saving progress in the browser using Local Storage.

---

**🌟 Features**

- Add new tasks via button click or pressing Enter  
- Filter tasks: All, Active, or Completed  
- Update task status with checkboxes  
- Edit task text inline using a prompt  
- Delete tasks with one click  
- Auto-save tasks in Local Storage  
- Display the number of tasks left  
- Reorder tasks using drag-and-drop  
- Toggle between Light and Dark mode  
- Mobile-friendly filtering buttons

---

**📦 Structure**

Folder contents:
- `index.html`
- `style.css`
- `script.js`
- `images/` folder containing:
  - `icon-check.svg`
  - `icon-cross.svg`
  - `icon-moon.svg`
  - `icon-sun.svg`

---

**🚧 How It Works**

All tasks are stored in localStorage using a simple array of objects like:
```
{
  id: Number,
  text: String,
  isComplete: Boolean
}
```
Tasks are dynamically inserted into the page (DOM), with event listeners added for various interactions. Filtering displays the relevant tasks while preserving the full list. Drag-and-drop reorders items and updates the data source.

---

**📋 Getting Started**

1. Clone or download the project  
2. Open the `index.html` file in any browser  
3. Start adding tasks — they’ll be saved automatically

No installation or build tools required.

---

**💡 Future Improvements**

- Add animations during drag and filtering  
- Integrate with Firebase to store data online  
- Enhance mobile responsiveness  
- Add sound effects or notifications for task changes

---
