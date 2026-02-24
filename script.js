// Job Application Tracker
let jobs = [];
let currentFilter = 'all';

// Load jobs from localStorage
function loadJobs() {
    const savedJobs = localStorage.getItem('jobs');
    if (savedJobs) {
        jobs = JSON.parse(savedJobs);
        renderJobs();
        updateStats();
    }
}

// Save jobs to localStorage
function saveJobs() {
    localStorage.setItem('jobs', JSON.stringify(jobs));
}

// Add new job
document.getElementById('job-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newJob = {
        id: Date.now(),
        company: document.getElementById('company-name').value,
        position: document.getElementById('position').value,
        location: document.getElementById('location').value || 'Not specified',
        salary: document.getElementById('salary').value || 'Not specified',
        notes: document.getElementById('notes').value || 'No notes yet.',
        status: 'Applied',
        dateApplied: new Date().toLocaleDateString()
    };
    
    jobs.push(newJob);
    saveJobs();
    renderJobs();
    updateStats();
    
    // Reset form
    this.reset();
});

// Render jobs
function renderJobs() {
    const container = document.getElementById('allCards');
    
    // Filter jobs based on current filter
    let filteredJobs = jobs;
    if (currentFilter !== 'all') {
        filteredJobs = jobs.filter(job => job.status === currentFilter);
    }
    
    if (filteredJobs.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">No applications found. Add one above!</p>';
        return;
    }
    
    container.innerHTML = filteredJobs.map(job => `
        <div class="card flex justify-between border border-gray-300 p-8 rounded bg-white shadow-sm">
            <!-- main part 1 -->
            <div class="space-y-4">
                <!-- part 1 -->
                <div>
                    <p class="companyName text-4xl font-bold">${job.company}</p>
                    <p class="position text-xl text-gray-600">${job.position}</p>
                </div>

                <!-- part 2 -->
                <div class="flex gap-2 flex-wrap">
                    <p class="location bg-gray-200 px-4 py-1 rounded text-sm">📍 ${job.location}</p>
                    <p class="salary bg-gray-200 px-4 py-1 rounded text-sm">💰 ${job.salary}</p>
                    <p class="date bg-gray-200 px-4 py-1 rounded text-sm">📅 ${job.dateApplied}</p>
                </div>
                
                <!-- part 3 -->
                <p class="status font-semibold ${getStatusColor(job.status)}">${job.status}</p>
                <p class="notes text-gray-700">${job.notes}</p>

                <div class="flex gap-3 flex-wrap">
                    <button onclick="updateStatus(${job.id}, 'Applied')" 
                        class="bg-blue-200 text-blue-800 px-4 py-2 rounded hover:bg-blue-300">Applied</button>
                    <button onclick="updateStatus(${job.id}, 'Interview')" 
                        class="bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-300">Interview</button>
                    <button onclick="updateStatus(${job.id}, 'Offer')" 
                        class="bg-yellow-200 text-yellow-800 px-4 py-2 rounded hover:bg-yellow-300">Offer</button>
                    <button onclick="updateStatus(${job.id}, 'Rejected')" 
                        class="bg-red-200 text-red-800 px-4 py-2 rounded hover:bg-red-300">Rejected</button>
                </div>
            </div>

            <!-- main part 2 -->
            <div>
                <button onclick="deleteJob(${job.id})" 
                    class="btn-delete bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
            </div>
        </div>
    `).join('');
}

// Get status color
function getStatusColor(status) {
    const colors = {
        'Applied': 'text-blue-600',
        'Interview': 'text-green-600',
        'Offer': 'text-yellow-600',
        'Rejected': 'text-red-600'
    };
    return colors[status] || 'text-gray-600';
}

// Update job status
function updateStatus(id, newStatus) {
    const job = jobs.find(j => j.id === id);
    if (job) {
        job.status = newStatus;
        saveJobs();
        renderJobs();
        updateStats();
    }
}

// Delete job
function deleteJob(id) {
    if (confirm('Are you sure you want to delete this application?')) {
        jobs = jobs.filter(j => j.id !== id);
        saveJobs();
        renderJobs();
        updateStats();
    }
}

// Update statistics
function updateStats() {
    const total = jobs.length;
    const interviewCount = jobs.filter(j => j.status === 'Interview').length;
    const rejectedCount = jobs.filter(j => j.status === 'Rejected').length;
    
    document.getElementById('total').textContent = total;
    document.getElementById('interviewCount').textContent = interviewCount;
    document.getElementById('rejectedCount').textContent = rejectedCount;
}

// Toggle filter
function toggleFilter(filter) {
    currentFilter = filter;
    
    // Update button styles
    const buttons = ['all', 'Applied', 'Interview', 'Rejected', 'Offer'];
    buttons.forEach(btn => {
        const btnId = btn === 'all' ? 'all-filter-btn' : btn.toLowerCase() + '-filter-btn';
        const element = document.getElementById(btnId);
        if (element) {
            if (btn.toLowerCase() === filter.toLowerCase()) {
                element.className = 'bg-black text-white px-5 py-2 rounded ml-2';
            } else {
                element.className = 'bg-gray-300 px-5 py-2 rounded ml-2';
            }
        }
    });
    
    renderJobs();
}

// Initialize app
loadJobs();
