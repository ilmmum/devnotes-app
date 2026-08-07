const API_URL = 'http://localhost:4001/api/notes';

const form = document.getElementById('note-form');
const notesList = document.getElementById('notes-list');

async function fetchNotes() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderNotes(data.data);
}

function renderNotes(notes) {
  notesList.innerHTML = '';
  notes.forEach(note => {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
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
