const API_URL = 'http://localhost:4000/api/notes';

const form = document.getElementById('note-form');
const notesList = document.getElementById('notes-list');

async function fetchNotes() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderNotes(data.data);
}

function renderNotes(notes) {
  document.getElementById("note-count").textContent = `You have ${notes.length} note${notes.length === 1 ? "" : "s"}`;
  notesList.innerHTML = '';
  notes.forEach(note => {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <small>${new Date(note.createdAt).toLocaleDateString()}</small>
      <button onclick="deleteNote('${note._id}')">Delete</button>
    `;
    notesList.appendChild(div);
  });
}

async function deleteNote(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchNotes();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  form.reset();
  fetchNotes();
});

fetchNotes();
